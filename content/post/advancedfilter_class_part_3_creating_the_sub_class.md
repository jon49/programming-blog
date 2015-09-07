---
date: 2012-03-02
title: AdvancedFilter Class Part 3
subTitle: Creating the Sub Class
tags:
    - advanced-filter
    - code
---

In order to get the nice drop down menu we'll need a second class I'll call "SearchTerms." This class is also necessary to store each individual search term entered into the class. Included in this class will be:
<ol>
	<li>Search Term</li>
	<li>Header</li>
	<li>Header Operator</li>
	<li>Match Type</li>
</ol>

``` vbscript
' SearchTerms
' Description: This class contains the search information.
'
' Authors: Jon Nyman, www.spreadsheetbudget.com
'
' Change Overview
' Date Comment
' --------------------------------------------------------------
' 03/02/2012 Initial version
'
Option Explicit
'---------------------------------------------------------------
'Class Variable Declarations
'---------------------------------------------------------------
Private msSearchTerm As String
Private msHeader As String
Private meHeaderOperator As HeaderOperator
Private meMatchType As MatchType

'---------------------------------------------------------------
'Class Property Procedures
'---------------------------------------------------------------

Property Get SearchTerm() As String
    SearchTerm = msSearchTerm
End Property Property 

Let SearchTerm(ByVal sItem As String)
    msSearchTerm = sItem
End Property

Property Get Header() As String
    Header = msHeader
End Property 

Property Let Header(ByVal sHeader As String)
    msHeader = sHeader
End Property

Property Get Header_Operator() As HeaderOperator
    Header_Operator = meHeaderOperator
End Property

Property Let Header_Operator(ByVal eHeaderOperator As HeaderOperator)
    meHeaderOperator = eHeaderOperator
End Property

Property Get Match_Type() As MatchType
    Match_Type = meMatchType
End Property

Property Let Match_Type(ByVal eMatchType As MatchType)
    meMatchType = eMatchType
End Property
```
