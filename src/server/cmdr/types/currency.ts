import { Registry, TypeDefinition } from "@rbxts/cmdr";
import { t } from "@rbxts/t";

// TODO: how to do this using the actual type
function isCurrency(value: unknown): boolean {
	return t.union(
		t.literal("Silver"),
		t.literal("Insight"),
		t.literal("Valu"),
		t.literal("Alignment"),
	)(value);
}

const currencyType: TypeDefinition = {
	Transform: (text) => tostring(text),
	Validate: (value) => value !== undefined && isCurrency(value),
	Parse: (value) => value,
	Default: () => "Silver",
};

export = function (registry: Registry) {
	registry.RegisterType("currency", currencyType);
};
