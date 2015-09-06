---
title: Excel Extensions
tags: 
    - c#.net
    - excel
---

Excel extensions extend the range object to use
[LinqTo2dArray](http://www.spreadsheetbudget.com/2013/02/25/linqto2darray/)
(see also [Codeplex](http://linqto2darray.codeplex.com/)). It also
includes other extensions.

-   RowsCount: Count total rows in all areas.
-   Parse: Parse congruent range into an object by row-object arrays.
    -   This doesn’t necessarily need to be congruent, in the future I
        may make it so it skips to different areas in the range.
-   ToArray: Copies the elements of the 2D object array row wise to a
    new array of the specified element type and length.
-   To2dArray: Import Data From Excel as 2D zero-based Object Array
-   ToExcel: Export Data to Excel
    -   Returns: Range where data was exported to.

+--------------------------------------------------------------------------+
| ``` {.csharp style="font-family:monospace;"}                             |
| using System;                                                            |
| using System.Collections;                                                |
| using System.Collections.Generic;                                        |
| using System.Data;                                                       |
| using System.Diagnostics;                                                |
|                                                                          |
| using System.Linq;                                                       |
| using NetOffice.ExcelApi;                                                |
| using NetOffice.OfficeApi;                                               |
| using NetOffice.ExcelApi.Enums;                                          |
| using LinqTo2dArray;                                                     |
|                                                                          |
| namespace ExcelExtensions                                                |
| {                                                                        |
|     public static class RangeExtenstions                                 |
|     {                                                                    |
|                                                                          |
|         /// <summary>                                                    |
|         /// Count total rows in all areas                                |
|         /// </summary>                                                   |
|         /// <param name="rng">Working Range</param>                      |
|         /// <returns>Total number of rows.</returns>                     |
|         /// <remarks>Jon Nyman 20120924</remarks>                        |
|         public static int RowsCount(this Range rng)                      |
|         {                                                                |
|                                                                          |
|             if ((rng != null))                                           |
|             {                                                            |
|                 int iRowCount = 0;                                       |
|                 foreach (Range rArea in rng.Areas)                       |
|                 {                                                        |
|                     iRowCount += rArea.Rows.Count;                       |
|                 }                                                        |
|                 return iRowCount;                                        |
|             }                                                            |
|             else                                                         |
|             {                                                            |
|                 return 0;                                                |
|             }                                                            |
|                                                                          |
|         }                                                                |
|                                                                          |
|        /// <summary>                                                     |
|         /// Parse congruent range into an object by row-object arrays.   |
|         /// </summary>                                                   |
|         /// <typeparam name="TSource">Source type.</typeparam>           |
|         /// <param name="rng">Target range.</param>                      |
|         /// <param name="conversion">Function to convert</param>         |
|         /// <returns></returns>                                          |
|         public static IEnumerable<TSource> Parse<TSource>(this Range rng |
| , Func<object[], TSource> conversion)                                    |
|         {                                                                |
|             if (rng.Areas.Count>1)                                       |
|                 throw new ArgumentException("Congruent ranges only allow |
| ed.");                                                                   |
|                                                                          |
|             object[,] array = rng.Get2dArrayValue();                     |
|                                                                          |
|             IEnumerable<TSource> cls = array.Parse<TSource>(conversion); |
|                                                                          |
|             return cls;                                                  |
|                                                                          |
|         } //End Parse                                                    |
|                                                                          |
|         /// <summary>                                                    |
|         /// Copies the elements of the 2D object array row wise to a new |
|  array of the specified element type and length.                         |
|         /// </summary>                                                   |
|         /// <typeparam name="T">New array type.</typeparam>              |
|         /// <param name="rng">Target range.</param>                      |
|         /// <param name="conversion">Casting function of new type.</para |
| m>                                                                       |
|         /// <param name="rowStart">First row index to start.</param>     |
|         /// <param name="columnStart">First column index to start.</para |
| m>                                                                       |
|         /// <param name="rowCount">Number of rows.</param>               |
|         /// <param name="columnCount">Number of columns</param>          |
|         /// <returns>One-dimensional array of type TSource</returns>     |
|         /// <remarks> Jon Nyman 20130205                                 |
|         /// Source http://msmvps.com/blogs/jon_skeet/archive/2011/01/02/ |
| reimplementing-linq-to-objects-part-24-toarray.aspx </remarks>           |
|         public static T[] ToArray<T>(this Range rng, Func<object, T> con |
| version                                                                  |
|                                                 , int rowStart, int colu |
| mnStart, int rowCount, int columnCount)                                  |
|         {                                                                |
|             rowStart += 1; columnStart += 1; rowCount += 1; columnCount  |
| += 1;                                                                    |
|             object[,] array = rng.Get2dArrayValue();                     |
|                                                                          |
|             //Make sure values are within range of array.                |
|             if (rowStart < 0 || columnStart < 0 || rowStart > array.GetU |
| pperBound(0) || columnStart > array.GetUpperBound(1) ||                  |
|                 rowCount < 1 || rowCount + rowStart - 1 > array.GetUpper |
| Bound(0) || columnCount < 1 || columnCount + columnStart - 1 > array.Get |
| UpperBound(1))                                                           |
|                 throw new System.IndexOutOfRangeException("Start or end  |
| values out of range (Parse)");                                           |
|                                                                          |
|             return array.ToArray<T>(conversion, rowStart, columnStart, r |
| owCount, columnCount);                                                   |
|                                                                          |
|         } //End ToArray                                                  |
|                                                                          |
|         /// <summary>                                                    |
|         /// Copies the elements of the 2D object array row wise to a new |
|  array of the specified element type and length.                         |
|         /// </summary>                                                   |
|         /// <typeparam name="T">New array type.</typeparam>              |
|         /// <param name="rng">Target range.</param>                      |
|         /// <param name="conversion">Casting function of new type.</para |
| m>                                                                       |
|         /// <returns>One-dimensional array of type TSource</returns>     |
|         /// <remarks> Jon Nyman 20130205                                 |
|         /// Source http://msmvps.com/blogs/jon_skeet/archive/2011/01/02/ |
| reimplementing-linq-to-objects-part-24-toarray.aspx </remarks>           |
|         public static T[] ToArray<T>(this Range rng, Func<object, T> con |
| version)                                                                 |
|         {                                                                |
|                                                                          |
|             object[,] array = rng.Get2dArrayValue();                     |
|             return array.ToArray<T>(conversion);                         |
|                                                                          |
|         } //End ToArray                                                  |
|                                                                          |
|         /// <summary>                                                    |
|         /// Import Data From Excel as 2D zero-based Object Array         |
|         /// </summary>                                                   |
|         /// <param name="rng">Target range.</param>                      |
|         /// <param name="AsValue">True -> .Value else .Value2 (Default)< |
| /param>                                                                  |
|         /// <returns>2D object zero-based array</returns>                |
|         /// <remarks>Jon Nyman 121023</remarks>                          |
|         public static object[,] To2dArray(this Range rng, bool AsValue)  |
|         {                                                                |
|                                                                          |
|             if (rng.Areas.Count > 1)                                     |
|                 return rng.ToArrayFromAreas(AsValue);                    |
|                                                                          |
|             object[,] oResult = rng.Get2dArrayValue(AsValue);            |
|                                                                          |
|             int iRowUpper = oResult.GetUpperBound(0);                    |
|             int iColumnUpper = oResult.GetUpperBound(1);                 |
|             int iRowLower = oResult.GetLowerBound(0);                    |
|             int iColumnLower = oResult.GetLowerBound(1);                 |
|             object[,] oaResult = new object[iRowUpper, iColumnUpper];    |
|             for (int i = iRowLower; i <= iRowUpper; i++) {               |
|                 for (int j = iColumnLower; j <= iColumnUpper; j++) {     |
|                     oaResult[i - iRowLower, j - iColumnLower] = oResult[ |
| i, j];                                                                   |
|                 }                                                        |
|             }                                                            |
|             return oaResult;                                             |
|                                                                          |
|         } //End To2dArray                                                |
|                                                                          |
|         /// <summary>                                                    |
|         /// Import Data From Excel as 2D zero-based Object Array with Va |
| lue2                                                                     |
|         /// </summary>                                                   |
|         /// <param name="rng">Target range.</param>                      |
|         /// <returns>2D object zero-based array</returns>                |
|         /// <remarks>Jon Nyman 121023</remarks>                          |
|         public static object[,] To2dArray(this Range rng)                |
|         {                                                                |
|                                                                          |
|             return rng.To2dArray(false);                                 |
|                                                                          |
|         } //End To2dArray                                                |
|                                                                          |
|         /// <summary>                                                    |
|         /// Loop through areas of range and return single 2d zero-based  |
| object array.                                                            |
|         /// </summary>                                                   |
|         /// <param name="rng">Target range.</param>                      |
|         /// <param name="AsValue">True -> .Value else .Value2 (Default)< |
| /param>                                                                  |
|         /// <returns>2D object zero-based array</returns>                |
|         private static object[,] ToArrayFromAreas(this Range rng, bool A |
| sValue)                                                                  |
|         {                                                                |
|             Range rArea = null;                                          |
|             int iColumnMax = 1;                                          |
|             object[][,] Objects2D = new object[rng.Areas.Count - 1][,];  |
|             int iAreaCount = 0;                                          |
|             XlSheetVisibility xlVisible = rng.ShowWorksheet();           |
|             foreach (Range rArea_loopVariable in rng.Areas)              |
|             {                                                            |
|                 rArea = rArea_loopVariable;                              |
|                 Objects2D[iAreaCount] = rArea.Get2dArrayValue(AsValue);  |
|                 iColumnMax = Math.Max(iColumnMax, Objects2D[iAreaCount]. |
| GetUpperBound(1));                                                       |
|                 iAreaCount += 1;                                         |
|             }                                                            |
|             object[,] oaAreaResult = new object[rng.RowsCount(), iColumn |
| Max];                                                                    |
|             int iRow = -1;                                               |
|             for (int i2DArraysIndex = 0; i2DArraysIndex <= iAreaCount -  |
| 1; i2DArraysIndex++)                                                     |
|             {                                                            |
|                 for (int iRowArea = 1; iRowArea <= Objects2D[i2DArraysIn |
| dex].GetUpperBound(0); iRowArea++)                                       |
|                 {                                                        |
|                     iRow += 1;                                           |
|                     for (int iColumnArea = 1; iColumnArea <= Objects2D[i |
| 2DArraysIndex].GetUpperBound(1); iColumnArea++)                          |
|                     {                                                    |
|                         oaAreaResult[iRow, iColumnArea - 1] = Objects2D[ |
| i2DArraysIndex][iRowArea, iColumnArea];                                  |
|                     }                                                    |
|                 }                                                        |
|             }                                                            |
|             rng.RevertWorksheetVisibility(xlVisible);                    |
|             return oaAreaResult;                                         |
|         } //End ToArrayFromAreas                                         |
|                                                                          |
|         /// <summary>                                                    |
|         /// Return 2d 0-based or 1-based object array from range         |
|         /// </summary>                                                   |
|         /// <param name="rng">Target range</param>                       |
|         /// <param name="asValue">True -> .Value else .Value2 (Default)< |
| /param>                                                                  |
|         /// <returns>2D object zero-based or one-based array</returns>   |
|         private static object[,] Get2dArrayValue(this Range rng, bool as |
| Value)                                                                   |
|         {                                                                |
|                                                                          |
|             XlSheetVisibility xlVisible = rng.ShowWorksheet();           |
|             object resultValue = asValue ? rng.Value : rng.Value2;       |
|             rng.RevertWorksheetVisibility(xlVisible);                    |
|             if (resultValue != null && resultValue.GetType().IsArray) {  |
|                 return (object[,]) resultValue;                          |
|             }else{                                                       |
|                 return new object[,] { { resultValue } };                |
|             }                                                            |
|                                                                          |
|         } //End GetValueOfRange                                          |
|                                                                          |
|         /// <summary>                                                    |
|         /// Return 2d 0-based or 1-based object array from range         |
|         /// </summary>                                                   |
|         /// <param name="rng">Target range</param>                       |
|         /// <returns>2D object zero-based or one-based array</returns>   |
|         private static object[,] Get2dArrayValue(this Range rng)         |
|         {                                                                |
|             return rng.Get2dArrayValue(false);                           |
|         }                                                                |
|                                                                          |
|         /// <summary>                                                    |
|         /// Export Data to Excel                                         |
|         /// </summary>                                                   |
|         /// <param name="rng">Target Range</param>                       |
|         /// <param name="data">Data to export.</param>                   |
|         /// <returns>Range where data was exported to.</returns>         |
|         /// <remarks>Jon Nyman 121023                                    |
|         /// 20130205 Convert to C#</remarks>                             |
|         public static Range ToExcel(this Range rng, object[,] data)      |
|         {                                                                |
|                                                                          |
|             if ((rng != null)) {                                         |
|                 //Make sure range and 2D object match in size            |
|                 Range rNew = rng.Resize(data.GetUpperBound(0) + 1, data. |
| GetUpperBound(1) + 1);                                                   |
|                 //Send to Excel                                          |
|                 XlSheetVisibility xlVisible = rNew.ShowWorksheet();      |
|                 rNew.Value2 = data;                                      |
|                 rNew.RevertWorksheetVisibility(xlVisible);               |
|                 return rNew;                                             |
|             }                                                            |
|                                                                          |
|             return null;                                                 |
|                                                                          |
|         } // End ToExcel                                                 |
|                                                                          |
|         /// <summary>                                                    |
|         /// Export Data to Excel                                         |
|         /// </summary>                                                   |
|         /// <param name="rng">Target Range</param>                       |
|         /// <param name="data">Data to export.</param>                   |
|         /// <returns>Range where data was exported to.</returns>         |
|         /// <remarks>Jon Nyman 121023                                    |
|         /// 20130205 Convert to C#</remarks>                             |
|         public static Range ToExcel(this Range rng, object data)         |
|         {                                                                |
|                                                                          |
|             if ((rng != null))                                           |
|             {                                                            |
|                 if (data.GetType().IsArray) {                            |
|                     if (((Array)data).Rank == 1)                         |
|                     {                                                    |
|                         return rng.ToExcel((object[])data);              |
|                     }                                                    |
|                     else                                                 |
|                     {                                                    |
|                         return rng.ToExcel((object[,])data);             |
|                     }                                                    |
|                 } //End If IsArray                                       |
|                                                                          |
|                 //Make sure range and 2D object match in size            |
|                 Range rNew = rng.Resize(1, 1);                           |
|                 //Send to Excel                                          |
|                 XlSheetVisibility xlVisible = rNew.ShowWorksheet();      |
|                 rNew.Value2 = data;                                      |
|                 rNew.RevertWorksheetVisibility(xlVisible);               |
|                 return rNew;                                             |
|             }                                                            |
|                                                                          |
|             return null;                                                 |
|                                                                          |
|         } // End ToExcel                                                 |
|                                                                          |
|     } //End class RangeExtenstions                                       |
|                                                                          |
| }                                                                        |
| ```                                                                      |
+--------------------------------------------------------------------------+
