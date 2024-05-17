local CastVisualizer = {}

local THICKNESS = 0.05

function CastVisualizer.createVisualizer(from : Vector3, to : Vector3, duration : number)
	local part = Instance.new("Part")
	part.Parent = workspace

	part.Anchored = true
	part.CanCollide = false
	part.CanQuery = false
	part.CanTouch = false

	part.BrickColor = BrickColor.Red()
	part.Material = Enum.Material.Neon
	part.Transparency = 0.8

	local distance = (to-from).Magnitude
	part.Size = Vector3.new(THICKNESS, THICKNESS, distance)
	part.CFrame = CFrame.lookAt(from, to) * CFrame.new(0, 0, -distance/2)

	game.Debris:AddItem(part, duration)

	return part
end

function CastVisualizer.visualizeLineOfSight(from : Vector3, to : Vector3, params : RaycastParams)
	local distance = (to-from).Magnitude
	local ray = workspace:Raycast(from, (to-from), params)

	if ray and distance-ray.Distance > 0.25 then
		CastVisualizer.createVisualizer(from, ray.Position)
	else
		local part = CastVisualizer.createVisualizer(from, to)
		part.BrickColor = BrickColor.Green()
	end
end

function CastVisualizer.visualize(from : Vector3, to : Vector3, params : RaycastParams)
	local part = CastVisualizer.createVisualizer(from, to, 1)
	if workspace:Raycast(from, (to-from) * 1.1, params) then
		part.BrickColor = BrickColor.Green()
	end
end

function CastVisualizer.visualizeBlock(cframe : CFrame, size : Vector3, direction : Vector3, params : RaycastParams)
	local castPart = CastVisualizer.createVisualizer(cframe.Position, cframe.Position+direction, 0.25)
	castPart.Size = Vector3.new(size.X, size.Y, direction.Magnitude)

	local result = workspace:Blockcast(cframe, size, direction, params)

	if result then
		local hitPart = CastVisualizer.createVisualizer(cframe.Position, result.Position, 0.5)
		hitPart.Color = Color3.fromRGB(0,0,255)
		hitPart.Size = Vector3.new(0.25,0.25,0.25)
		hitPart.Position = result.Position

		local resultPart = CastVisualizer.createVisualizer(cframe.Position, result.Position, 0.5)
		resultPart.Color = Color3.fromRGB(0,255,0)
		resultPart.Size = Vector3.new(size.X, size.Y, result.Distance)
		resultPart.CFrame = cframe + direction.Unit * result.Distance/2
	end
end

return CastVisualizer