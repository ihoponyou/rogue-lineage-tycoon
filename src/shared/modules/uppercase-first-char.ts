export function uppercaseFirstChar(str: string): string {
	return str.gsub("^%l", string.char(str.byte(1)[0]).upper(), 1)[0];
}
