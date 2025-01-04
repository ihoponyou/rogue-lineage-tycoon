import { Flamework, Modding } from "@flamework/core";
import { Centurion } from "@rbxts/centurion";
import { CenturionUI } from "@rbxts/centurion-ui";
import Log, { Logger } from "@rbxts/log";
import { ReplicatedStorage } from "@rbxts/services";

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.ignite();

// Cmdr.SetActivationKeys([Enum.KeyCode.RightBracket]);
// Cmdr.Registry.RegisterHook("BeforeRun", beforeRun);

const centurionClient = Centurion.client();
const commandTypeContainer = ReplicatedStorage.src.shared.commands.types;
centurionClient.registry.load(commandTypeContainer);

centurionClient
	.start()
	.then(() => CenturionUI.start(Centurion.client(), {}))
	.catch((err) => warn(`Centurion failed to start: ${err}`));
