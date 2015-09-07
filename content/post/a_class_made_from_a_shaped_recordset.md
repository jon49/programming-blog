---
date: 2012-05-11
title: A Class Made from a Shaped Recordset
tags:
    - code
    - shaped-recordset
---

Here's some fun code that I worked on a while back. This disconnected record set is what you call a shaped record set, created on the fly. It is a pretty complex class all wrapped in one nice little bundle. Unfortunately it goes terribly slow. Creating a class with the <a href="http://msdn.microsoft.com/en-us/library/aa164502(v=office.10).aspx">dictionary object</a> in the <a href="http://msdn.microsoft.com/en-us/library/aa164509(v=office.10).aspx">Scripting Runtime Object Library</a> should be the fastest, if you're looking for speed.

Pretty crazy looking code, but pretty elegant once you get used to looking at code like that, unfortunately it's not very using for creating classes on the fly, or even instead of regular classes (It would make making classes a synch!).

For more information on this topic see:
<a href="http://msdn.microsoft.com/en-us/library/aa241635(v=vs.60).aspx">http://msdn.microsoft.com/en-us/library/aa241635(v=vs.60).aspx</a><br /><a href="http://msdn.microsoft.com/en-us/library/aa260841(v=vs.60).aspx">http://msdn.microsoft.com/en-us/library/aa260841(v=vs.60).aspx</a><br /><a href="http://www.4guysfromrolla.com/webtech/060301-1.shtml">http://www.4guysfromrolla.com/webtech/060301-1.shtml</a>

``` vbscript
grsLSData.Open "SHAPE APPEND New adInteger AS LSID, New adVarChar(20) AS Name_LS, " & _
            "SUM(RowData.RowSeatsFilled) AS LSSeatsFilled, SUM(RowData.RowSeatsCount) AS LSSeatsCount," & _
        "((SHAPE APPEND New adInteger AS LSID, New adInteger AS RowID, New adVarChar(10) AS Name_Row, " & _
            "SUM(SeatData.EventsSeatFilled) AS RowSeatsFilled, SUM(SeatData.EventsSeatCount) AS RowSeatsCount, " & _
        "((SHAPE APPEND New adInteger AS RowID, New adInteger AS SeatID, New adVarChar(10) AS Name_Seat, " & _
            "SUM(EventSeatData.Filled) AS EventsSeatFilled, COUNT(EventSeatData.Name_EventCode) AS EventsSeatCount, " & _
        "((SHAPE APPEND New adInteger AS SeatID, New adVarChar(10) AS Name_EventCode, " & _
            "New adVarChar(2) AS Status, New adDouble AS Color, New adInteger AS Filled, New adInteger AS Custom) " & _
        "RELATE SeatID to SeatID) AS EventSeatData) " & _
        "RELATE RowID to RowID) AS SeatData) " & _
        "RELATE LSID TO LSID) AS RowData ", , adOpenStatic, adLockOptimistic
```
