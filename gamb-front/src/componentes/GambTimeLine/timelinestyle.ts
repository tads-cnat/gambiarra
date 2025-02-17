import styled from "styled-components";

export const TimelineContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  gap: 20px;
`;

export const TimelineOUT = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.8rem;
  color: #666;
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
  $isRejected?: boolean;
}>`
  width: 200px;
  height: 1px;
  background-color: ${(props) => props.color};
  margin: 0 8px;
  position: relative;

  ${({ $isRejected }) =>
    $isRejected &&
    `
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
  top: 1.75rem; /* Fica abaixo da bolinha */
  left: 0;
  width: 80px;
  text-align: center;
  font-size: 0.8rem;
  transform: translateX(-28%);
`;

// Container para status fixos (primeiro e último)
export const FirstOrLastStatusContainer = styled.div`
  flex-shrink: 0;
`;

// Container para os status centrais roláveis
export const MiddleStatusContainer = styled.div`
  display: flex;
  gap: 8px;
  height: 7rem;
  overflow-x: auto;
  flex: 1;
`;
