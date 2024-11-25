export interface GambButtonProps{

    /**
     * Cor do botão
     */
    variant: "verde" | "amarelo" | "vermelho" | "roxo" | "branco";
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    label:string;
}