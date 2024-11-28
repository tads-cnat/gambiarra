import {
	House,
	Heart,
	User,
	Gear,
	Bell,
	Star,
	MusicNote,
	Trash,
	Lock,
	Camera,
	ShoppingCart,
	Calendar,
	Clipboard,
	Play,
	Pause,
	Plus,
	Minus,
} from "@phosphor-icons/react";
import { GambIconProps } from "../../interfaces/componentes/iGambIcon";
import React from "react";

const iconComponents: { [key: string]: JSX.Element } = {
	house: <House />,
	heart: <Heart />,
	user: <User />,
	gear: <Gear />,
	bell: <Bell />,
	star: <Star />,
	musicNote: <MusicNote />,
	trash: <Trash />,
	lock: <Lock />,
	camera: <Camera />,
	shoppingCart: <ShoppingCart />,
	calendar: <Calendar />,
	clipboard: <Clipboard />,
	play: <Play />,
	pause: <Pause />,
	plus: <Plus />,
	minus: <Minus />,
};

export default function Icon(props: GambIconProps): JSX.Element {
	const { icon, size, color, className } = props;

	// Verifica se o ícone existe no mapeamento e retorna ele
	const IconComponent = iconComponents[icon.toLowerCase()];

	return (
		<>
			{IconComponent &&
				React.cloneElement(IconComponent, {
					size: size || 16,
					color,
					className,
				})}
		</>
	);
}
