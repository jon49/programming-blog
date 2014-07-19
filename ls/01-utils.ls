replaceAt = (index, char, string) ->
   | index < 0 =>
      (string.slice 0, index) + char + (string.slice(index + 1))
   | otherwise =>
      (string.slice 0, index) + char + (string.slice(index + 1))

isPattern = (regex, string) -> 
   regex.test string

removeExtension = ->
   it.slice 0, (it.lastIndexOf ".")
