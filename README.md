# MYRAA AI Assistant — Android

**Application:** MYRAA AI Assistant  
**Original creator of independently owned contributions:** Tanim Boss  
**WhatsApp access requests:** [+971 55 512 4483](https://wa.me/971555124483?text=Hello%20Tanim%20Boss%2C%20I%20would%20like%20to%20request%20permission%20for%20MYRAA%20AI%20Assistant.)

## Android APK — build successful ✅

[**Download the successful MYRAA Android APK artifact**](https://github.com/tanimgaming31-ops/2026-11-07-maya/actions/runs/42360812697) (GitHub login may be required).  
Open the run, select **MYRAA-Android-APK** under Artifacts, download the ZIP, extract its APK and install it on Android.

**Build verification (2026-11-07):** Node.js/Vite, Java 21, Android SDK 35, APK build, APK signing, signature verification and upload-artifact all passed in GitHub Actions. This does **not** establish successful testing on the user's physical Android phone.

[**Complete updated MYRAA source ZIP (377 entries)**](MYRAA_Theme_Studio_Source_Tanim_Boss.zip) · [**Interactive Theme Studio design preview**](theme-studio.html) · [**Build workflow**](.github/workflows/myraa-android-apk.yml)

## What the new design does

- Animated touch-controlled particle Orb (rotate, move, zoom, pulse, pause motion).
- Eight color themes: Crimson Red, Rose Pink, Violet Purple, Electric Blue, Emerald Green, Golden Sun, Sky Blue and Neon Magenta.
- Nine CSS-based environment styles, including Cyber, Garden, Moonlight, Golden Horizon and Emerald Lounge.
- Concept gallery with **14 image previews** representing the previous character and Orb designs.
- Saves the chosen visual preferences locally on the phone.
- Local text theme command parser and optional Gemini Live transcription-triggered commands for several common languages. Live voice reliability requires Android device testing.
- Existing chat, Gemini access, memory-related sources and Android action code retained.

**Important:** The 3D character designs are currently **concept images, not functional new 3D rigs**. This public source ZIP intentionally excludes the separately licensed third-party character model. Character mode cannot show that model in this build; use Particle Orb mode.

## Rebuild APK from GitHub

1. Open [Actions](https://github.com/tanimgaming31-ops/2026-11-07-maya/actions).
2. Select **MYRAA Android APK** and press **Run workflow**.
3. Open the successful run, download the **MYRAA-Android-APK** artifact and extract the APK.

The workflow uses a SHA-256 verified source ZIP, Windows build tools, and a temporary debug signing key. **A new signing key may prevent updating over an older installed APK.** Back up locally stored conversation history and other app data before uninstalling an older installation. Keep your Gemini API key private.

## Rights and privacy

This repository is currently **public**; anyone can clone or download the source ZIP. Making it private later will not revoke already downloaded copies.

Previously MIT-licensed portions remain under MIT, and third-party code and characters retain their respective rights. Original creator declarations do not remove existing license permissions or create automatic copy protection. **Do not upload the earlier personal-use APK containing the restricted character model to public GitHub.**

[Request access by WhatsApp](request-access.html) · [Access instructions](REQUEST_ACCESS.md) · [Ownership notice](OWNERSHIP.md) · [License](LICENSE).
