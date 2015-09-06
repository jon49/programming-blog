---
title: Find Last Cell
tags:
    - vba
    - excel
    - code
---

Finding the last cell is a common thing people look for when they are coding in VBA. I made a function that does this automatically for me when I am looking for the last cell. In conjunction with the <a href="2012/01/12/get-range-from-row-and-column-numbers/">RRange function</a> this simplifies the programming life for VBA significantly.

Heres some example code on how to use the function FindEnd.

``` vbscript
Sub FindEndExamples() 
    Dim l As Long 

    'Find last row in column 2 on current worksheet 
    l = FindEnd(2)
    Debug.Print l 

    'Find last column in row 5 on current worksheet 
    l = FindEnd(5, 2)
    Debug.Print l

    'Find very last row in current worksheet
    l = FindEnd()
    Debug.Print l

    'Find very last column in current worksheet 
    l = FindEnd(, 2) 
    Debug.Print l

End Sub
```

And here's the actual FindEnd Function.

``` vbscript

' --------------------------------------------------------------
'Comments:  This function finds the last row or column in a
'           specified row or colum, if no row or column specified will find last
'           row or column in worksheet.
'
'Arguments: SearchColumnNumber    The row or column to be searched.
'           Row1Col2        1 will find the last row.
'                           2 will find the last column.
'           oRange             Worksheet to be operated on.
'           FindEnd         Returns long
'
'Original Source: http://www.mrexcel.com/forum/showthread.php?t=74317 4/22/2009
'Date           Developer   History
'--------------------------------------------------------------
'04/22/09       Jon Nyman   Initial Version
'03/09/10       Jon Nyman   Changed to returning long instead of integer.  Changed input variable names.
'06/23/10       Jon Nyman   Changed to using "Pivot Table Data Crunching Method" (pg. 202) method of find
'               the last cell in application end.  Added a check to see if last cell is filled.
'07/14/10       Jon Nyman   Added optional workbook.
'11/08/10       Jon Nyman   Added ability to get the last row/column without specifying row or column (using find).
'                           Changed byval to byref to increase speed.
'09/26/11       Jon Nyman   Changed so only need to add worksheet object.
'03/27/12       Jon Nyman   Added ability to find last column or row in a range.
Public Function FindEnd(Optional ByVal SearchColumnNumber As Long = 0, Optional ByVal Row1Col2 As Integer = 1, _
    Optional ByVal oRange As Object = Nothing) As Long
    
    Dim i As Long
    Dim sAddress As String
    
    On Error GoTo ExitFindEnd
    
    If oRange Is Nothing Then
        Set oRange = ActiveSheet
    End If
        
    If Row1Col2 = 2 Then
        If SearchColumnNumber = 0 Then
            FindEnd = oRange.Cells.Find("*", oRange.Range("A1"), xlFormulas, XlLookAt.xlWhole, xlByColumns, xlPrevious, False, False).Column
        Else
            If Mid$(oRange.Parent.Name, Len(oRange.Parent.Name) - 3, 1) = "." Then
                i = 256
            Else
                i = Application.Columns.Count
            End If
            If LenB(oRange.Cells.Item(SearchColumnNumber, i)) > 0 Then
                FindEnd = i
            Else
                FindEnd = CLng(oRange.Range(RangeAddress(SearchColumnNumber, i)).End(xlToLeft).Column)
            End If
        End If
    Else
        If SearchColumnNumber = 0 Then
            FindEnd = oRange.Cells.Find("*", oRange.Range("A1"), xlFormulas, XlLookAt.xlWhole, xlByRows, xlPrevious, False, False).Row
        Else
            If Mid$(oRange.Parent.Name, Len(oRange.Parent.Name) - 3, 1) = "." Then
                i = 65536
            Else
                i = Application.Rows.Count
            End If
            If LenB(oRange.Cells.Item(i, SearchColumnNumber)) > 0 Then
                FindEnd = i
            Else
                FindEnd = CLng(oRange.Range(RangeAddress(i, SearchColumnNumber)).End(xlUp).Row)
            End If
        End If
    End If
    
ExitFindEnd:
If Err.Number <> 0 Then
    FindEnd = -1
End If

End Function
```
