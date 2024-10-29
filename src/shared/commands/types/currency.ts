import { TransformResult, TypeBuilder } from "@rbxts/centurion";
import { Currency, isCurrency } from "shared/modules/currency";

const currencyType = TypeBuilder.create<Currency>("currency")
	.transform((text) => {
		if (!isCurrency(text)) {
			return TransformResult.err(`${text} is an invalid Currency`);
		}
		return TransformResult.ok(text);
	})
	.build();
