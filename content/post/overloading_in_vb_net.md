---
date: 2012-06-07
title: Overloading in VB.NET
tags:
  - vb.net
  - code
  - overloading
---

In previous posts I showed how you can use <a href="http://www.spreadsheetbudget.com/2012/04/05/extensions-in-vb-net/">Extensions</a> and <a href="http://www.spreadsheetbudget.com/2012/04/14/lambda-expressions-an-introduction/">Lambda Expressions</a> to make some pretty versatile functions in .NET. Today I'll show a method that really helps for the readability and organization of your code.

In the past we used optional parameters to make a function do multiple things. We even needed to make new functions that did pretty much the same thing in order to make it better organized. Well, now we can avoid using those by <a href="http://msdn.microsoft.com/en-us/library/ms973896.aspx">overloading the functions</a>. I still use optional parameters and even new functions but this has been greatly reduced by the ability to overload.

Overloading pretty much works just by writing the same procedure two or more times with different parameters or return values. If you put the procedure in a class you have to use the term "Overloads" in the declaration of the procedure.

Here's how it looks when you call it on your screen when typing out the function name:

[pic name="Overload.png"]

So here's some code that uses overloading:
``` vbscript
Public Function FindIndexSorted(ByRef oaArray(,) As Object, ByVal IsEqual As Func(Of Object, Integer), ByVal iSearchIndex As Integer) As Integer

    Dim iResult As Integer = 0, iTest As Integer, iNext As Integer
    Dim iUpperSearch As Integer = oaArray.GetUpperBound(0)
    Dim iLowerSearch As Integer = 0
    Dim iPrevious As Integer = -1

    Try
        If IsEqual(oaArray(0, iSearchIndex)) &lt; 0 Then 'If value is the less than the first index then skip                 Return -1             ElseIf IsEqual(oaArray(iUpperSearch, iSearchIndex)) &gt; 0 Then 'If it is greater than the last index then skip
            Return -(iUpperSearch + 1)
        Else
            iResult = -1
        End If

        'Find start indexes
        Do While iResult = -1
            iNext = (iUpperSearch + iLowerSearch) \ 2 'Get new search location
            iTest = IsEqual(oaArray(iNext, iSearchIndex))
            If iTest &gt; 0 Then 'Get new lower search location
                iLowerSearch = iNext
            ElseIf iTest &lt; 0 Then 'Get new upper search location                     iUpperSearch = iNext                 Else 'If equal find first instance of item                     iResult = iNext - 1                     If iResult &gt; -1 Then
                    Do While IsEqual(oaArray(iResult, iSearchIndex)) = 0
                        iResult -= 1
                        If iResult = -1 Then Exit Do
                    Loop
                End If
                iResult += 1
            End If
            If iPrevious = iNext Then 'Get first item
                If IsEqual(oaArray(iLowerSearch, iSearchIndex)) &lt; 0 Then Return -(iLowerSearch - 1)
                iTest = IsEqual(oaArray(iUpperSearch, iSearchIndex))
                If iTest &lt; 0 Then
                    Return -(iUpperSearch - 1)
                ElseIf iTest = 0 Then
                    Return iUpperSearch
                End If
            Else
                iPrevious = iNext
            End If
        Loop
    Catch ex As InvalidCastException
        iResult = -1
    End Try

    Return iResult

End Function
```

And here's some code that makes the previous function easier to use, but I still have the previous code exposed so, if I want some custom when I call the function I could use it, or I could just use the simplified version below, all with the same name.

``` vbscript
Public Function FindIndexSorted(ByRef oaArray(,) As Object, ByVal oWhat As Object _
                                  , Optional ByVal iSearchIndex As Integer = 0 _
                                  , Optional ByVal eStringCompare _
                                  As StringComparison = StringComparison.CurrentCulture) As Integer

    If TypeOf oWhat Is Double Then  'Use double type comparison.
        Dim dWhat As Double = CDbl(oWhat)
        Return FindIndexSorted(oaArray, Function(a As Object) If(CDbl(a) &gt; dWhat, -1, If(CDbl(a) = dWhat, 0, 1)), iSearchIndex)
    ElseIf TypeOf oWhat Is String Then  'Use string type comparison.
        Dim sWhat As String = oWhat.ToString
        Return FindIndexSorted(oaArray, Function(a As Object) String.Compare(CStr(a), sWhat, eStringCompare), iSearchIndex)
    ElseIf IsNumeric(oWhat) Then
        Dim dWhat As Double = CDbl(oWhat)
        Return FindIndexSorted(oaArray, Function(a As Object) If(CDbl(a) &gt; dWhat, -1, If(CDbl(a) = dWhat, 0, 1)), iSearchIndex)
    Else
        'Not set up for other types of data.
        Return -1
    End If

End Function
```
