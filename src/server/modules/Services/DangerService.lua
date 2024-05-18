local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(ReplicatedStorage.Packages.Trove)

local RagdollService, HealthService

-- responsible for things that pose a danger to the player and their effects
--		- fall damage

local DangerService = Knit.CreateService {
	Name = "DangerService";

	SessionData = {};

	Client = {};
}

local MATH = require(ReplicatedStorage.Source.Modules.MathFunctions)
local CastVisualizer = require(ReplicatedStorage.Source.Modules.CastVisualizer)


local function snipe(character: Model)
	local player = Players:GetPlayerFromCharacter(character)
	local particleAtt = character.Head.ParticleAttachment

	local critted = script.Critted:Clone()
	local sniped = script.Sniped:Clone()
	local crit = script.Crit:Clone()

	critted.Parent = particleAtt
	sniped.Parent = particleAtt
	crit.Parent = particleAtt

	critted:Play()
	sniped:Play()
	crit:Emit(1)

	HealthService.Kill(player)
end

function DangerService.Update(deltaTime: number)
	local DEBUG = false
	for _,character: Model in workspace.Alive:GetChildren() do
		pcall(function()
			local player = Players:GetPlayerFromCharacter(character)
			if not player then return end
			local humanoid: Humanoid = character:FindFirstChild("Humanoid")
			if not humanoid then return end
			local hrp: Part = character:FindFirstChild("HumanoidRootPart")
			if not hrp then return end

			local sessionData = DangerService.SessionData[player.UserId]
			local falling = hrp.AssemblyLinearVelocity.Y < 0
			if false and falling then
				sessionData.AirTime += deltaTime
				if sessionData.AirTime >= 2 then
					snipe(character)
				end
			else
				local nowHeight = hrp.Position.Y

				local deltaHeight = sessionData.StartHeight - nowHeight
				local damage = 3 * (0.07*deltaHeight+0.001*deltaHeight^2)
				if deltaHeight > 15 then
					if DEBUG then
						CastVisualizer.createVisualizer(hrp.Position+Vector3.new(0,deltaHeight,0), hrp.Position, 10)
						print(string.format("fell %d studs (%d -> %d)", MATH.Truncate(deltaHeight, 2), sessionData.StartHeight, nowHeight))
						print(string.format("in %s seconds", MATH.Truncate(sessionData.AirTime, 2)))
					end

					humanoid:TakeDamage(damage)
					if damage > humanoid.MaxHealth*.75 then
						RagdollService.Pop(character)
						HealthService.Kill(player)
					end
				end

				sessionData.AirTime = 0
				sessionData.StartHeight = nowHeight
			end
		end)
	end
end



function DangerService.OnCharacterAdded(character: Model)
	local player = Players:GetPlayerFromCharacter(character)
	if not player then error("???") end

	DangerService.SessionData[player.UserId] = {
		AirTime = 0;
		StartHeight = 0;
	}
end

function DangerService.OnPlayerRemoving(player: Player)
	DangerService.SessionData[player.UserId] = nil
end

function DangerService:KnitInit()
	self._trove = Trove.new()
end

function DangerService:KnitStart()
	HealthService = Knit.GetService("HealthService")
	RagdollService = Knit.GetService("RagdollService")

	self._trove:Connect(RunService.Heartbeat, self.Update)

	game:BindToClose(function()
		self._trove:Destroy()
	end)
end

return DangerService
