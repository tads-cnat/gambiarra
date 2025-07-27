import {
	BreadcrumbContainer,
	BreadcrumbItemWrapper,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbText,
	BreadcrumbIcon,
} from "./breadcrumbstyle";
import Icon from "../GambIcon/Icon";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";

export default function Breadcrumb() {
	const dynamicCrumbs = useBreadcrumbs();
	const activeCrumbs = dynamicCrumbs;
	const allCrumbs = [{ label: "", href: "/" }, ...activeCrumbs];

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
											<Icon
												icon="greenhouse"
												size={16}
												color="#12a400"
											/>
										</BreadcrumbIcon>
									</BreadcrumbLink>
								) : (
									<BreadcrumbLink href={item.href}>
										{item.label}
									</BreadcrumbLink>
								)}
								<BreadcrumbSeparator>
									<Icon icon="seta_direita" />
								</BreadcrumbSeparator>
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
