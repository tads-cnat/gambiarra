import styled from "styled-components";

export const Card = styled.div`
	width: 450px;
	padding: 50px;
	margin: 4rem 0;

	border: 1px 0px 0px 0px rgba(67, 56, 202, 0.25);

	border-radius: 30px;
	/* box-shadow: 0px 0px 30px 1px rgba(67, 56, 202, 0.25); */
`;

export const CardContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 24px;
	
`;

// Botao de entrar e esqueci minha senha
export const CardButtonArea = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-center;
	gap: 24px;

	a {
		all: revert;
	}
`;

// Botoes para outras formas de login
export const OtherLoginButton = styled.div`
	display: flex;
	width: 350px;
	flex-direction: column;
	justify-content: center;
	gap: 24px;

	a {
		all: revert;
	}
`

// Aside que junta o login e a imagem
export const ContainerLogin = styled.aside`

	display: flex;
	width: 80%; /* não pega toda a tela, deixa so um espaço sobrando */
	align-items: center;
	justify-content: center;
	gap: 4rem;


	border-radius: 30px;


	box-shadow: 5px 5px 10px 5px rgba(54, 54, 54, 0.10);

	img {
		max-width: 95%;
		max-height: 95%;
  }
`
// Literalmente a linha entre a imagem e o formulario
export const Divider = styled.div`
  width: 1px;
  height: 30rem;
  background-color: #ccc; 
`;

export const DivButtons = styled.div`
	display: flex;
	gap: 10px;

`
;
