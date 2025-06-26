import { suapAuthConfig } from "./client";

export const openSuapLoginPopup = () => {
	const url = new URL(suapAuthConfig.authorizationEndpoint);
	url.searchParams.set("client_id", suapAuthConfig.clientId);
	url.searchParams.set("redirect_uri", suapAuthConfig.redirectUri);
	url.searchParams.set("response_type", suapAuthConfig.responseType);
	url.searchParams.set("scope", suapAuthConfig.scope);

	window.open(url.toString(), "_blank", "width=800,height=600");
	
	console.log("Aguardando autenticação no SUAP...");
};
