export interface StatusType {
    label: string;
    color: string;
    tooltip?: string;   
  }

export interface ChatTimelineProps {
    status: StatusType[];
  }