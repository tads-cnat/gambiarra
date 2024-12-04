import styled from "styled-components";

export const DashboardContainer = styled.aside`
    display: flex;
`

export const DashboardContent = styled.aside`
    background-color:${props => props.theme.cores.purple_info_primary};
    width: 75%;
    margin-left: 30%;
    border-radius: 30px;
    margin-right: 2rem;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    padding-bottom: 1rem;
`