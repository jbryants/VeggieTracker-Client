import React from "react";
import Header from "./Header";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

export default ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            // light: will be calculated from palette.primary.main,
            main: "#90caf9",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
          secondary: {
            light: "#f6a5c0",
            main: "#f48fb1",
            // dark: will be calculated from palette.secondary.main,
            //contrastText: "#ffcc00",
          },
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          // contrastThreshold: 3,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          //tonalOffset: 0.2,
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Header />
        {children}
      </div>
    </ThemeProvider>
  );
};
