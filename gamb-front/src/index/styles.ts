import styled from "styled-components";

export const IndexContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	/* background-color: ${(props) => props.theme.cores.white}; */

	h2 {
		font-size: 2rem;
		span {
			color: ${(props) => props.theme.cores.purple_info_primary};
			font-weight: ${(props) => props.theme.fontWeights.bold};
		}
	}
`;

export const MarcaGrafica = styled.div`
	margin: 2rem 0;
`;
export const IndexContent = styled.div`
	display: flex;
	padding: 50px;
	background: ${(props) => props.theme.cores.white};
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
		gap	: 20px;
	}

	p {
		width: 500px;
	}
	span {
		font-size: 1.5rem;
		color: ${(props) => props.theme.cores.purple_info_primary};
		font-weight: ${(props) => props.theme.fontWeights.bold};
	}
`;
