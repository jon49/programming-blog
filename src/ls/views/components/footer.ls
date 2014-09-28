m = require 'mithril'

#footer, e.g., website copyright, tagline, etc.
module.exports = ->
   m 'footer.footer', [(m 'p', it.text)]
