import styled from "styled-components";

export const TimelineContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const TimelineContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 30px;
  border-radius: 8px;
`;

export const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const StepDot = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const StepLine = styled.div<{ 
  color: string;
  $isRejected?: boolean; // Novo prop
}>`
  width: 200px;
  height: 1px;
  background-color: ${(props) => props.color};
  margin: 0 8px;
  position: relative;

  ${({ $isRejected }) => $isRejected && `
    &::after {
      content: '';
      position: absolute;
      right: -1px;
      top: -13px;
      width: 1px;
      height: 30px;
      background-color: inherit;
    }
  `}
`;

export const StepLabel = styled.span`
  position: absolute;
  top: 32px;
  left: 0;
  width: 80px;
  text-align: center;
  font-size: 0.8rem;
  transform: translateX(-28%);
`;