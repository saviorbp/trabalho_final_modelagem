import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { md3 } from 'vuetify/blueprints'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#00e04f",
    primaryVariant: "#02c209",
    secondary: "#BBD979",
    secondaryVariant: "#00e04f",
    background: "#cbcbcb",
    surface: "#e0e0e0",
    error: "#ce0000",
    onPrimary: "#176D45",
    onSecondary: "#e5e5e5",
    onBackground: "#000000",
    onSurface: "#176D45",
    onError: "#ce0000",
  }
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#02c209",
    primaryVariant: "#00e04f",
    secondary: "#BBD979",
    secondaryVariant: "#02c209",
    background: "#303030",
    surface: "#3f3f3f",
    error: "#fa0000",
    onPrimary: "#0B3320",
    onSecondary: "#000000",
    onBackground: "#FFFFFF",
    onSurface: "#0B3320",
    onError: "#fa0000",
  }
}

export default createVuetify({
  display: {
    mobileBreakpoint: 'md',
  },
  blueprint: md3,
  defaults: {
    VTextField: {
      variant: 'outlined',
    },
    VSelect: {
      variant: 'outlined',
    },
    VTextarea: {
      variant: 'outlined',
    },
    VAutocomplete: {
      variant: 'outlined',
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
})