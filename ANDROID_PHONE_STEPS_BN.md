# MYRAA AI Assistant — Android ফোনে APK বানানো

**Project owner of original contributions:** Tanim Boss  
**GitHub repository:** https://github.com/tanimgaming31-ops/2026-11-07-maya

## একবার সোর্স ZIP আপলোড করলেই Build শুরু হবে

1. এই ChatGPT কথোপকথন থেকে `MYRAA_GitHub_Android_Build_Ready_Tanim_Boss.zip` ফাইলটি **Android ফোনে ডাউনলোড করো**।
2. Chrome-এ এই লিংক খোলো: https://github.com/tanimgaming31-ops/2026-11-07-maya/upload/main
3. GitHub-এ লগইন করা থাকতে হবে। প্রয়োজন হলে Chrome-এর **Desktop site** চালু করো।
4. **Choose your files** চাপ দিয়ে ডাউনলোড করা ZIP ফাইলটি নির্বাচন করো। ফাইলটি **unzip না করে**, নাম পরিবর্তন না করে আপলোড করো।
5. **Commit changes** চাপো। GitHub Actions স্বয়ংক্রিয়ভাবে বিল্ড শুরু করার জন্য সেট করা আছে।
6. এই লিংক খোলো: https://github.com/tanimgaming31-ops/2026-11-07-maya/actions
7. **MYRAA Android APK**-এর সর্বশেষ রান সবুজ হলে সেটিতে চাপ দাও।
8. **Artifacts → MYRAA-Android-APK** ডাউনলোড করো। প্রাপ্ত artifact ZIP extract করে APK ইনস্টল করো।

### যদি Build Failed দেখায়

- বর্তমান রিপোজিটরিতে সোর্স ZIP না থাকলে Build ব্যর্থ হওয়ার কথা। ZIP আপলোডের পর নতুন রান পরীক্ষা করো।
- Build সফল না হলে সর্বশেষ রান খুলে ব্যর্থ step-এর log দেখতে হবে।
- 3D মডেল এই public-source ZIP-এ নেই; নতুন build-এ 3D চরিত্র থাকবে না।
- অ্যাপের সব ফিচার বাস্তবে কাজ করছে এমন প্রমাণ পাওয়া যায়নি। API ও মোবাইল অনুমতি পরীক্ষা করতে হবে।

### গুরুত্বপূর্ণ নিরাপত্তা

এই GitHub রিপোজিটরি বর্তমানে Public। ফাইল আপলোড করার সঙ্গে সঙ্গে অন্যরা ZIP কপি করতে পারবে। পরে Private করলেও আগের কপি ফেরত নেওয়া যাবে না। তোমার সৃষ্ট কোডের স্বত্ব আলাদা, কিন্তু source-এ থাকা MIT লাইসেন্স ও third-party asset শর্তও বহাল।

**APK-তে পুরোনো 3D মডেলের redistribution অধিকার নেই।** পুরোনো APK Public GitHub-এ আপলোড করো না। Gemini API key, পাসওয়ার্ড, ব্যক্তিগত ডেটাও কখনো আপলোড করবে না।

**WhatsApp যোগাযোগ:** [+971 55 512 4483](https://wa.me/971555124483?text=Hello%20Tanim%20Boss%2C%20I%20want%20to%20request%20MYRAA%20AI%20Assistant%20access.)
