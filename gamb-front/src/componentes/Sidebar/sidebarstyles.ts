import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme;

export const SidebarContainer = styled.aside<{ $collapsed?: boolean }>`
  background-color: ${theme.cores.white};
  width: ${(props) => (props.$collapsed ? "80px" : "300px")}; 
  border-radius: 16px;
  box-shadow: 5px 5px 10px 5px rgba(54, 54, 54, 0.1);
  transition: width 0.5s ease-out, padding 0.5s ease-out;
  height: 100%;

`;

export const SidebarBody = styled.div`
  height: 100%;
  padding: 2rem 0rem 2rem 1rem;
  transition: padding 0.5s ease-out; /* Opcional, se mudar padding no collapse */
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  transition: gap 0.5s ease-out;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: width 0.5s ease-out, height 0.5s ease-out;
  }
`;

export const UserSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;
  transition: padding 0.5s ease-out;
`;

export const ItemDropdown = styled.ul`
  background-color: ${theme.cores.light_white};
  overflow: hidden;
  width: auto;
  transition: max-height 0.5s ease-out; /* Se for esconder */

  a {
    font-size: ${theme.fontSize.font_scale_up_02}rem;
    color: ${theme.cores.gray_text};
    transition: color 0.5s ease-out;
  }
`;

export const SidebarContent = styled.div<{ $collapsed?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${(props) => (props.$collapsed ? "center" : "flex-start")};
  gap: 1.25rem;
  height: 100%;
  padding: 0 20px;
  transition: padding 0.5s ease-out;

  ul {
    display: flex;
    gap: 1rem;
    flex-direction: column;

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      transition: border 0.5s ease-out, color 0.5s ease-out, padding 0.5s ease-out;

      &:hover {
        border-left: 1px solid ${theme.cores.purple_info_primary};
        color: ${theme.cores.purple_info_primary};
      }
    }
  }

  div > .gambi-img,
{
    padding: 1rem;
    width: 100%;
    transition: all 0.5s ease-out;
  }
	div > .collapsed-img {
	padding: 0.5rem;
    width: 90px;
  }

  .buttons-conj {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 2rem;
    transition: all 0.5s ease-out, padding 0.5s ease-out;
  }
`;
