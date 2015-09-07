---
date: 2012-01-04
title: Import Data from Excel to VBA
tags:
    - vba
    - excel
    - code
---

I've always wanted a function that can get me data from excel in a format that will always be the same. Sometimes I get the data and I expect a 2D variant array but instead get a string or double value. So I created a function to make it easy for myself, getting the same format that I expect.

``` vbscript
'ImportExcelData
' --------------------------------------------------------------
'Comments:  This Function imports excel data in different formats (1D, 2D, or String).
'
'Arguments: rRng  Range to be imported.
'           i1D_2D_Str3 Type of import, 1=1D, 2=2D, and 3=String
'           iValueType  Import type .Value (Excel checks for different types)
'                       or .Value2 (Excel retrieves all values as string or double)
'           sDelimiter  Delimiter to use for string value that is returned.
'
'Notes:     This was created for use of Jon Nyman and can be distributed by Paciolan.
'Date           Developer   History
'--------------------------------------------------------------
'Dec 30, 2011   Jon Nyman   Initial version     www.SpreadsheetBudget.com
'
Public Function ImportExcelData(ByRef rRng As Range, Optional ByVal i1D_2D_Str3 As Integer = 2 _
        , Optional iValueType As Integer = 2, Optional ByVal sDelimiter As String = "`") As Variant

    Dim i As Long, j As Long
    Dim saData() As String, sData As String
    Dim vaData(1 To 1, 1 To 1) As Variant, va1D() As Variant
    Dim vData As Variant
    
    'Get data by Value or Value2
    If iValueType = 2 Then
        vData = rRng.Value2
    Else
        vData = rRng
    End If
    'If data is single cell then put in 2D
    If rRng.Cells.Count = 1 Then
        vaData(1, 1) = vData
        vData = vaData
    End If
    
    If i1D_2D_Str3 = 2 Then
        'Return 2D results
        ImportExcelData = vData
    ElseIf i1D_2D_Str3 = 3 Then
        'Concatenate 2D results and return string.
        If rRng.Columns.Count > 1 Then
            sData = vbNullString
            ReDim saData(1 To UBound(vData, 2))
            For i = 1 To UBound(vData)
                For j = 1 To UBound(vData, 2)
                    saData(j) = CStr(vData(i, j))
                Next j
                sData = sData & Join(saData, sDelimiter) & vbNewLine
            Next i
            ImportExcelData = Left$(sData, Len(sData) - 1)
        Else
            'Concatenate 1D results and return string
            ReDim saData(1 To UBound(vData))
            For i = 1 To UBound(vData)
                saData(i) = vData(i, 1)
            Next i
            ImportExcelData = Join(saData, sDelimiter)
        End If
    Else
        'Dimension 1D result variant array.
        ReDim va1D(1 To UBound(vData) * UBound(vData, 2))
        'Create 1D out of 2D
        If rRng.Columns.Count > 1 Then
            For i = 1 To UBound(vData)
                For j = 1 To UBound(vData, 2)
                    va1D((i - 1) * UBound(vData, 2) + j) = vData(i, j)
                Next j
            Next i
        Else
            For i = 1 To UBound(vData)
                va1D(i) = vData(i, 1)
            Next i
        End If
        ImportExcelData = va1D
    End If
  
End Function
```
