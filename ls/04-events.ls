# function for creating an infinite scroll
infiniteScroll = (state, e) ->
   (e) <- window.addEventListener "scroll"
   state.pageY = Math.max (e.pageY or window.pageYOffset), 0
   state.pageHeight = window.innerHeight
   m.redraw()
