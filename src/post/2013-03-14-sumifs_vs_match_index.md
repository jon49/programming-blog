---
title: SUMIFS vs MATCH & INDEX
tags: 
    - excel
    - excel functions
    - time card
    - vba
---

I have one Time Card template setup with SUMIFS (used for Excel 2007 and
above templates) and one set up with MATCH/INDEX (used for my 2003 and
below templates). I tested the calculation speeds for each in Excel 2013
(preview) on Windows 8.

Here’s the VBA test code:

+--------------------------------------------------------------------------+
| ``` {.vb style="font-family:monospace;"}                                 |
| Sub test()                                                               |
|                                                                          |
|     Dim dTimer As Double                                                 |
|     Dim iLoops As Integer, iTotalIterations As Integer                   |
|     Dim wksStage As Worksheet                                            |
|                                                                          |
|     Set wksStage = ThisWorkbook.Worksheets("Staging Area")               |
|     iTotalIterations = 1                                                 |
|     dTimer = Timer()                                                     |
|                                                                          |
|     For iLoops = 0 To iTotalIterations                                   |
|         wksStage.Calculate                                               |
|     Next iLoops                                                          |
|                                                                          |
|     Debug.Print Timer() - dTimer                                         |
|                                                                          |
| End Sub                                                                  |
| ```                                                                      |
+--------------------------------------------------------------------------+

And here’s the results (seconds):

  --------------------------------------------------------------------------
  Iterations
  SUMIFS
  MATCH/INDEX
  ------------------------ ------------------------ ------------------------
  1                        50
  0.20                     3.07
  0.09                     1.30
  --------------------------------------------------------------------------

So where do I go from here? I think I will keep the two separate
templates for now, even though I could go to one. The reasons?

-   It is much easier to change SUMIFS than the complicated MATCH/INDEX
    functions.
-   I think I could introduce an error in the MATCH/INDEX functions more
    easily.

I will post the 2003 template for anyone that wishes faster calculation
times, but it is pretty fast now, so I don’t know if that would be a
huge issue.
