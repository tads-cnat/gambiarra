import { useEffect } from "react";
import { suap } from "../../../services/base/suap-client";

export default function Callback() {
	// Este ficheiro deve estar no endpoint configurado como redirect_uri
	suap.init();
	const token = suap.getToken();

	useEffect(() => {
		console.log("Token recebido:", token);
		suap.getResource("Testando", (data) => {
			console.log("Dados recebidos do SUAP:", data);
		});
		window.close(); // Fecha a janela após obter o token
	}, []);

	return (
		<>
			<p>Params: Conectando com o suap...</p>
		</>
	); // Não renderiza nada, apenas fecha a janela
}
