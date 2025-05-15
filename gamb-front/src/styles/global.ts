import { createGlobalStyle } from "styled-components";
import { defaultTheme } from "./themes/default";
const theme = defaultTheme

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        font-weight: ${theme.fontWeights.regular};


    }

    body {
        background-color: ${theme.cores.white};
        color: ${theme.cores.gray_text};
    }
    

    .icon-dark{
        color: ${theme.cores.gray_text};
        size: 22px;
    }

    .icon-light {
        color: ${theme.cores.white};

    }
    h1 {
        font-size: ${theme.fontSize.font_scale_up_07}rem;
        color: ${theme.cores.gray_500};
    }
  
`;
