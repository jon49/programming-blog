---
date: 2012-09-13
title: Sheet Exists
tags:
    - vba
    - excel
    - code
---

I was looking at <a href="http://www.siddharthrout.com">Siddharth Rout's new blog</a> (<a href="http://www.siddharthrout.com/2012/09/10/addingdeleting-sheets-to-the-excel-file/">Adding/Deleting Sheets to the Excel File</a>) and realized that I haven't posted my version of sheet exists. Mine probably does too much per <a href="http://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670/ref=sr_1_1?ie=UTF8&qid=1347565033&sr=8-1&keywords=code+complete">Code Complete</a> standards, but it is nice not to have to think of multiple.

If I were to <a href="http://en.wikipedia.org/wiki/Refactor">refactor</a> this code I would take out the code for the charts and probably just make it work only for checking if the sheet exists and adding a new sheet if it doesn't. I would create a separate function for deleting sheets. But once you have lot's of code written it is difficult to refactor all your code just to change one function (and I use this function quite a bit).

<pre lang="VB">'SheetExists
' --------------------------------------------------------------
'Comments:  This function returns TRUE if the sheet exists in the
'           active workbook and adds new sheet if bAddSheet is true.
'
'Arguments: sSheetName  Name of sheet.
'           bAddSheet   If true adds new sheet, if false returns false.
'
'Return:    Returns true when sheet exists.
'
'Source:    http://www.exceltip.com/st/Determine_if_a_sheet_exists_in_a_workbook_using_VBA_in_Microsoft_Excel/485.html
'Notes:     This was created for use of Jon Nyman and can be distributed by Paciolan.
'           Tristates require reference to "Microsoft Scripting Runtime"
'Date           Developer   History
'--------------------------------------------------------------
'01/13/10       Jon Nyman   Initial version
'11/12/10       Jon Nyman   Changed to use ExistInCollection function, changed all to byref for increased speed.
'04/30/12       Jon Nyman   Added reference to worksheet, so no need to add it later!
Public Function SheetExists(ByVal sSheetName As String, Optional ByVal bAddSheet As Boolean = False, _
    Optional ByVal wkb As Workbook = Nothing, Optional ByVal bCreateChart As Boolean = False _
    , Optional ByVal bDeleteSheet As Boolean = False, Optional ByRef wks As Object) As Tristate
    
    Dim bByRef As Boolean
    
    'Get current workbook that function will be working on.
    bByRef = True
    If wkb Is Nothing Then
        If Not ActiveWorkbook Is Nothing Then
            Set wkb = ActiveWorkbook
            bByRef = False
        Else
            SheetExists = TristateFalse
            GoTo SheetExists_Exit
        End If
    End If
    'Determine if sheet exists
    SheetExists = ExistsInCollection(wkb.Sheets, sSheetName)
    'If sheet exists and delet option is true then delete worksheet without
    'displaying an alert to the user.
    If SheetExists And bDeleteSheet Then
        Application.DisplayAlerts = False
        With wkb.Sheets(sSheetName)
            .Visible = True
            .Delete
        End With
        Application.DisplayAlerts = True
        SheetExists = TristateFalse
    End If
    'If the sheet doesn't exist and the add sheet (or chart) option is checked then
    'add a new sheet with name given.
    If Not SheetExists And bAddSheet Then
        wkb.Activate
        If Not bCreateChart Then
            Set wks = wkb.Sheets.Add
            wks.Name = sSheetName
        Else
            Set wks = wkb.Charts.Add
            wks.Name = sSheetName
        End If
        SheetExists = TristateMixed
    ElseIf SheetExists Then
        Set wks = wkb.Sheets(sSheetName)
    End If
    
SheetExists_Exit:
    If Not bByRef Then Set wkb = Nothing
    
End Function</pre>

<pre lang="VB">'ExistsInCollection
' --------------------------------------------------------------
'Comments:  This procedure deletes names in a workbook.
'
'Arguments: colObject   Collection object.
'           sItem       Item that could be in collection.
'
'Returns:   True when item is in the collection.
'
'Source: Excel 2010: Power Programming with VBA - John Walkenbach - pg. 367
'Notes: This was created by Jon Nyman and can be distributed by Paciolan.
'Date           Developer   History
'--------------------------------------------------------------
'11/12/2010     Jon Nyman   Initial Version
'
Public Function ExistsInCollection(ByRef colObject As Object, ByRef sItem As String) As Boolean

    Dim oObj As Object

    On Error Resume Next
    Set oObj = colObject(sItem)
    ExistsInCollection = Not oObj Is Nothing

    Set oObj = Nothing

End Function</pre>
