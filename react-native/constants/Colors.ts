/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    secondaryBackground: '#eee',
    ctaBackground: 'black',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    secondaryBackground: '#333',
    ctaBackground: 'white',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const textColor = {
  dark: 'white',
  light: 'black'
}
export const cardColor = {
  dark: '#333',
  light: '#eee'
}
export const backgroundColor = {
  dark: 'black',
  light: 'white'
}

export const textStyle = {
  dark: {
    color: 'white'
  },
  light: {
    color: 'black'
  }
}

export const cardStyle = {
  dark: {
    backgroundColor: '#333'
  },
  light: {
    backgroundColor: '#eee'
  }
}

export const textInputStyle = {
  dark: {
    color: 'white',
    backgroundColor: '#333'
  },
  light: {
    color: 'black',
    backgroundColor: '#eee'
  }
}
