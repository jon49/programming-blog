---
title: LinqTo2dArray
tags: 
    - c#.net
    - excel
---

LinqTo2dArray written in C\# ([to allow iteration over the
rows](http://msdn.microsoft.com/en-us/library/vstudio/9k7k7cf0(v=vs.100).aspx)).
Also found on [CodePlex](http://linqto2darray.codeplex.com/).

-   Parse will take a 2D Array (not necessarily zero based) and load it
    into a class. Parse 2D object array into a class row wise.
-   Compose will create 2D object array from enumerable type.
-   Copies the elements of the 2D object array row wise to a new array
    of the specified element type and length.

+--------------------------------------------------------------------------+
| ``` {.csharp style="font-family:monospace;"}                             |
| using System;                                                            |
| using System.Collections.Generic;                                        |
| using System.Linq;                                                       |
| using System.Text;                                                       |
|                                                                          |
| namespace LinqTo2dArray                                                  |
| {                                                                        |
|     public static class Array2dExtensions                                |
|     {                                                                    |
|                                                                          |
|        /// <summary>                                                     |
|        /// Parse 2D object array into a class row wise.                  |
|        /// </summary>                                                    |
|         /// <typeparam name="TSource">New enumerable type.</typeparam>   |
|         /// <param name="array">The two-dimensional Array to loop throug |
| h.</param>                                                               |
|         /// <param name="conversion">Conversion function to TSource type |
| .</param>                                                                |
|         /// <param name="rowStart">First row index to start.</param>     |
|         /// <param name="columnStart">First column index to start.</para |
| m>                                                                       |
|         /// <param name="rowCount">Number of rows.</param>               |
|         /// <param name="columnCount">Number of columns</param>          |
|         /// <example>                                                    |
|         ///  array.Parse(Of SaleOrder)(Function(o As Object()) New SaleO |
| rder( _                                                                  |
|         ///                                     If(TypeOf o(0) Is Double |
| , Date.FromOADate(o(0)), #1/1/1900#) _                                   |
|         ///                                     , If(Not TypeOf o(1) Is  |
| Integer, o(1).ToString, "") _                                            |
|         ///                                     , If(Not TypeOf o(2) Is  |
| Integer, o(2).ToString, "") _                                            |
|         ///                                     , If(Not TypeOf o(3) Is  |
| Integer, o(3).ToString, "") _                                            |
|         ///                                     , If(IsNumeric(o(4)) And |
| Also Not TypeOf o(4) Is Integer, CInt(o(4)), 0) _                        |
|         ///                                     , If(IsNumeric(o(5)) And |
| Also Not TypeOf o(5) Is Integer, o(5), 0) _                              |
|         ///                                     , o(6) + rowOffset _     |
|         ///                                     ))                       |
|         ///   Note: Last index returns row number.                       |
|         /// </example>                                                   |
|         /// <exception cref="IndexOutOfRangeException">Parameters are ou |
| t of range of 2D array object.</exception>                               |
|         /// <returns>Enumerable of TSource</returns>                     |
|         /// <remarks>Jon Nyman 130205</remarks>                          |
|         public static IEnumerable<TSource> Parse<TSource>(this object[,] |
|  array, Func<object[], TSource> conversion                               |
|             , int rowStart, int columnStart, int rowCount, int columnCou |
| nt)                                                                      |
|         {                                                                |
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
|             //Put 2D array values in a 1D array for conversion           |
|             for (int row = rowStart; row < rowCount + rowStart; row++)   |
|             {                                                            |
|                 object[] array1d = new object[columnCount + 1];          |
|                 for (int column = columnStart; column < columnCount + co |
| lumnStart; column++)                                                     |
|                 {                                                        |
|                     array1d[column - columnStart] = array[row, column];  |
|                 }                                                        |
|                 //Add row number to the end of the 1D array.             |
|                 array1d[columnCount] = row;                              |
|                 yield return conversion(array1d);                        |
|             }                                                            |
|                                                                          |
|         } //End Parse                                                    |
|                                                                          |
|         /// <summary>                                                    |
|         /// Parse 2D object array into a class row wise.                 |
|         /// </summary>                                                   |
|         /// <typeparam name="TSource">New enumerable type.</typeparam>   |
|         /// <param name="array">The two-dimensional Array to loop throug |
| h.</param>                                                               |
|         /// <param name="conversion">Conversion function to TSource type |
| .</param>                                                                |
|         /// <example>                                                    |
|         ///  array.Parse(Of SaleOrder)(Function(o As Object()) New SaleO |
| rder( _                                                                  |
|         ///                                     If(TypeOf o(0) Is Double |
| , Date.FromOADate(o(0)), #1/1/1900#) _                                   |
|         ///                                     , If(Not TypeOf o(1) Is  |
| Integer, o(1).ToString, "") _                                            |
|         ///                                     , If(Not TypeOf o(2) Is  |
| Integer, o(2).ToString, "") _                                            |
|         ///                                     , If(Not TypeOf o(3) Is  |
| Integer, o(3).ToString, "") _                                            |
|         ///                                     , If(IsNumeric(o(4)) And |
| Also Not TypeOf o(4) Is Integer, CInt(o(4)), 0) _                        |
|         ///                                     , If(IsNumeric(o(5)) And |
| Also Not TypeOf o(5) Is Integer, o(5), 0) _                              |
|         ///                                     , o(6) + rowOffset _     |
|         ///                                     ))                       |
|         ///   Note: Last index returns row number.                       |
|         /// </example>                                                   |
|         /// <exception cref="IndexOutOfRangeException">Parameters are ou |
| t of range of 2D array object.</exception>                               |
|         /// <returns>Enumerable of TSource</returns>                     |
|         /// <remarks>Jon Nyman 130205</remarks>                          |
|         public static IEnumerable<TSource> Parse<TSource>(this object[,] |
|  array, Func<object[], TSource> conversion)                              |
|         {                                                                |
|                                                                          |
|             int rowStart=array.GetLowerBound(0);                         |
|             int colStart=array.GetLowerBound(1);                         |
|             int rowCount=array.GetUpperBound(0)-rowStart+1;              |
|             int colCount=array.GetUpperBound(1)-colStart+1;              |
|                                                                          |
|             return array.Parse<TSource>(conversion, rowStart, colStart,  |
| rowCount, colCount);                                                     |
|                                                                          |
|         }                                                                |
|                                                                          |
|          /// <summary>                                                   |
|         /// Copies the elements of the 2D object array row wise to a new |
|  array of the specified element type and length.                         |
|         /// </summary>                                                   |
|         /// <typeparam name="T">New array type.</typeparam>              |
|         /// <param name="array">The two-dimensional object array.</param |
| >                                                                        |
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
|         public static T[] ToArray<T>(this object[,] array, Func<object,  |
| T> conversion                                                            |
|                                                 , int rowStart, int colu |
| mnStart, int rowCount, int columnCount)                                  |
|         {                                                                |
|             //Make sure values are within range of array.                |
|             if (rowStart < 0 || columnStart < 0 || rowStart > array.GetU |
| pperBound(0) || columnStart > array.GetUpperBound(1) ||                  |
|                 rowCount < 1 || rowCount + rowStart - 1 > array.GetUpper |
| Bound(0) || columnCount < 1 || columnCount + columnStart - 1 > array.Get |
| UpperBound(1))                                                           |
|                 throw new System.IndexOutOfRangeException("Start or end  |
| values out of range (ToArray)");                                         |
|                                                                          |
|             //Put 2D array values in a 1D array                          |
|             T[] array1d = new T[rowCount * columnCount];                 |
|             int currentRow = -1;                                         |
|             for (int row = rowStart; row < rowCount + rowStart; row++)   |
|             {                                                            |
|                 for (int column = columnStart; column < columnCount + co |
| lumnStart; column++)                                                     |
|                 {                                                        |
|                     currentRow += 1;                                     |
|                     array1d[currentRow] = conversion(array[row, column]) |
| ;                                                                        |
|                 }                                                        |
|             }                                                            |
|                                                                          |
|             return array1d;                                              |
|                                                                          |
|         } //End ToArray                                                  |
|                                                                          |
|         /// <summary>                                                    |
|         /// Copies the elements of the 2D object array row wise to a new |
|  array of the specified element type and length.                         |
|         /// </summary>                                                   |
|         /// <typeparam name="T">New array type.</typeparam>              |
|         /// <param name="array">The two-dimensional object array.</param |
| >                                                                        |
|         /// <param name="conversion">Casting function of new type.</para |
| m>                                                                       |
|         /// <returns>One-dimensional array of type TSource</returns>     |
|         /// <remarks> Jon Nyman 20130205                                 |
|         /// Source http://msmvps.com/blogs/jon_skeet/archive/2011/01/02/ |
| reimplementing-linq-to-objects-part-24-toarray.aspx </remarks>           |
|         public static T[] ToArray<T>(this object[,] array, Func<object,  |
| T> conversion)                                                           |
|         {                                                                |
|             int rowStart=array.GetLowerBound(0);                         |
|             int colStart=array.GetLowerBound(1);                         |
|             int rowCount=array.GetUpperBound(0)-rowStart+1;              |
|             int colCount=array.GetUpperBound(1)-colStart+1;              |
|                                                                          |
|             return array.ToArray<T>(conversion, rowStart, colStart, rowC |
| ount, colCount);                                                         |
|                                                                          |
|         } //End ToArray                                                  |
|                                                                          |
|         /// <summary>                                                    |
|         /// Create 2D object array from enumerable type.                 |
|         /// </summary>                                                   |
|         /// <typeparam name="TSource">Enumerable type to convert.</typep |
| aram>                                                                    |
|         /// <param name="enumerator">Enumerable to convert.</param>      |
|         /// <param name="conversion">Logic to convert to object array.</ |
| param>                                                                   |
|         /// <param name="startIndex">First index to start.</param>       |
|         /// <param name="count">Number to convert.</param>               |
|         /// <param name="columnCount">Number of columns to create.</para |
| m>                                                                       |
|         /// <example>If clsItems.Count > 0 Then                          |
|         ///           oaTimes = clsItems.Compose(Function(cls) _         |
|         ///                {CType(clsItems.DateUsed.ToOADate, Object) _  |
|         ///                 , cls.Name _                                 |
|         ///                 , cls.ItemHoursForDay _                      |
|         ///                 , cls.ClockInTime}, 4)                       |
|         ///End If</example>                                              |
|         /// <returns>2D Object Array</returns>                           |
|         /// <remarks>Jon Nyman 121109</remarks>                          |
|         public static object[,] Compose<TSource>(this IEnumerable<TSourc |
| e> enumerator, Func<TSource, object[]> conversion                        |
|                                                                          |
| ,  int columnCount)                                                      |
|         {                                                                |
|             try                                                          |
|             {                                                            |
|                 int count = enumerator.Count();                          |
|                 int row = -1;                                            |
|                 object[,] array2d = new object[count, columnCount];      |
|                                                                          |
|                 foreach (TSource item in enumerator)                     |
|                 {                                                        |
|                     row += 1;                                            |
|                     object[] array = new object[columnCount];            |
|                     array = conversion(item);                            |
|                     for (int j = 0; j <= columnCount - 1; j++)           |
|                     {                                                    |
|                         array2d[row, j] = array[j];                      |
|                     }                                                    |
|                 }                                                        |
|                                                                          |
|                 return array2d;                                          |
|                                                                          |
|             }                                                            |
|             catch (System.IndexOutOfRangeException)                      |
|             {                                                            |
|                 throw new System.IndexOutOfRangeException("Incorrect num |
| ber of columns. Compose.");                                              |
|             }                                                            |
|                                                                          |
|         } //End Compose                                                  |
|                                                                          |
|     }                                                                    |
| }                                                                        |
| ```                                                                      |
+--------------------------------------------------------------------------+
