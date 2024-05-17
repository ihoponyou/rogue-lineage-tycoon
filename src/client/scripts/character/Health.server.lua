-- Gradually regenerates the Humanoid's Health over time.

local REGEN_RATE = 1/100 -- Regenerate this fraction of MaxHealth per second.
local REGEN_STEP = 2 -- Wait this long between each regeneration step.

----------------------------------------------------------------------------------

local Character = script.Parent
local Humanoid = Character:WaitForChild'Humanoid'

----------------------------------------------------------------------------------
Humanoid.HealthChanged:Connect(print)
while true do
	while Humanoid.Health < Humanoid.MaxHealth do
		local dt = wait(REGEN_STEP)	
		local dh = dt*REGEN_RATE*Humanoid.MaxHealth
		Humanoid.Health = math.min(Humanoid.Health + dh, Humanoid.MaxHealth)
	end
	Humanoid.HealthChanged:Wait()
end