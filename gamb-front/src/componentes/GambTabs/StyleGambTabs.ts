import styled from "styled-components";

export const TabsContainer = styled.div`
	display: flex;
	border-bottom: 1px solid #e5e7eb;
	justify-content: space-between;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
	padding: 10px 16px;
	font-size: 14px;
	font-weight: 500;
	border: none;
	background: none;
	color: ${(props) => (props.$isActive ? "#10B981" : "#6B7280")};
	border-bottom: ${(props) =>
		props.$isActive ? "2px solid #10B981" : "none"};
	cursor: pointer;
	transition: color 0.2s, border-bottom 0.2s;

	&:hover {
		color: #10b981;
	}
`;
