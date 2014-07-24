gulp = require 'gulp'
stylus = require 'gulp-stylus'
path = require 'path'
pandoc = require 'gulp-pandoc'
manifest = require 'gulp-asset-manifest'
del = require 'del'
concat = require 'gulp-concat'
rename = require 'gulp-rename'
wrapper = require 'gulp-wrapper'
filter = require 'gulp-filter'
replace = require 'gulp-regex-replace'
livescript = require 'gulp-livescript'
uglify = require 'gulp-uglify'

pandocSettings = {
  from: 'markdown'
  to: 'html'
  ext: '.html'
  args: [
    '--smart'
    '--template=/home/jon/Documents/Source/Repos/Websites/jon.prescottprogrammers.com/src/template.html'
    '--no-wrap'
  ]
}

postMetadata = {
  from: 'markdown'
  to: 'html'
  ext: '.json'
  args: [
    '--smart'
    '--template=/home/jon/Documents/Source/Repos/Websites/jon.prescottprogrammers.com/src/metadata.json'
    '--no-wrap'
  ]
}

posted = (file) -> //\d{4}//.test file.path

gulp.task 'ls', ->
  devDest = './dev/js/'
  gulp.src './dev/ls/*.ls'
     .pipe concat 'all_.ls'
     .pipe (livescript {bare: true}).on 'error', (e) -> throw e
     .pipe gulp.dest devDest

gulp.task 'js', ['ls'], ->
   devDest = './dev/js/'
   distDest = './dist/js/'
   #del ["./dev/js/all.js"], (err) -> console.log 'Didn\'t delete'
   result = gulp.src './dev/js/*.js'
      .pipe concat 'all.js'
      .pipe wrapper (
         header: ';(function(){\n'
         footer: '\n})()'
      ) 
      .pipe gulp.dest devDest
      #.pipe uglify!
      .pipe gulp.dest distDest
   #del ["./dev/ls/*.js"], ->
   result

gulp.task 'clean', ['js'], ->
  del [
    './dist/**'
    './dev/pages/*'
    './dev/posts/*'
  ], ->

gulp.task 'postMeta', ['js'], ->
  devDest = './dev/posts'
  distDest = './dist/posts'
  gulp.src './src/posts/*.md'
     .pipe filter posted
     .pipe pandoc postMetadata
     .pipe concat 'metadata.json', {newLine: ','}
     .pipe wrapper (
        header: '['
        footer: ']'
     )
     .pipe replace (
        regex: ',]'
        replace: ']'
     )
     .pipe gulp.dest devDest
     .pipe gulp.dest distDest

gulp.task 'posts', ['postMeta'], ->
  devDest = './dev/posts'
  distDest = './dist/posts'
  gulp.src './src/posts/*.md'
     .pipe filter posted
     .pipe pandoc pandocSettings
     .pipe gulp.dest devDest
     .pipe gulp.dest distDest

gulp.task 'json', ['posts'], ->
  gulp.src './dev/posts/*.html'
     .pipe manifest (
        bundleName: 'posts'
        manifestFile: 'posts.json'
     )

gulp.task 'moveJSON', ['json'], ->
  devDest = './dev/posts'
  distDest = './dist/posts'
  gulp.src ['*.json', '!package.json']
     .pipe gulp.dest devDest
     .pipe gulp.dest distDest
  del ['*.json', '!package.json'], ->

gulp.task 'pages', ['moveJSON'], ->
  devDest = './dev/pages'
  distDest = './dist/pages'
  gulp.src './src/pages/*.md'
     .pipe pandoc pandocSettings
     .pipe gulp.dest devDest
     .pipe gulp.dest distDest

gulp.task 'css', ['js'], ->
  devDest = './dev/css'
  distDest = './dist/css'
  gulp.src './src/css/*.styl'
     .pipe stylus()
     .pipe gulp.dest devDest
     .pipe gulp.dest distDest

# gulp.task 'watch', -> gulp.watch './dev/ls/*.ls', ['ls', 'js']

gulp.task 'default', [
  'js'
  'clean'
  'postMeta'
  'posts'
  'json'
  'moveJSON'
  'pages'
  'js'
  'css'
#  'watch'
]
