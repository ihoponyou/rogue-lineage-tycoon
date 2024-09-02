export abstract class Activity {
	private _isActive = false;
	public start(..._args: unknown[]): void {
		this._isActive = true;
	}
	public stop(): void {
		this._isActive = false;
	}
	public isActive(): boolean {
		return this._isActive;
	}
}
