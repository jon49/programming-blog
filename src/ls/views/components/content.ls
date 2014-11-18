m = require 'mithril'

#main article content
content = -> 
    article = it
    m.module document.getElementsByTagName('article')[0], 
        controller: !->
            @article = article
        view: m 'article.content.animated.fadeIn', article

module.exports = content
