export type BreadcrumbItem = {
  label: string; 
  href?: string;
  permission?: string; 
};

export interface BreadcrumbProps {
  crumbs: BreadcrumbItem[]; 
}
