/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#D64D2E';
const tintColorDark = '#fff';

const Colors = {
  primary: '#D64D2E',
  secondary: '#2B4D40',
  background: '#FAFAFA',
  text: '#2C2C2C',
  accent: '#E9B44C',
  light: {
    text: '#2C2C2C',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#686868',
    tabIconDefault: '#686868',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#1A1A1A',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  lightGrey: '#F5F5F5',
  grey: '#E5E5E5',
  medium: '#686868',
  mediumDark: '#484848',
  green: '#2B4D40',
};

export default Colors;