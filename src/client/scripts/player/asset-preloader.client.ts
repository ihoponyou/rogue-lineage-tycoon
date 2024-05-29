import { ContentProvider, ReplicatedStorage } from "@rbxts/services";

let animations = 0;
let sounds = 0;
let assets = new Array<Instance>();
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
print(`${animations} animations loaded`);
print(`${sounds} sounds loaded`);