# Steady
This is an app designed to help people who are in need of help globally.

## Developer Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- No global install needed — Expo is run via `npx expo` (included in project dependencies)

### Running the App

#### On macOS (iOS + Android)
```bash
npx expo start
```
Then press `i` for iOS simulator or `a` for Android emulator.

#### On Windows or Linux (Android only)
iOS development requires macOS because Xcode — Apple's iOS build tool — only runs on macOS. If you are on Windows or Linux and see an error like:

```
Error: Command failed: open https://apps.apple.com/us/app/id497799835
```

This means Expo is trying to open the Mac App Store to install Xcode, which is not possible on your operating system. To avoid this error, target Android only:

```bash
npx expo start --android
```

Or run a web preview:
```bash
npx expo start --web
```

#### Building for iOS from Windows (EAS Build)
To build and test on real iOS devices from a Windows machine, use [Expo Application Services (EAS) Build](https://docs.expo.dev/build/introduction/), which runs builds in the cloud on Apple hardware:

```bash
npm install -g eas-cli
eas build --platform ios
```

### Why iOS Needs macOS
Apple requires that all iOS apps be compiled using Xcode, which is only available on macOS. This is an Apple platform restriction, not an Expo or project limitation. Windows and Linux developers can still contribute to the shared JavaScript/TypeScript code, run Android builds locally, and use EAS Build for cloud iOS builds.
