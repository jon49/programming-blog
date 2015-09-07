---
date: 2012-01-12
title: Get Range from Row & Column Numbers
tags:
    - excel
    - range
    - vba
---

Before I created a quite elaborate code to get the column letter from the column numbers. It turns out that it was much easier than I had thought before. So in the code below I’ve simplified it considerably by using the Cells method.

In the function below I use a [function called FindEnd](http://www.spreadsheetbudget.com/2012/01/13/find-last-cell/).

``` vbscript
'RRAnge
' --------------------------------------------------------------
'Comments: This Function returns the desired range.
'
'Arguments: lRow First cell row number.
' lCol First cell column number.
' lRowEnd Last cell row number or column number (negative) to find last row in.
' lColEnd Last cell column number or row number (negative) to find last column in.
' wks Worksheet of range.
'
'Date Developer History
'--------------------------------------------------------------
'Jan 6, 2012 Jon Nyman Initial version
'
Public Function RRAnge(ByVal lRow As Long, ByVal lCol As Long, Optional ByVal lRowEnd As Long = 0 _
    , Optional ByVal lColEnd As Long = 0, Optional ByVal wks As Worksheet = Nothing) As Range
'Determine if worksheet exist, if it doesn’t then set to current location.
    If wks Is Nothing Then Set wks = ActiveWorkbook.ActiveSheet

    'Determine if the last row was set, if it isn’t then get last row number in wks
    If lRowEnd < 1 Then
        If lRowEnd Then
        'If lRowEnd is negative then get the last row in column number lRowEnd
            lRowEnd = FindEnd(Abs(lRowEnd), , wks)
        Else
            'If lRowEnd is 0 then use the range find function to determine last row.
            lRowEnd = FindEnd(, , wks)
        End If
    End If

    'Determine if the last column was set, if it isn’t then get last column number in wks
    If lColEnd < 1 Then
        If lColEnd Then
            'If lColEnd is negative then get the last column in row number lColEnd
            lColEnd = FindEnd(Abs(lColEnd), 2, wks)
        Else
            'If lColEnd is 0 then use the range find function to determine last column.
            lColEnd = FindEnd(, 2, wks)
        End If
    End If

    'Return range, if there is an error then return nothing.
    On Error Resume Next
    With wks
        Set RRAnge = .Range(.Cells(lRow, lCol), .Cells(lRowEnd, lColEnd))
    End With

    If Err.Number Then Set RRAnge = Nothing

End Function
```
