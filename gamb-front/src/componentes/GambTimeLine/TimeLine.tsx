import React from "react";
import {
  TimelineContainer,
  TimelineContent,
  StepWrapper,
  StepDot,
  StepLine,
  StepLabel
} from "./timelinestyle";
import { ChatTimelineProps } from "../../interfaces/componentes/iGambTimeLine";

const Timeline: React.FC<ChatTimelineProps> = ({ statuses }) => {
  return (
    <TimelineContainer>
      <TimelineContent>
        {statuses.map((status, index) => {
          const isRejected = status.label === "Recusado" || status.label === "Resolvido";
          const dotColor = status.completed ? status.color : "#ccc";
          const lineColor = status.completed ? status.color : "#ccc";

          return (
            <StepWrapper key={index}>
              <StepDot color={dotColor} />
                <StepLine 
                  color={lineColor} 
                  $isRejected={isRejected}
                />
              <StepLabel>{status.label}</StepLabel>
            </StepWrapper>
          );
        })}
      </TimelineContent>
    </TimelineContainer>
  );
};

export default Timeline;