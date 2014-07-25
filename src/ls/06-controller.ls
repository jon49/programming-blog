# Controller used with mithril
!function Controller
   self = @
   @config = coreConfig

   document = 
      method: "GET"
      url: getUrl m.route()
      extract: extractDocument

   orCreate404Config = createNewConfig = !-> 
      it_ = toConfigStyle it
      it_.content.article = m.trust it_.content.article
      newConfig = _.merge {}, coreConfig, it_
      self.config = newConfig

   m.request document .then createNewConfig, orCreate404Config
