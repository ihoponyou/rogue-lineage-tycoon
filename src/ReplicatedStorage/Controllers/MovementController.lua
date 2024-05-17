local PRINT_DIAGNOSES = false
local PRINT_STARTS = false
local PRINT_STOPS = false
local VISUALIZE = false

local BASE_CLIMB_SPEED = 10
local BASE_WALK_SPEED = 20
local DASH_DURATION = 0.4
local MAX_CLIMB_BONUS = 10 -- bonus for max climb training

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")

local Knit = require(ReplicatedStorage.Packages.Knit)
local Trove = require(ReplicatedStorage.Packages.Trove)

local ActionService, IdentityService, ManaService
local AnimationController, InputController, MagicController

local CastVisualizer = require(ReplicatedStorage.Utility.CastVisualizer)

local MovementController = Knit.CreateController {
	Name = "MovementController"
}

local VFX = ReplicatedStorage.Effects.Visuals
local SFX = ReplicatedStorage.Effects.Sounds

local raycastParams = RaycastParams.new()
raycastParams.FilterType = Enum.RaycastFilterType.Exclude
raycastParams.CollisionGroup = "Characters"
raycastParams.IgnoreWater = true

function MovementController.HasLineOfSight(from : Vector3, to : Vector3, params : RaycastParams)
	local ray = workspace:Raycast(from, (to-from), params)
	return ray and ((to-from).Magnitude-ray.Distance) > 0.1
end

function MovementController:AlignCharacter(deltaTime : number, ray : RaycastResult)
	local hrp = self.Character:FindFirstChild("HumanoidRootPart")

	local newX = ray.Position.X + ray.Normal.X
	local newY = ray.Position.Y + ray.Normal.Y
	local newZ = ray.Position.Z + ray.Normal.Z
	local pos = Vector3.new(newX, newY, newZ)
	local lookAt = ray.Position

	local goal = CFrame.new(pos, lookAt)
	self.GoalPart.CFrame = goal

	hrp.CFrame = hrp.CFrame:Lerp(goal, 1 - 1e-9 ^ deltaTime)
end

function MovementController:ClimbStart(ray : RaycastResult)
	self._climbTrove = Trove.new()

	if PRINT_STARTS then print('start \t\tclimb') end

	MagicController:ChargeMana(false)

	local character = self.Character

	self.ClimbForce = self._climbTrove:Clone(script.ClimbForce)
	self.ClimbForce.Parent = character
	self.ClimbForce.Attachment0 = character.HumanoidRootPart.RootAttachment
	self.ClimbForce.MaxForce = math.huge

	self.GoalPart = self._climbTrove:Clone(script.GoalPart)
	self.GoalPart.Parent = character.HumanoidRootPart

	self.GoalAttachment = self._climbTrove:Add(Instance.new("Attachment"))
	self.GoalAttachment.Parent = self.GoalPart

	self.ClimbConstraint = self._climbTrove:Clone(script.ClimbConstraint)
	self.ClimbConstraint.Parent = character
	self.ClimbConstraint.Attachment0 = character.HumanoidRootPart.RootAttachment
	self.ClimbConstraint.Attachment1 = self.GoalAttachment

	local humanoid = character:FindFirstChild("Humanoid")
	humanoid.AutoRotate = false

	self:AlignCharacter(0, ray)

	humanoid:SetStateEnabled(Enum.HumanoidStateType.Freefall, false)
	humanoid:SetStateEnabled(Enum.HumanoidStateType.Running, false)
	humanoid:ChangeState(Enum.HumanoidStateType.Climbing)

	self._climbTrove:BindToRenderStep("climb_update", Enum.RenderPriority.Character.Value, function(deltaTime)
		self:ClimbUpdate(deltaTime)
	end)

	local input = Vector2.new(InputController.GetAxis("horizontal"), InputController.GetAxis("vertical"))
	if input.Y ~= 0 then
		AnimationController:Play("ClimbUp")
	elseif input.X == 1 then
		AnimationController:Play("ClimbRight")
	elseif input.X == -1 then
		AnimationController:Play("ClimbLeft")
	else
		AnimationController:Play("ClimbIdle")
	end

	self._climbTrove:Connect(UserInputService.InputBegan, function(...)
		AnimationController:HandleClimbAnims(...)
	end)
	self._climbTrove:Connect(UserInputService.InputEnded, function(...)
		AnimationController:HandleClimbAnims(...)
	end)

	self.Climbing = true
	ActionService.ActionStarted:Fire("climb")
