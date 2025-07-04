import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme

export const HeaderContainer = styled.header`
	background: ${theme.cores.white};
	padding: 0.875rem;
	width: 95%;
	margin: 0 auto;
	border-radius: 30px;
	margin-top: 1rem;

	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`;

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

		button {
			color: ${theme.cores.black};
			text-decoration: none;
			font-weight: 500;

			/* alinhar icone ao texto */
			display: flex;
			align-items: center;
			gap: 0.5rem;

			transition: 0.5s;

			&:hover {
				color: ${theme.cores.purple_info_primary};
				/* border-bottom: 1px solid ${theme.cores.purple_info_primary}; */
			}
		}
	}
`;
