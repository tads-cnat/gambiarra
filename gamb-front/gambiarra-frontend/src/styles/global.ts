import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${props => props.theme.white};
        color: ${props => props.theme.black};

    }

    body, input, button, textarea {
        font-family: 'Poppins', sans-serif;
    }
`