end

function MovementController:ClimbStop()
	if PRINT_STOPS then print('stop \t\tclimb') end

	local humanoid = self.Character:FindFirstChild("Humanoid")
	humanoid.AutoRotate = true
	humanoid:SetStateEnabled(Enum.HumanoidStateType.Freefall, true)
	humanoid:SetStateEnabled(Enum.HumanoidStateType.Running, true)

	AnimationController:Stop("ClimbUp")
	AnimationController:Stop("ClimbDown")
	AnimationController:Stop("ClimbLeft")
	AnimationController:Stop("ClimbRight")
	AnimationController:Stop("ClimbIdle")

	game:GetService("ContextActionService"):UnbindAction("handle_climb_anims")

	self.Climbing = false
	self._climbTrove:Destroy()
	ActionService.ActionStopped:Fire("climb")
end

function MovementController:ClimbUp(goal : CFrame)
	if not self.Climbing then return end

	local hrp = self.Character.HumanoidRootPart
	local humanoid = self.Character.Humanoid

	local lookVector = hrp.CFrame.LookVector
	local uVector = hrp.CFrame.UpVector

	hrp.Anchored = true

	goal = goal + lookVector * 0.5 + uVector
	local tween = TweenService:Create(hrp, TweenInfo.new(.25, Enum.EasingStyle.Linear), {CFrame = goal})
	AnimationController:Play("LedgeClimbUp")
	tween:Play()
	self._trove:Connect(tween.Completed, function(playbackState)
		hrp.Anchored = false
		self:ClimbStop()
	end)
end

