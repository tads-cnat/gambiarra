export interface StatusType {
    label: string;
    color: string;
    completed?: boolean; 
    tooltip?: string;   
  }

export interface ChatTimelineProps {
    statuses: StatusType[];
  }