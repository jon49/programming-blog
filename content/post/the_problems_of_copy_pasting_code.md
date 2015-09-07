---
date: 2012-03-14
title: The Problems Of Copy/Pasting Code
tags:
    - fail
    - code
---

Copying and pasting is great for coding, but sometimes it can be pretty silly if you make a mistake in the code. Here’s a triple copy/paste fail (the values should be set to true):

``` vbscript
Public Sub SheetActivate_Dashboard(ByVal sh As Object)

    Try
        gXLApp.EnableEvents = False
        OpenTimeStamp()
    Finally
        gXLApp.EnableEvents = False
    End Try

End Sub

Public Sub SheetDeActivate_Dashboard(ByVal sh As Object)

    Try
        gXLApp.EnableEvents = False
        If Not gfTimeStamp Is Nothing Then
            gfTimeStamp.Visible = False
            gfTimeStamp.Close()
            gfTimeStamp = Nothing
        End If
    Finally
        gXLApp.EnableEvents = False
    End Try

End Sub

Public Sub DoubleClick_Dashboard()

    Try
        gXLApp.EnableEvents = False
        OpenTimeStamp()
    Finally
        gXLApp.EnableEvents = False
    End Try

End Sub
```
