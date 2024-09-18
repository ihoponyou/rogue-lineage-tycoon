import { ContentProvider, ReplicatedStorage } from "@rbxts/services";

const VERBOSE = false;

let animations = 0;
let sounds = 0;
const assets = new Array<Instance>();
// TODO: make dedicated asset folder
for (const asset of ReplicatedStorage.GetDescendants()) {
	if (asset.IsA("Animation")) {
		animations++;
	} else if (asset.IsA("Sound")) {
		sounds++;
	} else {
		continue;
	}

	assets.push(asset);
}

ContentProvider.PreloadAsync(assets);
if (VERBOSE) print(`${animations} animations loaded`);
if (VERBOSE) print(`${sounds} sounds loaded`);
