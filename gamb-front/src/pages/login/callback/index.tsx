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
						setIsAuthenticatedStore(true);
					}

					navigate("/dashboard");
				})
				.catch((error) => {
					
					alert(
						"Erro ao autenticar usuário. Por favor, tente novamente. " +
							error.message
					);
					navigate("/login");
				});
		} else {
			alert(
				"Usuário não autenticado. Por favor, faça login novamente."
			);
			navigate("/login");
		}
	}, [navigate]); 

	return null;
}
