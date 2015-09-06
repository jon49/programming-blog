---
date: 2012-02-10
title: Wrapping a Class Around the AdvancedFilter Method
tags:
    - excel
    - code
    - vba
    - advanced-filter

---

<a href="http://www.cpearson.com/excel/classes.aspx">Classes</a> are a tool in <a href="http://en.wikipedia.org/wiki/Object-oriented_programming">object-oriented programming</a> that make programming much simpler. One class that I have developed in VBA is a class that makes using the <a href="http://msdn.microsoft.com/en-us/library/aa221800(v=office.11).aspx">AdvancedFilter method</a> extremely easy and useful. In fact, I like it so much that I stopped using the regular <a href="http://msdn.microsoft.com/en-us/library/aa195730(v=office.11).aspx">find method</a>. In the coming weeks I will demonstrate how this was done.

<strong> This is how the AdvancedFilter method works</strong>:
<ol>
	<li>  Use a predefined range to filter.</li>
	<li>Create a range that has the filter criteria.</li>
	<li>Have a range for copying the results (or filter in place).</li>
	<li>Filter for unique values only.</li>
</ol>
<strong>Drawbacks of the AdvancedFilter method</strong>:
<ol>
	<li>Mixed data in predefined range can give odd/incorrect results.</li>
	<li>Is slow compared to a database search or even a manual looped search.</li>
	<li>Need a special range to perform search.</li>
</ol>
<strong>Advantages of the AdvancedFilter method</strong>:
<ol>
	<li> Can use familiar Excel formulas in search terms.</li>
	<li>Great for searching database structured data in Excel.</li>
	<li>The copy method is pretty fast if you are planning on copying the data.</li>
</ol>
<strong>This is how the class will work</strong> (Of course, you could use a function to wrap this code to make it even simpler for simple searches - which I have done):

``` vbscript
Sub AdvancedFilterClassExample()
    
    Dim iIndex As Integer
    Dim rResult As Range
    Dim clsSearch As Search

    'clsSearch.ColumnUnique = 1
    'clsSearch.CopyUniqueTo = Range("A101")

    clsSearch.IncludeHeaderInResults = True
    clsSearch.RangeToFilter = Range("A1:Y100")
    clsSearch.FilterLocation = Range("Z1")
    iIndex = clsSearch.Add("George")
    clsSearch(iIndex).Header = "First Name"
    clsSearch(iIndex).match_type = BasicSearch
    clsSearch(iIndex).Header_Operator = AndOperator

    iIndex = clsSearch.Add("*")
    clsSearch(iIndex).Header = "Last Name"
    clsSearch(iIndex).match_type = WildCardOnly
    clsSearch(iIndex).Header_Operator = OrOperator

    Debug.Print clsSearch.Count

    Set rResult = clsSearch.Filter

End Sub
```

**Match Types**:

``` vbscript
    MatchType.BasicSearch
    MatchType.MatchCase
    MatchType.MatchCase_MatchEntireCellContents
    MatchType.MatchEntireCellContents
    MatchType.WildCardOnly
```

**Header Types**:

``` vbscript
    HeaderOperator.AndOperator
    HeaderOperator.OrOperator</pre>
```
