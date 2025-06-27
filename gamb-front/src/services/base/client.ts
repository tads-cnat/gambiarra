import Cookies from "js-cookie";
import axios from "axios";

export const suapAuthConfig = {
	clientId: import.meta.env.VITE_SUAP_CLIENT_ID,
	redirectUri: import.meta.env.VITE_SUAP_REDIRECT_URI,
	authorizationEndpoint: "https://suap.ifrn.edu.br/o/authorize/",
	tokenEndpoint: "https://suap.ifrn.edu.br/o/token/",
	scope: "identificacao email",
	grant_type: "implicit",
	responseType: "token",
};

class Token {
	private value: string | null;
	private startTime: number | null;
	private finishTime: Date | null;
	private scope: string | null;

	constructor(
		value: string | null,
		expirationTimeInSeconds: number,
		scope: string | null
	) {
		this.startTime = new Date().getTime();
		this.finishTime = new Date(
			this.startTime + expirationTimeInSeconds * 1000
		);
		this.value = value;
		this.scope = scope;

		if (!Cookies.get("suapToken") && this.value) {
			Cookies.set("suapToken", this.value, { expires: this.finishTime });
		} else {
			this.value = Cookies.get("suapToken") || null;
		}

		if (!Cookies.get("suapTokenExpirationTime")) {
			Cookies.set(
				"suapTokenExpirationTime",
				this.finishTime.toISOString(),
				{ expires: this.finishTime }
			);
		} else {
			const dateStr = Cookies.get("suapTokenExpirationTime");
			this.finishTime = dateStr ? new Date(dateStr) : null;
		}

		if (!Cookies.get("suapScope")) {
			if (this.scope) {
				Cookies.set("suapScope", this.scope, {
					expires: this.finishTime ?? undefined,
				});
			}
		} else {
			this.scope = Cookies.get("suapScope") || null;
		}
	}

	public getValue(): string | null {
		return this.value;
	}

	public getExpirationTime(): Date | null {
		return this.finishTime;
	}

	public getScope(): string | null {
		return this.scope;
	}

	public isValid(): boolean {
		return Cookies.get("suapToken") !== null && this.value !== null;
	}

	public revoke(): void {
		this.value = null;
		this.startTime = null;
		this.finishTime = null;

		Cookies.remove("suapToken");
		Cookies.remove("suapTokenExpirationTime");
		Cookies.remove("suapScope");
	}
}

export class SuapClient {
	private authHost: string;
	private clientID: string;
	private redirectURI: string;
	private scope: string;
	private resourceURL: string;
	private authorizationURL: string;
	private logoutURL: string;
	private responseType: string = "token";
	private grantType: string = "implict";
	private token!: Token;
	private dataJSON: any;

	constructor(
		authHost: string,
		clientID: string,
		redirectURI: string,
		scope: string
	) {
		this.authHost = authHost.endsWith("/")
			? authHost.slice(0, -1)
			: authHost;
		this.clientID = clientID;
		this.redirectURI = redirectURI;
		this.scope = scope;

		this.resourceURL = `${this.authHost}/api/eu/`;
		this.authorizationURL = `${this.authHost}/o/authorize/`;
		this.logoutURL = `${this.authHost}/o/revoke_token/`;

		this.dataJSON = {};
	}

	private extractToken(): string | null {
		const match = document.location.hash.match(/access_token=(\w+)/);
		return match ? match[1] : null;
	}

	private extractScope(): string | null {
		const match = document.location.hash.match(/scope=(.*)/);
		return match ? match[1].replace(/\+/g, " ") : null;
	}

	private extractDuration(): number {
		const match = document.location.hash.match(/expires_in=(\d+)/);
		return match ? Number(match[1]) : 0;
	}

	public init(): void {
		this.token = new Token(
			this.extractToken(),
			this.extractDuration(),
			this.extractScope()
		);
	}

	public getToken(): Token {
		return this.token;
	}

	public getDataJSON(): any {
		return this.dataJSON;
	}

	public getRedirectURI(): string {
		return this.redirectURI;
	}

	public isAuthenticated(): boolean {
		return this.token.isValid();
	}

	public getLoginURL(): string {
		return `${this.authorizationURL}?response_type=${
			this.responseType
		}&grant_type=${this.grantType}&client_id=${
			this.clientID
		}&scope=${encodeURIComponent(
			this.scope
		)}&redirect_uri=${encodeURIComponent(this.redirectURI)}`;
	}

	public getRegistrationURL(): string {
		return `${this.authHost}/register/?redirect_uri=${encodeURIComponent(
			this.redirectURI
		)}`;
	}

	public async getResource(
		scope: string,
		callback: (response: any) => void
	): Promise<void> {
		try {
			const response = await axios.get(this.resourceURL, {
				params: { scope },
				headers: {
					Authorization: `Bearer ${this.token.getValue()}`,
					Accept: "application/json",
				},
			});
			callback(response.data);
		} catch (error) {
			alert("Falha na comunicação com o SUAP");
			console.error(error);
		}
	}

	public login(): void {
		window.location.href = this.getLoginURL();
	}

	public async logout(): Promise<void> {
		try {
			await axios.post(this.logoutURL, {
				token: this.token.getValue(),
				client_id: this.clientID,
			});
			this.token.revoke();
			window.location.href = this.redirectURI;
		} catch (error) {
			alert("Falha na comunicação com o SUAP");
			console.error(error);
		}
	}
}
