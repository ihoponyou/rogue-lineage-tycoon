export interface IToggleable {
	isEnabled(): boolean;
	toggle(bool: boolean): void;
}
