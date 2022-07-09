import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../styles/ThemeConfig";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
