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
    changed = require("gulp-changed"),
    manifest = require("gulp-asset-manifest"),
    del = require("del"),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    wrapper = require("gulp-wrapper")

// Concatenate & Minify JS
gulp.task('css', function() {
   var devDest = "./css", distDest = "./dist/css"
   return gulp.src("./source/css/*.styl")
      .pipe(changed(devDest))
      .pipe(stylus())
      .pipe(gulp.dest(devDest))
      .pipe(gulp.dest(distDest))
})

var pandocSettings = {
   from: "markdown",
   to: "html",
   ext: ".html",
   args: ["--smart", "--template=/home/jon/Documents/Source/Repos/Websites/jon.prescottprogrammers.com/template.html"]
}

// turn md files into html files
gulp.task("posts", function() {
   var devDest = "posts", distDest = "./dist/posts"
   return (
      gulp.src("source/posts/*.md")
      .pipe(changed(devDest))
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

gulp.task("cutJson", ["json"], function(){
   var devDest = "./posts", distDest = "./dist/posts",
       result = (
          gulp.src(["*.json", "!package.json"])
          .pipe(gulp.dest(devDest))
          .pipe(gulp.dest(distDest))
       )
   del(["*.json", "!package.json"], function(){})
   return result
})

gulp.task("pages", function() {
   var devDest = "pages", distDest = "./dist/pages"
   return (
      gulp.src("source/pages/*.md")
      .pipe(changed(devDest))
      .pipe(pandoc(pandocSettings))
      .pipe(gulp.dest(devDest))
      .pipe(gulp.dest(distDest))
   )
})

gulp.task("js", function(){
   var distDest = "./dist/js"
   return (
      gulp.src("./js/*.js")
      .pipe(concat("all.js"))
      .pipe(wrapper({header: ";(function(){\n", footer: "\n})()"}))
      .pipe(gulp.dest(distDest))
   )
})

// Watch Files For Changes
// gulp.task('watch', function() {
//     gulp.watch(libsBower.concat(app, css), ['libraries', 'scripts', 'css']);
// });

// Default Task
gulp.task('default', ['css', "posts", "pages", "json", "cutJson", "js"]) //, 'libraries', 'scripts', 'watch']);
