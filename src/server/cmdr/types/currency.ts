import { Registry, TypeDefinition } from "@rbxts/cmdr";
import { t } from "@rbxts/t";

// TODO: how to do this using the actual type
const isCurrency = t.union(
	t.literal("Silver"),
	t.literal("Insight"),
	t.literal("Valu"),
	t.literal("Alignment"),
);

const currencyType: TypeDefinition = {
	Validate: (value) => value !== undefined && isCurrency(value),
	// Autocomplete: (value) =>
	// 	$tuple(["Silver", "Insight", "Valu", "Alignment"], { IsPartial: true }),
	Parse: (value) => tostring(value),
	Default: () => "Silver",
};

export = function (registry: Registry) {
	registry.RegisterType("currency", currencyType);
};
