import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme

export const IndexContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	/* background-color: ${theme.cores.white}; */
	h2 {
		font-size: 2rem;
		margin-top: 1.5rem;
		span {
			font-size: 2rem;
			color: ${theme.cores.purple_info_primary};
			font-weight: ${theme.fontWeights.bold};
		}
	}

	h3 {
		font-size: 1.5rem;
		span {
			font-size: 1.5rem;
			color: ${theme.cores.purple_info_primary};
			font-weight: ${theme.fontWeights.semi_bold};
		}
	}

	.img-fluid {
		width: 25rem;
	}

	.roboebotao {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: end;
	}
`;

export const MarcaGrafica = styled.div`
	margin: 2rem 0;
`;

export const IndexContent = styled.div`
	display: flex;
	padding: 50px;
	width: 75%;
	background: ${theme.cores.white};
	justify-content: space-between;
	align-items: center;

	border-radius: 30px;
	box-shadow: 0px 0px 30px 1px rgba(67, 56, 202, 0.25);

	.apresentacao {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 27px;
	}

	.bottoes {
		display: flex;
		gap: 20px;
	}

	p {
		width: 500px;
	}

	span {
		font-size: 1.5rem;
		color: ${theme.cores.purple_info_primary};
		font-weight: ${theme.fontWeights.bold};
	}
`;

export const CardContainer = styled.div`
	display: grid;
	//grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); eu sei lá
	grid-template-columns: repeat(2, 1fr);

	gap: 20px;
	padding: 20px;
`;
