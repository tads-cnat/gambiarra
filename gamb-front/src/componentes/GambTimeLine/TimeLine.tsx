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
import { Tooltip } from "antd";

export default function Timeline(props: ChatTimelineProps): React.JSX.Element {
  const { status } = props;

  const lastStatus = status[status.length - 1];
  const middleStatuses = status.slice(0, -1);

  if (status.length < 5) {
    return (
      <TimelineContainer>
        {status.map((alt, index) => {
          const isFinal = index === status.length - 1;

          return (
            <Tooltip
              key={index}
              title={alt.tooltip}
              placement="top"
              color={alt.lineColor} // cor do balão
            >
              <StepWrapper>
                <StepDot color={alt.color} borderColor={alt.lineColor}>
                  <Icon icon={alt.iconName} size={22} color={alt.lineColor} />
                </StepDot>
                {isFinal ? (
                  <StepLineEnd color={alt.lineColor} />
                ) : (
                  <StepLine color={alt.lineColor} />
                )}
                <StepLabel>{alt.label}</StepLabel>
              </StepWrapper>
            </Tooltip>
          );
        })}
      </TimelineContainer>
    );
  }

  return (
    <TimelineContainer>
      <MiddleStatusContainer>
        {middleStatuses.map((alt, index) => (
          <Tooltip
            key={index}
            title={alt.tooltip}
            placement="top"
            color={alt.lineColor}
          >
            <StepWrapper>
              <div className="inline-flex items-center justify-center ml-1">
                <StepDot color={alt.color} borderColor={alt.lineColor} bgColor={alt.bgColor}>
                  <Icon icon={alt.iconName} size={22} color={alt.lineColor} />
                </StepDot>
                <StepLine color={alt.lineColor} />
                <StepLabel className="ml-1 mt-9">{alt.label}</StepLabel>
              </div>
            </StepWrapper>
          </Tooltip>
        ))}
      </MiddleStatusContainer>

      <FirstOrLastStatusContainer>
        <Tooltip
          title={lastStatus.tooltip}
          placement="top"
          color={lastStatus.lineColor}
        >
          <StepWrapper>
            <StepDot color={lastStatus.color} borderColor={lastStatus.lineColor} bgColor={lastStatus.bgColor}>
              <Icon
                icon={lastStatus.iconName}
                size={22}
                color={lastStatus.color}
              />
            </StepDot>
            <StepLineEnd color={lastStatus.lineColor} />
            <StepLabel>{lastStatus.label}</StepLabel>
          </StepWrapper>
        </Tooltip>
      </FirstOrLastStatusContainer>
    </TimelineContainer>
  );
}
