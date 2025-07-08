import { useEffect } from "react";
import {
	isAuthenticatedStore,
	setAuthRefreshToken,
	setAuthToken,
	setIsAuthenticatedStore,
	setUserActive,
	setUserActiveRole,
	UserActive,
} from "../../../auth/service/AuthStore";
import axiosInstance from "../../../services/base/axiosInstance";
import { suap } from "../../../services/base/suap-client";

export default function Callback() {
	useEffect(() => {
		suap.init();
		console.log(suap.getToken().getValue());

		if (suap.isAuthenticated()) {
			console.log("Usuário autenticado com sucesso!");
			axiosInstance
				.post("/auth/suap/", { token: suap.getToken().getValue() })
				.then((response) => {
					const { access, refresh, usuario } = response.data;
					setAuthRefreshToken(refresh);
					setAuthToken(access);

					const userData: UserActive = usuario;
					if (userData) {
						setUserActive(userData);
						setUserActiveRole(userData.grupo);
						setIsAuthenticatedStore();
					}
					localStorage.setItem("suap_oauth_code", suap.getToken().getValue()?.toString() || "");
				})
				.finally(() => {
					window.close();
				});
		}
	}, []);

	return null;
}
