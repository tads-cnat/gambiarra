import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

import { Modal } from "./componentes/GambModal/modal";
import { useState } from "react";
import { ModalButtons, ModalHeader } from "./componentes/GambModal/modalstyles";


export function App() {
  const style = defaultTheme;

  // teste modal
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      {/* <Dashboard /> */}

      <div>
          <Modal isOpen={isModalOpen} onClose={closeModal}> 
                {/* content aqui */}
                <form>
                  <ModalHeader>
                    <h2>Abrir Chamado</h2>
                  </ModalHeader>
                    
                    <h3>| Dados Gerais *</h3>

                    <label >Nome</label>
                    <input type="text" placeholder="placeholder" />

                    <label >Descrição</label>
                    <input type="text" placeholder="placeholder" />

                    <label >Modelo</label>
                    <input type="text" placeholder="placeholder" />

                    
                    <ModalButtons>
                      <button type="submit">Fechar</button>
                      <button type="submit">Enviar</button> 
                    </ModalButtons>

                </form>
          </Modal>

      </div>

      <div className={style.teste}>
        <p>Exemplo de como passar classes do tailwind através do styled componentes</p>
      </div>
    </ThemeProvider>

  )
}


