import * as React from 'react';

export interface GambBodyTdProps {
    
    // conteudo da celula td
    content?: string

    // conteúdo filho dentro da celula (ícones, texto, etc.).
    children?: React.ReactNode;

}