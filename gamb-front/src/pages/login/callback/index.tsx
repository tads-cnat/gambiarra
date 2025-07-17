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

export default function Callback(): React.JSX.Element {
	const navigate = useNavigate();

	useEffect(() => {
		suap.init();
		console.log(suap.getToken().getValue());

		if (suap.isAuthenticated()) {
			axiosInstance
				.post("/auth/suap/", { token: suap.getToken().getValue() })
				.then((response: { data: { access: string; refresh: string; usuario: UserActive } }) => {
					const { access, refresh, usuario } = response.data;
					setAuthRefreshToken(refresh);
					setAuthToken(String(access));

					const userData = usuario;
					if (userData) {
						setUserActive(userData);
						setUserActiveRole(userData.grupo);
						setIsAuthenticatedStore();
					}

					void navigate("/dashboard");
				})
				.catch((error: unknown) => {
					
					alert(
						"Erro ao autenticar usuário. Por favor, tente novamente. " +
							(error as Error).message
					);
					void navigate("/login");
				});
		} else {
			alert(
				"Usuário não autenticado. Por favor, faça login novamente."
			);
			void navigate("/login");
		}
	}, [navigate]); 

	return <></>;
}
