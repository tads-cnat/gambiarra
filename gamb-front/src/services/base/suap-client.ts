import { SuapClient } from "./client";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID_SUAP
const REDIRECT_URI =  import.meta.env.VITE_SUAP_REDIRECT_URI
const SUAP_URL = "https://suap.ifrn.edu.br";
const SCOPE = "identificacao email documentos_pessoais";

export const suap = new SuapClient(SUAP_URL, CLIENT_ID, REDIRECT_URI, SCOPE);
suap.init();

export function openSuapLoginPopup (): void{

	window.location.href = suap.getLoginURL();

};
