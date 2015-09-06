---
date: 2013-09-30
title: Bit Torrent Sync & Updating/Installing Programs
tags: 
    - btsync
    - installer
    - updater
    - vba
---

[Bit Torrent Sync](http://labs.bittorrent.com/experiments/sync.html) (BT
Sync) is great software which can be used for syncing files. I use it
for backing up all my pictures/videos/music/files/mobile computers.
Well, I did some testing and it looks like it can be used for installing
and updating software also.

I tested it with my Windows 8 computer over to my Windows XP computer. I
created an Excel xla add-in file and I also created an executable file.
Both worked fine after syncing. The following procedure was used:

-   Create folder for program you would like synced
-   [Create a syncing
    folder](http://labs.bittorrent.com/experiments/sync/get-started.html)
-   Copy read only secret
    -   right click on folder to sync in BT Sync “Show folder
        preferences” then copy read only secret
    -   Careful not to copy the wrong folder! You don’t want others
        getting your data!
-   Give the secret to all those that you would like to have it.

BT Sync could probably work for:

-   This seems like a good idea for open source projects which are free.
-   It could probably also work for paid products which allow for
    updates for a year or more. For paid products a developer could just
    create a new folder after the latest cutoff period.
-   This might be ideal for corporate wide add-ins also. The main
    problem with that is security of course. So I am not quite sure how
    that would be worked out.

The down side would be that for people which don’t want to install BT
Sync you would need a back up updater/installer.

Let me know what you think! It would be interesting to hear other ideas
on how this could work in the programming environment [which haven’t
already been thought
of](http://blog.bittorrent.com/tag/bittorrent-sync/).
