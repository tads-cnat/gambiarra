import React from "react";
import {
  TimelineContainer,
  StepWrapper,
  StepDot,
  StepLine,
  StepLabel,
  FirstOrLastStatusContainer,
  MiddleStatusContainer,
} from "./timelinestyle";
import { ChatTimelineProps } from "../../interfaces/componentes/iGambTimeLine";

export default function Timeline({ statuses }: ChatTimelineProps) {
  if (statuses.length < 3) {
    return (
      <TimelineContainer>
        {statuses.map((status, index) => {
          const isRejected =
            status.label === "Recusado" || status.label === "Resolvido";
          const dotColor = status.completed ? status.color : "#ccc";
          const lineColor = status.completed ? status.color : "#ccc";

          return (
            <StepWrapper key={index}>
              <StepDot color={dotColor} />
              <StepLine color={lineColor} $isRejected={isRejected} />
              <StepLabel>{status.label}</StepLabel>
            </StepWrapper>
          );
        })}
      </TimelineContainer>
    );
  }

  const firstStatus = statuses[0];
  const lastStatus = statuses[statuses.length - 1];
  const middleStatuses = statuses.slice(1, -1);

  return (
    <TimelineContainer>
      <FirstOrLastStatusContainer>
        <StepWrapper>
          <StepDot color={firstStatus.completed ? firstStatus.color : "#ccc"} />
          <StepLine
            color={firstStatus.completed ? firstStatus.color : "#ccc"}
            $isRejected={
              firstStatus.label === "Recusado" || firstStatus.label === "Resolvido"
            }
          />
          <StepLabel>{firstStatus.label}</StepLabel>
        </StepWrapper>
      </FirstOrLastStatusContainer>

      <MiddleStatusContainer>
        {middleStatuses.map((status, index) => {
          const isRejected =
            status.label === "Recusado" || status.label === "Resolvido";
          const dotColor = status.completed ? status.color : "#ccc";
          const lineColor = status.completed ? status.color : "#ccc";
          return (
            <StepWrapper key={index}>
              <div className="inline-flex items-center justify-center ml-1">
                <StepDot color={dotColor} />
                <StepLine color={lineColor} $isRejected={isRejected} />
                <StepLabel className="ml-1 mt-9">{status.label}</StepLabel>
              </div>
            </StepWrapper>
          );
        })}
      </MiddleStatusContainer>

      <FirstOrLastStatusContainer>
        <StepWrapper>
          <StepDot color={lastStatus.completed ? lastStatus.color : "#ccc"} />
          <StepLine
            color={lastStatus.completed ? lastStatus.color : "#ccc"}
            $isRejected={
              lastStatus.label === "Recusado" || lastStatus.label === "Resolvido"
            }
          />
          <StepLabel>{lastStatus.label}</StepLabel>
        </StepWrapper>
      </FirstOrLastStatusContainer>
    </TimelineContainer>
  );
}