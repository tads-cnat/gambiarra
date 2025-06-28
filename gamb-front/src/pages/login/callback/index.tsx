import { suap } from "../../../services/base/suap-client";

export default function Callback() {
	// Este ficheiro deve estar no endpoint configurado como redirect_uri
	suap.init();
	console.log(suap.getToken().getValue());

	if (suap.isAuthenticated()) {
		suap.getResource("Testando", (data) => {
			console.log("Dados recebidos do SUAP:", data);
			localStorage.setItem("suap_oauth_data", JSON.stringify(data));
		});
	}

	return null; // Não renderiza nada, apenas fecha a janela
}
