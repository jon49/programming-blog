---
date: 2012-01-20
title: Range Address from Number to Letter
tags:
    - excel
    - range
    - vba
---

Sometimes, before I realize it (and, I’m sure, others too) I do a bunch of work, that turns out that I didn’t need to do before. The RangeAddress function that I created is a perfect example of this. This function goes from a column number to a letter and returns the whole string range address. I started off [with someones else’s code](http://www.excelforum.com/excel-programming/638861-vb-convert-column-letter-to-number.html). I then made it work for me. Their code only worked for Excel 2003 and below. The code below will work for All Excel versions. But there is a better way! The better way is in the [RRange function](http://www.spreadsheetbudget.com/2012/01/12/get-range-from-row-and-column-numbers/) I posted about before. Below this code I’ll show you the basic gist on how to go about it.

``` vbscript
'RangeAddress
' --------------------------------------------------------------
'Comments: This function returns the string address.
'
'Arguments: lRow Row number of first row.
' lColumn Column number of first column.
'
'Date Developer History
'--------------------------------------------------------------
'Feb 14, 2011 Jon Nyman Initial version
'
Public Function RangeAddress(ByRef lRow As Long, ByRef lColumn As Long, _
    Optional ByVal lRow2 As Long = 0, Optional ByVal lColumn2 As Long = 0 _
    , Optional ByVal sAddress As String = vbNullString) As String
    Dim i As Integer
    Dim lColumnNumber As Long
    Dim sColumn As String, sColumn2 As String, sColumnLetter As String

    On Error GoTo RangeAddress_Error

    For i = 0 To 1
        If i = 0 Then
            lColumnNumber = lColumn
        Else
            lColumnNumber = lColumn2
        End If
        sColumnLetter = vbNullString
        If lColumnNumber < 27 Then
            sColumnLetter = Chr(lColumnNumber + 64)
        ElseIf lColumnNumber < 703 Then
            sColumnLetter = Chr((lColumnNumber – 1) \ 26 + 64) & Chr(((lColumnNumber – 1) Mod 26) + 65)
        Else
            sColumnLetter = Chr((lColumnNumber – 27) \ 676 + 64) & Chr(((lColumnNumber – 27) Mod 676) \ 26 + 65) & _
                Chr(((lColumnNumber – 1) Mod 26) + 65)
        End If
        If i = 1 Then
            sColumn2 = sColumnLetter
            Exit For
        Else
            sColumn = sColumnLetter
            If lColumn2 = 0 Then Exit For
        End If
    Next i

    If lRow2 > 0 And lColumn2 > 0 Then
        RangeAddress = "$" & sColumn & "$" & lRow & ":$" & sColumn2 & "$" & lRow2
    ElseIf LenB(sAddress) > 0 Then
        If CountStringOccurance(sAddress, ":") = 1 Then
            i = InStr(1, sAddress, ":")
            sAddress = Right$(sAddress, Len(sAddress) – i + 1)
            RangeAddress = "$" & sColumn & "$" & lRow & sAddress
        Else
            RangeAddress = "$" & sColumn & "$" & lRow
        End If
    Else
        RangeAddress = "$" & sColumn & "$" & lRow
    End If

RangeAddress_Exit:
    On Error Resume Next

    Exit Function

    RangeAddress_Error:

    GoTo RangeAddress_Exit

End Function
```

A better way:

``` vbscript
Sub Example()
    
    Dim iColumn As Integer
    Dim rRng As Range
    Dim sLetter As String
    Dim wks As Worksheet

    'Initialize variables
    iColumn = 35
    Set wks = ActiveSheet

    'Return column letter
    'Note: it is important to work with the a worksheet,
    ' since if the active sheet is a chart then the Cells function would throw an error.
    sLetter = wks.Cells(1, iColumn).Address(False, False)
    sLetter = Left$(sLetter, Len(sLetter) – 1)

    'Bypass even bothering to get the letter in the first place
    With wks
        Set rRng = .Range(.Cells(1, iColumn), .Cells(1, iColumn + 3))
    End With

    'Results
    Debug.Print "Column Letter: " & sLetter & vbNewLine & "Range Address: " & rRng.Address

End Sub
```

Results from Example test above:

```
Column Letter: AI
Range Address: $AI$1:$AL$1
```
