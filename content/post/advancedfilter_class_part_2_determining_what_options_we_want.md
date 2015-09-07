---
date: 2012-02-15
title: AdvancedFilter Class Part 2
subTitle: Determining What Options We Want
tags:
    - excel
    - code
    - vba
    - advanced-filter
---

The first thing we’ll want to do is determine what macro options we would like in the class.

The options I currently have are:

1. Range to filter (optional – can use current range instead).
2. Filter location (optional – if you are using an add-in then you can place in there, otherwise can put in temporary sheet).
3. Filter action (copy to new range or filter in place (default)).
4. Get unique items from a column (will need to use different method than AdvancedFilter).
5. Copy unique to range.
6. Return  filtered data in variant array.
7. Return  filtered  data as range.

So let’s get started. First we’ll need the properties in the class, I’ll call “Search.” Notice how I’ve left many of the properties as write only, since I’m not anticipating needing to retrieve that data later.

``` vbscript
'—————————————————————
'Class Property Procedures
'—————————————————————
Property Set RangeToFilter(ByVal rRangeToFilter As Range)

    Dim iOffset As Integer
    Dim i As Long
    Dim vHeaders As Variant

    Set mrOriginal = rRangeToFilter
    iOffset = mrOriginal.Resize(1, 1).Column – 1
    'Get headers
    vHeaders = Application.Transpose(mrOriginal.Resize(1).Value2)

   '    mdicHeaders.RemoveAll: Set mdicHeaders = Nothing
'    Set mdicHeaders = New Dictionary

    For i = LBound(vHeaders) To UBound(vHeaders)
        If LenB(vHeaders(i)) > 0 Then
'            If Not mdicHeaders.Exists(CStr(vHeaders(i))) Then
'                mdicHeaders.Add CStr(vHeaders(i)), Replace$(RangeAddress(2, i + iOffset), “$”, vbNullString)
'            End If
        End If
    Next i

End Property
Property Set FilterLocation(ByRef rFilterLocation As Range)
    Set mrFilterLocation = rFilterLocation
End Property
Property Let FilterAction(ByVal xFilterAction As XlFilterAction)
    mxFilterAction = xFilterAction
End Property
Property Let ColumnUnique(ByVal iColumnForUniqueValuesSearch As Integer)
    miColumnUnique = iColumnForUniqueValuesSearch
End Property
Property Get CopyUniqueTo() As Range
    Set CopyUniqueTo = mrCopyTo
End Property
Property Set CopyUniqueTo(ByVal rCopyUniqueValuesToRange As Range)
    Set mrCopyTo = rCopyUniqueValuesToRange
End Property
Property Get IncludeHeaderInResults() As Boolean
    IncludeHeaderInResults = mbIncludeHeader
End Property
Property Let IncludeHeaderInResults(ByVal bHeaderInResults As Boolean)
    mbIncludeHeader = bHeaderInResults
End Property
```

We also need our module level variables:

``` vbscript
Private mrOriginal As Range             'Range to be filtered.
Private mrFound As Range                'Filtered Range.
Private mrFilterLocation As Range       'Filter data location/Range.
Private mxFilterAction As XlFilterAction    'Desired filter action – default xlFilterInPlace.
Private miColumnUnique As Integer       'Get unique values of filtered data from single column.
Private mrCopyTo As Range               'Place unique data in this location.
Private mbIncludeHeader As Boolean      'Includes the header in the found range.
```

Finally, we’ll need to initialize and terminate some variables when creating and terminating a class:

``` vbscript
'Class_Initialize
' ————————————————————–
'Comments:  This procedure initializes the class.
'
'Date           Developer   History
'————————————————————–
'10/21/2010     Jon Nyman   Initial Version
'
Private Sub Class_Initialize()

'Set mdicSearchTerms = New Dictionary
    Set mrOriginal = Selection.CurrentRegion
    mxFilterAction = xlFilterInPlace
    miColumnUnique = 0
    mbIncludeHeader = False
    'Set mvAndOr = Nothing

End Sub

'Class_Terminate
' ——————————————————————————————————————
'Comments:  This procedure closes down the class.
'
'Date       Developer   History
' ——————————————————————————————————————
'10/21/10   Jon Nyman   Initial Version
'
Private Sub Class_Terminate()

    If Not mrFilterLocation Is Nothing Then mrFilterLocation.ClearContents

    'Set mdicSearchTerms = Nothing
    Set mrOriginal = Nothing: Set mrCopyTo = Nothing
    Set mrFilterLocation = Nothing: Set mrFound = Nothing
    'Set mvAnd = Nothing: Set mvAndOr = Nothing: Set mvOr = Nothing: Set mvShuffle = Nothing
    'Set mvOffset = Nothing

End Sub
```

Next time I’ll go over some of the commented out code, like the dictionary that I’ll use for my collection object.
