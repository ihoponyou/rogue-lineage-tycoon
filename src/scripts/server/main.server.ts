import { Flamework, Modding } from "@flamework/core";
import { Centurion } from "@rbxts/centurion";
import Log, { Logger } from "@rbxts/log";
import { ReplicatedStorage, ServerStorage } from "@rbxts/services";

Log.SetLogger(Logger.configure().WriteTo(Log.RobloxOutput()).Create());

Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/server/components");

Modding.registerDependency<Logger>((ctor) => Log.ForContext(ctor));

Flamework.ignite();

// Cmdr.RegisterTypesIn(ServerStorage.src.cmdr.types);
// Cmdr.RegisterHook("BeforeRun", beforeRun);
// Cmdr.RegisterDefaultCommands();
// Cmdr.RegisterCommandsIn(ServerStorage.src.cmdr.commands);

const centurionServer = Centurion.server();

const commandTypeContainer = ReplicatedStorage.src.shared.commands.types;
centurionServer.registry.load(commandTypeContainer);

const commandContainer = ServerStorage.src.commands;
centurionServer.registry.load(commandContainer);

centurionServer.start();
