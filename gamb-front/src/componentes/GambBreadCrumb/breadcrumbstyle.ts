import styled from "styled-components";

export const BreadcrumbContainer = styled.nav`
    display: flex;
    align-items: center;
    font-family: Poppins, sans-serif;
    font-size: 14px;
    gap: 8px;
`;

export const BreadcrumbItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const BreadcrumbLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.cores.purple_info_secondary};
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;

export const BreadcrumbSeparator = styled.span`
  margin: 0 -2px 0 6px;
  opacity: 0.5;
  color: ${({ theme }) => theme.cores.gray};
`;

export const BreadcrumbText = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.cores.blue_primary};
`;

export const BreadcrumbIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${({ theme }) => theme.cores.green_primary}; // Cor do ícone
`;