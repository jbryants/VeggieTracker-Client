import React from "react";
import Header from "./Header";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

export default ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");

  const theme = React.useMemo(
    () =>
      createMuiTheme(
        prefersDarkMode
          ? {
              palette: {
                type: "dark",
                primary: {
                  main: "#90caf9",
                },
                secondary: {
                  light: "#f6a5c0",
                  main: "#f48fb1",
                },
              },
            }
          : {
              type: "light",
            }
      ),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {/* <Header /> */}
        {children}
      </div>
    </ThemeProvider>
  );
};
