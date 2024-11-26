import styled from "styled-components";

export const HeaderContainer = styled.header`
    background: ${props => props.theme.cores.light_white};
    padding: 0.875rem;
    width: 95%;
    margin: 0 auto;
    border-radius: 30px;
    margin-top: 1rem;

    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`

export const HeaderContent = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    nav ul {
        list-style: none;
        display: flex;
        gap: 5rem;
        align-items: center;


        a{
            color: ${props => props.theme.cores.black};
            text-decoration: none;
            font-weight: 500;
            
            transition: 0.5s;

            &:hover{
                color: ${props => props.theme.cores.purple_info_primary};
                font-size: 1.1rem;
            }
        }
    }


`