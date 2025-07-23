import { useLocation } from "react-router-dom";
import { breadcrumbMap } from "../utils/breadcrumbMap";

export default function useBreadcrumbs() {
	const { pathname } = useLocation();
	const segments = pathname.split("/").filter(Boolean);
	const crumbs: { label: string; href: string; }[] = [];

	for (let i = 0; i < segments.length; i++) {
		const path = "/" + segments.slice(0, i + 1).join("/");

		const isId = /^\d+$/.test(segments[i]);
		const normalizedPath = isId ? "/" + segments.slice(0, i).join("/") : path;

		
		const alreadyExists = crumbs.some(c => c.href === normalizedPath);
		if (alreadyExists) continue;

		const label = breadcrumbMap[normalizedPath];

		if (label) {
			crumbs.push({ label, href: normalizedPath });
		}
	}

	return crumbs;
}
