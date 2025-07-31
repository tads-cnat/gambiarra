export function formatDate(date: Date, formatString: string): string {
	const year = date.getFullYear().toString();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	let formatted = formatString;

	// Substitui cada token, sem regex
	formatted = formatted.split('yyyy').join(year);
	formatted = formatted.split('MM').join(month);
	formatted = formatted.split('dd').join(day);
	formatted = formatted.split('HH').join(hours);
	formatted = formatted.split('mm').join(minutes);
	formatted = formatted.split('ss').join(seconds);

	return formatted;
}
