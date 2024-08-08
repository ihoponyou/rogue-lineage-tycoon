export function charAt(str: string | number, index: number): string {
	return string.char(tostring(str).byte(index)[0]);
}
