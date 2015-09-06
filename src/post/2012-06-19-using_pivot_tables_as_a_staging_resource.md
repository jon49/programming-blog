---
title: Using Pivot Tables as a Staging Resource
tags:
  - excel
  - pivot-tables
---

When I originally created the <a href="http://www.spreadsheetbudget.com/products/excel-time-card/">Excel time card</a> dashboard I didn't want to back my data with any pivot tables. I soon found though that it slowed the calculations so much that I needed to use pivot tables just to make it bearable to work with the dashboard. The reason I didn't want to use pivot tables was because they are prone to do wacky and unexpected things.

So, what I have done is I automated some of the code to fix errors (like make sure that the "wksPivotTable" has a column for months and years and that it is in order). Today I found another unexpected error. I found that when I entered data from the time card that all my dashboard charts data went to nothing. Apparently not all the data in the time card was formatted as date in column A. So I ended up having to format it correctly then delete the old pivot table and replace it.

So that is what I'll be working on today. I'll have to make sure that the cells are formatted correctly then automate fixes when the time card excel workbook is opened.

So how is everyone enjoying the time card? Have you found it useful? Have you found any bugs? Is there anything that I could do better for the dashboard.
