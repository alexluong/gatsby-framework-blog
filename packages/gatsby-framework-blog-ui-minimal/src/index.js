import React from "react"
import { ThemeProvider } from "styled-components"
import GlobalStyle from "./components/GlobalStyle"
import theme from "./config/theme"

function Main({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        {children}
      </React.Fragment>
    </ThemeProvider>
  )
}

export default Main
