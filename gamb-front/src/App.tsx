import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Dashboard } from "./pages/dashboard/Dashboard";
import Home from "./pages/index/index";
import { Login } from "./pages/login/Login";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

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

						<Route
							path="/login/"
							element={<Login />}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}
