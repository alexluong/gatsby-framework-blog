const colors = {
  primary: "#d02e77",
  primaryLight: "#d54284",
  black: "#000e1a",
  white: "#fff",
  grey: {
    dark: "rgba(0, 0, 0, 0.9)",
    default: "rgba(0, 0, 0, 0.7)",
    light: "rgba(0, 0, 0, 0.5)",
    ultraLight: "rgba(0, 0, 0, 0.25)",
  },
  bg: "#fff",
}

const buttons = {
  primary: {
    color: colors.white,
    backgroundColor: colors.primary,
  },
  secondary: {
    color: colors.black,
    backgroundColor: colors.secondary,
  },
}

const transitions = {
  normal: "0.5s",
}

const fontSize = {
  small: "0.9rem",
}

const fontFamily = {
  serif: `'Bitter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', serif`,
  sansSerif: `'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
}

const breakpoints = {
  tablet: "1200px",
  phone: "600px",
}

const theme = {
  colors,
  transitions,
  fontSize,
  breakpoints,
  fontFamily,
  maxWidth: "1000px",
  baseFontSize: "18px",
  buttons,
}

export default theme
