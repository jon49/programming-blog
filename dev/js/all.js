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
Mithril = m = new function app(window) {
	var type = {}.toString
	var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g, attrParser = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/
	
	function m() {
		var args = arguments
		var hasAttrs = type.call(args[1]) == "[object Object]" && !("tag" in args[1]) && !("subtree" in args[1])
		var attrs = hasAttrs ? args[1] : {}
		var classAttrName = "class" in attrs ? "class" : "className"
		var cell = {tag: "div", attrs: {}}
		var match, classes = []
		while (match = parser.exec(args[0])) {
			if (match[1] == "") cell.tag = match[2]
			else if (match[1] == "#") cell.attrs.id = match[2]
			else if (match[1] == ".") classes.push(match[2])
			else if (match[3][0] == "[") {
				var pair = attrParser.exec(match[3])
				cell.attrs[pair[1]] = pair[3] || (pair[2] ? "" :true)
			}
		}
		if (classes.length > 0) cell.attrs[classAttrName] = classes.join(" ")
		
		cell.children = hasAttrs ? args[2] : args[1]
		
		for (var attrName in attrs) {
			if (attrName == classAttrName) cell.attrs[attrName] = (cell.attrs[attrName] || "") + " " + attrs[attrName]
			else cell.attrs[attrName] = attrs[attrName]
		}
		return cell
	}
	function build(parentElement, parentTag, parentCache, parentIndex, data, cached, shouldReattach, index, editable, namespace, configs) {
		if (data === null || data === undefined) data = ""
		if (data.subtree === "retain") return cached

		var cachedType = type.call(cached), dataType = type.call(data)
		if (cachedType != dataType) {
			if (cached !== null && cached !== undefined) {
				if (parentCache && parentCache.nodes) {
					var offset = index - parentIndex
					var end = offset + (dataType == "[object Array]" ? data : cached.nodes).length
					clear(parentCache.nodes.slice(offset, end), parentCache.slice(offset, end))
				}
				else clear(cached.nodes, cached)
			}
			cached = new data.constructor
			cached.nodes = []
		}

		if (dataType == "[object Array]") {
			data = flatten(data)
			var nodes = [], intact = cached.length === data.length, subArrayCount = 0
			
			var DELETION = 1, INSERTION = 2 , MOVE = 3
			var existing = {}, unkeyed = [], shouldMaintainIdentities = false
			for (var i = 0; i < cached.length; i++) {
				if (cached[i] && cached[i].attrs && cached[i].attrs.key !== undefined) {
					shouldMaintainIdentities = true
					existing[cached[i].attrs.key] = {action: DELETION, index: i}
				}
			}
			if (shouldMaintainIdentities) {
				for (var i = 0; i < data.length; i++) {
					if (data[i] && data[i].attrs) {
						if (data[i].attrs.key !== undefined) {
							var key = data[i].attrs.key
							if (!existing[key]) existing[key] = {action: INSERTION, index: i}
							else existing[key] = {action: MOVE, index: i, from: existing[key].index, element: parentElement.childNodes[existing[key].index]}
						}
						else unkeyed.push({index: i, element: parentElement.childNodes[i]})
					}
				}
				var actions = Object.keys(existing).map(function(key) {return existing[key]})
				var changes = actions.sort(function(a, b) {return a.action - b.action || a.index - b.index})
				var newCached = cached.slice()
				
				for (var i = 0, change; change = changes[i]; i++) {
					if (change.action == DELETION) {
						clear(cached[change.index].nodes, cached[change.index])
						newCached.splice(change.index, 1)
					}
					if (change.action == INSERTION) {
						var dummy = window.document.createElement("div")
						dummy.key = data[change.index].attrs.key
						parentElement.insertBefore(dummy, parentElement.childNodes[change.index])
						newCached.splice(change.index, 0, {attrs: {key: data[change.index].attrs.key}, nodes: [dummy]})
					}
					
					if (change.action == MOVE) {
						if (parentElement.childNodes[change.index] !== change.element) {
							parentElement.insertBefore(change.element, parentElement.childNodes[change.index])
						}
						newCached[change.index] = cached[change.from]
					}
				}
				for (var i = 0; i < unkeyed.length; i++) {
					var change = unkeyed[i]
					parentElement.insertBefore(change.element, parentElement.childNodes[change.index])
					newCached[change.index] = cached[change.index]
				}
				cached = newCached
				cached.nodes = []
				for (var i = 0, child; child = parentElement.childNodes[i]; i++) cached.nodes.push(child)
			}
			
			for (var i = 0, cacheCount = 0; i < data.length; i++) {
				var item = build(parentElement, parentTag, cached, index, data[i], cached[cacheCount], shouldReattach, index + subArrayCount || subArrayCount, editable, namespace, configs)
				if (item === undefined) continue
				if (!item.nodes.intact) intact = false
				var isArray = item instanceof Array
				subArrayCount += isArray ? item.length : 1
				cached[cacheCount++] = item
			}
			if (!intact) {
				for (var i = 0; i < data.length; i++) {
					if (cached[i] !== undefined) nodes = nodes.concat(cached[i].nodes)
				}
				for (var i = 0, node; node = cached.nodes[i]; i++) {
					if (node.parentNode !== null && nodes.indexOf(node) < 0) node.parentNode.removeChild(node)
				}
				for (var i = cached.nodes.length, node; node = nodes[i]; i++) {
					if (node.parentNode === null) parentElement.appendChild(node)
				}
				if (data.length < cached.length) cached.length = data.length
				cached.nodes = nodes
			}
			
		}
		else if (dataType == "[object Object]") {
			if (data.tag != cached.tag || Object.keys(data.attrs).join() != Object.keys(cached.attrs).join() || data.attrs.id != cached.attrs.id) {
				clear(cached.nodes)
				if (cached.configContext && typeof cached.configContext.onunload == "function") cached.configContext.onunload()
			}
			if (typeof data.tag != "string") return

			var node, isNew = cached.nodes.length === 0
			if (data.attrs.xmlns) namespace = data.attrs.xmlns
			else if (data.tag === "svg") namespace = "http://www.w3.org/2000/svg"
			if (isNew) {
				node = namespace === undefined ? window.document.createElement(data.tag) : window.document.createElementNS(namespace, data.tag)
				cached = {
					tag: data.tag,
					//process children before attrs so that select.value works correctly
					children: data.children !== undefined ? build(node, data.tag, undefined, undefined, data.children, cached.children, true, 0, data.attrs.contenteditable ? node : editable, namespace, configs) : undefined,
					attrs: setAttributes(node, data.tag, data.attrs, {}, namespace),
					nodes: [node]
				}
				parentElement.insertBefore(node, parentElement.childNodes[index] || null)
			}
			else {
				node = cached.nodes[0]
				setAttributes(node, data.tag, data.attrs, cached.attrs, namespace)
				cached.children = build(node, data.tag, undefined, undefined, data.children, cached.children, false, 0, data.attrs.contenteditable ? node : editable, namespace, configs)
				cached.nodes.intact = true
				if (shouldReattach === true) parentElement.insertBefore(node, parentElement.childNodes[index] || null)
			}
			if (type.call(data.attrs["config"]) == "[object Function]") {
				configs.push(data.attrs["config"].bind(window, node, !isNew, cached.configContext = cached.configContext || {}, cached))
			}
		}
		else {
			var nodes
			if (cached.nodes.length === 0) {
				if (data.$trusted) {
					nodes = injectHTML(parentElement, index, data)
				}
				else {
					nodes = [window.document.createTextNode(data)]
					parentElement.insertBefore(nodes[0], parentElement.childNodes[index] || null)
				}
				cached = "string number boolean".indexOf(typeof data) > -1 ? new data.constructor(data) : data
				cached.nodes = nodes
			}
			else if (cached.valueOf() !== data.valueOf() || shouldReattach === true) {
				nodes = cached.nodes
				if (!editable || editable !== window.document.activeElement) {
					if (data.$trusted) {
						clear(nodes, cached)
						nodes = injectHTML(parentElement, index, data)
					}
					else {
						if (parentTag === "textarea") parentElement.value = data
						else if (editable) editable.innerHTML = data
						else {
							if (nodes[0].nodeType == 1 || nodes.length > 1) { //was a trusted string
								clear(cached.nodes, cached)
								nodes = [window.document.createTextNode(data)]
							}
							parentElement.insertBefore(nodes[0], parentElement.childNodes[index] || null)
							nodes[0].nodeValue = data
						}
					}
				}
				cached = new data.constructor(data)
				cached.nodes = nodes
			}
			else cached.nodes.intact = true
		}

		return cached
	}
	function setAttributes(node, tag, dataAttrs, cachedAttrs, namespace) {
		var groups = {}
		for (var attrName in dataAttrs) {
			var dataAttr = dataAttrs[attrName]
			var cachedAttr = cachedAttrs[attrName]
			if (!(attrName in cachedAttrs) || (cachedAttr !== dataAttr) || node === window.document.activeElement) {
				cachedAttrs[attrName] = dataAttr
				if (attrName === "config") continue
				else if (typeof dataAttr == "function" && attrName.indexOf("on") == 0) {
					node[attrName] = autoredraw(dataAttr, node)
				}
				else if (attrName === "style" && typeof dataAttr == "object") {
					for (var rule in dataAttr) {
						if (cachedAttr === undefined || cachedAttr[rule] !== dataAttr[rule]) node.style[rule] = dataAttr[rule]
					}
					for (var rule in cachedAttr) {
						if (!(rule in dataAttr)) node.style[rule] = ""
					}
				}
				else if (namespace !== undefined) {
					if (attrName === "href") node.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataAttr)
					else if (attrName === "className") node.setAttribute("class", dataAttr)
					else node.setAttribute(attrName, dataAttr)
				}
				else if (attrName === "value" && tag === "input") {
					if (node.value !== dataAttr) node.value = dataAttr
				}
				else if (attrName in node && !(attrName == "list" || attrName == "style")) {
					node[attrName] = dataAttr
				}
				else node.setAttribute(attrName, dataAttr)
			}
		}
		return cachedAttrs
	}
	function clear(nodes, cached) {
		for (var i = nodes.length - 1; i > -1; i--) {
			if (nodes[i] && nodes[i].parentNode) {
				nodes[i].parentNode.removeChild(nodes[i])
				cached = [].concat(cached)
				if (cached[i]) unload(cached[i])
			}
		}
		if (nodes.length != 0) nodes.length = 0
	}
	function unload(cached) {
		if (cached.configContext && typeof cached.configContext.onunload == "function") cached.configContext.onunload()
		if (cached.children) {
			if (cached.children instanceof Array) for (var i = 0; i < cached.children.length; i++) unload(cached.children[i])
			else if (cached.children.tag) unload(cached.children)
		}
	}
	function injectHTML(parentElement, index, data) {
		var nextSibling = parentElement.childNodes[index]
		if (nextSibling) {
			var isElement = nextSibling.nodeType != 1
			var placeholder = window.document.createElement("span")
			if (isElement) {
				parentElement.insertBefore(placeholder, nextSibling)
				placeholder.insertAdjacentHTML("beforebegin", data)
				parentElement.removeChild(placeholder)
			}
			else nextSibling.insertAdjacentHTML("beforebegin", data)
		}
		else parentElement.insertAdjacentHTML("beforeend", data)
		var nodes = []
		while (parentElement.childNodes[index] !== nextSibling) {
			nodes.push(parentElement.childNodes[index])
			index++
		}
		return nodes
	}
	function flatten(data) {
		var flattened = []
		for (var i = 0; i < data.length; i++) {
			var item = data[i]
			if (item instanceof Array) flattened.push.apply(flattened, flatten(item))
			else flattened.push(item)
		}
		return flattened
	}
	function autoredraw(callback, object, group) {
		return function(e) {
			e = e || event
			m.startComputation()
			try {return callback.call(object, e)}
			finally {m.endComputation()}
		}
	}

	var html
	var documentNode = {
		insertAdjacentHTML: function(_, data) {
			window.document.write(data)
			window.document.close()
		},
		appendChild: function(node) {
			if (html === undefined) html = window.document.createElement("html")
			if (node.nodeName == "HTML") html = node
			else html.appendChild(node)
			if (window.document.documentElement && window.document.documentElement !== html) {
				window.document.replaceChild(html, window.document.documentElement)
			}
			else window.document.appendChild(html)
		},
		insertBefore: function(node) {
			this.appendChild(node)
		},
		childNodes: []
	}
	var nodeCache = [], cellCache = {}
	m.render = function(root, cell) {
		var configs = []
		if (!root) throw new Error("Please ensure the DOM element exists before rendering a template into it.")
		var id = getCellCacheKey(root)
		var node = root == window.document || root == window.document.documentElement ? documentNode : root
		if (cellCache[id] === undefined) clear(node.childNodes)
		cellCache[id] = build(node, null, undefined, undefined, cell, cellCache[id], false, 0, null, undefined, configs)
		for (var i = 0; i < configs.length; i++) configs[i]()
	}
	function getCellCacheKey(element) {
		var index = nodeCache.indexOf(element)
		return index < 0 ? nodeCache.push(element) - 1 : index
	}

	m.trust = function(value) {
		value = new String(value)
		value.$trusted = true
		return value
	}

	var roots = [], modules = [], controllers = [], lastRedrawId = 0, computePostRedrawHook = null
	m.module = function(root, module) {
		var index = roots.indexOf(root)
		if (index < 0) index = roots.length
		var isPrevented = false
		if (controllers[index] && typeof controllers[index].onunload == "function") {
			var event = {
				preventDefault: function() {isPrevented = true}
			}
			controllers[index].onunload(event)
		}
		if (!isPrevented) {
			m.startComputation()
			roots[index] = root
			modules[index] = module
			controllers[index] = new module.controller
			m.endComputation()
		}
	}
	m.redraw = function() {
		var cancel = window.cancelAnimationFrame || window.clearTimeout
		var defer = window.requestAnimationFrame || window.setTimeout
		cancel(lastRedrawId)
		lastRedrawId = defer(redraw, 0)
	}
	function redraw() {
		for (var i = 0; i < roots.length; i++) {
			if (controllers[i]) m.render(roots[i], modules[i].view(controllers[i]))
		}
		if (computePostRedrawHook) {
			computePostRedrawHook()
			computePostRedrawHook = null
		}
	}

	var pendingRequests = 0
	m.startComputation = function() {pendingRequests++}
	m.endComputation = function() {
		pendingRequests = Math.max(pendingRequests - 1, 0)
		if (pendingRequests == 0) m.redraw()
	}

	m.withAttr = function(prop, withAttrCallback) {
		return function(e) {
			e = e || event
			withAttrCallback(prop in e.currentTarget ? e.currentTarget[prop] : e.currentTarget.getAttribute(prop))
		}
	}

	//routing
	var modes = {pathname: "", hash: "#", search: "?"}
	var redirect = function() {}, routeParams = {}, currentRoute
	m.route = function() {
		if (arguments.length === 0) return currentRoute
		else if (arguments.length === 3 && typeof arguments[1] == "string") {
			var root = arguments[0], defaultRoute = arguments[1], router = arguments[2]
			redirect = function(source) {
				var path = currentRoute = normalizeRoute(source)
				if (!routeByValue(root, router, path)) {
					m.route(defaultRoute, true)
				}
			}
			var listener = m.route.mode == "hash" ? "onhashchange" : "onpopstate"
			window[listener] = function() {
				if (currentRoute != normalizeRoute(window.location[m.route.mode])) {
					redirect(window.location[m.route.mode])
				}
			}
			computePostRedrawHook = setScroll
			window[listener]()
		}
		else if (arguments[0].addEventListener) {
			var element = arguments[0]
			var isInitialized = arguments[1]
			if (element.href.indexOf(modes[m.route.mode]) < 0) {
				element.href = window.location.pathname + modes[m.route.mode] + element.pathname
			}
			if (!isInitialized) {
				element.removeEventListener("click", routeUnobtrusive)
				element.addEventListener("click", routeUnobtrusive)
			}
		}
		else if (typeof arguments[0] == "string") {
			currentRoute = arguments[0]
			var querystring = typeof arguments[1] == "object" ? buildQueryString(arguments[1]) : null
			if (querystring) currentRoute += (currentRoute.indexOf("?") === -1 ? "?" : "&") + querystring

			var shouldReplaceHistoryEntry = (arguments.length == 3 ? arguments[2] : arguments[1]) === true
			
			if (window.history.pushState) {
				computePostRedrawHook = function() {
					window.history[shouldReplaceHistoryEntry ? "replaceState" : "pushState"](null, window.document.title, modes[m.route.mode] + currentRoute)
					setScroll()
				}
				redirect(modes[m.route.mode] + currentRoute)
			}
			else window.location[m.route.mode] = currentRoute
		}
	}
	m.route.param = function(key) {return routeParams[key]}
	m.route.mode = "search"
	function normalizeRoute(route) {return route.slice(modes[m.route.mode].length)}
	function routeByValue(root, router, path) {
		routeParams = {}

		var queryStart = path.indexOf("?")
		if (queryStart !== -1) {
			routeParams = parseQueryString(path.substr(queryStart + 1, path.length))
			path = path.substr(0, queryStart)
		}

		for (var route in router) {
			if (route == path) {
				reset(root)
				m.module(root, router[route])
				return true
			}

			var matcher = new RegExp("^" + route.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")

			if (matcher.test(path)) {
				reset(root)
				path.replace(matcher, function() {
					var keys = route.match(/:[^\/]+/g) || []
					var values = [].slice.call(arguments, 1, -2)
					for (var i = 0; i < keys.length; i++) routeParams[keys[i].replace(/:|\./g, "")] = decodeSpace(values[i])
					m.module(root, router[route])
				})
				return true
			}
		}
	}
	function reset(root) {
		var cacheKey = getCellCacheKey(root)
		clear(root.childNodes, cellCache[cacheKey])
		cellCache[cacheKey] = undefined
	}
	function routeUnobtrusive(e) {
		e = e || event
		if (e.ctrlKey || e.metaKey || e.which == 2) return
		e.preventDefault()
		m.route(e.currentTarget[m.route.mode].slice(modes[m.route.mode].length))
	}
	function setScroll() {
		if (m.route.mode != "hash" && window.location.hash) window.location.hash = window.location.hash
		else window.scrollTo(0, 0)
	}
	function buildQueryString(object, prefix) {
		var str = []
		for(var prop in object) {
			var key = prefix ? prefix + "[" + prop + "]" : prop, value = object[prop]
			str.push(typeof value == "object" ? buildQueryString(value, key) : encodeURIComponent(key) + "=" + encodeURIComponent(value))
		}
		return str.join("&")
	}
	function parseQueryString(str) {
		var pairs = str.split("&"), params = {}
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i].split("=")
			params[decodeSpace(pair[0])] = pair[1] ? decodeSpace(pair[1]) : (pair.length === 1 ? true : "")
		}
		return params
	}
	function decodeSpace(string) {
		return decodeURIComponent(string.replace(/\+/g, " "))
	}

	//model
	m.prop = function(store) {
		var prop = function() {
			if (arguments.length) store = arguments[0]
			return store
		}
		prop.toJSON = function() {
			return store
		}
		return prop
	}

	var none = {}
	m.deferred = function() {
		var resolvers = [], rejecters = [], resolved = none, rejected = none, promise = m.prop()
		var object = {
			resolve: function(value) {
				if (resolved === none) promise(resolved = value)
				for (var i = 0; i < resolvers.length; i++) resolvers[i](value)
				resolvers.length = rejecters.length = 0
			},
			reject: function(value) {
				if (rejected === none) rejected = value
				for (var i = 0; i < rejecters.length; i++) rejecters[i](value)
				resolvers.length = rejecters.length = 0
			},
			promise: promise
		}
		object.promise.resolvers = resolvers
		object.promise.then = function(success, error) {
			var next = m.deferred()
			if (!success) success = identity
			if (!error) error = identity
			function callback(method, callback) {
				return function(value) {
					try {
						var result = callback(value)
						if (result && typeof result.then == "function") result.then(next[method], error)
						else next[method](result !== undefined ? result : value)
					}
					catch (e) {
						if (e instanceof Error && e.constructor !== Error) throw e
						else next.reject(e)
					}
				}
			}
			if (resolved !== none) callback("resolve", success)(resolved)
			else if (rejected !== none) callback("reject", error)(rejected)
			else {
				resolvers.push(callback("resolve", success))
				rejecters.push(callback("reject", error))
			}
			return next.promise
		}
		return object
	}
	m.sync = function(args) {
		var method = "resolve"
		function synchronizer(pos, resolved) {
			return function(value) {
				results[pos] = value
				if (!resolved) method = "reject"
				if (--outstanding == 0) {
					deferred.promise(results)
					deferred[method](results)
				}
				return value
			}
		}

		var deferred = m.deferred()
		var outstanding = args.length
		var results = new Array(outstanding)
		for (var i = 0; i < args.length; i++) {
			args[i].then(synchronizer(i, true), synchronizer(i, false))
		}
		return deferred.promise
	}
	function identity(value) {return value}

	function ajax(options) {
		var xhr = new window.XMLHttpRequest
		xhr.open(options.method, options.url, true, options.user, options.password)
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status >= 200 && xhr.status < 300) options.onload({type: "load", target: xhr})
				else options.onerror({type: "error", target: xhr})
			}
		}
		if (options.serialize == JSON.stringify && options.method != "GET") {
			xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		}
		if (typeof options.config == "function") {
			var maybeXhr = options.config(xhr, options)
			if (maybeXhr !== undefined) xhr = maybeXhr
		}
		xhr.send(options.method == "GET" ? "" : options.data)
		return xhr
	}
	function bindData(xhrOptions, data, serialize) {
		if (data && Object.keys(data).length > 0) {
			if (xhrOptions.method == "GET") {
				xhrOptions.url = xhrOptions.url + (xhrOptions.url.indexOf("?") < 0 ? "?" : "&") + buildQueryString(data)
			}
			else xhrOptions.data = serialize(data)
		}
		return xhrOptions
	}
	function parameterizeUrl(url, data) {
		var tokens = url.match(/:[a-z]\w+/gi)
		if (tokens && data) {
			for (var i = 0; i < tokens.length; i++) {
				var key = tokens[i].slice(1)
				url = url.replace(tokens[i], data[key])
				delete data[key]
			}
		}
		return url
	}

	m.request = function(xhrOptions) {
		if (xhrOptions.background !== true) m.startComputation()
		var deferred = m.deferred()
		var serialize = xhrOptions.serialize = xhrOptions.serialize || JSON.stringify
		var deserialize = xhrOptions.deserialize = xhrOptions.deserialize || JSON.parse
		var extract = xhrOptions.extract || function(xhr) {
			return xhr.responseText.length === 0 && deserialize === JSON.parse ? null : xhr.responseText
		}
		xhrOptions.url = parameterizeUrl(xhrOptions.url, xhrOptions.data)
		xhrOptions = bindData(xhrOptions, xhrOptions.data, serialize)
		xhrOptions.onload = xhrOptions.onerror = function(e) {
			try {
				e = e || event
				var unwrap = (e.type == "load" ? xhrOptions.unwrapSuccess : xhrOptions.unwrapError) || identity
				var response = unwrap(deserialize(extract(e.target, xhrOptions)))
				if (e.type == "load") {
					if (response instanceof Array && xhrOptions.type) {
						for (var i = 0; i < response.length; i++) response[i] = new xhrOptions.type(response[i])
					}
					else if (xhrOptions.type) response = new xhrOptions.type(response)
				}
				deferred[e.type == "load" ? "resolve" : "reject"](response)
			}
			catch (e) {
				if (e instanceof SyntaxError) throw new SyntaxError("Could not parse HTTP response. See http://lhorie.github.io/mithril/mithril.request.html#using-variable-data-formats")
				else if (e instanceof Error && e.constructor !== Error) throw e
				else deferred.reject(e)
			}
			if (xhrOptions.background !== true) m.endComputation()
		}
		ajax(xhrOptions)
		return deferred.promise
	}

	//testing API
	m.deps = function(mock) {return window = mock}
	//for internal testing only, do not use `m.deps.factory`
	m.deps.factory = app

	return m
}(typeof window != "undefined" ? window : {})

