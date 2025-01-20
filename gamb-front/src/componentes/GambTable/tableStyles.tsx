import styled from "styled-components";

export const HeadTr = styled.tr`
	display: flex;
	height: 66.4px;
	align-items: flex-start;
	align-self: stretch;
	background: ${(props) => props.theme.cores.white};
`;

export const HeadTh = styled.th`
	display: flex;
	height: 66px;
	min-width: 200px;
	max-width: 350px;
	max-height: 200px;
	padding: 20px;
	align-items: center;
	gap: 10px;
	font-weight: 600;
`;


export const BodyTr = styled.tr`
	display: flex;
	height: 66.4px;
	align-items: flex-start;
	align-self: stretch;
	background: ${(props) => props.theme.cores.white};

	border-bottom: 1px solid ${(props) => props.theme.cores.gray_light};
	background: #fff;
`;

export const BodyTd = styled.td`
display: flex;
min-width: 200px;
max-width: 350px;
padding: 20px;
align-items: center;
gap: 10px;
align-self: stretch;
`;
