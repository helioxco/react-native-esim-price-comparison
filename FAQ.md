## FAQ

### 1. Why do I choose Expo rather than React Native CLI?
Expo’s managed workflow lets me push OTA updates without waiting on app store reviews, so bug fixes and content tweaks reach users immediately. Combined with instant device testing through Expo Go, I can iterate far faster than wiring up native builds in Xcode or Android Studio every time I tweak the UI.

### 2. You get the data from JSON. Why do I choose JSON rather than XLSX to display data?
JSON is lightweight, human-readable, and natively supported in JavaScript, so I can import it directly without extra parsing libraries. XLSX would require heavier dependencies, manual schema conversions, and can bloat the bundle, whereas JSON keeps the data source simple and diff-friendly in git.

### 3. Why do I choose `react-native-element-dropdown`?
`react-native-element-dropdown` offers ready-made dropdown UX that matches native expectations, supports search/multi-select out of the box, and plays nicely with Expo. Its TypeScript types and theming hooks reduce custom boilerplate and keep the UI consistent across screens.

### 4. Why do I choose `react-native-ico-flags` instead of https://flagicons.lipis.dev/?
The Lipis flag icons are optimized for web projects that expect HTML, CSS classes, and remote asset loading, so I’d need a WebView or custom asset pipeline to make them work natively—adding extra weight and latency, especially offline. `react-native-ico-flags` already exposes each flag as a React Native component, slots into the Expo bundle, and keeps rendering purely native, so it’s both simpler to integrate and more reliable in production.

### 5. Why do I use Expo Vector Icons?
I import Expo Vector Icons inside `components/ui/icon-symbol.tsx` to render the tab bar symbols in `app/(tabs)/_layout.tsx`. They ship with the Expo SDK, so the icons are already linked, render crisply across platforms, and let me swap in Material or SF Symbols mappings without juggling extra native dependencies.

