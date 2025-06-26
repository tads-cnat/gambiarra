export const suapAuthConfig = {
	clientId: import.meta.env.VITE_SUAP_CLIENT_ID,
	redirectUri: import.meta.env.VITE_SUAP_REDIRECT_URI,
	authorizationEndpoint: "https://suap.ifrn.edu.br/o/authorize/",
	tokenEndpoint: "https://suap.ifrn.edu.br/o/token/",
	scope: "identificacao email",
	responseType: "code",
};
