---
date: 2012-03-28
title: Calculation Efficiency
subTitle: Array Formulas
tags:
    - excel
    - formulas
    - array-formulas
    - efficiency
---

Chandoo had some posts on speeding up Excel worksheets, one of the posts focuses on formulas and another he let the general readers make their suggestions. I made the suggestion that people use array formulas. But most of the other suggestions said not to use array formulas since they slow down your spreadsheet. Needless to say, I was a bit confused, I have seen quite the performance boost from using array formulas.

So I did a little test to see why I was getting differing results. The testing showed that both of us were right. Array formulas are faster for UDFs and regular formulas are better for built in Excel functions. There might be circumstances where the opposite is true. I used Excel DNA for my UDF function. It just shows, if you are trying to make things fast, isolate a workbook with a small data set and see which method is faster.

My only theory on why UDFs and internal Excel formulas perform differently is that Excel has continual access to the data while UDFs need to get a copy of the data. If anyone knows if this is true or not I would like to know, so please comment.

One suggestion that really helped me was putting the data in order based on which formula will be executed first, which is Left to Right, Top to Bottom. My time card workbook was noticeably faster after I made these changes.

So this is the code I used to test the speed of the formulas:

``` vbscript
Sub SpeedTest()
    Dim dTimer As Double
    Dim rFormula As Range, rArray As Range
    Dim lLast As Long, i As Long
    Application.Calculation = xlCalculationManual
    Application.Iteration = False
    lLast = Application.Rows.Count - 1
    Set rFormula = Range(&#034D1:D&#034 & lLast)
    Set rArray = Range(&#034C1:C&#034 & lLast)
    dTimer = Timer
    'For i = 0 To 99
        rArray.Calculate
    'Next i
    Debug.Print &#034Array: &#034 & Timer - dTimer
    dTimer = Timer
    'For i = 0 To 99
        rFormula.Calculate
    'Next i
    Debug.Print &#034Formula: &#034 & Timer - dTimer
End Sub
```

Internal Excel formulas tested were:

``` vbscript
=IF(MOD(A1,2)=0,A2,A1)
=IF(MOD(A1:A65535,2)=0,A2:A65536,A1:A65535)
```

The results of the above test showed a ratio of 7:10 formula over array formula.

The UDF formulas tested were:

``` vbscript
=SumDate($B$1:$B$65535,$A$1:$A$65535,A1,A1+5,TRUE)
=SumDate($B$1:$B$65535,$A$1:$A$65535,A1:$A$65535,A1:$A$65535+5,TRUE)
```

The results of the above test showed a ratio of 1465:1 formula over array formula. The resulting time is shown in the table below:

``` vbscript
Formula: 2610.16015625 seconds
Array: 1.78125 seconds
```
