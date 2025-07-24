import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme

export const SidebarContainer = styled.aside<{ collapsed?: boolean }>`
	background-color: ${theme.cores.white};
	width: ${(props) => (props.collapsed ? "80px" : "100%")};
	border-radius: 30px;
	box-shadow: 5px 5px 10px 5px rgba(54, 54, 54, 0.1);
	height: 100%;
	transition: width 0.3s ease;
`;


export const SidebarBody = styled.div`
	height: 100vh;
	padding: 2rem 0rem 2rem 1rem;
`;
export const User= styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 1rem;
	img{
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}
`


export const UserSpace = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 1rem 0;
`;

export const ItemDropdown = styled.ul`
  background-color: ${theme.cores.light_white};
  overflow: hidden;
  width: auto;

  a {
    font-size: ${theme.fontSize.font_scale_up_02}rem; /* Remover o ponto e vírgula extra */
	color: ${theme.cores.gray_text};
  }
`;

export const SidebarContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 1.25rem;
	height: 100%;
	padding: 0 20px;
	ul {
		display: flex;
		gap: 1rem;
		flex-direction: column;

		a {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			&:hover {
				border-left: 1px solid
					${theme.cores.purple_info_primary};
				color: ${theme.cores.purple_info_primary};
			}
			padding: 0.5rem;

		}
	}

	div > .gambi-img {
		padding: 1rem;
		border-bottom: 1px solid ${theme.cores.gray_300};
		width: 100%;
		transition: all 0.5s ease;
	}


	.buttons-conj {
		margin-top: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-bottom: 2rem;
	}


	div > .collapsed-img {
		padding: 1rem;
		border-bottom: 1px solid ${theme.cores.gray_300};
		width: 100%;
		transition: all 0.5s ease;

`;
