# MYRAA AI Assistant — Android (Tanim Boss)

**Application:** MYRAA AI Assistant  
**Original Creator of independently created contributions:** Tanim Boss  
**Contact for access requests:** [+971 55 512 4483 on WhatsApp](https://wa.me/971555124483?text=Hello%20Tanim%20Boss%2C%20I%20would%20like%20to%20request%20permission%20for%20MYRAA%20AI%20Assistant.)

## Android phone: source ZIP → APK

This repository is the upload/build workspace for MYRAA. **It does not yet contain the complete uploaded source or a verified new APK.** The source ZIP must be provided before a new APK can be built.

1. Download `MYRAA_GitHub_Android_Build_Ready_Tanim_Boss.zip` from your ChatGPT conversation onto your Android phone.
2. Open this repository in Chrome on Android (enable **Desktop site** if needed). Use **Add file → Upload files** to upload that **one ZIP file into the repository root**. Do not rename it.
3. Go to **Actions → MYRAA Android APK → Run workflow**.
4. If the run succeeds, open it and download the **MYRAA-Android-APK** artifact (a ZIP); extract it and install the APK on the phone.

The workflow will extract the source ZIP in the runner and attempt to build with Node.js, Java 21, and Android SDK 35. The current source export excludes the third-party 3D character model, so its absence must not be represented as a working 3D avatar. A successful APK build and real phone test are **not yet verified**.

### Important rights and privacy

- This repository is currently **public**. Anyone can view and copy public files, including the ZIP once uploaded. Changing it to private later cannot recall downloaded copies.
- The existing source licence is MIT with notices preserved. An owner's name does not revoke existing MIT permissions or rights in third-party libraries.
- The earlier personal-use APK included a third-party character model with redistribution restrictions. **Do not upload that APK to this public repository** without redistribution permission.
- No Gemini API key, token, personal memories, or other credentials should ever be committed. Enter an API key in the installed app's Settings.
- GitHub Actions may sign a newly built APK using a different temporary key. Installing over an old version may fail. Back up data before uninstalling any older app.
- WhatsApp access requests are **not** automatic code-copy protection.

[Request permission on WhatsApp](request-access.html) · [Access request instructions](REQUEST_ACCESS.md)

© attribution is not used as a claim of third-party code ownership. See the source ZIP's `LICENSE` and `THIRD-PARTY-NOTICES.md` after upload.
