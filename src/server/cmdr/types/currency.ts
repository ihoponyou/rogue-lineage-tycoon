import { Registry } from "@rbxts/cmdr";
import { isItemId } from "shared/configs/items";
import { isSkillId } from "shared/configs/skills";
import { isCurrency } from "shared/modules/currency";

export = function (registry: Registry) {
	registry.RegisterType("currency", {
		Validate: isCurrency,
		Parse: tostring,
		Default: () => "Silver",
	});
	registry.RegisterType("itemId", {
		Validate: isItemId,
		Parse: tostring,
	});
	registry.RegisterType("skillId", {
		Validate: isSkillId,
		Parse: tostring,
	});
};
