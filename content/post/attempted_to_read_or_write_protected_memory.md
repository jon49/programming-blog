---
date: 2013-02-12
title: Attempted to Read or Write Protected Memory
tags: 
    - fail
    - error
    - vb.net
    - windows-forms
    - async
---

I've been working on switching over to a "new" machine (more on that in a new post). In the process my time card program stopped working with the following error:

<blockquote>System.AccessViolationException was unhandled
Message: Attempted to read or write protected memory.
This is often an indication that other memory is corrupt.</blockquote>

Unfortunately this error doesn't show up until well after it occurs. So you need to make some educated guesses as to where it is coming from. So what I did is I just commented out code one at a time in the procedure where it was originating from. The code that was shown to be problematic was called from two different places - so the error occurred only from one of the branches but not the other. So that was a bit confusing. It was also confusing because it didn't happen on my Windows XP computer, just on the "new" Windows 8 computer.

Eventually I figured out (with help from <a href="http://stackoverflow.com/q/8779557/632495">StackOverflow</a>) that it was caused by changing the values of my drop down list during the click event of the combo box.

To fix the problem, <a href="http://support.microsoft.com/kb/952544">Microsoft</a> recommends that you don't change the values of the combo box during the event. So, I added a <a href="http://msdn.microsoft.com/en-us/library/h1c2h276(v=vs.85).aspx">timer component</a> to the form. The timer allows you to call a function in the future after completing other operations. I also use a timer in the Scribble Filter preview box when someone selects multiple lines on the form - so Excel doesn't go crazy will I'm selected the corresponding rows.
