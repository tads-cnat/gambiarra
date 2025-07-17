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

export default function Timeline(props: ChatTimelineProps): React.JSX.Element {
  const { status } = props;

  const lastStatus = status[status.length - 1];
  const middleStatuses = status.slice(0, -1); 
  if (status.length < 5) {
    return (
      <TimelineContainer>
        {status.map((alt, index) => {
          const isFinal = index === status.length - 1;
          const dotColor = alt.color;
          const lineColor = alt.color;
 return (
            <StepWrapper key={index}>
              <StepDot color={dotColor} />
              {isFinal ? (
                <StepLineEnd color={lineColor} />
              ) : (
                <StepLine color={lineColor} />
              )}
              <StepLabel>{alt.label}</StepLabel>
            </StepWrapper>
          );
        })}
      </TimelineContainer>
    );
  }

  return (
    <TimelineContainer>
      <MiddleStatusContainer>
        {middleStatuses.map((alt, index) => {
          return (
            <StepWrapper key={index}>
              <div className="inline-flex items-center justify-center ml-1">
                <StepDot color={alt.color} />
                <StepLine color={alt.color} />
                <StepLabel className="ml-1 mt-9">{alt.label}</StepLabel>
              </div>
            </StepWrapper>
          );
        })}
      </MiddleStatusContainer>
  
      <FirstOrLastStatusContainer>
        <StepWrapper>
          <StepDot color={lastStatus.color} />
          <StepLineEnd
            color={lastStatus.color}          />
          <StepLabel>{lastStatus.label}</StepLabel>
        </StepWrapper>
      </FirstOrLastStatusContainer>
    </TimelineContainer>
  );
}