import styled from "styled-components";

export const SidebarContainer = styled.aside`
	background-color: ${(props) => props.theme.cores.white};
	width: 100%;
	border-radius: 30px;
	box-shadow: 5px 5px 10px 5px rgba(54, 54, 54, 0.1);
	height: 100%;
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
				border-bottom: 1px solid
					${(props) => props.theme.cores.gray_300};
			}
		}
	}

	div > .gambi-img {
		padding: 2rem;
		border-bottom: 1px solid ${(props) => props.theme.cores.gray_300};
	}

	.buttons-conj {
		margin-top: 1.5rem;
		display: flex;
		gap: 1rem;
		padding-bottom: 2rem;
	}
`;
