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

    createNewConfig = orCreate404Config = !-> 
        # data = toConfigStyle _.find config.data, url: m.route!
        content = {}
        content.article = config.cachedContent[m.route!]
        self.config = _.merge {}, config, content

    set-metadata = !->
        config.data = it

    set-content = !->
        config.cachedContent[m.route!] = it
        createNewConfig!

    get-content =
        method: 'GET'
        url: m.route!
        deserialize: ->
            el = document.createElement 'div'
            el.innerHTML = it
            el.getElementsByTagName 'article' .0.innerHTML 
            |> m.trust

    json-data = 
        method: "GET"
        url: '/data.json'

    request-content = !->
        m.request get-content .then set-content, orCreate404Config

    do !->
        | config.data is void =>
            m.request json-data .then set-metadata, orCreate404Config
            request-content!
        | config.cachedContent[m.route!] is void =>
            request-content!
        | _ => 
            createNewConfig!

module.exports = Controller
