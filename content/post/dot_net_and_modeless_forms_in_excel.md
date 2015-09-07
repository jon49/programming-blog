---
date: 2012-01-23
title: .NET and Modeless Forms
subTitle: In Excel
tags: 
    - excel
    - modeless-forms
    - .net
---

When I was doing some programming in VB.NET (for the Time Stamp program), I tried putting a modeless form in Excel. It came up as a new window in the task bar but then wouldn't actually show on the screen. When I did a modal form it would show on the screen but also in the task bar.

.NET let's you choose the parent window of your form. [I found some code on StackOverflow in C# that gives you the proper owner window in IWin32Window form.](http://stackoverflow.com/a/4128283/632495)

``` vbscript

Public Class WindowWrapper

    Implements System.Windows.Forms.IWin32Window
    Private _hwnd As IntPtr

    Public Sub
        New(ByVal handle As IntPtr) _hwnd = handle 
    End Sub

    Public ReadOnly Property Handle() As IntPtr
        Implements System.Windows.Forms.IWin32Window.Handle 
        Get 
            Return _hwnd 
        End Get
    End Property

End Class

'Code for implementation 
Dim owner As New WindowWrapper(CType(gXLApp.Hwnd, IntPtr))
gfTimeStamp = New FTimeStamp 
gfTimeStamp.Show (owner)
```
