import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

import { Modal } from "./componentes/GambModal/modal";
import { useState } from "react";


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
                    <h2>Modal</h2>

                    <label >nome</label>
                    <input type="text" placeholder="placeholder" />
                    
                    <button type="submit">Enviar</button>
                </form>
          </Modal>

      </div>

      <div className={style.teste}>
        <p>Exemplo de como passar classes do tailwind através do styled componentes</p>
      </div>
    </ThemeProvider>

  )
}


