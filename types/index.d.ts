export type valueof<T> = T[keyof T];

export type KeysOfType<T, V> = {
	[K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];
