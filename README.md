# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## FAQ

### Why do I choose Expo rather than React Native CLI?
Expo’s managed workflow lets me push OTA updates without waiting on app store reviews, so bug fixes and content tweaks reach users immediately. Combined with instant device testing through Expo Go, I can iterate far faster than wiring up native builds in Xcode or Android Studio every time I tweak the UI.

### You get the data from JSON. Why do I choose JSON rather than XLSX to display data?
JSON is lightweight, human-readable, and natively supported in JavaScript, so I can import it directly without extra parsing libraries. XLSX would require heavier dependencies, manual schema conversions, and can bloat the bundle, whereas JSON keeps the data source simple and diff-friendly in git.

### Why do I choose `react-native-element-dropdown`?
`react-native-element-dropdown` offers ready-made dropdown UX that matches native expectations, supports search/multi-select out of the box, and plays nicely with Expo. Its TypeScript types and theming hooks reduce custom boilerplate and keep the UI consistent across screens.

### Why do I choose `react-native-ico-flags` instead of https://flagicons.lipis.dev/?
The Lipis flag icons are optimized for web projects that expect HTML, CSS classes, and remote asset loading, so I’d need a WebView or custom asset pipeline to make them work natively—adding extra weight and latency, especially offline. `react-native-ico-flags` already exposes each flag as a React Native component, slots into the Expo bundle, and keeps rendering purely native, so it’s both simpler to integrate and more reliable in production.

### Why do I use Expo Vector Icons?
I import Expo Vector Icons inside `components/ui/icon-symbol.tsx` to render the tab bar symbols in `app/(tabs)/_layout.tsx`. They ship with the Expo SDK, so the icons are already linked, render crisply across platforms, and let me swap in Material or SF Symbols mappings without juggling extra native dependencies.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
