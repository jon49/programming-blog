---
date: 2012-01-27
title: Distributing Add-ins via Installer
tags:
    - installer
    - excel
    - add-in
---

Recently I needed to create an installer for my add-ins using [Inno Setup installer](http://www.jrsoftware.org/isinfo.php). Inno Setup is a free ware professional installer. It lets you use [Pascal](http://en.wikipedia.org/wiki/Pascal_(programming_language)) to create special code to help you install the add ins.

Luckily, over at [Dutch Gemini’s website](http://dutchgemini.wordpress.com/2012/01/04/install-and-uninstall-an-excel-add-in-with-innosetup) he has helped with plenty of the code to get there. Very well done, I might add.

It looks like he uses a single add-in file for Excel 2003 and below and Excel 2007 and above (for ribbon purposes). I prefer to have all my code in a single XLA file (if I’m not using [Excel DNA](http://exceldna.codeplex.com/)) for the main code and then a separate XLAM file for the ribbon. So I had to change some of his code to account for that.

I basically changed his functions [CopyTheAddIn](http://dutchgemini.wordpress.com/2012/01/02/install-and-uninstall-an-excel-add-in-with-innosetup-page-5/#CopyTheAddIn) and [HookAddinToExcel](http://dutchgemini.wordpress.com/2012/01/02/install-and-uninstall-an-excel-add-in-with-innosetup-page-5/#HookAddinToExcel) to account for the XLAM file when it is Excel 2007 and above. The functions [UnhookAddinFromExcel](http://dutchgemini.wordpress.com/2012/01/02/install-and-uninstall-an-excel-add-in-with-innosetup-page-5/#UnhookAddinFromExcel) and [RemoveTheAddIn](http://dutchgemini.wordpress.com/2012/01/02/install-and-uninstall-an-excel-add-in-with-innosetup-page-5/#RemoveTheAddIn) also need to be changed to uninstall the add-ins and delete all the add-in files.
