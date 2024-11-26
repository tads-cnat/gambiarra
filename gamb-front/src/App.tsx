import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Dashboard } from "./dashboard";

export function App() {
  const style = defaultTheme;

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <div className={style.teste}>
        <p>Exemplo de como passar classes do tailwind através do styled componentes</p>
      </div>
    </ThemeProvider>

  )
}


