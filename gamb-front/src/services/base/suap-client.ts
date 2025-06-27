import { SuapClient } from "./client";

const CLIENT_ID = "1ZhTRkW4vyAPp64qdfnqfhGWu5ZcpqWxRbiKpXki";
const REDIRECT_URI = "http://localhost:5173/login/callback"; // Ajuste conforme necessário
const SUAP_URL = "https://suap.ifrn.edu.br";
const SCOPE = "identificacao email documentos_pessoais";

export const suap = new SuapClient(SUAP_URL, CLIENT_ID, REDIRECT_URI, SCOPE);

export const openSuapLoginPopup = () => {
	window.open(suap.getLoginURL(), "_blank", "width=800,height=600");
};
