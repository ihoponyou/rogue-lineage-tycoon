export interface Toggleable {
	isEnabled(): boolean;
	toggle(bool: boolean): void;
}
