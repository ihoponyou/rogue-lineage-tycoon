local BASE_RAGDOLL_DURATION = 1
local PRINT_REQUESTS = false
local MAX_INTERACT_DISTANCE = 7

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(ReplicatedStorage.Packages.Trove)

local Carriable = require(ServerStorage.Source.ServerComponents.Carriable)
local Grippable = require(ServerStorage.Source.ServerComponents.Grippable)

local RagdollService = Knit.CreateService {
	Name = "RagdollService";

	Client = {
		Ragdolled = Knit.CreateSignal();
		PickingUp = Knit.CreateSignal();
		Throwing = Knit.CreateSignal();
		
		CarryRequest = Knit.CreateSignal();
		ForceFeedRequest = Knit.CreateSignal();
		GripRequest = Knit.CreateSignal();
		InjureRequest = Knit.CreateSignal();
	};
}



local function breakJoints(model: Model)
	for _,v: Instance in model:GetDescendants() do
		if v:IsA("Constraint") or v:IsA("JointInstance") then
			v:Destroy()
		end
	end
end

function RagdollService.ToggleRagdoll(character: Model, bool: boolean)
	local torso: Part? = character:FindFirstChild("Torso")
	if not torso then return end
	local humanoid: Humanoid? = character:FindFirstChildWhichIsA("Humanoid")
	if not humanoid then return end
	local hrp = character:FindFirstChild("HumanoidRootPart")
	if not hrp then return end
	
	local ragdolled = character:GetAttribute("Ragdolled")
	if bool and ragdolled then return end
	bool = if bool == nil then not ragdolled else bool
	
	local weld = hrp:FindFirstChild("RagdollWeld")
	if bool and not weld then
		weld = Instance.new("WeldConstraint")
		weld.Parent = hrp
		weld.Name = "RagdollWeld"
		weld.Part0 = hrp
		weld.Part1 = torso
	elseif not bool and weld then
		weld:Destroy()
	end
	
	for _,joint in torso:GetChildren() do
		if joint:IsA("Motor6D") then
			joint.Enabled = not bool
		end
	end

	humanoid.AutoRotate = not bool
	if bool then
		humanoid:ChangeState(Enum.HumanoidStateType.Physics)
	else
		humanoid:ChangeState(Enum.HumanoidStateType.GettingUp)
	end
	
	character:SetAttribute("Ragdolled", bool)
	local player = Players:GetPlayerFromCharacter(character)
	if not player then return end
	RagdollService.Client.Ragdolled:Fire(player, bool)
end

function RagdollService.Pop(character: Model)
	if not character then return end
	print(character.Name, ": POPPED")
	
	breakJoints(character)
	
	--local exploSound = script["collide.wav"]:Clone()
	--exploSound.Parent = character.HumanoidRootPart
	--exploSound:Play()
	
	--local explo = Instance.new("Explosion")
	--explo.Parent = character
	--explo.Position = character:GetPivot().Position
	--explo.BlastPressure = 5e5/4
	--explo.Visible = true
	
	--local processed = {}
	--explo.Hit:Connect(function(part: BasePart, distance: number)
	--	for _,child: Instance in part:GetDescendants() do
	--		local victim: Model? = part.Parent
	--		if not table.find(processed, victim) then
	--			breakJoints(victim)
	--			table.insert(processed, victim)
	--		end
	--	end
	--end)
end


local function checkArgs(player: Player, victim: Model)
	if not victim then error("nil victim") end
	if not player:IsA("Player") then error(tostring(player).." is not a player.") end
	if not victim:IsA("Model") then error(tostring(victim).." is not a Model.") end

	local character = player.Character
	if not character then error(player.Name.." is missing their character.") end

	local distance = (character:GetPivot().Position-victim:GetPivot().Position).Magnitude
	if distance > MAX_INTERACT_DISTANCE then error(player.Name.." too far from "..victim.Name) end

	if not victim:GetAttribute("Knocked") then error(victim.Name.." is not knocked.") end
	if victim:GetAttribute("Dead") then error(victim.Name.." is dead.") end
end

function RagdollService.OnCarryRequest(player: Player, victim: Model)
	checkArgs(player, victim)
	
	local character = player.Character
	
	if PRINT_REQUESTS then print(player, "wants to carry", character) end
	local occupied = character:GetAttribute("ForceFeeding") or character:GetAttribute("Gripping") or character:GetAttribute("Injuring")
	if occupied ~= nil then return end
	
	local carriable = Carriable:FromInstance(victim)
	if not carriable then error(victim:GetFullName().." is not carriable.") end
	
	if not carriable.isCarried then
		carriable:PickUp(player)
	else
		carriable:Release(player)
	end
end

function RagdollService.OnForceFeedRequest(player: Player, victim: Model)
	checkArgs(player, victim)
	
	local character = player.Character
	
	if PRINT_REQUESTS then print(player, "wants to force feed", character) end
	local occupied = character:GetAttribute("Carrying") or character:GetAttribute("Gripping") or character:GetAttribute("Injuring")
	if occupied ~= nil then return end
end

function RagdollService.OnGripRequest(player: Player, victim: Model)
	checkArgs(player, victim)
	
	local character = player.Character
	
	if PRINT_REQUESTS then print(player, "wants to grip", victim) end
	local occupied = character:GetAttribute("Carrying") or character:GetAttribute("ForceFeeding") or character:GetAttribute("Injuring")
	if occupied ~= nil then return end
	
	local castParams = RaycastParams.new()
	castParams.CollisionGroup = "Carried"
	local floorCast = workspace:Raycast(victim:GetPivot().Position, Vector3.new(0, -4, 0), castParams)
	if not floorCast then error(victim:GetFullName().." is mid-air.") end
	
	local grippable = Grippable:FromInstance(victim)
	if not grippable then error(victim:GetFullName().." is not grippable.") end
	
	if not grippable.gettingGripped then
		grippable:Grip(player, floorCast)
	else
		grippable:Release(player)
	end
end

function RagdollService.OnInjureRequest(player: Player, victim: Model)
	checkArgs(player, victim)
	
	local character = player.Character
	
	if PRINT_REQUESTS then print(player, "wants to injure", victim) end
	local occupied = character:GetAttribute("Carrying") or character:GetAttribute("ForceFeeding") or character:GetAttribute("Gripping")
	if occupied ~= nil then return end
end

function RagdollService:KnitInit()
	self._trove = Trove.new()
end

function RagdollService:KnitStart()
	HealthService = Knit.GetService("HealthService")
	
	self._trove:Connect(self.Client.CarryRequest, self.OnCarryRequest)
	self._trove:Connect(self.Client.ForceFeedRequest, self.OnForceFeedRequest)
	self._trove:Connect(self.Client.GripRequest, self.OnGripRequest)
	self._trove:Connect(self.Client.InjureRequest, self.OnInjureRequest)
	
	game:BindToClose(function()
		self._trove:Destroy()
	end)
end

return RagdollService
