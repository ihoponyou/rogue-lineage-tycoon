// https://github.com/Tesmi-Develop
// https://discord.com/channels/476080952636997633/1250858120679260212/1250859525683019796
import { Dependency, Modding, Reflect } from "@flamework/core";
import { Constructor, AbstractConstructor } from "@flamework/core/out/utility";

type ReturnMethods<T extends object> = ExtractKeys<T, Callback>;
type TMethod<T> = (
	self: InferThis<T>,
	...parameters: Parameters<T>
) => ReturnType<T>;

type GetContextFromConstructors<T> =
	T extends Constructor<infer C>
		? C
		: T extends AbstractConstructor<infer C>
			? C
			: never;

const INJECT_KEY = "Inject";

/** @metadata flamework:type */
export const Inject = (ctor: object, property: string) => {
	const injectedType = Reflect.getMetadata<string>(
		ctor,
		"flamework:type",
		property,
	);
	assert(injectedType, "Injected type not found");

	let injected = Reflect.getMetadata<Map<string, string>>(ctor, INJECT_KEY);

	if (injected) {
		injected.set(property, injectedType);
		return;
	}

	injected = new Map();
	injected.set(property, injectedType);
	Reflect.defineMetadata(ctor, INJECT_KEY, injected);

	ModifyConstructorMethod(
		ctor as Constructor,
		"constructor",
		(originalConstructor) =>
			function (this, ...args: Array<unknown>) {
				const injectProperies = Reflect.getMetadata<
					Map<string, string>
				>(ctor, INJECT_KEY)!;

				injectProperies.forEach((typeId, property) => {
					this[property as never] = Dependency(typeId as never);
				});

				return originalConstructor(this, ...args);
			},
	);
};

export const ModifyConstructorMethod = <
	T extends Constructor | AbstractConstructor,
	C extends Callback = Callback,
>(
	_constructor: T,
	methodName: ReturnMethods<GetContextFromConstructors<T>> | "constructor",
	visitor: (
		originalMethod: TMethod<C>,
	) => (
		this: GetContextFromConstructors<T>,
		...args: Array<unknown>
	) => unknown,
): T => {
	const modifiedMethod = visitor(_constructor[methodName as never]);
	_constructor[methodName as never] = modifiedMethod as never;
	return _constructor;
};
