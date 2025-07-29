import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";

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

export const StepDot = styled.div<{ color: string, borderColor?: string, bgColor?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.borderColor};
  justify-content: center;
`;


export const StepLine = styled.div<{ 
  color: string;
  $isRejected?: boolean;
}>`
  width: 200px;
  height: 3px;
  background-color: ${(props): string => props.color};
  margin: 0 8px;
  position: relative;
`;

export const StepLineEnd = styled.div<{ 
  color: string;
}>`
  width: 200px;
  height: 1px;
  background-color: ${(props): string => props.color};
  margin: 0 8px;
  position: relative;

    &::after {
      content: '';
      position: absolute;
      right: -1px;
      top: -13px;
      width: 1px;
      height: 30px;
      background-color: inherit;
    }
`;

export const StepLabel = styled.span`
  position: absolute;
  top: 2.75rem;
  left: 0;
  width: 100px;
  text-align: center;
  font-size: 0.8rem;
  transform: translateX(-28%);
`;

export const FirstOrLastStatusContainer = styled.div`
  flex-shrink: 0;
  margin-bottom: 0.8rem;
`;

export const MiddleStatusContainer = styled.div`
  display: flex;
  gap: 8px;
  padding-left: 1.2rem;
  height: 7rem;
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1;

`;
