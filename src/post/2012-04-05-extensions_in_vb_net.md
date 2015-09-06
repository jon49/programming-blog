---
title: Extensions in VB.NET
tags:
    - vb.net
    - extensions
    - code
---

Learning how to use VB.NET can be quite the leap from VBA, but once you start learning VB.NET and have much more control it’s difficult to want to go back to VBA.

One of the things that I like about VB.NET is methods. Extensions allow you to extend data type methods. So, let’s say you have a String data type (Strings in VB.NET are like a class in and of themselves) and you want it to have the method of appending “]” at the end. So you would have an extension method like so:

``` vbscript
<Extension()>
Public Function AppendCloseBracket(ByRef sString As String) As String
    Return sString & "]"
End Function
```

And then to use it:

``` vbscript
Private Sub UseAppendMethod()

    Dim sString As String = "Hello"

    Debug.Print(sString.AppendCloseBracket)

End Sub
```

Which would result in:

```
Hello]
```

In order to create extionsions you need to import the library:

``` vbscript
Imports System.Runtime.CompilerServices
```

So, how about a more practical example. Through Linq (which is like extensions but much more powerful) you have many more powerful things you can do, which will probably be the topic of a post in the future. But Linq doesn’t do everything and you need a 1D array. So, in the example below I could have created a 1D array instead and then done it with Linq.

``` vbscript
<Extension()>
Public Function FindIndex2DSorted(ByRef oaArray(,) As Object, ByVal oWhat As Object _
                                  , Optional ByVal iSearchIndex As Integer = 0 _
                                  , Optional ByVal eStringCompare _
                                  As StringComparison = StringComparison.CurrentCulture) As Integer                              

    If TypeOf oWhat Is Double Then 'Find index for double type
        Return FindIndex2DSortedDouble(oaArray, CDbl(oWhat), iSearchIndex)
    ElseIf TypeOf oWhat Is String Then  'Find index for string type
        Return FindIndex2DSortedString(oaArray, CStr(oWhat), iSearchIndex, eStringCompare)
    Else 'Find index for object type
        Return FindIndex2DSortedObject(oaArray, oWhat, iSearchIndex)
    End If

End Function
```

``` vbscript
Private Function FindIndex2DSortedDouble(ByVal oaArray As Object(,), ByVal dWhat As Double _
                                         , ByVal iSearchIndex As Integer) As Integer                                        

    Dim i As Integer, lUpperSearch As Integer, lLowerSearch As Integer, lPrevious As Integer, lNext As Integer

    lUpperSearch = oaArray.GetUpperBound(0) : lLowerSearch = 0 : lPrevious = -1
    If dWhat < CDbl(oaArray(0, iSearchIndex)) Then 'If value is the less than the first index then skip
        Return -1
    ElseIf dWhat > CDbl(oaArray(lUpperSearch, iSearchIndex)) Then 'If it is greater than the last index then skip
        Return -3
    Else
        i = -1
    End If

    'Find start indexes
    Do While i = -1
        lNext = (lUpperSearch + lLowerSearch) \ 2 'Get new search location
        If CDbl(oaArray(lNext, iSearchIndex)) < dWhat Then 'Get new lower search location
            lLowerSearch = lNext
        ElseIf CDbl(oaArray(lNext, iSearchIndex)) > dWhat Then 'Get new upper search location
            lUpperSearch = lNext
        Else 'If equal find first instance of item
            i = lNext - 1
            Do While CDbl(oaArray(i, iSearchIndex)) = dWhat
                i -= 1
            Loop
            i += 1
        End If
        If lPrevious = lNext Then 'Get first item
            For i = lLowerSearch To lUpperSearch
                If dWhat = CDbl(oaArray(i, iSearchIndex)) Then
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