function MovementController:ClimbUpdate(deltaTime : number)
	if PRINT_DIAGNOSES then print("climb update") end
	local input = Vector2.new(InputController.GetAxis("horizontal"), InputController.GetAxis("vertical"))
	local hrp = self.Character:FindFirstChild("HumanoidRootPart")

	local sessionData = Knit.Player.Data

	local statChanges = sessionData.StatChanges
	local climbBoost = statChanges.ClimbBoost.Value

	local mana = sessionData.ManaAmount.Value
	local climbTrains = 0

	local CLIMB_SPEED = ((-1/1000) * mana * (mana-200) + BASE_CLIMB_SPEED + climbTrains/MAX_CLIMB_BONUS) * (1+climbBoost)

	local lookVector = hrp.CFrame.LookVector
	local rVector = hrp.CFrame.RightVector
	local uVector = hrp.CFrame.UpVector

	local bottomDwn = workspace:Raycast(hrp.Position + Vector3.new(0, -0.5, 0), -uVector, raycastParams)

	if bottomDwn then if PRINT_DIAGNOSES then warn("too close to ground") end self:ClimbStop() end

	local diagonalIn, diagonalOut, sideways
	if input.X ~= 0 then
		local inOrigin	= hrp.Position + rVector *  input.X
		local inPoint  	= hrp.Position + rVector * -input.X + lookVector * 2
		local outOrigin = hrp.Position + rVector * -input.X
		local outPoint 	= hrp.Position + rVector *  input.X + lookVector * 2

		diagonalIn = workspace:Raycast(inOrigin, inPoint-inOrigin, raycastParams)
		diagonalOut = workspace:Raycast(outOrigin, outPoint-outOrigin, raycastParams)
		sideways = workspace:Raycast(hrp.Position, input.X * rVector * 2, raycastParams)
	end
	if VISUALIZE then CastVisualizer.visualize(hrp.Position, hrp.Position+input.X * rVector * 1.5, raycastParams) end

	local blockSize = Vector3.new(hrp.Size.X, hrp.Size.Y/2, 0.1)
	local blockFwd = workspace:Blockcast(hrp.CFrame, blockSize, lookVector * 2, raycastParams)
	if VISUALIZE then CastVisualizer.visualizeBlock(hrp.CFrame, blockSize, lookVector * 2, raycastParams) end

	if not blockFwd and not diagonalIn and not diagonalOut then if PRINT_DIAGNOSES then warn("too far from surface") end self:ClimbStop() end

	local seesTop = false
	local headCastCFrame = hrp.CFrame + uVector * 1.5 - lookVector * 0.5
	local headCastSize = Vector3.new(2,0.1,0.1)
	if not workspace:Blockcast(headCastCFrame, headCastSize, lookVector * 2, raycastParams) then
		seesTop = MovementController.HasLineOfSight(headCastCFrame.Position, hrp.Position + lookVector * 1.5 + Vector3.new(0,1,0), raycastParams)
		if VISUALIZE then CastVisualizer.visualizeLineOfSight(headCastCFrame.Position, hrp.Position + lookVector * 1.5 + Vector3.new(0,1,0), raycastParams) end
	end

	local centerFwd = workspace:Raycast(hrp.Position, lookVector * 2, raycastParams)

	if seesTop then
		local ledgeBlockCFrame = hrp.CFrame * CFrame.Angles(math.rad(-10),0,0) * CFrame.new(0,1,0)
		local ledgeBlockSize = Vector3.new(0.01,2,0.01)
		local ledgeBlockCast = workspace:Blockcast(ledgeBlockCFrame, ledgeBlockSize, lookVector, raycastParams)

		if ledgeBlockCast then
			self:ClimbUp(CFrame.new(ledgeBlockCast.Position) * hrp.CFrame.Rotation)
		else
			if PRINT_DIAGNOSES then warn("ledge missing") end
			self:ClimbStop()
		end
	elseif diagonalIn and not diagonalOut then
		--print(diagonalIn.Instance.CollisionGroup)
		self:AlignCharacter(deltaTime, diagonalIn)
	elseif sideways then
		--print(sideways.Instance.CollisionGroup)
		self:AlignCharacter(deltaTime, sideways)
	elseif centerFwd then
		--print(centerFwd.Instance.CollisionGroup)
		self:AlignCharacter(deltaTime, centerFwd)
	end

	if input.Magnitude > 1 then input = input.Unit end
	self.ClimbForce.VectorVelocity = (rVector * input.X + uVector * input.Y) * CLIMB_SPEED
end

function MovementController:AttemptClimb(ray: RaycastResult): boolean
	if self.Climbing then return end
	if self.Character:GetAttribute("Ragdolled") then return end

	if self.Dashing then self:DashStop() end
	if self.Running then self:RunStop() end

	local hasMana = MagicController:HasMana()
	if not hasMana then return end
	self:ClimbStart(ray)
end

function MovementController:_run(baseSpeed: number)
	AnimationController:Play("Run")
	self.Character.Humanoid.WalkSpeed = baseSpeed * 1.5
end

function MovementController:_manaRun(baseSpeed: number)
	AnimationController:Play("ManaRun")
	self.RunTrail.Enabled = true
	self.Character.Humanoid.WalkSpeed = baseSpeed * 2
end

function MovementController:RunStart(hasMana: boolean)
	if PRINT_STARTS then print('start \t\trun') end

	local statChanges = Knit.Player.Data.StatChanges
	local speedBoost = statChanges.SpeedBoost.Value

	local BASE_PLAYER_SPEED = BASE_WALK_SPEED + speedBoost

	if hasMana then
		MagicController:ChargeMana(false)
		self:_manaRun(BASE_PLAYER_SPEED)
	else
		self:_run(BASE_PLAYER_SPEED)
	end

	self.Running = true
	ActionService.ActionStarted:Fire("run")
end

