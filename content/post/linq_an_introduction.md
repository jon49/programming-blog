---
date: 2012-04-11
title: "Linq: An Introduction"
tags:
  - linq
  - vb.net
  - code
---

Another thing that I like about programming in VB.NET beyond <a href="2012/04/05/extensions-in-vb-net/">Extensions</a> is <a href="http://msdn.microsoft.com/en-us/library/bb308959.aspx">LINQ</a>. LINQ is similar to <a href="http://en.wikipedia.org/wiki/Sql">SQL</a> in structure - which is "a <a href="http://en.wikipedia.org/wiki/Declarative_programming">declarative programming</a> paradigm that expresses the logic of a computation without describing its control flow." So LINQ takes declarative paradigm and applies it to <a href="http://en.wikipedia.org/wiki/Object-oriented_programming">object oriented programming</a>.

What's so great about this? Well, it does slow the program down, but it speeds up the the programming process, puts the information in a form that is more descriptive (although that is no excuse not to thoroughly comment your code), and makes programming easier.

So, for the updating program for the time card I am working on, I put the updating version control document in an XML document.  The structure of the document is at the bottom of this post. To query this document using LINQ I have the following code:

``` vbscript
'Get version number string from specified item ID.
Dim sNewVersion = _
        (From oItem In mXML...
        Where oItem.@id = sItemID).<Version>.Value
```

How simple is that? You can imagine as more complex situations arise how simple the declarative language makes it. Yes, there is the learning hurdle, but once you get over it, it makes working with data much easier to work with. You can even use LINQ with classes, arrays, etc. I'm just scratching the surface of how powerful LINQ truly is.
