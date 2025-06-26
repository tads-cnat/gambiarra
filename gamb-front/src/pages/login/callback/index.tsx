export default function Callback() {
	// Este ficheiro deve estar no endpoint configurado como redirect_uri
	const params = new URLSearchParams(window.location.search);
	const code = params.get("code");

	if (code) {
		localStorage.setItem("suap_oauth_code", code);
		console.log("Código recebido:", code);
		window.close(); // Fecha a popup
	}

	return (
		<>
			<p>Code: {code}</p>
			<p>Params: {params.toString()}</p>
		</>
	); // Não renderiza nada, apenas fecha a janela
}
