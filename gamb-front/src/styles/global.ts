import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        font-weight: $font-weight-light;


    }

    body {
        background-color: ${(props) => props.theme.cores.light_white};
        color: ${(props) => props.theme.gray_text};
    }
    .icon-dark{
        color: ${(props) => props.theme.gray_text}  !important;
    }
    .icon-ligth {
        color: ${(props) => props.theme.white}  !important;
    }
`;
