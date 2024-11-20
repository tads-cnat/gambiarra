import styled from "styled-components";

export const FooterContainer = styled.footer`
	background: ${(props) => props.theme["white"]};
    padding: 3rem 4.5rem;
    


    .copyright {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid ${props => props.theme['gray-300']};
        padding-top: 2rem;
    }
    div ul {
        list-style: none;
        display: flex;
        gap: 4rem;
        a{
            color: ${props => props.theme['black']};
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
            color: ${props => props.theme['black']};
            text-decoration: none;

            &:hover{
                color: ${props => props.theme['purple-info-primary']};
                border-bottom: 1px solid ${props => props.theme['purple-info-primary']};
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
    variant === "verde" ? theme["green-sucess-primary"] : theme["white"]};
  color: ${({ variant, theme }) =>
    variant === "verde" ? theme["white"] : theme["black"]};
  border: ${({ variant, theme }) =>
    variant === "verde" ? "none" : `1px solid ${theme["black"]}`};

  &:hover {
    background-color: ${({ variant, theme }) =>
      variant === "verde" ? theme["green-sucess-primary"] : theme["gray-100"]};
    color: ${({ variant, theme }) =>
      variant === "verde" ? theme["white"] : theme["black"]};
  }
`;
