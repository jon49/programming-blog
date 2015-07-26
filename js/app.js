(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Mithril = m = new function app(window, undefined) {
	var type = {}.toString
	var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g, attrParser = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/
	var voidElements = /AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TR‌​ACK|WBR/

	function m() {
		var args = arguments
		var hasAttrs = args[1] != null && type.call(args[1]) == "[object Object]" && !("tag" in args[1]) && !("subtree" in args[1])
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
		//`build` is a recursive function that manages creation/diffing/removal of DOM elements based on comparison between `data` and `cached`
		//the diff algorithm can be summarized as this:
		//1 - compare `data` and `cached`
		//2 - if they are different, copy `data` to `cached` and update the DOM based on what the difference is
		//3 - recursively apply this algorithm for every array and for the children of every virtual element
		
		//the `cached` data structure is essentially the same as the previous redraw's `data` data structure, with a few additions:
		//- `cached` always has a property called `nodes`, which is a list of DOM elements that correspond to the data represented by the respective virtual element
		//- in order to support attaching `nodes` as a property of `cached`, `cached` is *always* a non-primitive object, i.e. if the data was a string, then cached is a String instance. If data was `null` or `undefined`, cached is `new String("")`
		//- `cached also has a `configContext` property, which is the state storage object exposed by config(element, isInitialized, context)
		//- when `cached` is an Object, it represents a virtual element; when it's an Array, it represents a list of elements; when it's a String, Number or Boolean, it represents a text node

		//`parentElement` is a DOM element used for W3C DOM API calls
		//`parentTag` is only used for handling a corner case for textarea values
		//`parentCache` is used to remove nodes in some multi-node cases
		//`parentIndex` and `index` are used to figure out the offset of nodes. They're artifacts from before arrays started being flattened and are likely refactorable
		//`data` and `cached` are, respectively, the new and old nodes being diffed
		//`shouldReattach` is a flag indicating whether a parent node was recreated (if so, and if this node is reused, then this node must reattach itself to the new parent)
		//`editable` is a flag that indicates whether an ancestor is contenteditable
		//`namespace` indicates the closest HTML namespace as it cascades down from an ancestor
		//`configs` is a list of config functions to run after the topmost `build` call finishes running

		//there's logic that relies on the assumption that null and undefined data are equivalent to empty strings
		//- this prevents lifecycle surprises from procedural helpers that mix implicit and explicit return statements
		//- it simplifies diffing code
		if (data == null) data = ""
		if (data.subtree === "retain") return cached

		var cachedType = type.call(cached), dataType = type.call(data)
		if (cached == null || cachedType != dataType) {
			if (cached != null) {
				if (parentCache && parentCache.nodes) {
					var offset = index - parentIndex
					var end = offset + (dataType == "[object Array]" ? data : cached.nodes).length
					clear(parentCache.nodes.slice(offset, end), parentCache.slice(offset, end))
				}
				else if (cached.nodes) clear(cached.nodes, cached)
			}
			cached = new data.constructor
			cached.nodes = []
		}

		if (dataType == "[object Array]") {
			data = flatten(data)
			var nodes = [], intact = cached.length === data.length, subArrayCount = 0

			//keys algorithm: sort elements without recreating them if keys are present
			//1) create a map of all existing keys, and mark all for deletion
			//2) add new keys to map and mark them for addition
			//3) if key exists in new list, change action from deletion to a move
			//4) for each key, handle its corresponding action as marked in previous steps
			//5) copy unkeyed items into their respective gaps
			var DELETION = 1, INSERTION = 2 , MOVE = 3
			var existing = {}, unkeyed = [], shouldMaintainIdentities = false
			for (var i = 0; i < cached.length; i++) {
				if (cached[i] && cached[i].attrs && cached[i].attrs.key != null) {
					shouldMaintainIdentities = true
					existing[cached[i].attrs.key] = {action: DELETION, index: i}
				}
			}
			if (shouldMaintainIdentities) {
				for (var i = 0; i < data.length; i++) {
					if (data[i] && data[i].attrs) {
						if (data[i].attrs.key != null) {
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
						if (parentElement.childNodes[change.index] !== change.element && change.element !== null) {
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
			//end key algorithm

			for (var i = 0, cacheCount = 0; i < data.length; i++) {
				//diff each item in the array
				var item = build(parentElement, parentTag, cached, index, data[i], cached[cacheCount], shouldReattach, index + subArrayCount || subArrayCount, editable, namespace, configs)
				if (item === undefined) continue
				if (!item.nodes.intact) intact = false
				var isArray = type.call(item) == "[object Array]"
				subArrayCount += isArray ? item.length : 1
				cached[cacheCount++] = item
			}
			if (!intact) {
				//diff the array itself
				
				//update the list of DOM nodes by collecting the nodes from each item
				for (var i = 0; i < data.length; i++) {
					if (cached[i] != null) nodes = nodes.concat(cached[i].nodes)
				}
				//remove items from the end of the array if the new array is shorter than the old one
				//if errors ever happen here, the issue is most likely a bug in the construction of the `cached` data structure somewhere earlier in the program
				for (var i = 0, node; node = cached.nodes[i]; i++) {
					if (node.parentNode != null && nodes.indexOf(node) < 0) clear([node], [cached[i]])
				}
				//add items to the end if the new array is longer than the old one
				for (var i = cached.nodes.length, node; node = nodes[i]; i++) {
					if (node.parentNode == null) parentElement.appendChild(node)
				}
				if (data.length < cached.length) cached.length = data.length
				cached.nodes = nodes
			}
		}
		else if (data != null && dataType == "[object Object]") {
			//if an element is different enough from the one in cache, recreate it
			if (data.tag != cached.tag || Object.keys(data.attrs).join() != Object.keys(cached.attrs).join() || data.attrs.id != cached.attrs.id) {
				clear(cached.nodes)
				if (cached.configContext && typeof cached.configContext.onunload == "function") cached.configContext.onunload()
			}
			if (typeof data.tag != "string") return

			var node, isNew = cached.nodes.length === 0
			if (data.attrs.xmlns) namespace = data.attrs.xmlns
			else if (data.tag === "svg") namespace = "http://www.w3.org/2000/svg"
			else if (data.tag === "math") namespace = "http://www.w3.org/1998/Math/MathML"
			if (isNew) {
				node = namespace === undefined ? window.document.createElement(data.tag) : window.document.createElementNS(namespace, data.tag)
				cached = {
					tag: data.tag,
					//process children before attrs so that select.value works correctly
					children: build(node, data.tag, undefined, undefined, data.children, cached.children, true, 0, data.attrs.contenteditable ? node : editable, namespace, configs),
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
				if (shouldReattach === true && node != null) parentElement.insertBefore(node, parentElement.childNodes[index] || null)
			}
			//schedule configs to be called. They are called after `build` finishes running
			if (typeof data.attrs["config"] === "function") {
				configs.push(data.attrs["config"].bind(window, node, !isNew, cached.configContext = cached.configContext || {}, cached))
			}
		}
		else if (typeof dataType != "function") {
			//handle text nodes
			var nodes
			if (cached.nodes.length === 0) {
				if (data.$trusted) {
					nodes = injectHTML(parentElement, index, data)
				}
				else {
					nodes = [window.document.createTextNode(data)]
					if (!parentElement.nodeName.match(voidElements)) parentElement.insertBefore(nodes[0], parentElement.childNodes[index] || null)
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
						//corner case: replacing the nodeValue of a text node that is a child of a textarea/contenteditable doesn't work
						//we need to update the value property of the parent textarea or the innerHTML of the contenteditable element instead
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
						if (cachedAttr == null || cachedAttr[rule] !== dataAttr[rule]) node.style[rule] = dataAttr[rule]
					}
					for (var rule in cachedAttr) {
						if (!(rule in dataAttr)) node.style[rule] = ""
					}
				}
				else if (namespace != null) {
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
			if (type.call(cached.children) == "[object Array]") for (var i = 0; i < cached.children.length; i++) unload(cached.children[i])
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
			if (type.call(item) == "[object Array]") flattened.push.apply(flattened, flatten(item))
			else flattened.push(item)
		}
		return flattened
	}
	function autoredraw(callback, object, group) {
		return function(e) {
			e = e || event
			m.redraw.strategy("diff")
			m.startComputation()
			try {return callback.call(object, e)}
			finally {
				if (!lastRedrawId) lastRedrawId = -1;
				m.endComputation()
			}
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
	m.render = function(root, cell, forceRecreation) {
		var configs = []
		if (!root) throw new Error("Please ensure the DOM element exists before rendering a template into it.")
		var id = getCellCacheKey(root)
		var node = root == window.document || root == window.document.documentElement ? documentNode : root
		if (cellCache[id] === undefined) clear(node.childNodes)
		if (forceRecreation === true) reset(root)
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

	function _prop(store) {
		var prop = function() {
			if (arguments.length) store = arguments[0]
			return store
		}

		prop.toJSON = function() {
			return store
		}

		return prop
	}

	m.prop = function (store) {
		if ((typeof store === 'object' || typeof store === 'function') &&
				typeof store.then === 'function') {
			var prop = _prop()
			newPromisedProp(prop, store).then(prop)

			return prop
		}

		return _prop(store)
	}

	var roots = [], modules = [], controllers = [], lastRedrawId = 0, computePostRedrawHook = null, prevented = false
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
			m.redraw.strategy("all")
			m.startComputation()
			roots[index] = root
			modules[index] = module
			controllers[index] = new module.controller
			m.endComputation()
		}
	}
	m.redraw = function(force) {
		var cancel = window.cancelAnimationFrame || window.clearTimeout
		var defer = window.requestAnimationFrame || window.setTimeout
		if (lastRedrawId && force !== true) {
			cancel(lastRedrawId)
			lastRedrawId = defer(redraw, 0)
		}
		else {
			redraw()
			lastRedrawId = defer(function() {lastRedrawId = null}, 0)
		}
	}
	m.redraw.strategy = m.prop()
	function redraw() {
		var mode = m.redraw.strategy()
		for (var i = 0; i < roots.length; i++) {
			if (controllers[i] && mode != "none") m.render(roots[i], modules[i].view(controllers[i]), mode == "all")
		}
		if (computePostRedrawHook) {
			computePostRedrawHook()
			computePostRedrawHook = null
		}
		lastRedrawId = null
		m.redraw.strategy("diff")
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
			var currentTarget = e.currentTarget || this
			withAttrCallback(prop in currentTarget ? currentTarget[prop] : currentTarget.getAttribute(prop))
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
				m.module(root, router[route])
				return true
			}

			var matcher = new RegExp("^" + route.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")

			if (matcher.test(path)) {
				path.replace(matcher, function() {
					var keys = route.match(/:[^\/]+/g) || []
					var values = [].slice.call(arguments, 1, -2)
					for (var i = 0; i < keys.length; i++) routeParams[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
					m.module(root, router[route])
				})
				return true
			}
		}
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
	function reset(root) {
		var cacheKey = getCellCacheKey(root)
		clear(root.childNodes, cellCache[cacheKey])
		cellCache[cacheKey] = undefined
	}

	function newPromisedProp(prop, promise) {
		prop.then = function () {
			var newProp = m.prop()
			return newPromisedProp(newProp,
				promise.then.apply(promise, arguments).then(newProp))
		}
		prop.promise = prop
		prop.resolve = function (val) {
			prop(val)
			promise = promise.resolve.apply(promise, arguments)
			return prop
		}
		prop.reject = function () {
			promise = promise.reject.apply(promise, arguments)
			return prop
		}

		return prop
	}
	m.deferred = function () {
		return newPromisedProp(m.prop(), new Deferred())
	}
	// Promiz.mithril.js | Zolmeister | MIT
	function Deferred(fn, er) {
		// states
		// 0: pending
		// 1: resolving
		// 2: rejecting
		// 3: resolved
		// 4: rejected
		var self = this,
			state = 0,
			val = 0,
			next = [];

		self['promise'] = self

		self['resolve'] = function (v) {
			if (!state) {
				val = v
				state = 1

				fire()
			}
			return this
		}

		self['reject'] = function (v) {
			if (!state) {
				val = v
				state = 2

				fire()
			}
			return this
		}

		self['then'] = function (fn, er) {
			var d = new Deferred(fn, er)
			if (state == 3) {
				d.resolve(val)
			}
			else if (state == 4) {
				d.reject(val)
			}
			else {
				next.push(d)
			}
			return d
		}

		var finish = function (type) {
			state = type || 4
			next.map(function (p) {
				state == 3 && p.resolve(val) || p.reject(val)
			})
		}

		// ref : reference to 'then' function
		// cb, ec, cn : successCallback, failureCallback, notThennableCallback
		function thennable (ref, cb, ec, cn) {
			if ((typeof val == 'object' || typeof val == 'function') && typeof ref == 'function') {
				try {

					// cnt protects against abuse calls from spec checker
					var cnt = 0
					ref.call(val, function (v) {
						if (cnt++) return
						val = v
						cb()
					}, function (v) {
						if (cnt++) return
						val = v
						ec()
					})
				} catch (e) {
					val = e
					ec()
				}
			} else {
				cn()
			}
		};

		function fire() {

			// check if it's a thenable
			var ref;
			try {
				ref = val && val.then
			} catch (e) {
				val = e
				state = 2
				return fire()
			}
			thennable(ref, function () {
				state = 1
				fire()
			}, function () {
				state = 2
				fire()
			}, function () {
				try {
					if (state == 1 && typeof fn == 'function') {
						val = fn(val)
					}

					else if (state == 2 && typeof er == 'function') {
						val = er(val)
						state = 1
					}
				} catch (e) {
					val = e
					return finish()
				}

				if (val == self) {
					val = TypeError()
					finish()
				} else thennable(ref, function () {
						finish(3)
					}, finish, function () {
						finish(state == 1 && 3)
					})

			})
		}
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
		if (args.length > 0) {
			for (var i = 0; i < args.length; i++) {
				args[i].then(synchronizer(i, true), synchronizer(i, false))
			}
		}
		else deferred.resolve()

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
			if (maybeXhr != null) xhr = maybeXhr
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
					if (type.call(response) == "[object Array]" && xhrOptions.type) {
						for (var i = 0; i < response.length; i++) response[i] = new xhrOptions.type(response[i])
					}
					else if (xhrOptions.type) response = new xhrOptions.type(response)
				}
				deferred[e.type == "load" ? "resolve" : "reject"](response)
			}
			catch (e) {
				if (e instanceof SyntaxError) throw new SyntaxError("Could not parse HTTP response. See http://lhorie.github.io/mithril/mithril.request.html#using-variable-data-formats")
				else if (type.call(e) == "[object Error]" && e.constructor !== Error) throw e
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

},{}],2:[function(require,module,exports){
(function (global){
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash -m include="merge,isPlainObject,find,findIndex"`
 */
;(function(){function n(){return A.pop()||[]}function t(n){return typeof n.toString!="function"&&typeof(n+"")=="string"}function r(n){n.length=0,A.length<D&&A.push(n)}function e(n,t,r){t||(t=0),typeof r=="undefined"&&(r=n?n.length:0);for(var e=-1,o=r-t||0,u=Array(o<0?0:o);++e<o;)u[e]=n[t+e];return u}function o(){}function u(n){function t(){if(o){var n=e(o);it.apply(n,arguments)}if(this instanceof t){var f=a(r.prototype),i=r.apply(f,n||arguments);return h(i)?i:f}return r.apply(u,n||arguments)}var r=n[0],o=n[2],u=n[4];
return bt(t,n),t}function a(n){return h(n)?pt(n):{}}function f(n,t,r){if(typeof n!="function")return x;if(typeof t=="undefined"||!("prototype"in n))return n;var e=n.__bindData__;if(typeof e=="undefined"&&(dt.funcNames&&(e=!n.name),e=e||!dt.funcDecomp,!e)){var o=ut.call(n);dt.funcNames||(e=!F.test(o)),e||(e=I.test(o),bt(n,e))}if(e===false||e!==true&&1&e[1])return n;switch(r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,o){return n.call(t,r,e,o)
};case 4:return function(r,e,o,u){return n.call(t,r,e,o,u)}}return w(n,t)}function i(n){function t(){var n=s?c:this;if(u){var d=e(u);it.apply(d,arguments)}if((f||g)&&(d||(d=e(arguments)),f&&it.apply(d,f),g&&d.length<l))return o|=16,i([r,y?o:-4&o,d,null,c,l]);if(d||(d=arguments),p&&(r=n[v]),this instanceof t){n=a(r.prototype);var b=r.apply(n,d);return h(b)?b:n}return r.apply(n,d)}var r=n[0],o=n[1],u=n[2],f=n[3],c=n[4],l=n[5],s=1&o,p=2&o,g=4&o,y=8&o,v=r;return bt(t,n),t}function c(e,o,u,a,f,i){if(u){var l=u(e,o);
if(typeof l!="undefined")return!!l}if(e===o)return 0!==e||1/e==1/o;var s=typeof e,p=typeof o;if(e===e&&(!e||!H[s])&&(!o||!H[p]))return false;if(null==e||null==o)return e===o;var g=et.call(e),y=et.call(o);if(g==B&&(g=G),y==B&&(y=G),g!=y)return false;switch(g){case R:case T:return+e==+o;case z:return e!=+e?o!=+o:0==e?1/e==1/o:e==+o;case J:case W:return e==o+""}var h=g==N;if(!h){var b=ft.call(e,"__wrapped__"),m=ft.call(o,"__wrapped__");if(b||m)return c(b?e.__wrapped__:e,m?o.__wrapped__:o,u,a,f,i);if(g!=G||!dt.nodeClass&&(t(e)||t(o)))return false;
var j=!dt.argsObject&&v(e)?Object:e.constructor,_=!dt.argsObject&&v(o)?Object:o.constructor;if(j!=_&&!(d(j)&&j instanceof j&&d(_)&&_ instanceof _)&&"constructor"in e&&"constructor"in o)return false}var O=!f;f||(f=n()),i||(i=n());for(var w=f.length;w--;)if(f[w]==e)return i[w]==o;var E=0;if(l=true,f.push(e),i.push(o),h){if(w=e.length,E=o.length,l=E==w,l||a)for(;E--;){var x=w,S=o[E];if(a)for(;x--&&!(l=c(e[x],S,u,a,f,i)););else if(!(l=c(e[E],S,u,a,f,i)))break}}else xt(o,function(n,t,r){return ft.call(r,t)?(E++,l=ft.call(e,t)&&c(e[t],n,u,a,f,i)):void 0
}),l&&!a&&xt(e,function(n,t,r){return ft.call(r,t)?l=--E>-1:void 0});return f.pop(),i.pop(),O&&(r(f),r(i)),l}function l(n,t,r,e,o){(mt(t)?_:St)(t,function(t,u){var a,f,i=t,c=n[u];if(t&&((f=mt(t))||Ct(t))){for(var s=e.length;s--;)if(a=e[s]==t){c=o[s];break}if(!a){var p;r&&(i=r(c,t),(p=typeof i!="undefined")&&(c=i)),p||(c=f?mt(c)?c:[]:Ct(c)?c:{}),e.push(t),o.push(c),p||l(c,t,r,e,o)}}else r&&(i=r(c,t),typeof i=="undefined"&&(i=t)),typeof i!="undefined"&&(c=i);n[u]=c})}function s(n,t,r,o,a,f){var c=1&t,l=2&t,p=4&t,g=16&t,y=32&t;
if(!l&&!d(n))throw new TypeError;g&&!r.length&&(t&=-17,g=r=false),y&&!o.length&&(t&=-33,y=o=false);var v=n&&n.__bindData__;if(v&&v!==true)return v=e(v),v[2]&&(v[2]=e(v[2])),v[3]&&(v[3]=e(v[3])),!c||1&v[1]||(v[4]=a),!c&&1&v[1]&&(t|=8),!p||4&v[1]||(v[5]=f),g&&it.apply(v[2]||(v[2]=[]),r),y&&lt.apply(v[3]||(v[3]=[]),o),v[1]|=t,s.apply(null,v);var h=1==t||17===t?u:i;return h([n,t,r,o,a,f])}function p(){V.h=L,V.b=V.c=V.g=V.i="",V.e="t",V.j=true;for(var n,t=0;n=arguments[t];t++)for(var r in n)V[r]=n[r];var e=V.a;
V.d=/^[^,]+/.exec(e)[0];var o=Function("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L","return function("+e+"){"+ht(V)+"}");return o(f,K,nt,ft,P,v,mt,b,V.f,tt,H,vt,W,rt,et)}function g(n){return typeof n=="function"&&ot.test(n)}function y(n){var r,e;return!n||et.call(n)!=G||(r=n.constructor,d(r)&&!(r instanceof r))||!dt.argsClass&&v(n)||!dt.nodeClass&&t(n)?false:dt.ownLast?(xt(n,function(n,t,r){return e=ft.call(r,t),false}),e!==false):(xt(n,function(n,t){e=t}),typeof e=="undefined"||ft.call(n,e))}function v(n){return n&&typeof n=="object"&&typeof n.length=="number"&&et.call(n)==B||false
}function d(n){return typeof n=="function"}function h(n){return!(!n||!H[typeof n])}function b(n){return typeof n=="string"||n&&typeof n=="object"&&et.call(n)==W||false}function m(t){var o=arguments,u=2;if(!h(t))return t;if("number"!=typeof o[2]&&(u=o.length),u>3&&"function"==typeof o[u-2])var a=f(o[--u-1],o[u--],2);else u>2&&"function"==typeof o[u-1]&&(a=o[--u]);for(var i=e(arguments,1,u),c=-1,s=n(),p=n();++c<u;)l(t,i[c],a,s,p);return r(s),r(p),t}function j(n,t,r){if(t=o.createCallback(t,r,3),!mt(n)){var e;
return Et(n,function(n,r,o){return t(n,r,o)?(e=n,false):void 0}),e}for(var u=-1,a=n.length;++u<a;){var f=n[u];if(t(f,u,n))return f}}function _(n,t,r){if(t&&typeof r=="undefined"&&mt(n))for(var e=-1,o=n.length;++e<o&&t(n[e],e,n)!==false;);else Et(n,t,r);return n}function O(n,t,r){var e=-1,u=n?n.length:0;for(t=o.createCallback(t,r,3);++e<u;)if(t(n[e],e,n))return e;return-1}function w(n,t){return arguments.length>2?s(n,17,e(arguments,2),null,t):s(n,1,null,null,t)}function E(n,t,r){var e=typeof n;if(null==n||"function"==e)return f(n,t,r);
if("object"!=e)return C(n);var o=_t(n),u=o[0],a=n[u];return 1!=o.length||a!==a||h(a)?function(t){for(var r=o.length,e=false;r--&&(e=c(t[o[r]],n[o[r]],null,true)););return e}:function(n){var t=n[u];return a===t&&(0!==a||1/a==1/t)}}function x(n){return n}function S(){}function C(n){return function(t){return t[n]}}var A=[],P={},D=40,F=/^\s*function[ \n\r\t]+\w/,I=/\bthis\b/,L=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],B="[object Arguments]",N="[object Array]",R="[object Boolean]",T="[object Date]",K="[object Error]",$="[object Function]",z="[object Number]",G="[object Object]",J="[object RegExp]",W="[object String]",q={configurable:false,enumerable:false,value:null,writable:false},V={a:"",b:null,c:"",d:"",e:"",v:null,g:"",h:null,support:null,i:"",j:false},H={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},M=H[typeof window]&&window||this,Q=H[typeof exports]&&exports&&!exports.nodeType&&exports,U=H[typeof module]&&module&&!module.nodeType&&module,X=U&&U.exports===Q&&Q,Y=H[typeof global]&&global;
!Y||Y.global!==Y&&Y.window!==Y||(M=Y);var Z=[],nt=Error.prototype,tt=Object.prototype,rt=String.prototype,et=tt.toString,ot=RegExp("^"+(et+"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),ut=Function.prototype.toString,at=g(at=Object.getPrototypeOf)&&at,ft=tt.hasOwnProperty,it=Z.push,ct=tt.propertyIsEnumerable,lt=Z.unshift,st=function(){try{var n={},t=g(t=Object.defineProperty)&&t,r=t(n,n,n)&&t}catch(e){}return r}(),pt=g(pt=Object.create)&&pt,gt=g(gt=Array.isArray)&&gt,yt=g(yt=Object.keys)&&yt,vt={};
vt[N]=vt[T]=vt[z]={constructor:true,toLocaleString:true,toString:true,valueOf:true},vt[R]=vt[W]={constructor:true,toString:true,valueOf:true},vt[K]=vt[$]=vt[J]={constructor:true,toString:true},vt[G]={constructor:true},function(){for(var n=L.length;n--;){var t=L[n];for(var r in vt)ft.call(vt,r)&&!ft.call(vt[r],t)&&(vt[r][t]=false)}}();var dt=o.support={};!function(){var n=function(){this.x=1},t={0:1,length:1},r=[];n.prototype={valueOf:1,y:1};for(var e in new n)r.push(e);for(e in arguments);dt.argsClass=et.call(arguments)==B,dt.argsObject=arguments.constructor==Object&&!(arguments instanceof Array),dt.enumErrorProps=ct.call(nt,"message")||ct.call(nt,"name"),dt.enumPrototypes=ct.call(n,"prototype"),dt.funcDecomp=!g(M.WinRTError)&&I.test(function(){return this
}),dt.funcNames=typeof Function.name=="string",dt.nonEnumArgs=0!=e,dt.nonEnumShadows=!/valueOf/.test(r),dt.ownLast="x"!=r[0],dt.spliceObjects=(Z.splice.call(t,0,1),!t[0]),dt.unindexedChars="x"[0]+Object("x")[0]!="xx";try{dt.nodeClass=!(et.call(document)==G&&!({toString:0}+""))}catch(o){dt.nodeClass=true}}(1);var ht=function(n){var t="var n,t="+n.d+",E="+n.e+";if(!t)return E;"+n.i+";";n.b?(t+="var u=t.length;n=-1;if("+n.b+"){",dt.unindexedChars&&(t+="if(s(t)){t=t.split('')}"),t+="while(++n<u){"+n.g+";}}else{"):dt.nonEnumArgs&&(t+="var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';"+n.g+";}}else{"),dt.enumPrototypes&&(t+="var G=typeof t=='function';"),dt.enumErrorProps&&(t+="var F=t===k||t instanceof Error;");
var r=[];if(dt.enumPrototypes&&r.push('!(G&&n=="prototype")'),dt.enumErrorProps&&r.push('!(F&&(n=="message"||n=="name"))'),n.j&&n.f)t+="var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",r.length&&(t+="if("+r.join("&&")+"){"),t+=n.g+";",r.length&&(t+="}"),t+="}";else if(t+="for(n in t){",n.j&&r.push("m.call(t, n)"),r.length&&(t+="if("+r.join("&&")+"){"),t+=n.g+";",r.length&&(t+="}"),t+="}",dt.nonEnumShadows){for(t+="if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];",k=0;k<7;k++)t+="n='"+n.h[k]+"';if((!(r&&x[n])&&m.call(t,n))",n.j||(t+="||(!x[n]&&t[n]!==A[n])"),t+="){"+n.g+"}";
t+="}"}return(n.b||dt.nonEnumArgs)&&(t+="}"),t+=n.c+";return E"};pt||(a=function(){function n(){}return function(t){if(h(t)){n.prototype=t;var r=new n;n.prototype=null}return r||M.Object()}}());var bt=st?function(n,t){q.value=t,st(n,"__bindData__",q)}:S;dt.argsClass||(v=function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ft.call(n,"callee")&&!ct.call(n,"callee")||false});var mt=gt||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&et.call(n)==N||false},jt=p({a:"z",e:"[]",i:"if(!(B[typeof z]))return E",g:"E.push(n)"}),_t=yt?function(n){return h(n)?dt.enumPrototypes&&typeof n=="function"||dt.nonEnumArgs&&n.length&&v(n)?jt(n):yt(n):[]
}:jt,Ot={a:"g,e,K",i:"e=e&&typeof K=='undefined'?e:d(e,K,3)",b:"typeof u=='number'",v:_t,g:"if(e(t[n],n,g)===false)return E"},wt={i:"if(!B[typeof t])return E;"+Ot.i,b:false},Et=p(Ot),xt=p(Ot,wt,{j:false}),St=p(Ot,wt);d(/x/)&&(d=function(n){return typeof n=="function"&&et.call(n)==$});var Ct=at?function(n){if(!n||et.call(n)!=G||!dt.argsClass&&v(n))return false;var t=n.valueOf,r=g(t)&&(r=at(t))&&at(r);return r?n==r||at(n)==r:y(n)}:y;o.bind=w,o.createCallback=E,o.forEach=_,o.forIn=xt,o.forOwn=St,o.keys=_t,o.merge=m,o.property=C,o.each=_,o.find=j,o.findIndex=O,o.identity=x,o.isArguments=v,o.isArray=mt,o.isFunction=d,o.isObject=h,o.isPlainObject=Ct,o.isString=b,o.noop=S,o.detect=j,o.findWhere=j,o.VERSION="2.4.1",typeof define=="function"&&typeof define.amd=="object"&&define.amd?(M._=o, define(function(){return o
})):Q&&U?X?(U.exports=o)._=o:Q._=o:M._=o}).call(this);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
var mithril, controller, archive, post, page, app;
mithril = require('mithril');
controller = require('./controllers/controller.ls');
archive = require('./views/archive.ls');
post = require('./views/post.ls');
page = require('./views/page.ls');
app = function(view, controller){
  return {
    view: view,
    controller: controller
  };
};
m.route.mode = 'pathname';
m.route(document, '/', {
  '/': app(archive, controller),
  '/:date.../:post': app(post, controller),
  '/:page': app(page, controller)
});
},{"./controllers/controller.ls":5,"./views/archive.ls":8,"./views/page.ls":19,"./views/post.ls":20,"mithril":1}],4:[function(require,module,exports){
var m, coreConfig;
m = require('mithril');
coreConfig = {
  head: {
    description: "A blog on programming. Mostly JavaScript.",
    title: "Jon's Blog",
    stylesheets: [{
      url: "/css/style.css"
    }]
  },
  menuItems: [
    {
      value: "Archive",
      url: "/",
      title: ""
    }, {
      value: "About",
      url: "/about/",
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
  article: "Loading...",
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
      url: 'http://jon.prescottprogrammers.com/feed.xml',
      title: "RSS Feed",
      'class': "fa fa-rss fa-2x"
    }, {
      value: "",
      url: '/signup/',
      title: 'Get e-mails of new posts!',
      'class': "fa fa-envelope fa-2x"
    }, {
      value: "",
      url: "https://github.com/jon49/",
      title: "Personal Github Account",
      'class': "fa fa-github fa-2x"
    }, {
      value: "",
      url: "https://twitter.com/NymanJon",
      title: "Personal Twitter Account",
      'class': 'fa fa-twitter fa-2x'
    }, {
      value: '',
      url: 'https://plus.google.com/communities/101170592821781215530',
      title: 'Prescott Developer\'s Google+ Site',
      'class': 'fa fa-google-plus fa-2x'
    }, {
      value: '',
      url: 'http://www.meetup.com/The-Prescott-Software-Developers-Meetup-Group/',
      title: 'Prescott Developer\'s Meetup.com Site',
      'class': 'fa fa-coffee fa-2x'
    }
  ],
  footer: {
    text: m.trust('&copy; 2014 Jon Nyman<br />nymanjon@gmail.com<br />Still Empty')
  },
  fileType: '',
  data: void 8,
  cachedContent: {}
};
module.exports = coreConfig;
},{"mithril":1}],5:[function(require,module,exports){
var m, config, _, parseDocument, extractDocument, toConfigStyle;
m = require('mithril');
config = require('./../configuration/config.ls');
_ = require('./../../js/custom-lodash');
/---htmlpreprocessing---/;
parseDocument = function(it){
  return JSON.stringify({
    article: it.contents
  });
};
extractDocument = function(it){
  switch (false) {
  case !_.isPlainObject(it):
    return parseDocument(it);
  default:
    return JSON.stringify({
      title: "404",
      subtitle: "You've Been 404ed",
      article: "Oops! I couldn't find that page!",
      type: 'page'
    });
  }
};
/---configobjectpreprocessing--/;
toConfigStyle = function(it){
  var x;
  x = {};
  (x.head || (x.head = {})).description = it.description;
  (x.head || (x.head = {})).title = it.title;
  (x.content || (x.content = {})).article = it.contents;
  (x.header || (x.header = {})).title = it.title;
  (x.header || (x.header = {})).subtitle = it.subtitle;
  x.fileType = it.type;
  x.tags = it.tags;
  return x;
};
function Controller(){
  var self, createNewConfig, orCreate404Config, setMetadata, setContent, getArticleFromHtml, getContent, jsonData, requestContent;
  self = this;
  this.config = config;
  createNewConfig = orCreate404Config = function(){
    var content;
    content = {};
    content.article = config.cachedContent[m.route()];
    self.config = _.merge({}, config, content);
  };
  setMetadata = function(it){
    config.data = it;
    self.config.data = it;
  };
  setContent = function(it){
    config.cachedContent[m.route()] = it;
    createNewConfig();
  };
  getArticleFromHtml = function(it){
    var el;
    el = document.createElement('div');
    el.innerHTML = it;
    return m.trust(
    el.getElementsByTagName('article')[0].innerHTML);
  };
  getContent = {
    method: 'GET',
    url: m.route(),
    deserialize: getArticleFromHtml
  };
  jsonData = {
    method: "GET",
    url: '/data.json'
  };
  requestContent = function(){
    switch (false) {
    case !config.cachedContent[m.route()]:
      createNewConfig();
      break;
    case m.route() !== location.pathname:
      setContent(
      getArticleFromHtml(document.body.innerHTML));
      break;
    default:
      m.request(getContent).then(setContent, orCreate404Config);
    }
  };
  (function(){
    switch (false) {
    case config.data !== void 8:
      m.request(jsonData).then(setMetadata, orCreate404Config);
      requestContent();
      break;
    case config.cachedContent[m.route()] !== void 8:
      requestContent();
      break;
    default:
      createNewConfig();
    }
  })();
}
module.exports = Controller;
},{"./../../js/custom-lodash":2,"./../configuration/config.ls":4,"mithril":1}],6:[function(require,module,exports){
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
module.exports = {
  replaceAt: replaceAt,
  isPattern: isPattern,
  removeExtension: removeExtension
};
},{}],7:[function(require,module,exports){
var t, pagePattern, postPattern, postUglyPattern, postLinkPattern, redirectPattern, withPostUrl, withFriendlyPostUrl, withPostDate, withPageUrl, filterPosts, isPost, postDate;
t = require('./general.ls');
/---Routinglogic---/;
pagePattern = new RegExp("/(\\w+)");
postPattern = new RegExp("/(\\d{4})/(\\d{2})/(\\d{2})/(.+)");
postUglyPattern = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})-(.+)");
postLinkPattern = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})-(.+)");
redirectPattern = '#!/';
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
    return t.isPattern(postLinkPattern, it);
  });
};
isPost = function(it){
  return t.isPattern(postPattern, it);
};
postDate = function(route){
  return new Date(route.replace(postPattern, withPostDate));
};
module.exports = {
  postDate: postDate,
  isPost: isPost
};
},{"./general.ls":6}],8:[function(require,module,exports){
var mithril, head, menu, header, content, archive, footerMenu, footer, main;
mithril = require('mithril');
head = require('./components/head.ls');
menu = require('./components/menu.ls');
header = require('./components/header.ls');
content = require('./components/content.ls');
archive = require('./components/archive.ls');
footerMenu = require('./components/footer-menu.ls');
footer = require('./components/footer.ls');
main = function(ctrl){
  var config, result;
  config = ctrl.config;
  return result = m('html', [m('head', head(config.head)), m('body', [m('#main', [menu(config.menuItems), header(config.fileType, config.header), content(config.article), archive(config.data, config.fileType), footerMenu(config.footerItems), footer(config.footer)])])]);
};
module.exports = main;
},{"./components/archive.ls":9,"./components/content.ls":11,"./components/footer-menu.ls":12,"./components/footer.ls":13,"./components/head.ls":14,"./components/header.ls":15,"./components/menu.ls":16,"mithril":1}],9:[function(require,module,exports){
var m, common, s, menuLinks, archive;
m = require('mithril');
common = require('./common.ls');
s = require('./../../utilities/special.ls');
menuLinks = common.menuLinks;
archive = function(data, type){
  var posts;
  posts = data.filter(function(it){
    return s.isPost(it.url);
  });
  return m('.pure-menu.pure-menu-open.menu', [
    m('.pure-menu-heading', 'Archive'), menuLinks(posts.map(function(it){
      return {
        value: m.trust(it.title),
        url: it.url
      };
    }))
  ]);
};
module.exports = archive;
},{"./../../utilities/special.ls":7,"./common.ls":10,"mithril":1}],10:[function(require,module,exports){
var mithril, link, menuLinks;
mithril = require('mithril');
link = function(it){
  var result;
  return result = m('a', {
    'class': it['class'] || '',
    href: it.url,
    title: it.title || '',
    config: (it.url || (it.url = [])).indexOf(":") === -1 ? m.route : ""
  }, it.value);
};
menuLinks = function(items){
  return m('ul', (items || []).map(function(it){
    switch (false) {
    case !it:
      return m('li', [link(it)]);
    default:
      return '';
    }
  }));
};
module.exports = {
  link: link,
  menuLinks: menuLinks
};
},{"mithril":1}],11:[function(require,module,exports){
var m, content;
m = require('mithril');
content = function(it){
  return m('article.content.animated.fadeIn', it);
};
module.exports = content;
},{"mithril":1}],12:[function(require,module,exports){
var m, menuLinks, footerMenu;
m = require('mithril');
menuLinks = require('./common.ls').menuLinks;
footerMenu = function(it){
  return m('#footer-menu.pure-menu.pure-menu-open.pure-menu-horizontal.menu', [menuLinks(it)]);
};
module.exports = footerMenu;
},{"./common.ls":10,"mithril":1}],13:[function(require,module,exports){
var m;
m = require('mithril');
module.exports = function(it){
  return m('footer.footer', [m('p', it.text)]);
};
},{"mithril":1}],14:[function(require,module,exports){
var m, head;
m = require('mithril');
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
module.exports = head;
},{"mithril":1}],15:[function(require,module,exports){
var m, header;
m = require('mithril');
header = function(type, config){
  return m('.header', [m('a', {
    href: config.url,
    'class': config['class']
  }, m('img', {
    src: config.src
  }))].concat((function(){
    switch (type) {
    case 'page':
    case 'archive':
      return [m('h1', config.title), m('h2', m('span', config.subtitle))];
    default:
      return [];
    }
  }())));
};
module.exports = header;
},{"mithril":1}],16:[function(require,module,exports){
var m, menuLinks, menu;
m = require('mithril');
menuLinks = require('./common.ls').menuLinks;
menu = function(it){
  return m('.pure-menu.pure-menu-open.pure-menu-horizontal.menu', menuLinks(it));
};
module.exports = menu;
},{"./common.ls":10,"mithril":1}],17:[function(require,module,exports){
var m, menuLinks, isPost, _, nextPost, previousPost, navLinks;
m = require('mithril');
menuLinks = require('./common.ls').menuLinks;
isPost = require('./../../utilities/special.ls').isPost;
_ = require('./../../../js/custom-lodash');
nextPost = function(data, index){
  var linkIndex, data_;
  switch (false) {
  case !((linkIndex = index - 1) > -1 && isPost(data[linkIndex].url)):
    data_ = data[linkIndex];
    return {
      'class': 'navlinks-next',
      url: data_.url,
      title: "Next Post: " + data_.title,
      value: m.trust(data_.title + " &raquo;")
    };
  default:
    return '';
  }
};
previousPost = function(data, index){
  var linkIndex, data_;
  switch (false) {
  case !((linkIndex = index + 1) < data.length && isPost(data[linkIndex].url)):
    data_ = data[linkIndex];
    return {
      'class': 'navlinks-prev',
      url: data_.url,
      title: "Previous Post: " + data_.title,
      value: m.trust("&laquo; " + data_.title)
    };
  default:
    return '';
  }
};
navLinks = function(data){
  var index, previousPost_, nextPost_;
  index = _.findIndex(data, function(it){
    return it.url === m.route();
  });
  previousPost_ = previousPost(data, index);
  nextPost_ = nextPost(data, index);
  return m('.pure-menu.pure-menu-open.pure-menu-horizontal.menu', menuLinks([previousPost_, nextPost_]));
};
module.exports = navLinks;
},{"./../../../js/custom-lodash":2,"./../../utilities/special.ls":7,"./common.ls":10,"mithril":1}],18:[function(require,module,exports){
var m, s, tags;
m = require('mithril');
s = require('./../../utilities/special.ls');
tags = function(type, tags){
  var dash;
  dash = tags.length > 0 ? ' - ' : '';
  return m('p.post-meta.pure-u-1', [m('span', 'Posted ' + s.postDate(m.route()).toDateString() + dash)].concat(tags.map(function(tag){
    return m('span.post-tag', tag);
  })));
};
module.exports = tags;
},{"./../../utilities/special.ls":7,"mithril":1}],19:[function(require,module,exports){
var mithril, head, menu, header, content, footerMenu, footer, main;
mithril = require('mithril');
head = require('./components/head.ls');
menu = require('./components/menu.ls');
header = require('./components/header.ls');
content = require('./components/content.ls');
footerMenu = require('./components/footer-menu.ls');
footer = require('./components/footer.ls');
main = function(ctrl){
  var config, result;
  config = ctrl.config;
  return result = m('html', [m('head', head(config.head)), m('body', [m('#main', [menu(config.menuItems), header(config.fileType, config.header), content(config.article), footerMenu(config.footerItems), footer(config.footer)])])]);
};
module.exports = main;
},{"./components/content.ls":11,"./components/footer-menu.ls":12,"./components/footer.ls":13,"./components/head.ls":14,"./components/header.ls":15,"./components/menu.ls":16,"mithril":1}],20:[function(require,module,exports){
var mithril, head, menu, header, content, tags, navLinks, footerMenu, footer, post;
mithril = require('mithril');
head = require('./components/head.ls');
menu = require('./components/menu.ls');
header = require('./components/header.ls');
content = require('./components/content.ls');
tags = require('./components/tags.ls');
navLinks = require('./components/nav-links.ls');
footerMenu = require('./components/footer-menu.ls');
footer = require('./components/footer.ls');
post = function(ctrl){
  var config, result;
  config = ctrl.config;
  return result = m('html', [m('head', head(config.head)), m('body', [m('#main', [menu(config.menuItems), header(config.fileType, config.header), content(config.article), tags(config.fileType, config.tags), navLinks(config.data), footerMenu(config.footerItems), footer(config.footer)])])]);
};
module.exports = post;
},{"./components/content.ls":11,"./components/footer-menu.ls":12,"./components/footer.ls":13,"./components/head.ls":14,"./components/header.ls":15,"./components/menu.ls":16,"./components/nav-links.ls":17,"./components/tags.ls":18,"mithril":1}]},{},[3]);