function MovementController:RunStop()
	if PRINT_STOPS then print('stop \t\trun') end

	local humanoid = self.Character:FindFirstChild("Humanoid")
	local statChanges = Knit.Player.Data.StatChanges
	local speedBoost = statChanges.SpeedBoost.Value
	local BASE_PLAYER_SPEED = BASE_WALK_SPEED + speedBoost

	humanoid.WalkSpeed = BASE_PLAYER_SPEED
	self.RunTrail.Enabled = false
	AnimationController:Stop("ManaRun")
	AnimationController:Stop("Run")

	self.Running = false
	ActionService.ActionStopped:Fire("run")
end

function MovementController:AttemptRun()
	if self.Climbing or self.Running or self.Dashing then return end
	if self.Character:GetAttribute("Ragdolled") then return end

	local hasMana = MagicController:HasMana()
	self:RunStart(hasMana)
end

function MovementController:DashStart(hasMana: boolean)
	if PRINT_STARTS then print('start \t\tdash') end

	local hrp = self.Character:FindFirstChild("HumanoidRootPart")
	self._dashTrove = self._trove:Extend()

	local direction = ""
	if UserInputService:IsKeyDown(Enum.KeyCode.W) then
		self._DashDirection = 0
		direction = "Forward"
	elseif UserInputService:IsKeyDown(Enum.KeyCode.A) then
		self._DashDirection = 90
		direction = "Left"
	elseif UserInputService:IsKeyDown(Enum.KeyCode.D) then
		self._DashDirection = -90
		direction = "Right"
	else
		self._DashDirection = 180
		direction = "Backward"
	end

	self._dashVelocity = self._dashTrove:Add(Instance.new("BodyVelocity"))
	self._dashVelocity.Parent = hrp
	self._dashVelocity.MaxForce = Vector3.new(10e9, 0, 10e9)
	self._dashVelocity.P = 1250
	self._dashVelocity.Velocity = (hrp.CFrame * CFrame.Angles(0, math.rad(self._DashDirection), 0)).lookVector * (hasMana and 60 or 50)

	AnimationController:Play("Dash"..direction)

	if hasMana then
		MagicController:ChargeMana(false)
		self.ManaDashSound:Play()
		self.DashParticles.Enabled = true
	end

	self.Dashing = true
	task.delay(
		DASH_DURATION,
		function()
			self:DashStop()
		end
	)
	self._dashTrove:BindToRenderStep("dash_update", Enum.RenderPriority.Character.Value, function(deltaTime)
		self:DashUpdate(deltaTime)
	end)

	ActionService.ActionStarted:Fire("dash")
end

function MovementController:DashStop()
	if PRINT_STOPS then print('stop \t\tdash') end

	self.DashParticles.Enabled = false

	self.Dashing = false
	self._dashTrove:Destroy()
	ActionService.ActionStopped:Fire("dash")
end

function MovementController:DashUpdate()
	local hrp = self.Character:FindFirstChild("HumanoidRootPart")

	if self._dashVelocity and self.Dashing then
		hrp.CFrame = CFrame.new(hrp.Position, hrp.Position + (workspace.CurrentCamera.CFrame.LookVector * Vector3.new(1, 0, 1)))
		self._dashVelocity.Velocity = (hrp.CFrame * CFrame.Angles(0, math.rad(self._DashDirection), 0)).lookVector * math.round(self._dashVelocity.Velocity.Magnitude)
	else
		self:DashStop()
	end
end

function MovementController:AttemptDash()
	if self.Climbing or self.Dashing then return end
	if self.Character:GetAttribute("Ragdolled") then return end

	if self.Running then self:RunStop() end

	local hasMana = MagicController:HasMana()
	self:DashStart(hasMana)
end