if (typeof module != "undefined" && module !== null) module.exports = m
if (typeof define == "function" && define.amd) define(function() {return m})

;;;

var replaceAt, isPattern, removeExtension, pagePattern, postPattern, postUglyPattern, postLinkPattern, withPostUrl, withFriendlyPostUrl, withPostDate, withPageUrl, filterPosts, isPost, postDate, getUrl, extractObject, parseDocument, extractDocument, toConfigStyle, coreConfig, propDo, postList, infiniteScroll, link, links, head, menu, header, content, tagView, postsView, nextPostView, previousPostView, navLinksView, footerMenu, footer, main, app;
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
/---Routinglogic---/;
pagePattern = new RegExp("/(\\w+)");
postPattern = new RegExp("/(\\d{4})/(\\d{2})/(\\d{2})/(.+)");
postUglyPattern = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})-(.+)");
postLinkPattern = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})-(.+)");
withPostUrl = function(match_, year, month, day, postName){
  return "/posts/" + year + "-" + month + "-" + day + "-" + postName + ".html";
};
withFriendlyPostUrl = function(match_, year, month, day, postName){
  var postName_;
  postName_ = removeExtension(postName);
  return "/" + year + "/" + month + "/" + day + "/" + postName_;
};
withPostDate = function(match_, year, month, day){
  return new Date(year, month - 1, day);
};
withPageUrl = function(match_, pageName){
  return "/pages/" + pageName + ".html";
};
filterPosts = function(it){
  return it.filter(function(it){
    return isPattern(postLinkPattern, it);
  });
};
isPost = function(){
  return isPattern(postPattern, m.route());
};
postDate = function(){
  return new Date(m.route().replace(postPattern, withPostDate));
};
getUrl = function(route){
  switch (false) {
  case !isPattern(postPattern, route):
    return route.replace(postPattern, withPostUrl);
  case !isPattern(pagePattern, route):
    return route.replace(pagePattern, withPageUrl);
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
    left = extractObject(it[0]).slice(0, -1).replace(/,]/g, "]");
    right = it[1].replace(/\\/g, '\\\\').replace(/"/g, "\\\"").replace(/\//g, "\\/").replace(/\n/g, "\\n");
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
  x.tags = it.tags;
  return x;
};
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
      value: "Archive",
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
    src: "/images/fire.png",
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
  posts: m.prop([]),
  postMetadata: function(){
    var postMetadata;
    postMetadata = {
      method: "GET",
      url: "/posts/metadata.json"
    };
    return m.request(postMetadata);
  }()
};
propDo = curry$(function(prop, fn, value){
  prop(fn.call(null, value));
});
postList = {
  method: "GET",
  url: "/posts/posts.json"
};
m.request(postList).then(propDo(coreConfig.posts, function(it){
  return it.posts.map(function(uglyUrl){
    return uglyUrl.replace(postUglyPattern, withFriendlyPostUrl);
  });
}));
infiniteScroll = function(state, e){
  return window.addEventListener("scroll", function(e){
    state.pageY = Math.max(e.pageY || window.pageYOffset, 0);
    state.pageHeight = window.innerHeight;
    return m.redraw();
  });
};
link = function(it){
  var result;
  return result = m('a', {
    'class': it['class'] || '',
    href: it.url,
    title: it.title || '',
    config: (it.url || (it.url = [])).indexOf(":") === -1 ? m.route : ""
  }, it.value);
};
links = function(items){
  return m('ul', (items || []).map(function(it){
    switch (false) {
    case !_.isEmpty(it):
      return '';
    default:
      return m('li', [link(it)]);
    }
  }));
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
  return stylesheets.concat((m('meta', {
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
  })));
};
menu = function(it){
  return m('.pure-menu.pure-menu-open.pure-menu-horizontal.menu', links(it));
};
header = function(type, config){
  return m('.header', [m('a', {
    href: config.url,
    'class': config['class']
  }, [m('img', {
    src: config.src
  })])].concat((function(){
    switch (type) {
    case 'page':
    case 'archive':
      return [m('h1', config.title), m('h2', m('span', config.subtitle))];
    default:
      return [];
    }
  }())));
};
content = function(it){
  return m('article.content', it.article);
};
tagView = function(type, tags){
  var attach;
  switch (false) {
  case !isPost():
    attach = tags.length > 0 ? ' - ' : '';
    return m('p.post-meta.pure-u-1', [m('span', 'Posted ' + postDate().toDateString() + attach)].concat(tags.map(function(tag){
      return m('span.post-tag', tag);
    })));
  default:
    return '';
  }
};
postsView = function(posts, metadata, type){
  var i;
  switch (type) {
  case 'archive':
    return m('.pure-menu.pure-menu-open.menu', [
      m('.pure-menu-heading', 'Archive'), links((function(){
        var i$, results$ = [];
        for (i$ = metadata.length - 1; i$ >= 0; --i$) {
          i = i$;
          results$.push({
            value: m.trust(metadata[i].title),
            url: posts[i]
          });
        }
        return results$;
      }()))
    ]);
  default:
    return '';
  }
};
nextPostView = function(posts, metadata, index){
  var linkIndex, post, meta;
  switch (linkIndex = index + 1) {
  case posts.length || metadata.length:
    return '';
  default:
    post = posts[linkIndex];
    meta = metadata[linkIndex];
    return {
      'class': 'navlinks-next',
      url: post,
      title: 'Next Post: ' + meta.title,
      value: m.trust(meta.title + ' &raquo;')
    };
  }
};
previousPostView = function(posts, metadata, index){
  var linkIndex, post, meta;
  switch (linkIndex = index - 1) {
  case -1:
    return '';
  default:
    post = posts[linkIndex];
    meta = metadata[linkIndex];
    return {
      'class': 'navlinks-prev',
      url: post,
      title: 'Previous Post: ' + meta.title,
      value: m.trust('&laquo; ' + meta.title)
    };
  }
};
navLinksView = function(posts, metadata){
  var index, previousPost, nextPost;
  switch (false) {
  case !isPost():
    index = posts.indexOf(m.route());
    previousPost = previousPostView(posts, metadata, index);
    nextPost = nextPostView(posts, metadata, index);
    return m('.pure-menu.pure-menu-open.pure-menu-horizontal.menu', links([previousPost, nextPost]));
  default:
    return '';
  }
};
footerMenu = function(it){
  return m('#footer-menu.pure-menu.pure-menu-open.pure-menu-horizontal.menu', [links(it)]);
};
footer = function(it){
  return m('footer.footer', [m('p', it.text)]);
};
main = function(ctrl){
  var config, result;
  config = ctrl.config;
  return result = m('html', [m('head', head(config.head)), m('body', [m('#main', [menu(config.menuItems), header(config.fileType, config.header), content(config.content), tagView(config.fileType, config.tags), navLinksView(config.posts(), config.postMetadata()), postsView(config.posts(), config.postMetadata(), config.fileType), footerMenu(config.footerItems), footer(config.footer)])])]);
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
  m.request(document).then(createNewConfig, orCreate404Config);
}
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
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
})()