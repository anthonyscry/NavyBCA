# Android APK (Offline App) Guide

This folder contains a minimal Android wrapper app that loads the offline HTML bundle from the app assets. The website itself is unchanged.

## Build the APK (Android Studio)

1. Install **Android Studio**.
2. Open **File → Open…** and select the `android-app` folder.
3. Let Android Studio **sync Gradle** (it will prompt you if the Gradle wrapper is missing and offer to generate it).
4. Build a debug APK via **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
5. Android Studio will show a notification with **“Locate”**. Use that to find the APK.

> If Android Studio prompts to update the Gradle wrapper, accept the prompt. The project uses Android Gradle Plugin 8.5.x.

## Install the APK (Allow “Unknown Apps”)

On most Android phones, you have to allow installs from the app you use to open the APK (Chrome, Files, Gmail, etc.).

1. On your phone, open **Settings → Apps**.
2. Tap the app you’ll use to open the APK (e.g., **Chrome** or **My Files**).
3. Tap **Install unknown apps** (or **Install unknown apps from this source**) and turn it **On**.
4. Open the APK file and confirm **Install**.

## Where the offline file lives

The offline HTML is bundled at:

`android-app/app/src/main/assets/offline.html`

If you update `offline.html` in the repo, re-copy it to the assets folder before rebuilding.

## Offline page link

The Offline Mode page links to this guide from an Android badge. Once you have a hosted APK, update the link in
`offline.html` to point directly to your `.apk` file.
