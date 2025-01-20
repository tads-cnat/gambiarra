import React from "react";
import {
  BreadcrumbContainer,
  BreadcrumbItemWrapper,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbText,
  BreadcrumbIcon,
} from "./breadcrumbstyle";
import { BreadcrumbProps } from "../../interfaces/componentes/iGambBreadcrumb";
import Icon from '../GambIcon/Icon';

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
  const allCrumbs = [{ label: "", href: "/" }, ...crumbs];

  return (
    <BreadcrumbContainer>
      {allCrumbs.map((item, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === allCrumbs.length - 1;
        return (
          <BreadcrumbItemWrapper key={index}>
            {!isLastItem ? (
              <>
                {isFirstItem ? (
                  <BreadcrumbLink href={item.href}>
                    <BreadcrumbIcon>
                      <Icon icon="greenhouse" size={16} color="#12a400" />
                    </BreadcrumbIcon>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
                <BreadcrumbSeparator><Icon icon="greaterthan" /></BreadcrumbSeparator>
              </>
            ) : (
              <BreadcrumbText>{item.label}</BreadcrumbText>
            )}
          </BreadcrumbItemWrapper>
        );
      })}
    </BreadcrumbContainer>
  );
}
