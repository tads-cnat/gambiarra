import styled from "styled-components";

export const FooterContainer = styled.footer`
	background: ${(props) => props.theme.cores.light_white};
    padding: 3rem 4.5rem;
    


    .copyright {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid ${props => props.theme.cores.gray_300};
        padding-top: 2rem;
    }
    div ul {
        list-style: none;
        display: flex;
        gap: 4rem;
        a{
            color: ${props => props.theme.cores.black};
            text-decoration: none;
        }
    }
`;

export const FooterContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
    padding-bottom: 3rem;


    h2{
        padding-bottom: 2rem;
    }

    .buttons {
        display: flex;
        gap: 1rem;
        padding-bottom: 2rem;
    }

    .social-links{
        display: flex;
        gap: 1rem;
    }

    nav ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
        a{
            color: ${props => props.theme.cores.black};
            text-decoration: none;

            &:hover{
                color: ${props => props.theme.cores.purple_info_primary};
                border-bottom: 1px solid ${props => props.theme.cores.purple_info_primary};
            }
        }
    }
`;

interface ButtonProps {
	variant: "verde" | "branco";
}

export const FooterButton = styled.button<ButtonProps>`
	padding: 0.875rem 1.5rem;

	border-radius: 6px;
	cursor: pointer;
	border: 0;

    transition: 0.5s;

    background-color: ${({ variant, theme }) =>
    variant === "verde" ? theme.cores.green_sucess_primary : theme.cores.white};
    color: ${({ variant, theme }) =>
    variant === "verde" ? theme.cores.white : theme.cores.black};
    border: ${({ variant, theme }) =>
    variant === "verde" ? "none" : `1px solid ${theme.cores.black}`};

    &:hover {
        background-color: ${({ variant, theme }) =>
        variant === "verde" ? theme.cores.green_sucess_secondary: theme.cores.gray_100};
        color: ${({ variant, theme }) =>
        variant === "verde" ? theme.cores.white : theme.cores.black};
    }
`;
