---
title: Angular.js vs React.js vs Mithril.js
---

Apparently Facebook has a bunch of functional-style programmers, not writing in ClosureScript though! https://www.youtube.com/watch?v=IVvHPPcl2TM

http://youtu.be/nYkdrAPrdcw?t=40m30s
> [Starts at 40 minute 30 seconds. Person asks question then Jing Chen
> laughs at question, she must know how much Pete doesn't like Angular.]
> So, the question was comparing and contrasting...React plus Flux and
> Angular. ...[T]hey do solve some of the same
> problems but they go at it in very different ways. So React is focused a
> lot on treating your code as a black box. So, there's no sort of
> observable abstraction inside of react you simply say, "Hey, rerender
> the UI and you present a consistent view of what you want your UI to
> look like." With Angular you are basically passing data throughout these
> things called scopes which observe your data model and I think...
> that's a very leaky abstraction. It forces you to compose your
> application not in terms of functions and objects but in terms of
> directives and model-view-controller and their flavor of
> model-view-controller. So, while it does work for a certain class of
> applications as you scale up you start to miss the past 40 or 50 years
> of research and how to abstract a program. So if you...
> push that kind of data binding concern out to the edges of your
> system like React does I think it leads to faster iteration time.\
> -- *Pete
> Hunt - Engineering Manager, Rethinking Web App Development at Facebook,
> Facebook*

Leo Horie (creator of Mithril on Flux/React)
https://news.ycombinator.com/item?id=7720559

> I really like this architecture - it's clearly based on lessons learned
> from the same types of pains that I myself encountered w/ non-trivial
> jQuery, and the unidirectional data flow makes it a lot easier to reason
> about the code. It's very similar to what I'm doing with my own micro
> mvc framework Mithril ( http://lhorie.github.io/mithril ).

> One thing that raise my eyebrows about this article though is how says
> that Flux eschews MVC, and then goes on to say that it has stores that
> are "somewhat similar to a model", and "the dispatcher exposes a method
> that allows a view to trigger a dispatch to the stores", which, as far
> as classic MVC goes, is the exact definition of a controller. What they
> call controller-view is, imho, just an implementation detail within the
> view layer: in classic MVC, views were responsible for subscribing to
> model observables, or, as the article puts it, it "listens for events
> that are broadcast by the stores that it depends on".

> When talking about this architecture with the Mithril community, I find
> that referring back to the MVC pattern makes it even easier to reason
> about the flow of data: it's basically M -\> V -\> C -\> M ...

> It's unfortunate that the general understanding of the MVC pattern
> became misunderstood over the course of many frameworks. The whole point
> of design patterns should be that we could just name them for people to
> "get" it, rather than having to reinvent new ways of naming things and
> having everyone relearn the nomenclature.
