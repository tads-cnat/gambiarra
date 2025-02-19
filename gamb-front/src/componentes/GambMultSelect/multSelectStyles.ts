/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";

// Definir o contêiner estilizado
export const Container = styled.div`
  width: 255px;
`;

// Definir o estilo personalizado para o Select
export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: '8px',
    border: '1px solid #363636',
    padding: '8px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#888',
    },
    width: '100%',
    
  }),
  multiValue: (provided: any) => ({
    ...provided,
    // backgroundColor: '#f0f0f0', // Cor de fundo do valor selecionado
    borderRadius: '4px', // Bordas arredondadas
    margin: '2px', // Espaçamento entre os valores
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#333', // Cor do texto do valor selecionado
    fontSize: '14px', // Tamanho da fonte
    
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#e74c3c', // Cor do ícone de remover
    '&:hover': {
      backgroundColor: '#fff', // Cor de fundo ao passar o mouse
      color: '#c0392b', // Cor do ícone ao passar o mouse
    },

  }),

  // Estilo para o container principal do Select
  valueContainer: (provided: any) => ({
    ...provided,
    padding: '4px', // Espaçamento interno
    // backgroundColor: "red",

  }),

  
};