NexLook Mobile (scaffold)

This is a minimal Expo scaffold created to start migrating `nexlookAPP` to React Native.

Setup

1. Install Expo CLI if you don't have it:

```bash
npm install -g expo-cli
```

2. From this folder, install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run start
```

Notes

- Recommended additional installs after `npm install`:
  - `npx expo install react-native-screens react-native-safe-area-context`
  - `npm install @react-navigation/native @react-navigation/native-stack`
  - `npx expo install @expo/vector-icons expo-image-picker`
- I migrated simple versions of `Home`, `Login` and `Register`. Next steps: port `Wardrobe`, image upload, and reuse context/hooks from the web app.
