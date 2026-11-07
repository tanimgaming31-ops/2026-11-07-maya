/**
 * MAYA/MYRAA REAL VRM 3D STAGE (mobile WebGL)
 * Uses the VRoid Project AvatarSample_A backup supplied by the project owner.
 * Upstream VRoid conditions apply; not claimed as original IP.
 * This is a display/animation layer. No edits to app voice, data, or Android services.
 */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {VRMLoaderPlugin, VRMUtils} from '@pixiv/three-vrm';

const MODEL_URL = './maya.vrm';
const STATUS = id => document.getElementById(id);
const POINTERS = new Map();
const clamp = (v,min,max) => Math.min(max,Math.max(min,v));
const BONE_NAMES = ['head','neck','chest','upperChest','spine','hips','leftUpperArm','rightUpperArm','leftLowerArm','rightLowerArm','leftHand','rightHand','leftShoulder','rightShoulder'];
class MayaVRMStage {
  constructor(stage) {
    this.stage = stage;
    this.container = document.createElement('div');
    this.container.id = 'pink-3d-view';
    this.container.setAttribute('aria-label','Real interactive Maya 3D model');
    this.container.setAttribute('role','img');
    this.container.style.cssText='position:absolute;inset:0;z-index:3;touch-action:none;pointer-events:auto';
    stage.appendChild(this.container);
    this.loading = true; this.loaded = false; this.visible = true;
    this.turn = 0; this.dx = 0; this.dy = 0; this.zoomFactor = 1;
    this.clock = new THREE.Clock(); this.time = 0;
    this.lastWidth=0; this.lastHeight=0; this.previousTimestamp=0; this.raf=0;
    this.bones={}; this.baseBones={}; this.model=null; this.vrm=null; this.renderer=null;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(31,0.8,.05,100);
    const hemi = new THREE.HemisphereLight(0xffffff,0x674b69,2.0);
    this.scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff,2.4);
    key.position.set(1.1,2.5,3.5); this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xff80c9,1.8);
    rim.position.set(-2.4,2,-2);this.scene.add(rim);
    this.setInfo('Loading your original 3D Maya model…');
    this.setupPointers();
  }
  setInfo(message) {
    const caption=STATUS('pink-character-caption');
    if(caption)caption.textContent=message;
    const log=STATUS('notice');
    if(log && (/failed|error/i.test(message))) log.textContent=message;
  }
  async load() {
    try {
      if(!('WebGLRenderingContext' in window)) throw new Error('This Android WebView does not support WebGL.');
      this.renderer = new THREE.WebGLRenderer({
        antialias: true, alpha:true, powerPreference:'default',
        preserveDrawingBuffer:false
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      this.renderer.setClearColor(0x000000,0);
      this.renderer.outputColorSpace=THREE.SRGBColorSpace;
      this.renderer.domElement.style.cssText='width:100%;height:100%;display:block;pointer-events:none';
      this.container.appendChild(this.renderer.domElement);
      const loader = new GLTFLoader();
      loader.register(parser=>new VRMLoaderPlugin(parser));
      const gltf=await loader.loadAsync(MODEL_URL);
      const vrm=gltf.userData?.vrm;
      if(!vrm || !vrm.humanoid) throw new Error('Model is not a valid humanoid VRM.');
      this.vrm=vrm;
      VRMUtils.rotateVRM0(vrm);
      this.model=vrm.scene;
      this.scene.add(this.model);
      this.model.traverse(node=>{if(node.isMesh)node.frustumCulled=false;});
      this.rootY=this.model.rotation.y;
      this.rootX=this.model.position.x;this.rootHeight=this.model.position.y;
      for(const n of BONE_NAMES){
        const b=vrm.humanoid.getNormalizedBoneNode(n);
        if(b) {this.bones[n]=b;this.baseBones[n]={x:b.rotation.x,y:b.rotation.y,z:b.rotation.z};}
      }
      this.setNaturalPose();
      if(vrm.lookAt) vrm.lookAt.autoUpdate=false; // Do not tilt the eyes without a real tracked target.
      this.initialFrame();
      this.loaded=true;this.loading=false;
      this.setVisible(document.body.classList.contains('pink-real-home'));
      this.setInfo('Real 3D active · drag to rotate · blink and breathing');
      window.dispatchEvent(new CustomEvent('maya-vrm-loaded'));
      this.start();
      return true;
    }catch(error){
      console.error('Maya VRM setup error',error);
      this.failed=true; this.loading=false;
      this.destroyRenderer();
      this.container.style.display='none';
      this.setInfo('3D model failed to load. 2D image fallback active.');
      window.dispatchEvent(new CustomEvent('maya-vrm-failed',{detail:String(error?.message||error)}));
      return false;
    }
  }
  setNaturalPose(){
    const B=this.bones;
    // VRM normalized pose starts with T-pose; gently lower arms, use a small breathing motion below.
    if(B.leftUpperArm)B.leftUpperArm.rotation.z=this.baseBones.leftUpperArm.z + 1.15;
    if(B.rightUpperArm)B.rightUpperArm.rotation.z=this.baseBones.rightUpperArm.z - 1.15;
    if(B.leftLowerArm)B.leftLowerArm.rotation.y=this.baseBones.leftLowerArm.y + .25;
    if(B.rightLowerArm)B.rightLowerArm.rotation.y=this.baseBones.rightLowerArm.y - .25;
  }
  initialFrame(){
    this.model.updateMatrixWorld(true);
    const box=new THREE.Box3().setFromObject(this.model);
    if(box.isEmpty())throw new Error('Model geometry is empty.');
    const size=box.getSize(new THREE.Vector3());
    if(!size.y || !Number.isFinite(size.y))throw new Error('Bad model dimensions.');
    this.center=box.getCenter(new THREE.Vector3());
    this.modelHeight=size.y;
    this.cameraTarget=this.center.y + size.y*.02;
    this.frameDistance= Math.max(size.y*.91, size.x*2.8);
    this.reset();
    this.resize();
  }
  resize(){
    if(!this.renderer)return;
    const w=this.container.clientWidth||1,h=this.container.clientHeight||1;
    if(w!==this.lastWidth||h!==this.lastHeight){
      this.lastWidth=w;this.lastHeight=h;
      this.renderer.setSize(w,h,false);
      this.camera.aspect=w/h;
      this.camera.updateProjectionMatrix();
      if (this.model && this.center) this.updateCamera();
    }
  }
  updateCamera(){
    if(!this.model)return;
    const h=this.modelHeight||1.7;
    const fov=this.camera.fov*Math.PI/180;
    const req = Math.max(h*1.10,h*.50/Math.max(this.camera.aspect,.28));
    const distance=(req/2)/Math.tan(fov/2)*this.zoomFactor;
    this.camera.position.set(this.center.x,this.cameraTarget, this.center.z + distance);
    this.camera.lookAt(this.center.x,this.cameraTarget,this.center.z);
  }
  rotate(step=20){
    if(!this.loaded)return;
    this.turn=(this.turn + step) % 360;
    this.model.rotation.y=this.rootY + THREE.MathUtils.degToRad(this.turn);
  }
  move(stepX=0,stepY=0){
    if(!this.loaded)return;
    this.dx=clamp(this.dx+stepX,-.65,.65);
    this.dy=clamp(this.dy+stepY,-.55,.55);
    this.model.position.x=this.rootX+this.dx;
    this.model.position.y=this.rootHeight+this.dy;
  }
  zoom(direction){
    if(!this.loaded)return;
    this.zoomFactor=clamp(this.zoomFactor+(direction>0?-.12:.12),.55,1.85);
    this.updateCamera();
  }
  reset(){
    this.turn=0;this.dx=0;this.dy=0;this.zoomFactor=1;
    if(!this.model)return;
    this.model.rotation.y=this.rootY;this.model.position.x=this.rootX;this.model.position.y=this.rootHeight;
    this.updateCamera();
  }
  setVisible(yes){
    this.visible=!!yes;
    this.container.style.display=this.loaded&&this.visible?'block':'none';
    const art=STATUS('pink-character-art');
    if(art)art.style.display=this.loaded&&this.visible?'none':'';
    if(this.visible&&this.loaded) this.start();
  }
  update(dt){
    const t=this.time+=dt;
    const b=this.bones,base=this.baseBones;
    const breath=Math.sin(t*1.65);
    if(b.chest)b.chest.rotation.x=base.chest.x+breath*.014;
    if(b.upperChest)b.upperChest.rotation.x=base.upperChest.x+breath*.013;
    if(b.spine)b.spine.rotation.x=base.spine.x+breath*.013;
    if(b.head){
      b.head.rotation.z=base.head.z+Math.sin(t*.65)*.045;
      b.head.rotation.y=base.head.y+Math.sin(t*.38)*.05;
      b.head.rotation.x=base.head.x+Math.sin(t*.54)*.025;
    }
    if(b.leftUpperArm)b.leftUpperArm.rotation.z=base.leftUpperArm.z+1.15+breath*.018;
    if(b.rightUpperArm)b.rightUpperArm.rotation.z=base.rightUpperArm.z-1.15-breath*.018;
    if(b.hips)b.hips.rotation.z=base.hips.z+Math.sin(t*.8)*.012;
    if(this.vrm?.expressionManager){
      if(t>this.nextBlink || !this.nextBlink){
        this.nextBlink=t+2.3+Math.random()*3.1;
        this.blinkAt=t;
      }
      const blinkDistance=t-(this.blinkAt??-10);
      const blink= blinkDistance>0 && blinkDistance<.22 ? Math.sin(Math.PI*blinkDistance/.22):0;
      this.vrm.expressionManager.setValue('blink',blink);
      // Mouth tracking requires speech audio integration; do not simulate a claimed lip sync.
    }
    this.vrm?.update(dt); // VRM spring bone hair and expression updates.
  }
  start(){
    if(this.raf||!this.loaded||!this.visible) return;
    this.clock.getDelta();
    const step=(ts)=>{
      this.raf=0;
      if(!this.loaded||!this.visible||document.hidden) return;
      const delta=Math.min(this.clock.getDelta(),.055);
      this.resize();
      this.update(delta);
      this.renderer?.render(this.scene,this.camera);
      this.raf=requestAnimationFrame(step);
    };
    this.raf=requestAnimationFrame(step);
  }
  stop(){if(this.raf){cancelAnimationFrame(this.raf);this.raf=0;}}
  destroyRenderer(){
    this.stop();
    if(this.renderer){this.renderer.dispose();this.renderer.forceContextLoss?.();this.renderer=null;}
  }
  setupPointers(){
    let oldX=0,oldY=0,oldPinch=0;
    const pinch=()=>{
      const values=[...POINTERS.values()];
      return values.length<2?0:Math.hypot(values[0].x-values[1].x,values[0].y-values[1].y);
    };
    this.container.addEventListener('pointerdown',e=>{
      if(!this.loaded)return;
      POINTERS.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(this.container.setPointerCapture)this.container.setPointerCapture(e.pointerId);
      oldX=e.clientX;oldY=e.clientY;oldPinch=pinch();
    });
    this.container.addEventListener('pointermove',e=>{
      if(!this.loaded||!POINTERS.has(e.pointerId))return;
      POINTERS.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(POINTERS.size>=2){
        const next=pinch();
        if(oldPinch && next) {this.zoomFactor=clamp(this.zoomFactor*oldPinch/next,.55,1.85);this.updateCamera();}
        oldPinch=next;
      }else{
        this.rotate((e.clientX-oldX)*.45);
        oldX=e.clientX; oldY=e.clientY;
      }
    });
    const done=e=>{POINTERS.delete(e.pointerId);oldPinch=pinch();};
    this.container.addEventListener('pointerup',done);
    this.container.addEventListener('pointercancel',done);
    document.addEventListener('visibilitychange',()=>{document.hidden?this.stop():this.start();});
  }
}
function startAfterHome(){
  let attempts=0;
  const timer=setInterval(()=>{
    attempts++;
    const stage=STATUS('pink-character-stage');
    if(stage){
      clearInterval(timer);
      const runtime=new MayaVRMStage(stage);
      window.MayaVRM=runtime;
      runtime.load();
    }else if(attempts>=300){clearInterval(timer);console.warn('Pink home screen did not mount; preserving original Orb.');}
  },200);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startAfterHome,{once:true});
else startAfterHome();
