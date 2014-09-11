m = require 'mithril'
menu-links = require './common' .menuLinks

#header menu
menu = -> m '.pure-menu.pure-menu-open.pure-menu-horizontal.menu', (menu-links it)

module.exports = menu
