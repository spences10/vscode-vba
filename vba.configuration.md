Note there  are 4 patterns:

```
increaseIndentPattern
decreaseIndentPattern
indentNextLinePattern
unIndentedLinePattern
```

See https://github.com/microsoft/vscode/issues/17868

## increaseIndentPattern

```
(^|:)[ \t]*\b(
    (while|case|select[ \t]+case|for|open)\b.*
   |((public|private|friend)[ \t]+)?(property|enum|function|sub)\b.*
   |(if[ \t]+.*[ \t]+then[ \t]*[^' \t]*)
   |(on[ \t]+error[ \t]+((goto[ \t]+[^0].*)|resume[ \t]+next))\b
   |(do)\b
)([ \t]*'.*$|$|:)
```

### Final regex

```
(^|:)[ \t]*\b((while|case|select[ \t]+case|for|open)\b.*|((public|private|friend)[ \t]+)?(property|enum|function|sub)\b.*|(if[ \t]+.*[ \t]+then[ \t]*[^' \t]*)|(on[ \t]+error[ \t]+((goto[ \t]+[^0].*)|resume[ \t]+next))\b|(do)\b)([ \t]*'.*$|$|:)
```

### Test set

```vb
Public Property Let Width(fWidth as Double)
  pWidth = fWidth

  'Change cell's width
  Dim cell as uiElement
  For each cell in pCells
    cell.width = fWidth
  next
End Property


'Get/Set value from element
'@example
'ElementData(control) = "Yes"                            i.e. "Yes" ==> True
'data = ElementData(control)    'data now contains "Yes" i.e. True  ==> "Yes"
Public Property Get ElementData(ByRef element as uiElement) as variant
  Dim v: v = element.value
  RaiseEvent EncodeControlValue(v)
  GetElementData = v
End Property
Public Property Let ElementData(ByRef element as uiElement, ByVal v as Variant)
  RaiseEvent DecodeControlValue(v)
  element.value = v
End Property

'Get collection
Public Property Get Cells() as Collection
  set Cells = pCells
End Property

Public Property Get Meta() as Object
  if pMeta is nothing then set pMeta = CreateObject("Scripting.Dictionary") 'shit
  if pMeta is nothing then  'asd
  select case
    case a
    case b
    case else
  end select
  for i = 1 to 10
  next
  do
  loop until x=2

  do
  loop while x=1
  
public enum
public function
private property
friend sub
crap:  on error goto 10
on error resume next
open file as #1
End Property
```

### Formatted regex

```
```
(^|:)[ \\t]*\\b((while|case|select[ \\t]+case|for|open)\\b.*|((public|private|friend)[ \\t]+)?(property|enum|function|sub)\\b.*|(if[ \\t]+.*[ \\t]+then[ \\t]*[^' \\t]*)|(on[ \\t]+error[ \\t]+((goto[ \\t]+[^0].*)|resume[ \\t]+next))\\b|(do)\\b)([ \\t]*'.*$|$|:)
```
```
