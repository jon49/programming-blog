---
date: 2012-07-16
title: Algorithm Resources
tags: 
    - algorithm
    - books
    - reference
    - vb.net
---

<h3>Introduction</h3>
I was reading through Code Complete a classic coding book <a href="http://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670/ref=sr_1_1?ie=UTF8&amp;qid=1342466735&amp;sr=8-1&amp;keywords=code+complete"><em>that is widely considered one of the best practical guides to programming, Steve McConnell’s original CODE COMPLETE has been helping developers write better software for more than a decade</em></a>. And he mentioned algorithm books. What, there exists algorithm books? You mean I don't need to come up with this code all by myself? Combined with the internet to figure out what exactly these algorithms are called, they could be a huge help.
<h3>Resources</h3>
So here is a list of <a href="http://stackoverflow.com/questions/366418/resources-and-tutorials-to-get-started-on-algorithms">resources for algorithms is over at StackOverflow</a>. You can also <a href="http://www.freetechbooks.com/algorithms-and-data-structures-f11.html">find free books online</a>. <a href="http://en.wikipedia.org/wiki/List_of_algorithms">Wikipedia even has a list of algorithms</a>. <a href="http://en.wikibooks.org/wiki/Algorithms">And wikibooks has a well formed book on the subject</a>.
<h3>Application</h3>
So let's see some old code compared to the cleaner new code I grabbed from an algorithm:
<h4>Old code</h4>

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

<h4>New Cleaner Code</h4>

``` vbscript
'https://en.wikipedia.org/wiki/Binary_search_algorithm#Deferred_detection_of_equality

    Public Function BinarySearch(ByRef oaArray(,) As Object, ByVal IsEqual As Func(Of Object, Integer) _
                                , ByVal iSearchColumnIndex As Integer) As Integer

        Dim iMin = 0, iMax = oaArray.GetUpperBound(0)

        '// continually narrow search until just one element remains
        Do While iMin &lt; iMax
            Dim iMid = CInt(Math.Floor((iMin + iMax) / 2))

            '// code must guarantee the interval is reduced at each iteration
            Debug.Assert(iMid &lt; iMax)
            '// note: 0  0 Then
                    iMin += 1
                End If
            End If
            Return -iMin
        End If

    End Function
```
