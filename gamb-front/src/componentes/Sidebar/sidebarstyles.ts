import styled from "styled-components";

export const SidebarContainer = styled.aside`
    background-color:${props => props.theme.cores.light_white};
    width: 25%;
    height: 90vh;
    border-radius: 30px;
    margin-left: 2rem;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    padding-bottom: 1rem;
`

export const UserSpace = styled.div`
    display: flex;
    align-items: center;
`

export const SidebarContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    gap: 1.25rem;


    ul{
        display: flex;
        gap: 1rem;
        flex-direction: column;

        a{
        display: flex;
        align-items: center;

        &:hover{
            border-bottom: 1px solid ${props => props.theme.cores.gray_300};
            }
        }

    }


    img{
        padding: 3rem ;
        border-bottom: 1px solid ${props => props.theme.cores.gray_300};
    }

    .buttons-conj{
        margin-top: 1.5rem;
        display: flex;
        gap: 1rem;
        padding-bottom: 2rem;
    }

`