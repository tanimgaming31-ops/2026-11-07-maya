# Restored 3D Maya: provenance and usage

## Source and integrity

Restored from the user-supplied `Maya-Original-3D-Backup.zip` and matching historical GitHub branch `tanimgaming31-ops/Maya-2026-10-19@220f5444cae89c12d4fb493ead3463a3ba6d4cc3`.
The build downloads byte-identical files from that pinned commit and validates SHA-256 checksums.

- `maya.vrm` (13,100,408 bytes): VRM 0.0 humanoid named **AvatarSample_A**.
- Embedded VRM metadata lists **VRoid Project** as author, NOT Tanim Boss.
- Humanoid bones: 54; spring physics groups: 10; expressions include Blink and vowel shapes. No authored animation clips in the file.
- Runtime animates breathing, blinking, subtle head motion and physics procedurally. Existing live speech is not yet connected to mouth visemes; do not claim working lip sync.
- 3D rotate, move, zoom and reset are real mesh/camera operations when WebGL succeeds.
- A static character image and the original orb remain as fallbacks if 3D fails.

## License and permissions

The VRM metadata links to VRoid Hub usage conditions that allow third-party use, commercial use, alteration and redistribution. VRoid's official AvatarSample_A license clarifies that copyright is **not waived (not CC0)**, redistribution for a fee is prohibited, and character-creation services are restricted.

- https://vroid.pixiv.help/hc/en-us/articles/4402394424089-VRoidPreset-A-Z
- https://hub.vroid.com/en/license?allowed_to_use_user=everyone&characterization_allowed_user=everyone&corporate_commercial_use=allow&credit=unnecessary&modification=allow&personal_commercial_use=profit&redistribution=allow&sexual_expression=allow&version=1&violent_expression=allow

Do not represent the VRoid Project's model as exclusively owned original IP. The GitHub public build artifact distributes the restored VRM at no charge; restrictions on selling the model separately and service use continue.

Three.js (copyright Three.js Authors, MIT) and @pixiv/three-vrm (copyright pixiv Inc., MIT) and their bundled runtime retain upstream license notices. The original project core and Memory Packs were not altered.

## Tests

GitHub Actions signing/build is a code and CI test, not proof of functionality on a real Android device. Test rendered VRM, rotating, dragging, zoom, blink/breathing, WebGL fallback, voice calls, Memory Packs, notifications, and app restart on the owner's phone.
