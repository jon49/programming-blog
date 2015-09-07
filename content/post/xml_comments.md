---
date: 2012-08-27
title: XML Comments
tags:
    - vb.net
    - xml comments
---

Comment headers above procedures can be convenient when you want to know
what a function does and what the parameters are for – especially if
they weren’t named with enough description. Luckily Visual Studio
provides a way to do these comments easily and it gives you intellisense
for your own functions! They are called [XML
comments](http://msdn.microsoft.com/en-us/magazine/dd722812.aspx). All
you need to do is put in three comment markers (‘) and then it will fill
in everything for you (if you already have the procedure/parameters
filled in).

Here’s an example:

+--------------------------------------------------------------------------+
| ``` {.vbnet style="font-family:monospace;"}                              |
|     ''' <summary>                                                        |
|     ''' Search sorted 2D array.                                          |
|     ''' </summary>                                                       |
|     ''' <param name="oaArray">Array to search.</param>                   |
|     ''' <param name="IsEqual">Predicate determining equality (-1 - less  |
| than, 0 - equal, 1 - greater than)</param>                               |
|     ''' <param name="iSearchColumnIndex">Sorted column to search.</param |
| >                                                                        |
|     ''' <returns>First index of item or negative value before where the  |
| value would be located.</returns>                                        |
|     ''' <remarks>Jon Nyman @ www.SpreadsheetBudget.com 120507            |
|     ''' Source:https://en.wikipedia.org/wiki/Binary_search_algorithm#Def |
| erred_detection_of_equality </remarks>                                   |
|     <Extension()>                                                        |
|     Public Function BinarySearch(ByRef oaArray(,) As Object _            |
|                                  , ByVal IsEqual As Func(Of Object, Inte |
| ger) _                                                                   |
|                                  , ByVal iSearchColumnIndex As Integer)  |
| As Integer                                                               |
| ```                                                                      |
+--------------------------------------------------------------------------+

 

Here’s how the intellisense would look:

 

[![](http://www.spreadsheetbudget.com/wp-content/uploads/2012/08/XMLCommentPopUp.jpg "XML Comment Intellisense")](http://www.spreadsheetbudget.com/wp-content/uploads/2012/08/XMLCommentPopUp.jpg)

XML Comment Intellisense