function MovementController:HandleJump()
	local hrp = self.Character:FindFirstChild("HumanoidRootPart")
	local hmnd = self.Character:FindFirstChild("Humanoid")

	if self.Climbing then if PRINT_DIAGNOSES then print("cancel climb") end self:ClimbStop() return end

	local forwardOrigin = hrp.Position
	local forwardRay = workspace:Raycast(forwardOrigin, hrp.CFrame.LookVector * Vector3.new(2, 0, 2), raycastParams)
	if VISUALIZE then CastVisualizer.visualize(forwardOrigin, forwardOrigin + hrp.CFrame.LookVector * Vector3.new(2, 0, 2)) end

	if forwardRay and hmnd.FloorMaterial == Enum.Material.Air then
		local forwardOrigin = hrp.Position
		local forwardRay = workspace:Raycast(forwardOrigin, hrp.CFrame.LookVector * Vector3.new(2, 0, 2), raycastParams)

		if forwardRay and forwardRay.Instance.Anchored and forwardRay.Instance.CanCollide and not forwardRay.Instance:IsA("TrussPart") then
			self:AttemptClimb(forwardRay)
			return
		end
	end
end

function MovementController:OnManaEmptied()
	if self.Running then
		local statChanges = Knit.Player.Data.StatChanges
		local speedBoost = statChanges.SpeedBoost.Value

		local BASE_PLAYER_SPEED = BASE_WALK_SPEED + speedBoost

		self.RunTrail.Enabled = false
		AnimationController:Stop("ManaRun")
		self:_run(BASE_PLAYER_SPEED)
	end

	if self.Climbing then
		--print("mana emptied")
		self:ClimbStop()
	end
end

function MovementController:OnManaColorChanged(color: Color3)
	while not Knit.Player:GetAttribute("IdentityLoaded") or not self.RunTrail or not self.DashParticles do
		RunService.Heartbeat:Wait()
	end

	self.RunTrail.Color = ColorSequence.new(color)
	self.DashParticles.Color = ColorSequence.new(color)
end

function MovementController:OnCharacterAdded(character: Model)
	self.Character = character

	self.Climbing = false

	self.Running = false

	self.RunTrail = self._trove:Clone(VFX.ManaRunTrail)
	self.RunTrail.Parent = character:WaitForChild("Torso")
	self.RunTrail.Attachment0 = character.Torso.BodyFrontAttachment
	self.RunTrail.Attachment1 = character.Torso.BodyBackAttachment
	self.RunTrail.Enabled = false

	self.Dashing = false

	self.DashParticles = self._trove:Clone(VFX.ManaStopParticle)
	self.DashParticles.Parent = character.Torso

	self.ManaDashSound.Parent = character:WaitForChild("HumanoidRootPart")

	raycastParams:AddToFilter(character)
end

function MovementController:OnPlayerAdded(player)
	player.CharacterAdded:Wait()
	local character = player.Character
	raycastParams:AddToFilter(character)
	self._trove:Connect(player.CharacterAdded, function(character)
		raycastParams:AddToFilter(character)
	end)
end

function MovementController:OnPlayerRemoving(player)
	if player == Knit.Player then
		self:Destroy()
	end
end

function MovementController:KnitInit()
	self._trove = Trove.new()

	self.ManaDashSound = self._trove:Clone(SFX.ManaDash)

	for _,player in game.Players:GetPlayers() do
		coroutine.wrap(function() self:OnPlayerAdded(player) end)()
	end
	self._trove:Connect(game.Players.PlayerAdded, function(...) self:OnPlayerAdded(...) end)
end

function MovementController:KnitStart()
	ActionService = Knit.GetService("ActionService")
	IdentityService = Knit.GetService("IdentityService")
	ManaService = Knit.GetService("ManaService")

	AnimationController = Knit.GetController("AnimationController")
	InputController = Knit.GetController("InputController")
	MagicController = Knit.GetController("MagicController")

	if Knit.Player.Character then self:OnCharacterAdded() end
	self._trove:Connect(Knit.Player.CharacterAdded, function(...) self:OnCharacterAdded(...) end)

	self._trove:Connect(IdentityService.ManaColorChanged, function(...) self:OnManaColorChanged(...) end)
	self._trove:Connect(ManaService.ManaEmptied, function(...) self:OnManaEmptied(...) end)

	if PRINT_STARTS then print("MovementController started") end
end

function MovementController:Destroy()
	self._trove:Destroy()
end

return MovementController
