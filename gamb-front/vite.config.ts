import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	console.log("VITE_API_URL:", env.VITE_API_URL);
	console.log("WS_HOST:", env.VITE_WS_HOST);
	console.log("VITE_HOST:", env.VITE_HOST);

	return {
		plugins: [react()],
		server: {
			watch: {
				usePolling: true,
			},
			host: true,
			strictPort: true,
			port: 5173,
		},
	};
});
