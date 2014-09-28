m = require 'mithril'
menuLinks = require './common' .menuLinks

#footer menu e.g., social media, etc.
footerMenu = -> 
   m '#footer-menu.pure-menu.pure-menu-open.pure-menu-horizontal.menu',
      [menuLinks it]

module.exports = footerMenu
