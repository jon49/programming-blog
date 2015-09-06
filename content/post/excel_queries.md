---
date: 2012-12-03
title: Excel Queries
tags: 
    - cool code
    - dll
    - linq
    - vb.net
---

I came across some nice libraries to use while programming to query
Excel. Right now I’m am using the standard COM interface for my
projects, which is fine for small ranges (which is true for most users –
I would assume). But for large ranges I would need something more
powerful.

[LinqToExcel](https://github.com/paulyoder/LinqToExcel#readme)

LinqToExcel appears to be a great project for using a Linq interface to
query Excel (but not write to Excel). It uses ADO under the hood to do
the actual queries. This is great if you are using Excel 2007 or newer,
but for 2003 and older you run into the problem of [memory leaks when
you query an open Excel
document](http://support.microsoft.com/kb/319998) (which is what I
usually do, I haven’t needed to get data from a closed document before)
– [see also](http://www.ozgrid.com/forum/showthread.php?t=37398).

Another problem I have found with this project is that if you need to
interact with an Excel 64-bit install [you will need to download extra
software on the users
computer](https://github.com/paulyoder/LinqToExcel#x64-support). Not a
huge deal, just extra work. I would imagine that you would be able to
find code online that would help you automate the build process for you
code for the two versions you would need to do. Currently I just rebuild
the installer for x86 and x64 (one installer installs to 64-bit program
folder, the other to 32-bit program folder).

[EPPlus](http://epplus.codeplex.com/)

EPPlus is another method to query and write to Excel ([and supposedly
faster](http://stackoverflow.com/a/9072296/632495)). It only works with
xml based Excel files though. So, EPPlus might be a nice library to use
in the future if I decide to drop support for Excel 2003 and lower. But
one of the nice things about [NetOffice](http://netoffice.codeplex.com/)
is that it is capable with working with older versions of excel.

LinqToExcel2D

This is a project I’m thinking about starting. I’ve done some work on it
already. I would just need to clean it up and make it work as nice as
LinqToExcel. It would be slower than both projects mentioned above, but,
when you are working on small datasets it would come in handy.

I’ve read one of the best ways to learn how to code and improve your
skills is by reading other people’s code. This would be a great
opportunity for me to do just that!
