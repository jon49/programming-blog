/* jslint asi: true */
/*jshint indent:3, curly:false, laxbreak:true */
/* global */
// http://travismaynard.com/writing/getting-started-with-gulp
// Include gulp
var gulp = require('gulp')

// Include Our Plugins
var stylus = require('gulp-stylus'),
    path = require('path'),
    pandoc = require('gulp-pandoc'),
    //changed = require("gulp-changed"),
    manifest = require("gulp-asset-manifest"),
    del = require("del"),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    wrapper = require("gulp-wrapper"),
    filter = require("gulp-filter"),
    replace = require("gulp-regex-replace")
    //debug = require("gulp-debug")


var pandocSettings = {
   from: "markdown",
   to: "html",
   ext: ".html",
   args: ["--smart", "--template=/home/jon/Documents/Source/Repos/Websites/jon.prescottprogrammers.com/source/template.html", "--no-wrap"]
}

var postMetadata = {
   from: "markdown",
   to: "html",
   ext: ".json",
   args: ["--smart", "--template=/home/jon/Documents/Source/Repos/Websites/jon.prescottprogrammers.com/source/metadata.json", "--no-wrap"]
}

var posted = function(file){
   return /\d{4}/.test(file.path)
}

gulp.task("postMeta", function() {
   var devDest = "./posts", distDest = "./dist/posts"
   del(["./posts/metadata.json"], function(){})
   del(["./dist/posts/metadata.json"], function(){})
   return (
      gulp.src("./source/posts/*.md")
      .pipe(filter(posted))
      .pipe(pandoc(postMetadata))
      .pipe(concat("metadata.json", {newLine: ","}))
      .pipe(wrapper({header: "[", footer: "]"}))
      .pipe(replace({regex:",]", replace: "]"}))
      .pipe(gulp.dest(devDest))
      .pipe(gulp.dest(distDest))
   )
})

// // turn md files into html files
gulp.task("posts", ["postMeta"], function() {
   var devDest = "./posts", distDest = "./dist/posts"
   del(["./posts/*.html"], function(){})
   del(["./dist/posts/*.html"], function(){})
   return (
      gulp.src("./source/posts/*.md")
      //.pipe(changed(devDest))
      .pipe(pandoc(pandocSettings))
      .pipe(gulp.dest(devDest))
      .pipe(gulp.dest(distDest))
   )
})

gulp.task("json", ["posts"], function(){
   return (
      gulp.src("./posts/*.html")
      .pipe(manifest({bundleName: "posts", manifestFile: "posts.json"}))
   )
})

gulp.task("moveJSON", ["json"], function(){
   var devDest = "./posts", distDest = "./dist/posts",
       result = (
          gulp.src(["*.json", "!package.json"])
          .pipe(gulp.dest(devDest))
          .pipe(gulp.dest(distDest))
       )
   del(["*.json", "!package.json"], function(){})
   return result
})

gulp.task("pages", ["moveJSON"], function() {
   var devDest = "./pages", distDest = "./dist/pages"
   del(["./pages/*.html"], function(){})
   del(["./dist/pages/*.html"], function(){})
   return (
      gulp.src("./source/pages/*.md")
      //.pipe(changed(devDest))
      .pipe(pandoc(pandocSettings))
      .pipe(gulp.dest(devDest))
      .pipe(gulp.dest(distDest))
   )
})

// For some reason the `js` task interfers with 
// pandoc for pages/posts. So, when I make them 
// depend on them it doesn't interfer anymore.
gulp.task("js", ["pages"], function(){
   var distDest = "./dist/js"
   return (
      gulp.src("./js/*.js")
      .pipe(concat("all.js"))
      .pipe(wrapper({header: ";(function(){\n", footer: "\n})()"}))
      .pipe(gulp.dest(distDest))
   )
})

// Concatenate & Minify JS
gulp.task('css', ["js"], function() {
   var devDest = "./css", distDest = "./dist/css"
   return gulp.src("./source/css/*.styl")
      //.pipe(changed(devDest))
      .pipe(stylus())
      .pipe(gulp.dest(devDest))
      .pipe(gulp.dest(distDest))
})

// Watch Files For Changes
// gulp.task('watch', function() {
//     gulp.watch(libsBower.concat(app, css), ['libraries', 'scripts', 'css']);
// });

// Default Task
gulp.task('default', ["postMeta", "posts", "json", "moveJSON", "pages", "js", "css"]) //, 'libraries', 'scripts', 'watch']);
