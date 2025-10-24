import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DataProvider } from "@/contexts/DataContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </ThemeProvider>
  );
}
