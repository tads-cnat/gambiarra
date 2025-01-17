import styled from "styled-components";

export const DashboardContainer = styled.aside`
	display: flex;
	height: 100vh;

	gap: 0.5rem;
`;

export const DashboardMain = styled.main`
	overflow-y: auto;
	padding: 2rem 0.5rem;
	width: 100%;

`;

export const DashboardContent = styled.aside`
	min-height: 100%; 
	border-radius: 30px;
	box-shadow: 5px 5px 10px 5px rgba(54, 54, 54, 0.1);
	padding: 2rem;
	background: #f8f8f8;

	background: linear-gradient(white, white) padding-box,
		linear-gradient(
				-30deg,
				rgba(255, 255, 255, 1) 7%,
				#79e546 7%,
				#79e546 19%,
				rgba(255, 255, 255, 1) 19%,
				rgba(255, 255, 255, 1) 27%,
				rgba(67, 56, 202, 1) 27%,
				rgba(67, 56, 202, 1) 39%,
				rgba(252, 252, 252, 1) 39%,
				rgba(252, 252, 252, 1) 61%,
				#79e546 61%,
				#79e546 81%,
				rgba(255, 255, 255, 1) 81%
			)
			border-box;
	border: 1px solid transparent;
`;
