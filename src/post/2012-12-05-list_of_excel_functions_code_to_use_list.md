---
title: List of Excel Functions - Code To Use List
tags:
    - code
    - vba
    - excel
    - excel-functions
---

I saw a few people were downloading <a href="2012/08/27/list-of-excel-functions/">my list of Excel functions that I created</a>. I thought it might be useful show the code that I use to get that data to a manageable format. Although the code is written in VB.NET it should be easily converted to VBA.

[wpdm_file id=3]

I use a simple structure (type in VBA) for the data.

<pre lang="VB">
    Private Structure ExcelFunctionInfo
        Dim Name As String
        Dim Category As String
        Dim ExcelVersion As Integer
        Dim Description As String
        Dim Syntax As String
        Dim URL As String
    End Structure
</pre>

I then just loop through the data in the string that was gotten from the text file.

<pre lang="VB">
    ''' <summary>
    ''' Takes string of Excel functions and puts it into dictionary.
    ''' </summary>
    ''' <param name="sExcelFunctions">String of Excel functions</param>
    ''' <param name="iExcelVersion_Descriptive">Descriptive version of Excel</param>
    ''' <returns>Dictionary of Excel functions.</returns>
    ''' <remarks>Jon Nyman 20120920</remarks>
    Private Function GetExcelFunctionsFromTextToDictionary(ByVal sExcelFunctions As String _
                    , ByVal iExcelVersion_Descriptive As Integer) As Dictionary(Of String, List(Of ExcelFunctionInfo))

        Dim dicExcelFunctions As New Dictionary(Of String, List(Of ExcelFunctionInfo))

        For Each sLine In sExcelFunctions.Split(CChar(vbLf))
            Dim sEachTab = sLine.Split(CChar(vbTab))
            Dim xlFuncs As ExcelFunctionInfo
            If sEachTab.Length = 6 AndAlso CInt(sEachTab(0)) <= iExcelVersion_Descriptive Then
                xlFuncs.Name = sEachTab(1)
                xlFuncs.ExcelVersion = CInt(sEachTab(0))
                xlFuncs.URL = sEachTab(5)
                xlFuncs.Syntax = sEachTab(4)
                xlFuncs.Category = sEachTab(2)
                xlFuncs.Description = sEachTab(3)
                If Not dicExcelFunctions.ContainsKey(xlFuncs.Name) Then
                    Dim lst = New List(Of ExcelFunctionInfo)
                    lst.Add(xlFuncs)
                    dicExcelFunctions.Add(xlFuncs.Name, lst)
                Else
                    Dim lst = dicExcelFunctions(xlFuncs.Name)
                    lst.Add(xlFuncs)
                    dicExcelFunctions(xlFuncs.Name) = lst
                End If
            End If
        Next

        Return dicExcelFunctions

    End Function
</pre>

This is where I read the text file.

<pre lang="VB">
    ''' <summary>
    ''' Gets excel functions from text document and put it in dictionary.
    ''' </summary>
    ''' <param name="sxlAppVersion">Excel app version.</param>
    ''' <returns>Dictionary of excel functions list.</returns>
    ''' <remarks>Jon Nyman 20120920</remarks>
    Private Function LoadExcelFunctions(ByVal sxlAppVersion As String) As Dictionary(Of String, List(Of ExcelFunctionInfo))

        Dim sExcelFunctions = My.Resources.ExcelFunctionsListCleaned

        'Excel Functions
        Return GetExcelFunctionsFromTextToDictionary(sExcelFunctions, CExcel.GetExcelVersion_Descriptive(sxlAppVersion, 11))

    End Function
</pre>
