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
import Icon from "../../componentes/GambIcon/Icon";

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
          const lineColor = alt.lineColor;
          const iconName = alt.iconName;
    return(
            <StepWrapper key={index} title={alt.tooltip}>
              <StepDot color={dotColor}>
              <Icon icon={iconName} size={22} color={lineColor} />
            </StepDot>
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
            <StepWrapper key={index} title={alt.tooltip}>
              <div className="inline-flex items-center justify-center ml-1">
                 <StepDot color={alt.color}>
              <Icon icon={alt.iconName} size={22} color={alt.lineColor} />
            </StepDot>
                <StepLine color={alt.lineColor} />
                <StepLabel className="ml-1 mt-9">{alt.label}</StepLabel>
              </div>
            </StepWrapper>
          );
        })}
      </MiddleStatusContainer>
  
      <FirstOrLastStatusContainer>
        <StepWrapper title={lastStatus.tooltip}>
           <StepDot color={lastStatus.color}>
              <Icon icon={lastStatus.iconName} size={22} color={lastStatus.lineColor} />
            </StepDot>
          <StepLineEnd color={lastStatus.lineColor} />
          <StepLabel>{lastStatus.label}</StepLabel>
        </StepWrapper>
      </FirstOrLastStatusContainer>
    </TimelineContainer>
  );
}