import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Dashboard } from "./dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./index";

export function App() {
	return (
		<>
			<ThemeProvider theme={defaultTheme}>
				<GlobalStyle />
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/dashboard/"
							element={<Dashboard />}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}
