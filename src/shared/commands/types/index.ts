import { TransformResult, TypeBuilder } from "@rbxts/centurion";

export enum CommandArgumentType {
	ItemId = "ItemId",
	SkillId = "SkillId",
	Currency = "Currency",
}

export function createCenturionTypeFromFlameworkGuard<T>(
	typeName: string,
	guardFn: (...args: unknown[]) => boolean,
	suggestionsFn?: (text: string, executor: Player) => string[],
) {
	return TypeBuilder.create<T>(typeName)
		.transform((text) => {
			if (!guardFn(text)) {
				return TransformResult.err(`${text} is an invalid ${typeName}`);
			}
			return TransformResult.ok(text as T);
		})
		.suggestions(suggestionsFn)
		.build();
}
