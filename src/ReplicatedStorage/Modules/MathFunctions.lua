local MathFunctions = {}

function MathFunctions.AngleBetween(vectorA: Vector3, vectorB: Vector3): number
	return math.atan2(vectorA:Cross(vectorB).Magnitude, vectorA:Dot(vectorB))
end

function MathFunctions.Lerp(a: number, b: number, alpha: number)
	return a + ((b - a) * alpha)
end

function MathFunctions.Truncate(a: number, places: number): number
	if places < 1 then error("# of places must be positive and nonzero") end
	if type(a) ~= "number" then error(a.." is not a number") end
	if (a % 2 == 0 or a % 2 == 1) then error(a.." does not have decimal values") end
	
	local str = tostring(a)
	local strings = string.split(str, ".")
	local wholes = strings[1]
	local decimals = strings[2]:sub(1,places)
	
	return tonumber(wholes.."."..decimals)
end

return MathFunctions
