export interface Toggleable {
	isEnabled(): boolean;
	enable(): void;
	disable(): void;
}
