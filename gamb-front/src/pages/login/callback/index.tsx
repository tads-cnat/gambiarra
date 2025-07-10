import { useEffect } from "react";
import {
	setAuthRefreshToken,
	setAuthToken,
	setIsAuthenticatedStore,
	setUserActive,
	setUserActiveRole,
	UserActive,
} from "../../../auth/service/AuthStore";
import axiosInstance from "../../../services/base/axiosInstance";
import { suap } from "../../../services/base/suap-client";
import { useNavigate } from "react-router-dom"; // CORRETO

export default function Callback() {

	const navigate = useNavigate();

	useEffect(() => {
		suap.init();
		console.log(suap.getToken().getValue());

		if (suap.isAuthenticated()) {
			
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
					console.log("Usuário autenticado:", userData);
					localStorage.setItem("suap_oauth_code", suap.getToken().getValue()?.toString() || "");
				}).catch((error) => {
					console.error("Erro ao autenticar usuário:", error);
				})
				.finally(() => {
					navigate("/dashboard"); // CORRETO
				});
		} else {
			console.log("Usuário não autenticado ou modal não aberto.");
		}
	}, [navigate]); // boa prática: adicione navigate nas deps

	return null;
}
