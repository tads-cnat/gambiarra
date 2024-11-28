export interface GambIconProps {
	// O nome do ícone a ser exibido (por exemplo, "home", "settings").
	icon: string;

	// A cor do ícone. Esta propriedade é opcional.
	color?: string;

	// O tamanho do ícone, em pixels. Esta propriedade é opcional.
	size?: number;

	// Classe CSS adicional a ser aplicada ao ícone. Esta propriedade é opcional.
	className?: string;

	// Função de callback a ser chamada quando o ícone for clicado. Esta propriedade é opcional.
	onClick?: () => void;
}
