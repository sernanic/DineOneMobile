/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';





const Colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  text: '#2c3e50',
  accent: '#e74c3c',
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  lightGrey: '#FCF8FF',
  grey: '#EEE9F0',
  medium: '#9F9AA1',
  mediumDark: '#424242',
  green: '#437919',
  // Add more colors as needed
};

export default Colors;