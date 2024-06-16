local TableFunctions = {}

function TableFunctions.Filter<E>(givenTable: {E}, predicate: (value: E) -> boolean): {E}
	local newTable = {}

	for k, v in givenTable do
		if predicate(v) then
			newTable[k] = v
		end
	end

	return newTable
end

function TableFunctions.Map<E, K>(givenTable: {E}, mapping: (value: E) -> K): {K}
	local newTable = {}

	for k,v in givenTable do
		newTable[k] = mapping(v)
	end

	return newTable
end

function TableFunctions.GetKeys(dict: {[any]: any}): {any}
    local keys = {}

    for k, _ in dict do
        table.insert(keys, k)
    end

    return keys
end

function TableFunctions.DepthFirstSearch(t, needle)
	for key, value in pairs(t) do
		if value == needle then
			return true
		end
		if typeof(value) == "table" then
			return TableFunctions.depthFirstSearch(value, needle)
		end
	end
	return false
end

return TableFunctions
