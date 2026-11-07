# MYRAA AI Assistant — Android

**Application:** MYRAA AI Assistant  
**Original creator of independently owned contributions:** Tanim Boss  
**WhatsApp access requests:** [+971 55 512 4483](https://wa.me/971555124483?text=Hello%20Tanim%20Boss%2C%20I%20would%20like%20to%20request%20permission%20for%20MYRAA%20AI%20Assistant.)

## Android APK — build successful ✅

[**Download the MYRAA Pink + Real 3D Android APK artifact**](https://github.com/tanimgaming31-ops/2026-11-07-maya/actions/runs/42389836953) (GitHub login may be required).  
Open the run, select **MYRAA-Android-APK** under Artifacts, download the ZIP, extract its APK and install it on Android.

**Build verification (2026-11-07):** Node.js/Vite, Java 21, Android SDK 35, APK build, APK signing, static JavaScript syntax checks, 3D asset hash checks, signed APK inclusion checks and artifact upload all passed in GitHub Actions. This does **not** establish successful 3D rendering or voice features on the user's physical Android phone.

[**Complete updated MYRAA source ZIP (377 entries)**](MYRAA_Theme_Studio_Source_Tanim_Boss.zip) · [**Interactive Theme Studio design preview**](theme-studio.html) · [**Build workflow**](.github/workflows/myraa-android-apk.yml)

## What the new design does

- Animated touch-controlled particle Orb (rotate, move, zoom, pulse, pause motion).
- Eight color themes: Crimson Red, Rose Pink, Violet Purple, Electric Blue, Emerald Green, Golden Sun, Sky Blue and Neon Magenta.
- Nine CSS-based environment styles, including Cyber, Garden, Moonlight, Golden Horizon and Emerald Lounge.
- Concept gallery with **14 image previews** representing the previous character and Orb designs.
- Saves the chosen visual preferences locally on the phone.
- Local text theme command parser and optional Gemini Live transcription-triggered commands for several common languages. Live voice reliability requires Android device testing.
- Existing chat, Gemini access, memory-related sources and Android action code retained.

**Restored 3D character:** The APK build now includes a real, rigged `maya.vrm` humanoid model from the user's verified 2026-10-31 Maya 3D backup. Build time fetching is pinned to the original historical repository commit and SHA-256 checked. It includes procedural breathing, blinking, head motion, hair physics and real mesh rotation/move/zoom. The pink reference image remains a fallback and is **not** a live 3D rig. The VRM is VRoid Project's **AvatarSample_A**, not exclusively original Tanim Boss artwork; see [restored 3D notices](RESTORED_3D_NOTICES.md). The static preview and the restored VRM may look different. **Voice lip sync and dress-up are not connected; real phone functionality remains unverified.**

## Rebuild APK from GitHub

1. Open [Actions](https://github.com/tanimgaming31-ops/2026-11-07-maya/actions).
2. Select **MYRAA Android APK** and press **Run workflow** to rebuild the main branch with restored 3D.
3. Open a successful run (main or the tested restoration branch), download the **MYRAA-Android-APK** artifact and extract the APK.

The workflow uses a SHA-256 verified source ZIP, Windows build tools, and a temporary debug signing key. **A new signing key may prevent updating over an older installed APK.** Back up locally stored conversation history and other app data before uninstalling an older installation. Keep your Gemini API key private.

## Rights and privacy

This repository is currently **public**; anyone can clone or download the source ZIP. Making it private later will not revoke already downloaded copies.

Previously MIT-licensed portions remain under MIT, and third-party code and characters retain their respective rights. Original creator declarations do not remove existing license permissions or create automatic copy protection. **Do not upload the earlier personal-use APK containing the restricted character model to public GitHub.**

[Request access by WhatsApp](request-access.html) · [Access instructions](REQUEST_ACCESS.md) · [Ownership notice](OWNERSHIP.md) · [License](LICENSE).
