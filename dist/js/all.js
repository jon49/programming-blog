;(function(){
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash -m include="merge,isEmpty"`
 */
;(function(){function n(){return x.pop()||[]}function t(n){return typeof n.toString!="function"&&typeof(n+"")=="string"}function e(n){n.length=0,x.length<_&&x.push(n)}function r(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);for(var r=-1,o=e-t||0,u=Array(o<0?0:o);++r<o;)u[r]=n[t+r];return u}function o(){}function u(n){function t(){if(o){var n=r(o);ot.apply(n,arguments)}if(this instanceof t){var a=i(e.prototype),f=e.apply(a,n||arguments);return b(f)?f:a}return e.apply(u,n||arguments)}var e=n[0],o=n[2],u=n[4];
return gt(t,n),t}function i(n){return b(n)?ft(n):{}}function a(n,t,e){if(typeof n!="function")return O;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(pt.funcNames&&(r=!n.name),r=r||!pt.funcDecomp,!r)){var o=tt.call(n);pt.funcNames||(r=!A.test(o)),r||(r=C.test(o),gt(n,r))}if(r===false||r!==true&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,o){return n.call(t,e,r,o)
};case 4:return function(e,r,o,u){return n.call(t,e,r,o,u)}}return E(n,t)}function f(n){function t(){var n=s?c:this;if(u){var v=r(u);ot.apply(v,arguments)}if((a||y)&&(v||(v=r(arguments)),a&&ot.apply(v,a),y&&v.length<l))return o|=16,f([e,g?o:-4&o,v,null,c,l]);if(v||(v=arguments),p&&(e=n[m]),this instanceof t){n=i(e.prototype);var h=e.apply(n,v);return b(h)?h:n}return e.apply(n,v)}var e=n[0],o=n[1],u=n[2],a=n[3],c=n[4],l=n[5],s=1&o,p=2&o,y=4&o,g=8&o,m=e;return gt(t,n),t}function c(n,t,e,r,o){(mt(t)?j:Ot)(t,function(t,u){var i,a,f=t,l=n[u];
if(t&&((a=mt(t))||wt(t))){for(var s=r.length;s--;)if(i=r[s]==t){l=o[s];break}if(!i){var p;e&&(f=e(l,t),(p=typeof f!="undefined")&&(l=f)),p||(l=a?mt(l)?l:[]:wt(l)?l:{}),r.push(t),o.push(l),p||c(l,t,e,r,o)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[u]=l})}function l(n,t,e,o,i,a){var c=1&t,s=2&t,p=4&t,y=16&t,g=32&t;if(!s&&!v(n))throw new TypeError;y&&!e.length&&(t&=-17,y=e=false),g&&!o.length&&(t&=-33,g=o=false);var m=n&&n.__bindData__;if(m&&m!==true)return m=r(m),m[2]&&(m[2]=r(m[2])),m[3]&&(m[3]=r(m[3])),!c||1&m[1]||(m[4]=i),!c&&1&m[1]&&(t|=8),!p||4&m[1]||(m[5]=a),y&&ot.apply(m[2]||(m[2]=[]),e),g&&it.apply(m[3]||(m[3]=[]),o),m[1]|=t,l.apply(null,m);
var b=1==t||17===t?u:f;return b([n,t,e,o,i,a])}function s(){G.h=P,G.b=G.c=G.g=G.i="",G.e="t",G.j=true;for(var n,t=0;n=arguments[t];t++)for(var e in n)G[e]=n[e];var r=G.a;G.d=/^[^,]+/.exec(r)[0];var o=Function("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L","return function("+r+"){"+yt(G)+"}");return o(a,B,U,rt,S,g,mt,h,G.f,X,J,st,$,Y,Z)}function p(n){return typeof n=="function"&&nt.test(n)}function y(n){var e,r;return!n||Z.call(n)!=T||(e=n.constructor,v(e)&&!(e instanceof e))||!pt.argsClass&&g(n)||!pt.nodeClass&&t(n)?false:pt.ownLast?(Et(n,function(n,t,e){return r=rt.call(e,t),false
}),r!==false):(Et(n,function(n,t){r=t}),typeof r=="undefined"||rt.call(n,r))}function g(n){return n&&typeof n=="object"&&typeof n.length=="number"&&Z.call(n)==D||false}function m(n){var t=true;if(!n)return t;var e=Z.call(n),r=n.length;return e==F||e==$||(pt.argsClass?e==D:g(n))||e==T&&typeof r=="number"&&v(n.splice)?!r:(Ot(n,function(){return t=false}),t)}function v(n){return typeof n=="function"}function b(n){return!(!n||!J[typeof n])}function h(n){return typeof n=="string"||n&&typeof n=="object"&&Z.call(n)==$||false
}function d(t){var o=arguments,u=2;if(!b(t))return t;if("number"!=typeof o[2]&&(u=o.length),u>3&&"function"==typeof o[u-2])var i=a(o[--u-1],o[u--],2);else u>2&&"function"==typeof o[u-1]&&(i=o[--u]);for(var f=r(arguments,1,u),l=-1,s=n(),p=n();++l<u;)c(t,f[l],i,s,p);return e(s),e(p),t}function j(n,t,e){if(t&&typeof e=="undefined"&&mt(n))for(var r=-1,o=n.length;++r<o&&t(n[r],r,n)!==false;);else jt(n,t,e);return n}function E(n,t){return arguments.length>2?l(n,17,r(arguments,2),null,t):l(n,1,null,null,t)
}function O(n){return n}function w(){}var x=[],S={},_=40,A=/^\s*function[ \n\r\t]+\w/,C=/\bthis\b/,P=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],D="[object Arguments]",F="[object Array]",I="[object Boolean]",L="[object Date]",B="[object Error]",N="[object Function]",R="[object Number]",T="[object Object]",K="[object RegExp]",$="[object String]",z={configurable:false,enumerable:false,value:null,writable:false},G={a:"",b:null,c:"",d:"",e:"",v:null,g:"",h:null,support:null,i:"",j:false},J={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},q=J[typeof window]&&window||this,V=J[typeof exports]&&exports&&!exports.nodeType&&exports,W=J[typeof module]&&module&&!module.nodeType&&module,H=W&&W.exports===V&&V,M=J[typeof global]&&global;
!M||M.global!==M&&M.window!==M||(q=M);var Q=[],U=Error.prototype,X=Object.prototype,Y=String.prototype,Z=X.toString,nt=RegExp("^"+(Z+"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),tt=Function.prototype.toString,et=p(et=Object.getPrototypeOf)&&et,rt=X.hasOwnProperty,ot=Q.push,ut=X.propertyIsEnumerable,it=Q.unshift,at=function(){try{var n={},t=p(t=Object.defineProperty)&&t,e=t(n,n,n)&&t}catch(r){}return e}(),ft=p(ft=Object.create)&&ft,ct=p(ct=Array.isArray)&&ct,lt=p(lt=Object.keys)&&lt,st={};
st[F]=st[L]=st[R]={constructor:true,toLocaleString:true,toString:true,valueOf:true},st[I]=st[$]={constructor:true,toString:true,valueOf:true},st[B]=st[N]=st[K]={constructor:true,toString:true},st[T]={constructor:true},function(){for(var n=P.length;n--;){var t=P[n];for(var e in st)rt.call(st,e)&&!rt.call(st[e],t)&&(st[e][t]=false)}}();var pt=o.support={};!function(){var n=function(){this.x=1},t={0:1,length:1},e=[];n.prototype={valueOf:1,y:1};for(var r in new n)e.push(r);for(r in arguments);pt.argsClass=Z.call(arguments)==D,pt.argsObject=arguments.constructor==Object&&!(arguments instanceof Array),pt.enumErrorProps=ut.call(U,"message")||ut.call(U,"name"),pt.enumPrototypes=ut.call(n,"prototype"),pt.funcDecomp=!p(q.WinRTError)&&C.test(function(){return this
}),pt.funcNames=typeof Function.name=="string",pt.nonEnumArgs=0!=r,pt.nonEnumShadows=!/valueOf/.test(e),pt.ownLast="x"!=e[0],pt.spliceObjects=(Q.splice.call(t,0,1),!t[0]),pt.unindexedChars="x"[0]+Object("x")[0]!="xx";try{pt.nodeClass=!(Z.call(document)==T&&!({toString:0}+""))}catch(o){pt.nodeClass=true}}(1);var yt=function(n){var t="var n,t="+n.d+",E="+n.e+";if(!t)return E;"+n.i+";";n.b?(t+="var u=t.length;n=-1;if("+n.b+"){",pt.unindexedChars&&(t+="if(s(t)){t=t.split('')}"),t+="while(++n<u){"+n.g+";}}else{"):pt.nonEnumArgs&&(t+="var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';"+n.g+";}}else{"),pt.enumPrototypes&&(t+="var G=typeof t=='function';"),pt.enumErrorProps&&(t+="var F=t===k||t instanceof Error;");
var e=[];if(pt.enumPrototypes&&e.push('!(G&&n=="prototype")'),pt.enumErrorProps&&e.push('!(F&&(n=="message"||n=="name"))'),n.j&&n.f)t+="var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",e.length&&(t+="if("+e.join("&&")+"){"),t+=n.g+";",e.length&&(t+="}"),t+="}";else if(t+="for(n in t){",n.j&&e.push("m.call(t, n)"),e.length&&(t+="if("+e.join("&&")+"){"),t+=n.g+";",e.length&&(t+="}"),t+="}",pt.nonEnumShadows){for(t+="if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];",k=0;k<7;k++)t+="n='"+n.h[k]+"';if((!(r&&x[n])&&m.call(t,n))",n.j||(t+="||(!x[n]&&t[n]!==A[n])"),t+="){"+n.g+"}";
t+="}"}return(n.b||pt.nonEnumArgs)&&(t+="}"),t+=n.c+";return E"};ft||(i=function(){function n(){}return function(t){if(b(t)){n.prototype=t;var e=new n;n.prototype=null}return e||q.Object()}}());var gt=at?function(n,t){z.value=t,at(n,"__bindData__",z)}:w;pt.argsClass||(g=function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&rt.call(n,"callee")&&!ut.call(n,"callee")||false});var mt=ct||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&Z.call(n)==F||false},vt=s({a:"z",e:"[]",i:"if(!(B[typeof z]))return E",g:"E.push(n)"}),bt=lt?function(n){return b(n)?pt.enumPrototypes&&typeof n=="function"||pt.nonEnumArgs&&n.length&&g(n)?vt(n):lt(n):[]
}:vt,ht={a:"g,e,K",i:"e=e&&typeof K=='undefined'?e:d(e,K,3)",b:"typeof u=='number'",v:bt,g:"if(e(t[n],n,g)===false)return E"},dt={i:"if(!B[typeof t])return E;"+ht.i,b:false},jt=s(ht),Et=s(ht,dt,{j:false}),Ot=s(ht,dt);v(/x/)&&(v=function(n){return typeof n=="function"&&Z.call(n)==N});var wt=et?function(n){if(!n||Z.call(n)!=T||!pt.argsClass&&g(n))return false;var t=n.valueOf,e=p(t)&&(e=et(t))&&et(e);return e?n==e||et(n)==e:y(n)}:y;o.bind=E,o.forEach=j,o.forIn=Et,o.forOwn=Ot,o.keys=bt,o.merge=d,o.each=j,o.identity=O,o.isArguments=g,o.isArray=mt,o.isEmpty=m,o.isFunction=v,o.isObject=b,o.isPlainObject=wt,o.isString=h,o.noop=w,o.VERSION="2.4.1",typeof define=="function"&&typeof define.amd=="object"&&define.amd?(q._=o, define(function(){return o
})):V&&W?H?(W.exports=o)._=o:V._=o:q._=o}).call(this);
// Generated by LiveScript 1.2.0
var replaceAt, isPattern, removeExtension;
replaceAt = function(index, char, string){
  switch (false) {
  case !(index < 0):
    return string.slice(0, index) + char + string.slice(index + 1);
  default:
    return string.slice(0, index) + char + string.slice(index + 1);
  }
};
isPattern = function(regex, string){
  return regex.test(string);
};
removeExtension = function(it){
  return it.slice(0, it.lastIndexOf("."));
};
// Generated by LiveScript 1.2.0
var coreConfig;
coreConfig = {
  head: {
    description: "A blog on programming. Mostly JavaScript.",
    title: "Jon's Blog",
    stylesheets: [
      {
        url: "//yui.yahooapis.com/pure/0.5.0/pure-min.css"
      }, {
        url: "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
      }, {
        url: "/css/style.css"
      }
    ]
  },
  menuItems: [
    {
      value: "Blog",
      url: "/",
      title: ""
    }, {
      value: "About",
      url: "/about",
      title: ""
    }
  ],
  header: {
    url: "/",
    'class': "",
    src: "./images/fire.png",
    title: "This is a Filler",
    subtitle: "Filling Up"
  },
  content: {
    article: "Loading..."
  },
  tags: [],
  previousPost: {
    value: "",
    title: "",
    url: ""
  },
  nextPost: {
    value: "",
    title: "",
    url: ""
  },
  footerItems: [
    {
      value: "",
      url: "http://thisisafiller-jon.tumblr.com/rss",
      title: "RSS Feed",
      'class': "fa fa-rss fa-2x"
    }, {
      value: "",
      url: "https://github.com/jon49/",
      title: "Personal Github Account",
      'class': "fa fa-github fa-2x"
    }, {
      value: "",
      url: "https://twitter.com/NymanJon",
      title: "Personal Twitter Account",
      'class': "fa fa-twitter fa-2x"
    }, {
      value: "",
      url: "https://plus.google.com/communities/101170592821781215530",
      title: "Prescott Developer's Google+ Site",
      'class': "fa fa-google-plus fa-2x"
    }, {
      value: "",
      url: "http://www.meetup.com/The-Prescott-Software-Developers-Meetup-Group/",
      title: "Prescott Developer's Meetup.com Site",
      'class': "fa fa-coffee fa-2x"
    }
  ],
  footer: {
    text: m.trust("&copy; 2014 Jon Nyman<br />nymanjon@gmail.com<br />Still Empty")
  },
  fileType: "",
  posts: m.prop([])
};
// Generated by LiveScript 1.2.0
/---Routinglogic---/;
var pagePattern, postPattern, postLinkPattern, withPostUrl, withFriendlyPostUrl, withPageUrl, filterPosts, getUrl, extractObject, parseDocument, extractDocument, toConfigStyle;
pagePattern = new RegExp("/(\\w+)");
postPattern = new RegExp("/(\\d{4})/(\\d{2})/(\\d{2})/(.+)");
postLinkPattern = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})-(.+)");
withPostUrl = function(match_, year, month, day, postName){
  return "/posts/" + year + "-" + month + "-" + day + "-" + postName + ".html";
};
withFriendlyPostUrl = function(match_, year, month, day, postName){
  var postName_;
  postName_ = removeExtension(postName);
  return "/" + year + "/" + month + "/" + day + "/" + postName_;
};
withPageUrl = function(match_, pageName){
  return "/pages/" + pageName + ".html";
};
filterPosts = function(it){
  return it.filter(function(it){
    return isPattern(postLinkPattern, it);
  });
};
getUrl = function(route){
  switch (false) {
  case !isPattern(pagePattern, route):
    return route.replace(pagePattern, withPageUrl);
  case !isPattern(postPattern, route):
    return route.replace(postPattern, withPostUrl);
  default:
    return "/pages/index.html";
  }
};
/---htmlpreprocessing---/;
extractObject = function(it){
  var start, end, result;
  switch (false) {
  case !((start = it.indexOf("{")) >= 0 && (end = it.lastIndexOf("}") + 1) > start):
    result = it.slice(start, end).trim().replace(/\n/g, "");
    if (result.slice(-2, -1) === ",") {
      return replaceAt(-2, "", result);
    } else {
      return result;
    }
    break;
  default:
    return "";
  }
};
parseDocument = function(it){
  var left, right, result;
  switch (false) {
  case it.length !== 1:
    return JSON.stringify({
      article: it[0].replace(/"/g, "\\\"").replace(/\//g, "\\/").replace(/\n/g, "")
    });
  default:
    left = extractObject(it[0]).slice(0, -1);
    right = it[1].replace(/"/g, "\\\"").replace(/\//g, "\\/").replace(/\n/g, "\\n");
    return result = left + ", \"article\": \"" + right + "\"}";
  }
};
extractDocument = function(it){
  switch (false) {
  case it.responseText === "Not found\n":
    return parseDocument(it.responseText.split("-->"));
  default:
    return JSON.stringify({
      title: "404",
      subtitle: "You've Been 404ed",
      article: "Oops! I couldn't find that page!"
    });
  }
};
/---configobjectpreprocessing--/;
toConfigStyle = function(it){
  var x;
  x = {};
  (x.head || (x.head = {})).description = it.description;
  (x.head || (x.head = {})).title = it.title;
  (x.content || (x.content = {})).article = it.article;
  (x.header || (x.header = {})).title = it.title;
  (x.header || (x.header = {})).subtitle = it.subtitle;
  x.fileType = it.type;
  return x;
};
// Generated by LiveScript 1.2.0
var infiniteScroll;
infiniteScroll = function(state, e){
  return window.addEventListener("scroll", function(e){
    state.pageY = Math.max(e.pageY || window.pageYOffset, 0);
    state.pageHeight = window.innerHeight;
    return m.redraw();
  });
};
// Generated by LiveScript 1.2.0
var link, links, head, menu, header, content, postList, footerMenu, footer, main;
link = function(it){
  return m('a', {
    'class': it['class'],
    href: it.url,
    title: it.title,
    config: it.url.indexOf(":") === -1 ? m.route : ""
  }, it.value);
};
links = function(items){
  return m('ul', (items || []).map(link));
};
head = function(head){
  var link, stylesheets;
  link = function(it){
    return m("link", {
      rel: "stylesheet",
      href: it.url
    });
  };
  stylesheets = (head.stylesheets || []).map(link);
  return m('head', stylesheets.concat((m('meta', {
    charset: "utf-8"
  }), m('meta', {
    httpEquiv: "X-UA-Compatible",
    content: "IE:edge,chrome:1"
  }), m('meta', {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  }), m('meta', {
    name: "description",
    content: head.description
  }), m("meta", {
    name: "generator",
    content: "maws v0.0.0"
  }), m('title', (head.title ? head.title + ' | ' : '') + "Jon's Blog"), m('link', {
    rel: "shortcut icon",
    href: "./favicon.ico"
  }))));
};
menu = function(it){
  return m('.menu', links(it));
};
header = function(it){
  return m('.header', [
    m('a', {
      href: it.url,
      'class': it['class']
    }, [m('img', {
      src: it.src
    })]), m('h1', it.title), m('h2.subtitle.fancy', m('span', it.subtitle))
  ]);
};
content = function(it){
  return m('article.content', it.article);
};
postList = function(posts, state, type){
  switch (false) {
  case type !== "archive":
    return m("ul", posts.map(function(it){
      return m("li", it);
    }));
  default:
    return "";
  }
};
footerMenu = function(it){
  return m('#footer-menu.menu', [links(it)]);
};
footer = function(it){
  return m('footer.footer', [m('p', it.text)]);
};
main = function(ctrl){
  var config, result;
  config = ctrl.config;
  return result = m('html', [m('head', head(config.head)), m('body', [menu(config.menuItems), m("#main", [header(config.header), content(config.content), postList(config.posts(), void 8, config.fileType), footerMenu(config.footerItems), footer(config.footer)])])]);
};
// Generated by LiveScript 1.2.0
var getPostInfo, getPostData;
getPostInfo = function(){};
getPostData = function(){
  var self, setPosts, postList;
  switch (false) {
  case !_.isEmpty(coreConfig.posts()):
    self = this;
    setPosts = function(filter, posts){
      this.posts(filter(
      posts.posts));
    };
    postList = {
      method: "GET",
      url: "/posts/posts.json"
    };
    m.request(postList).then(setPosts.bind(self.config, filterPosts)).then(setPosts.bind(coreConfig, filterPosts));
    break;
  }
};
function Controller(){
  var self, document, orCreate404Config, createNewConfig;
  self = this;
  this.config = coreConfig;
  document = {
    method: "GET",
    url: getUrl(m.route()),
    extract: extractDocument
  };
  orCreate404Config = createNewConfig = function(it){
    var it_, newConfig;
    it_ = toConfigStyle(it);
    it_.content.article = m.trust(it_.content.article);
    newConfig = _.merge({}, coreConfig, it_);
    self.config = newConfig;
  };
  m.request(document).then(createNewConfig, orCreate404Config).then(getPostData.bind(self));
}
// Generated by LiveScript 1.2.0
var app;
app = {
  view: main,
  controller: Controller
};
m.route.mode = "pathname";
m.route(document, "/", {
  "/": app,
  "/:date.../:post": app,
  "/:page": app
});
})()