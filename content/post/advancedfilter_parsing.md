---
date: 2012-08-06
title: "AdvancedFilter: Parsing the Search String"
tags: 
    - AdvancedFilter
---

One of the most difficult parts of creating an advanced filter class is
figuring out how to parse the search data and turn it into a 2D array,
which Excel can understand. I figured my user interface will be a
string. So I started there. In my original implementation of the search
algorithm it wasn’t very robust, so this time around I figured I would
do it “right.”

Well, [right is a relative term](http://stackoverflow.com/a/29124). The
“right way” is using a [recursive descent
parser](http://en.wikipedia.org/wiki/Recursive_descent_parser), which
seems overly complicated to me. But [a simpler approach that I
found](http://stackoverflow.com/a/47717) is a [shunting yard
algorithm](http://en.wikipedia.org/wiki/Shunting_yard_algorithm). This
will suit my purposes well.

Now, the reason I am building an AdvancedFilter class is to make it
possible to have the user create a unique report – before I used it as a
filter in my VBA code also, but since I am now using .NET I can just use
[LINQ](http://msdn.microsoft.com/en-us/library/bb763068.aspx). Although
not a huge deal for the [Excel Time
Card](http://www.spreadsheetbudget.com/products/excel-time-card/) add-in
(but still nice to have), this tool will be a tremendous plus for the
[Spreadsheet Budget](http://www.spreadsheetbudget.com/) – if people like
it enough I might even release it as its own project.

So this is how I imagine the user interacting with the Report Generator.
A simple text box (I like to keep things as simple as possible
![:)](http://www.spreadsheetbudget.com/wp-includes/images/smilies/icon_smile.gif)
) will be on a windows form. When the user types there will be helps for
the user to choose from in an auto complete drop down box. Below would
be a possible report requested from a user (called [infix
notation](http://en.wikipedia.org/wiki/Infix_notation) – you learn quite
a bit of English when you code):

> [Jobs]= Job1 AND [Time]\>2 OR ([Jobs]=Job2 OR [Jobs]=Job3 AND
> [Comments]=Project\*)

I need the parentheses since [logic order of
operations](http://en.wikipedia.org/wiki/Logical_connective#Order_of_precedence)
dictates that AND is before OR. Now I only need to worry about AND and
ORs because Excel will figure out the rest for me, e.g., instead of
putting

> [Jobs]=Job2

one could put

> [Jobs]\<\>Job2.

Now, this may look difficult for a user, but remember, there will be a
drop down list for a user to choose from. Also, I will pull out the
dates and supply a calendar to make it even easier on the user.

[ I found someone that put the shunting algorithm in
Java](http://andreinc.net/2010/10/05/converting-infix-to-rpn-shunting-yard-algorithm/).
After programming for some time, it becomes much easier to look at the
work of others in different languages and convert them to your own.
Since not a whole lot is written in VB.NET this is a must for the VB
programmer. After fixing the mistakes I made when transcribing the code,
I was able to proceed.

The shunting algorithm I used puts the data in  [Reverse Polish
notation](http://en.wikipedia.org/wiki/Reverse_Polish_notation) (RPN).
This notation is a bit confusing at first. But once you look at it for a
while you get used to it. Let’s take the example shown in the Java code
mentioned above. So this is the equation you need to parse:

(1+2)\*(3/4)\^(5+6)

The result after putting the code through the shunting algorithm is:

1 2 + 3 4 / 5 6 + \^ \*

So, to get the answer from the RPN notation we need to start from left
to right. If there are two numbers in a row then perform operation, else
goto next. If there are two operators in a row then get previous
solutions and perform operation.

1.  1+2=3
2.  Store 3
3.  3/4=0.75
4.  Store 0.75
5.  5+6=11
6.  Store 11
7.  Get previous two solutions.
8.  0.75\^11=0.0422
9.  Get previous solution.
10. 3\*0.0422=0.127
11. Return 0.127

A little strange at first blush but after staring at it for a little
while it starts to make sense.
