m = require 'mithril'
config = require './../configuration/config'
_ = require './../../js/custom-lodash'

//--- html preprocessing ---//
parseDocument = -> JSON.stringify article: it.contents

extractDocument = -> 
   | _.isPlainObject it => # found json file get contents
      parseDocument it
   | otherwise =>          # couldn't find json file
      JSON.stringify do
         title: "404" 
         subtitle: "You've Been 404ed"
         article: "Oops! I couldn't find that page!"
         type: 'page'

//--- config object preprocessing --//

# If property exists then put in config style
toConfigStyle = ->
   x = {}
   x.{}head.description = it.description
   x.{}head.title = it.title
   x.{}content.article = it.contents
   x.{}header.title = it.title
   x.{}header.subtitle = it.subtitle
   x.fileType = it.type
   x.tags = it.tags
   x

# Controller used with mithril
!function Controller
   self = @
   @config = config

   #m.redraw.strategy 'diff'

   json-data = 
      method: "GET"
      url: '/data.json'

   createNewConfig = orCreate404Config = !-> 
      data = toConfigStyle _.find config.data, url: m.route!
      data.content.article = m.trust data.content.article
      self.config = _.merge {}, config, data

   setConfig = !->
      config.data = it
      createNewConfig!

   do !->
      | config.data is void =>
         m.request json-data .then setConfig, orCreate404Config
      | _ => 
         createNewConfig!

module.exports = Controller
