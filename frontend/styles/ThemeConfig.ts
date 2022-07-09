import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#FAFAFA",
  text: "#363537",
  toggleBorder: "#FFF",
  background: "#363537",
  header: "#000",
};

export const darkTheme = {
  body: "#363537",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  background: "#999",
  header: "#FF8200",
};

export const GlobalStyles = createGlobalStyle<any>`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  h1 {
    color: ${({ theme }) => theme.header};
  }
`;
