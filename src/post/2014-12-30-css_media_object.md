---
title: CSS Media Object
tags:
   - css
---

I just finished attending the RockIt Bootcamp (12 week program). It's a program that teaches the LAMP full stack development (Linux, Apache, mySQL, PHP). In the next little while I will be going over some of the things which I learned.

The *css media object* was first coined by [Nicole Sullivan] in 2010. It is still one of the most basic constructs to learn and understand in created good CSS content.

[Nicole Sullivan]: http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/

The *media object* is basically a box with two other boxes side by side in the main box. Typically the box to the left is a picture and the box to the right is content, but can be anything.

```html
<div class="media">
  <img src="/images/my-cool-mug.png" alt="A pic of me">
  <div>
    <p>Some written content in the media object.</p>
    <p>Look, another paragraph in the media object!</p>
  </div>
</div>
```

The *media object* css gives padding and margins to the objects that make them look nice and make the picture fit correctly. It also does a clearfix so the outside box doesn't collapse to a smaller area than its content.

Some of the code I made specifically for this example, but in practice you would not put everything in the `media` class. E.g., the `width` of the media element would be decided somewhere else, make the `media` class more reusable.

```css
/* Give the media object a shape. Add */
/* padding just to make it look nice. */
.media {
  padding: 10px;
  width: 300px;
}
/* clearfix */
.media::after {
  content: '';
  display: block;
  clear: both;
}
.media > * {
  padding: 0;
  margin: 0;
}
.media > *:first-child {
  float: left;
}
/* Make all content be past the picture. */
.media > *:last-child {
  margin-left: 110px;
}
/* The following is just to make */
/* the paragraphs look nice. */
.media > *:last-child > * {
  margin: 0 0 10px 0;
}
.media > *:last-child > *:last-child {
  margin-bottom: 0;
}
```
