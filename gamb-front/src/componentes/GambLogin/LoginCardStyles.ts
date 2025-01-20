import styled from "styled-components";

export const Card = styled.div`
    width: 450px;
    padding: 50px;
    margin: 4rem 0;

    border-radius: 30px;
    border: 1px solid var(--linear, #FFF);
    background: #FFF;
    box-shadow: 0px 0px 30px 1px rgba(67, 56, 202, 0.25);

`;

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`;

export const CardButtonArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;