import React from "react";
import {
  TimelineContainer,
  TimelineContent,
  StepWrapper,
  StepDot,
  StepLine,
  StepLabel
} from "./linhadotempostyle";
import { ChatTimelineProps } from "../../interfaces/componentes/iGambTimeLine";

const Timeline: React.FC<ChatTimelineProps> = ({ statuses }) => {
  return (
    <TimelineContainer>
        <TimelineContent>
          {statuses.map((status, index) => {
            const isLast = index === statuses.length - 1;
            const dotColor = status.completed ? status.color : "#ccc"; 
            const lineColor = status.completed ? status.color : "#ccc"; 
            return (
              <StepWrapper key={index}>
                <StepDot color={dotColor} />
                {!isLast && (
                  <StepLine color={lineColor} />
                )}
                <StepLabel>{status.label}</StepLabel>
              </StepWrapper>
            );
          })}
        </TimelineContent>
    </TimelineContainer>
  );
};

export default Timeline;