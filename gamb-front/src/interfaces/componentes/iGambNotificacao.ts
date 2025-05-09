export interface NotificacaoProps {
	// Ícone que será exibido no círculo
	icon: string;

	// Cor de fundo do círculo principal
	$backgroundColor: string;

	// Número exibido no badge superior esquerdo
	badgeNumber?: number;

	// Tamanho do círculo principal
	size?: number;

	// Cor do ícone
	$iconColor?: string;

	// Função que será executada ao clicar no círculo
	onClick?: () => void;
}
