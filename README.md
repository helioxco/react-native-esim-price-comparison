# React Native eSIM Price Comparison App

A cross-platform mobile application built with **React Native** and **Expo** that lets users browse, compare, and select **eSIM data plans** across **100+ countries**. Compare eSIM prices by country, data size, and validity period — all in one place.

## Features

- **Country selector** with flag icons for 100+ countries
- **Data plan comparison** — filter by size (500 MB to 10 TB) and validity (1–30 days)
- **Real-time price display** in USD
- **Device compatibility checker**
- **Dark mode** support (automatic)
- Cross-platform: **iOS**, **Android**, and **Web**

## Screenshots

<!-- Add your screenshots here -->

## Tech Stack

| Technology | Purpose |
|---|---|
| [React Native](https://reactnative.dev/) | Cross-platform mobile framework |
| [Expo](https://expo.dev/) (SDK 54) | Managed workflow, OTA updates |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based routing & navigation |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [react-native-element-dropdown](https://github.com/hoaphantn7604/react-native-element-dropdown) | Searchable country dropdown |
| [react-native-ico-flags](https://github.com/nicholasbraun/react-native-ico-flags) | Native country flag icons |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

```bash
git clone https://github.com/helioxco/react-native-esim-price-comparison.git
cd react-native-esim-price-comparison
npm install
```

### Run the App

```bash
npx expo start
```

Then open the app on:
- [Expo Go](https://expo.dev/go) (scan QR code)
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)

## Project Structure

```
app/
  (tabs)/
    index.tsx           # Main eSIM plan selector screen
    explore.tsx         # Info screen
    _layout.tsx         # Tab navigation layout
components/
  parallax-scroll-view.tsx
  themed-text.tsx
  themed-view.tsx
  ui/
    icon-symbol.tsx     # Tab bar icons (Expo Vector Icons)
constants/
  data.json             # eSIM pricing data (100+ countries)
  theme.ts              # Design tokens
hooks/
  use-color-scheme.ts
  use-theme-color.ts
```

## FAQ

### Why Expo instead of React Native CLI?

Expo's managed workflow enables OTA (over-the-air) updates without app store reviews, so bug fixes and content changes reach users immediately. Combined with instant device testing through Expo Go, the development cycle is significantly faster than configuring native builds in Xcode or Android Studio.

### Why JSON instead of XLSX for pricing data?

JSON is lightweight, human-readable, and natively supported in JavaScript — it can be imported directly without parsing libraries. XLSX would add heavier dependencies, require schema conversions, and bloat the bundle. JSON also stays clean and diff-friendly in version control.

### Why `react-native-element-dropdown`?

It provides a production-ready dropdown component with search and multi-select support out of the box. It integrates seamlessly with Expo, offers TypeScript types, and supports theming — reducing boilerplate while keeping the UI consistent.

### Why `react-native-ico-flags` instead of web-based flag libraries?

Web-oriented flag libraries (like Lipis flag icons) rely on HTML, CSS classes, and remote asset loading, requiring a WebView or custom asset pipeline in React Native. `react-native-ico-flags` exposes each flag as a native React Native component that bundles with the app and works reliably offline.

### Why Expo Vector Icons?

Expo Vector Icons ship with the Expo SDK — no additional native linking needed. They render crisply across platforms and support Material Icons and SF Symbols mappings, making it easy to match platform conventions.

## License

This project is for educational and portfolio purposes.

## Keywords

react native, esim, esim price comparison, esim data plans, esim pricing app, mobile data plans, international esim, travel esim, expo app, react native expo, esim selector, compare esim prices, esim plans by country
