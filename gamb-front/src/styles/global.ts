import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        font-weight: ${(props) => props.theme.fontWeights.regular};


    }

    body {
        background-color: ${(props) => props.theme.cores.white};
        color: ${(props) => props.theme.cores.gray_text};
    }
    

    .icon-dark{
        color: ${(props) => props.theme.cores.gray_text};
        size: 22px;
    }

    .icon-light {
        color: ${(props) => props.theme.cores.white};

    }
    h1 {
        font-size: ${(props) => props.theme.fontSize.font_scale_up_07}rem;
        color: ${(props) => props.theme.cores.gray_text};
    }
  
`;
