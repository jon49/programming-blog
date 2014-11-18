m = require 'mithril'

# Configuration of view. Note: ""s are only placeholders not needed.
coreConfig = 
   head: 
      description: "A blog on programming. Mostly JavaScript." 
      title: "Jon's Blog" 
      stylesheets:
         * url: "/css/style.css"
         ...
   menuItems: 
      * value: "Archive" url: "/" title: ""
      * value: "About" url: "/about/" title: ""
   header: 
      url: "/" 
      class: ""
      src: "/images/fire.png"
      title: "This is a Filler"
      subtitle: "Filling Up"
   article: "Loading..."
   tags: []
   previousPost: 
      value: ""
      title: ""
      url: ""
   nextPost: 
      value: ""
      title: ""
      url: ""
   footerItems: 
      * value: ""
        url: 'http://jon.prescottprogrammers.com/feed.xml'
        title: "RSS Feed"
        class: "fa fa-rss fa-2x"
      * value: ""
        url: '/signup/'
        title: 'Get e-mails of new posts!'
        class: "fa fa-envelope fa-2x"
      * value: ""
        url: "https://github.com/jon49/"
        title: "Personal Github Account"
        class: "fa fa-github fa-2x"
      * value: ""
        url: "https://twitter.com/NymanJon"
        title: "Personal Twitter Account"
        class: 'fa fa-twitter fa-2x'
      * value: ''
        url: 'https://plus.google.com/communities/101170592821781215530'
        title: 'Prescott Developer\'s Google+ Site'
        class: 'fa fa-google-plus fa-2x'
      * value: ''
        url: 'http://www.meetup.com/The-Prescott-Software-Developers-Meetup-Group/'
        title: 'Prescott Developer\'s Meetup.com Site'
        class: 'fa fa-coffee fa-2x'
   footer: 
      text: m.trust '&copy; 2014 Jon Nyman<br />nymanjon@gmail.com<br />Still Empty'
   fileType: ''
   data: void
   cachedContent: {}

module.exports = coreConfig
