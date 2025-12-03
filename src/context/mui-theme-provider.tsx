import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { useTheme } from "./theme-provider";

export function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode: resolvedTheme === "dark" ? "dark" : "light",
      primary: {
        main: resolvedTheme === "dark" ? "#4f9cff" : "#1976d2",
      },
      secondary: {
        main: resolvedTheme === "dark" ? "#ff8a4f" : "#d23f31",
      },

      background: {
        default: resolvedTheme === "dark" ? "#0f172a" : "#f5f5f5",
        paper: resolvedTheme === "dark" ? "#060e2a" : "#ffffff",
      },

      text: {
        primary: resolvedTheme === "dark" ? "#f1f5f9" : "#1e293b",
        secondary: resolvedTheme === "dark" ? "#94a3b8" : "#4b5563",
      },
    },
   
  });

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}

