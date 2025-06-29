import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme

export const PageLine = styled.div`
    background-color: ${theme.cores.white};
    display: flex;
    height: 66px;
    align-items: flex-start;
    justify-content: space-between;
    align-items: center;

    border-radius: 0px 0px 8px 8px;
    border-right: 1px solid ${theme.cores.gray_light};
    border-bottom: 1px solid ${theme.cores.gray_light};
    border-left: 1px solid ${theme.cores.gray_light};

    padding: 10px;

`

export const PageCol = styled.div`
    display: flex;
    height: 66px;
    min-width: 150px;
    max-width: 350px;
    max-height: 200px;
    padding: 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    font-weight: 600;

    border-bottom: 1px solid var ${theme.cores.gray_light};

`