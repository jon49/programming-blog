<html lang="en">
<head>

  
  <meta charset="utf-8">
  <title>Bilby.Js</title>
  <meta name="description" content="Bilby.Js">
  <meta name="author" content="Jon Nyman">

  
  <meta name="viewport" content="width=device-width, initial-scale=1">

  
  <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="http://localhost:1313/css/fonts.css">
  
  
  <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
  

    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/grids-responsive-min.css">

  <link rel="stylesheet" href="http://localhost:1313/css/custom.css">

  
  
  <link rel="stylesheet" href="http://localhost:1313/highlight/styles/default.css">
  
  <script src="http://localhost:1313/highlight/highlight.pack.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>

</head>
<body>


<div class="header pure-g">
    <div class="pure-u-1-24 pure-u-md-5-24"></div>
    <div class="pure-u-11-12 pure-u-md-5-8">
        <div class="desktop pure-menu pure-menu-horizontal nav-menu">
            
            <a href="/" class="site-title pure-menu-heading">Hamsters Byte</a>
            <ul class="pure-menu-list">
                
                <li class="pure-menu-item">
                    <a href="http://localhost:1313/about/" class="pure-menu-link">About</a>
                </li>
            </ul>
        </div>
        <div class="mobile pure-menu nav-menu">
            <a href="/" class="pure-menu-heading" id="toggle-home">Hamsters Byte</a>
            <a href="#" id="toggle-btn">&#9776;</a>
            <ul class="pure-menu-list" id="toggle-content" style="display:none;">
                
                
                <li class="pure-menu-item">
                    <a href="http://localhost:1313/about" class="pure-menu-link">About</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="pure-u-1-24 pure-u-md-1-6"></div>
</div>



<div class="pure-g">
    <div class="pure-u-1-24 pure-u-md-5-24"></div>
	<div class="pure-u-11-12 pure-u-md-5-8">
	  <p class="posts-name">Bilby.Js:</p>

	  <ul class="posts">
		
		
		
		<li>
		  <a href="http://localhost:1313/2014/07/01/bilbyjs_lenses/">bilby.js &amp; lenses</a>

		  <p class="footnote">
			submitted <time datetime="2014-07-01T00:00:00Z" class="post-list timeago">2014-07-01T00:00:00Z</time>

			
			to
			

			
			tags:[ <a href="http://localhost:1313/tags/bilby.js">bilby.js</a> <a href="http://localhost:1313/tags/immutability">immutability</a> <a href="http://localhost:1313/tags/javascript">javascript</a> <a href="http://localhost:1313/tags/functional-programming">functional programming</a> ]
			

			

			

		  </p>
		</li>
		
		
		
		<li>
		  <a href="http://localhost:1313/2014/05/13/bilby_functional_programming/">bilby.js &amp; functional programming</a>

		  <p class="footnote">
			submitted <time datetime="2014-05-13T00:00:00Z" class="post-list timeago">2014-05-13T00:00:00Z</time>

			
			to
			

			
			tags:[ <a href="http://localhost:1313/tags/bilby.js">bilby.js</a> <a href="http://localhost:1313/tags/functional-programming">functional programming</a> ]
			

			

			

		  </p>
		</li>
		
		
	  </ul>
	</div>
    <div class="pure-u-1-24 pure-u-md-1-6"></div>
</div>

<div class="footer pure-g">
    <div class="pure-u-1-24 pure-u-md-5-24"></div>
    <div class="pure-u-11-12 pure-u-md-5-8">
        <div class="pure-menu pure-menu-horizontal footer-content">
            <ul>
                <li class="pure-menu-heading" id="foot-name">Jon Nyman:</li>

                

                
                <li class="pure-menu-item">
                    <a href="https://github.com/jon49" class="pure-menu-link">GitHub</a>
                </li>
                

                
                <li class="pure-menu-item">
                    <a href="https://www.linkedin.com/in/eenyman" class="pure-menu-link">LinkedIn</a>
                </li>
                

                

                
                <li class="pure-menu-item">
                    <a href="https://twitter.com/NymanJon" class="pure-menu-link">Twitter</a>
                </li>
                

            </ul>
            <a href="#" class="pure-menu-heading pull-right" id="gototop-btn">↑↑</a>
        </div>
	  </div>
      <div class="pure-u-1-24 pure-u-md-1-6"></div>
</div>


<script src="http://localhost:1313/js/jquery.min.js" type="text/javascript"></script>
<script src="http://localhost:1313/js/jquery.timeago.js" type="text/javascript"></script>
<script type="text/javascript">
  $(function(){
    $("time.timeago").timeago();
  })
  $("#toggle-btn").click(function(){
    $("#toggle-content").toggle();
    if($(this).html() === "☰") {
        $(this).html("X")
    } else {
        $(this).html("☰")
    }
  });
  $(window).resize(function(){
    if(window.innerWidth > 768) {
      $(".desktop").removeAttr("style");
    }
  });
</script>

<script data-no-instant>document.write('<script src="http://'
        + (location.host || 'localhost').split(':')[0]
		+ ':1313/livereload.js?mindelay=10"></'
        + 'script>')</script></body>
</html>
