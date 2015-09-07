---
title: Generic Types
tags:
  - vb.net
  - code
  - generic-types
---

Last time we went over <a href="2012/06/07/overloading-in-vb-net/">Overloading</a> function in .NET. Today we'll take a look at <a href="http://msdn.microsoft.com/en-us/library/w256ka79.aspx">generics</a>. I had been wondering how to do this for some time, seeing that I could do it with Microsoft's built in code. I have to say, it is pretty nice and really makes coding much easier and cleaner.

<blockquote>A generic type is a single programming element that adapts to perform the same functionality for a variety of data types. When you define a generic class or procedure, you do not have to define a separate version for each data type for which you might want to perform that functionality.</blockquote>

So take a look at this code where I parse data from Excel and put it into a class. I put it into any class I want to.

``` vbscript
'Loop through items and send to action, e.g., put into a class, using function.
<Extension()>
Public Function Parse(Of TSource)(ByRef oArray(,) As Object, ByVal conversion As Func(Of Object(), TSource), ByVal iRowStart As Integer _
                                    , ByVal iRowEnd As Integer, ByVal iColStart As Integer _
                                    , ByVal iColEnd As Integer) As TSource()
    Try
        Dim tArray(iRowEnd - iRowStart) As TSource
        Dim o1Array(iColEnd - iColStart) As Object

        For i As Integer = iRowStart To iRowEnd
            For j As Integer = iColStart To iColEnd
                o1Array(j - iColStart) = oArray(i, j)
            Next
            tArray(i) = conversion(o1Array)
        Next

        Return tArray

    Catch ex As System.IndexOutOfRangeException
        Throw New System.IndexOutOfRangeException
    End Try

End Function</pre>
```

And here's how I would call it. Here I get the date range in the time card and put that information in my class that organizes the time card date information. The enumeration <i>CSettings.BUTimeCardHeadings</i> tells me where the heading is located in Excel so I don't have to remember the actual column. When I grab the data, Excel-DNA puts it in zero-based two dimensional array, hence the minus 1.

``` vbscript
Dim oaDates = moaJobs.FindAllSorted(mdteDate.ToOADate(), CSettings.BUTimeCardHeadings.tcDate - 1)
    AddCItems(oaDates _
                  .Parse(Of CItem)(Function(o) _
                  New CItem( _
                      CastOrDefault(Of Double)(o(CSettings.BUTimeCardHeadings.tcHours - 1), 0.0#) _
                      , CastOrDefault(Of Double)(o(CSettings.BUTimeCardHeadings.tcClockIn - 1), 0.0#) _
                      , If(Not IsNothing(o(CSettings.BUTimeCardHeadings.tcJob - 1)) Or TypeOf o(CSettings.BUTimeCardHeadings.tcJob - 1) Is ExcelError _
                           , o(CSettings.BUTimeCardHeadings.tcJob - 1).ToString, vbNullString))))</pre>
```
