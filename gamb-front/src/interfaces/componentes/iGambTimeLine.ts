export interface StatusType {
    label: string;
    color: string;
    lineColor: string;
    icon?: string;
    iconName: string;
    tooltip?: string;   
    bgColor?: string;
  }

export interface ChatTimelineProps {
    status: StatusType[];
  }