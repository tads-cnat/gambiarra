import styled from "styled-components";

export const CardIndexStyle = styled.div`
	background: white;
	border-radius: 30px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	padding: 20px;
	width: 593px;
	display: flex;
	flex-direction: column;
	gap: 10px;

	hr {
		border: none;
		border-top: 1px solid #e5e7eb;
		margin: 10px 0;
	}

	.tags {
		display: flex;
		gap: 8px;
		margin: 10px 0;
	}
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	img {
		width: 68px;
		height: 48px;
	}

	h3 {
		font-size: 28px;
	}
`;

export const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	color: #4b5563;

	p {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 16px;
	}
`;

export const Tag = styled.span<{ color: string }>`
	background: ${(props) => props.color};
	color: white;
	padding: 5px 10px;
	border-radius: 4px;
	font-size: 10px;
	font-weight: 500;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`;
