m = require 'mithril'

# header content
header = (type, config) -> 
   m '.header' [
      m 'a', (
         href: config.url
         class: config.class
      ), 
         * m 'img', (src: config.src)
   ] ++ switch type
   | 'page' 'archive' =>
      * m 'h1', config.title
        m 'h2', (m 'span', config.subtitle)
   | _ => []

module.exports = header
