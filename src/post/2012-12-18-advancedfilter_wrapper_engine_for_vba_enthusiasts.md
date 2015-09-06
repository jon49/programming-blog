---
title: AdvancedFilter Wrapper Engine
subTitle: for VBA Enthusiasts
tags: 
    - advanced-filter
    - excel
    - wrapper-engine
---

A while back ago I promised to produce my engine for the advancedfilter wrapper. Well, at the prodding of <a href="http://blog.contextures.com/archives/2011/03/02/excel-autofilter-or-advanced-filter/#comment-43397">Hugo</a> I finally put it together. I took the code from my VB.NET project and converted it to VBA. Man, that reminds of why I love .NET so much! If you ever get a chance to learn .NET of VBA definitely take the opportunity. At first it is difficult but then it gets to the point where you don't want to go back.

In the next few weeks I'll go over how to use the Search class and its particulars. For anyone that uses it all I ask is that you credit me and that you spread the word about <a href="products/scribble-filter/">Scribble Filter</a>! If you find any bugs let me know and I'll fix them.

Some things you should know:

4 files are needed:
LogicRPNGenerator.bas
Search.cls
Stack.cls
StandardCode.bas

The file <strong>SearchSample.bas</strong> shows a few examples. If you don't specify your own temp worksheet then it will create one and then delete it after the Search class terminates. <strong>Anything on the temp worksheet will be deleted</strong>. Let me know what you think!
