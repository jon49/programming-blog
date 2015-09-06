---
date: 2014-06-12
title: A Distributed & Robust Feedly
tags:
   - feedly
   - ideas
---

In light of the recent attack on [Feedly.com](http://feedly.com/) I thought it might be interesting to see other ways we could propogate data accross the Interent without being succeptible to attacks, or, at least less accessible.

With the approach outlined below we need to use an actual app instead of being able to use a browser (there might be a way to use a browser also, not sure how it would work though).

I used BitTorrent Sync as the distribution model. The more people that follow a blog the more robust its feed will become.

On the back end all feedly would need to do is periodically update the feeds and user data - but the user data will only need to be updated if a user changes their password. If they have a read-write key for their data then it can be updated only locally and then propogated. The more devices a user uses the more robust their data will become.

It will be nice when the internet will catch up with the distributed model of doing things.

[![A Simple Outline of How to Set Up a Distributed Feedly](/images/small/FeedlyApp.png)](/images/FeedlyApp.png)

A Simple Outline of How to Set Up a Distributed Feedly
