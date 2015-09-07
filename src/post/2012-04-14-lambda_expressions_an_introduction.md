---
title: Lambda Expressions
subTitle: An Introduction
tags:
    - vb.net
    - extensions
    - code
---

Another thing that I like about programming in .NET beyond <a href="http://www.spreadsheetbudget.com/2012/04/11/linq-an-introduction/">LINQ</a> and <a href="http://www.spreadsheetbudget.com/2012/04/05/extensions-in-vb-net/">Extensions</a> is <a href="http://msdn.microsoft.com/en-us/magazine/cc163362.aspx">lambda expressions</a>. (It should be noted that LINQ, Extensions, and lambda expressions are all related). Lambda expressions are "are callable entities that are defined within a function, you can return a lambda expression from a function and you can pass lambda expressions to other functions." Lambda expressions come with the System.Core library, so no need to add a reference nor Imports at the top of your class.

Lambda expressions simplify your code by allowing you to call internal functions within functions, even create "function variables." To get a full overview read the link on <a href="http://msdn.microsoft.com/en-us/magazine/cc163362.aspx">lambda expressions</a>.

Let's take the <a href="http://www.spreadsheetbudget.com/2012/04/05/extensions-in-vb-net/">extension examples</a> I used before, but simplify it with lambda expressions. Before I had to create multiple private functions to accommodate different comparison types (e.g., String, Double, Object, etc). But with lambda expressions I can create local functions that take care of this, which lessons the amount of code and makes the code cleaner.

So let’s dive into some code. First I needed to create a delegate function which accepts multiple types of input and returns an integer.

    Delegate Function MoreLessOrEqual(Of T)(ByVal element As T) As Integer
I then created a pointer function which determines which internal function I should use depending on what type of data is received. Notice the lambda expressions written as `Function(a As Object)….`

``` vbscript
<Extension()>
Public Function FindIndex2DSorted(ByRef oaArray(,) As Object, ByVal oWhat As Object _
                                  , Optional ByVal iSearchIndex As Integer = 0 _
                                  , Optional ByVal eStringCompare _
                                  As StringComparison = StringComparison.CurrentCulture) As Integer

    If TypeOf oWhat Is Double Then  'Use double type comparison.
        Dim dWhat As Double = CDbl(oWhat)
        Return FindIndex2DSortedLambda(oaArray, Function(a As Object) If(CDbl(a) > dWhat, -1, If(CDbl(a) = dWhat, 0, 1)) _
                                , iSearchIndex)
    ElseIf TypeOf oWhat Is String Then  'Use string type comparison.
        Dim sWhat As String = oWhat.ToString
        Return FindIndex2DSortedLambda(oaArray, Function(a As Object) String.Compare(CStr(a), sWhat, eStringCompare) _
                                , iSearchIndex)
    Else    'Not set up for other types of data.
        Return -1
    End If

End Function
```

In this private function I call the lambda expressions as defined in the function parameters as `IsEqual.`

``` vbscript
Private Function FindIndex2DSortedLambda(ByVal oaArray As Object(,), ByVal IsEqual As MoreLessOrEqual(Of Object) _
                            , ByVal iSearchIndex As Integer) As Integer                                                            

    Dim i As Integer, lUpperSearch As Integer, lLowerSearch As Integer, lPrevious As Integer, lNext As Integer

    lUpperSearch = oaArray.GetUpperBound(0) : lLowerSearch = 0 : lPrevious = -1

    If IsEqual(oaArray(0, iSearchIndex)) < 0 Then 'If value is the less than the first index then skip
        Return -1
    ElseIf IsEqual(oaArray(lUpperSearch, iSearchIndex)) > 0 Then 'If it is greater than the last index then skip
        Return -3
    Else
        i = -1
    End If

    'Find start indexes
    Dim iResult As Integer
    Do While i = -1
        lNext = (lUpperSearch + lLowerSearch) \ 2 'Get new search location
        iResult = IsEqual(oaArray(lNext, iSearchIndex))
        If iResult > 0 Then 'Get new lower search location
            lLowerSearch = lNext
        ElseIf iResult < 0 Then 'Get new upper search location
            lUpperSearch = lNext
        Else 'If equal find first instance of item
            i = lNext - 1
            Do While IsEqual(oaArray(i, iSearchIndex)) = 0
                i -= 1
            Loop
            i += 1
        End If
        If lPrevious = lNext Then 'Get first item
            For i = lLowerSearch To lUpperSearch
                If IsEqual(oaArray(i, iSearchIndex)) = 0 Then
                    Return i
                End If
            Next
            Return -2
        Else
            lPrevious = lNext
        End If
    Loop

    Return i

End Function
```

Note that I could make the private function the a public extension. By doing that I could then easily create more elaborate searches, e.g., I could search for the index of a string with the first three letters equal to “ABC” like below.

``` vbscript
Dim sWhat As String = oWhat.ToString.Substring(0, 3)
Return FindIndex2DSortedLambda(oaArray, Function(a As Object) String.Compare(a.ToString.Substring(0, 3), sWhat, eStringCompare) _
    , iSearchIndex)
```
