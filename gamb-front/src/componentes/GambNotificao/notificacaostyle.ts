import styled from "styled-components";


export const CircleContainer = styled.div<{ size: number; backgroundColor: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: ${({ theme }) => theme.cores.gray_text};
  border-width: 1px;
  position: relative; 
`;

export const IconContainer = styled.div<{ iconColor?: string }>`
  color: ${({ iconColor, theme }) => iconColor || theme.cores.gray_text};  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Badge = styled.div`
  position: absolute;
  top: -8px; 
  left: -8px; 
  background-color: ${({ theme }) => theme.cores.danger}; 
  color: ${({ theme }) => theme.cores.white}; 
  width: 19px; 
  height: 19px; 
  border-radius: 50%; 
  font-size: 13px; 
  font-family: Poppins, sans-serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
`;

