---
date: 2012-03-29
title: Why UDF Array Functions are Faster
tags:
    - excel
    - array-functions
---

Over at <a href="http://fastexcel.wordpress.com">FastExcel</a> the answer was given <a href="http://fastexcel.wordpress.com/2011/06/20/writing-efiicient-vba-udfs-part5-udf-array-formulas-go-faster/">why UDF arrays go faster</a> to the question I had on <a href="2012/03/28/calculation-effeciency-array-formulas/">why UDF array formulas are faster than regular formulas</a>. I had forgotten about this post that he had written.

Here's the answer that he gives. Check out his <a href="2012/03/28/calculation-effeciency-array-formulas/">blog post</a> to see more of the details of why this is.
<blockquote><span style="color: #3366ff;">You can break down the time taken by a VBA UDF into these components:</span>
<ul>
<li><span style="color: #3366ff;">Overhead time to call the UDF.</span></li>
<li><span style="color: #3366ff;">Time to fetch the data thats going to be used by the UDF.</span></li>
<li><span style="color: #3366ff;">Time to do the calculations.</span></li>
<li><span style="color: #3366ff;">Overhead time to return the answer(s).</span></li>
</ul>
</blockquote>
