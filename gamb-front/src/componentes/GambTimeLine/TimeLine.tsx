import React from "react";
import {
  TimelineContainer,
  StepWrapper,
  StepDot,
  StepLine,
  StepLabel,
  FirstOrLastStatusContainer,
  MiddleStatusContainer,
  StepLineEnd,
} from "./timelinestyle";
import { ChatTimelineProps } from "../../interfaces/componentes/iGambTimeLine";

export default function Timeline({ statuses }: ChatTimelineProps) {
  if (statuses.length < 5) {
    return (
      <TimelineContainer>
        {statuses.map((status, index) => {
          const isFinal = index === statuses.length - 1;
          const dotColor = status.completed ? status.color : "#ccc";
          const lineColor = status.completed ? status.color : "#ccc";

          return (
            <StepWrapper key={index}>
              <StepDot color={dotColor} />
              {isFinal ? (
                <StepLineEnd color={lineColor} />
              ) : (
                <StepLine color={lineColor} />
              )}
              <StepLabel>{status.label}</StepLabel>
            </StepWrapper>
          );
        })}
      </TimelineContainer>
    );
  }

  const lastStatus = statuses[statuses.length - 1];
  const middleStatuses = statuses.slice(0, -1); 

  return (
    <TimelineContainer>
      <MiddleStatusContainer>
        {middleStatuses.map((status, index) => {
          const dotColor = status.completed ? status.color : "#ccc";
          const lineColor = status.completed ? status.color : "#ccc";
          return (
            <StepWrapper key={index}>
              <div className="inline-flex items-center justify-center ml-1">
                <StepDot color={dotColor} />
                <StepLine color={lineColor} />
                <StepLabel className="ml-1 mt-9">{status.label}</StepLabel>
              </div>
            </StepWrapper>
          );
        })}
      </MiddleStatusContainer>

      <FirstOrLastStatusContainer>
        <StepWrapper>
          <StepDot color={lastStatus.completed ? lastStatus.color : "#ccc"} />
          <StepLineEnd
            color={lastStatus.completed ? lastStatus.color : "#ccc"}
          />
          <StepLabel>{lastStatus.label}</StepLabel>
        </StepWrapper>
      </FirstOrLastStatusContainer>
    </TimelineContainer>
  );
}