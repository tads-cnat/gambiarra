export interface StatusType {
    label: string;
    color: string;
    lineColor: string;
    icon?: string;
    iconName: string;
    tooltip?: string;   
  }

export interface ChatTimelineProps {
    status: StatusType[];
  }