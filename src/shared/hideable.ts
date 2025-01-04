export interface Hideable {
	isHidden(): boolean;
	toggleHidden(bool?: boolean): void;
}
