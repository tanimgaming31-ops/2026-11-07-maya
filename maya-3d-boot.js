/* Maya real Android entry 3D startup and on-device diagnostics.
   Deliberately does NOT access AI API keys, messages or Memory Packs.
   Failures are visible rather than silently falling back to the old Orb.
*/
(() => {
  'use strict';
  if (window.__maya3dBootStarted) return;
  window.__maya3dBootStarted = true;
  const MAX_WAIT_MS = 20000;
  const state = window.Maya3DStatus = {
    mode: 'starting',
    error: null,
    checkedAt: new Date().toISOString(),
    model: 'bundled maya.vrm',
    build: '3D-VISIBLE-2026-11-07'
  };
  const byId = id => document.getElementById(id);
  const info = (kind, message) => {
    state.mode = kind;
    state.error = kind === 'failed' ? String(message).slice(0,250) : null;
    state.checkedAt = new Date().toISOString();
    let badge = byId('maya3d-live-status');
    if (!badge) {
      badge = document.createElement('button');
      badge.id = 'maya3d-live-status';
      badge.type = 'button';
      badge.setAttribute('aria-label', 'Maya 3D loading and diagnostics');
      badge.style.cssText = 'position:absolute;z-index:99;top:65px;left:50%;transform:translateX(-50%);padding:6px 10px;max-width:80vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:1px solid #ff9dcd;border-radius:16px;background:#301327dd;color:#fff;font:600 10px system-ui;box-shadow:0 0 12px #ff65bb80;touch-action:manipulation';
      badge.addEventListener('click', () => {
        const e = state.error ? '3D error: ' + state.error : '3D state: ' + state.mode;
        const notice = byId('notice');
        if (notice) notice.textContent = e;
        else window.alert?.(e);
      });
      const parent = document.querySelector('#app .portrait') || document.querySelector('#app') || document.body;
      parent.appendChild(badge);
    }
    badge.dataset.mode = kind;
    const label = kind === 'loaded' ? '✓ 3D Active' : kind === 'failed' ? '⚠ 3D Failed · tap for reason' : kind === 'loading' ? '3D Loading…' : '3D Starting…';
    badge.textContent = label;
    badge.style.borderColor = kind === 'failed' ? '#ffd36f' : '#ff9dcd';
    console[kind === 'failed' ? 'error' : 'info']('[Maya3D]', kind, message || '');
  };
  function diagnostics() {
    const errors = [];
    const canvas = document.createElement('canvas');
    let webgl = false;
    try { const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl'); webgl = !!ctx; }
    catch (error) { errors.push('WebGL: ' + String(error.message || error)); }
    state.webgl = webgl;
    state.browser = navigator.userAgent;
    if (!webgl) throw Error('WebGL is disabled in this Android WebView. Hardware acceleration must be enabled.');
    return errors;
  }
  function readyPortrait() {
    return !!document.querySelector('#app .portrait');
  }
  async function waitPortrait() {
    const started = performance.now();
    while (!readyPortrait()) {
      if (performance.now() - started > MAX_WAIT_MS) throw Error('MYRAA home screen never loaded its .portrait container.');
      await new Promise(resolve => setTimeout(resolve, 160));
    }
  }
  async function loadClassic(url) {
    await new Promise((resolve,reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = () => reject(Error('Could not load Android UI script: ' + url));
      document.body.appendChild(script);
    });
  }
  async function waitStage() {
    const start = performance.now();
    while (!byId('pink-character-stage')) {
      if (performance.now() - start > MAX_WAIT_MS) throw Error('Pink 3D character stage did not mount. UI bootstrap failed.');
      await new Promise(resolve => setTimeout(resolve, 160));
    }
  }
  async function start() {
    try {
      await waitPortrait();
      document.querySelector('#app .brand .version')?.replaceChildren(document.createTextNode('3D FIX'));
      document.body.classList.add('pink-real-home');
      info('loading', 'Waiting for the real 3D model…');
      if (!window.__mayaPinkScriptLoaded) {
        await loadClassic('./pink-home.js');
        window.__mayaPinkScriptLoaded = true;
      }
      await waitStage();
      document.body.classList.add('pink-real-home');
      const pref = 'myraa.pink.home.enabled.v2';
      try { localStorage.setItem(pref,'true'); } catch (_) {}
      diagnostics();
      await import('./maya-vrm-engine.js');
      const startTime = performance.now();
      while (!window.MayaVRM?.loaded && !window.MayaVRM?.failed) {
        if (performance.now() - startTime > 45000) throw Error('3D VRM renderer initialization exceeded 45 seconds.');
        await new Promise(resolve => setTimeout(resolve,220));
      }
      if (window.MayaVRM.failed) throw Error(window.MayaVRM.lastError || '3D loader could not render the VRM model.');
      window.MayaVRM.setVisible(true);
      info('loaded','Real VRM mesh and animation initialized.');
    } catch (err) {
      info('failed', err?.message || String(err));
      const notice = byId('notice');
      if (notice) notice.textContent = 'Real 3D did not start: ' + (err?.message || err) + '. Old Orb is available as fallback.';
    }
  }
  window.addEventListener('maya-vrm-failed',e => {
    const reason=e?.detail || 'VRM model or WebGL rendering failed.';
    info('failed',String(reason));
  });
  window.addEventListener('maya-vrm-loaded',() => info('loaded','Real 3D model is active.'));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();