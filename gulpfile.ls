require! <[
   gulp
   path
   del
   lodash
   browserify
   pdc
]>

λ = lodash

stylus = require 'gulp-stylus'
manifest = require 'gulp-asset-manifest'
concat = require 'gulp-concat'
rename = require 'gulp-rename'
wrapper = require 'gulp-wrapper'
filter = require 'gulp-filter'
replace = require 'gulp-regex-replace'
livescript = require 'gulp-livescript'
uglify = require 'gulp-uglify'
front-matter = require 'gulp-front-matter'
ssg = require 'gulp-ssg'
es = require 'event-stream'
# reduce = require 'stream-reduce'
pluck = require 'gulp-pluck'
data = require 'gulp-data'
source = require 'vinyl-source-stream'
pandoc = require 'gulp-pandoc'

toHtml =
   from: 'markdown'
   to: 'html'
   ext: '.html'
   args:
      * '--smart'
        '--template=/home/jon/Documents/Source/Repos/Websites/jon.prescottprogrammers.com/src/template.html'
        '--no-wrap'

toSimpleHtml =
   from: 'markdown'
   to: 'html'
   ext: '.html'
   args:
      * '--smart'
        '--no-wrap'

posted = (file) -> (//\d{4}//.test file.path) or (//pages//.test file.path)

toUrlPath = (fileName) ->
   s = fileName.toLowerCase!
   index = s.lastIndexOf '.'
   dir =
      | fileName isnt 'index.html' =>
         '/' + (s.slice 0, index).replace(/-/g, '/') + '/'
      | _ => '/'

toUrlStylePath = (file) !->
   s = file.basename.toLowerCase!
   i = if s.lastIndexOf '-' is -1 then s.length else s.lastIndexOf '-'
   dir = ('/' + s.slice 0, i .replace /-/g, '/')
   fileName = s.slice i + 1
   file.dirname =
      | s isnt 'index' =>
         "#dir/#fileName"
      | _ => ''
   file.basename = 'index'
   file.ext = '.html'

gulp.task 'clean' ->
  del [
    './dist/**'
    './dev/**'
    './src/ls/*.js'
  ], ->

gulp.task 'images', ['clean'] ->
   distDest = './dist/images'
   gulp.src './src/images/**'
      .pipe gulp.dest distDest

gulp.task 'js', ['images'] ->
   distDest = './dist/js'
   browserify (
      entries: 
         * './src/ls/app.ls'
         ...
      extensions:
         * '.ls'
         ...
   )
   .bundle!
   .pipe source 'app.js'
   .pipe gulp.dest distDest

gulp.task 'html', ['js'], ->
   distDest = './dist'
   gulp.src './src/**/*.md'
      .pipe filter posted

      # create posts/pages
      .pipe pandoc toHtml
      .pipe rename toUrlStylePath
      .pipe gulp.dest distDest

gulp.task 'json', ['html'], ->
   distDest = './dist'
   gulp.src './src/**/*.md'
      .pipe filter posted
      .pipe front-matter {property: 'meta'}
      .pipe pandoc toSimpleHtml

      # place metadata url information
      .pipe data (file) !->
         file.meta.url = toUrlPath path.basename file.relative
         file.meta.contents = file.contents.toString!

      # create json file of post metadata
      .pipe pluck 'meta', 'data.json'
      .pipe data (file) !->
         meta = λ.sortBy file.meta, 'url' .reverse!
         file.contents = new Buffer JSON.stringify meta
      .pipe gulp.dest distDest

gulp.task 'css', ['js'], ->
  distDest = './dist/css'
  gulp.src './src/css/*.styl'
     .pipe stylus!
     .pipe gulp.dest distDest

# gulp.task 'watch', -> gulp.watch './dev/ls/*.ls', ['ls', 'js']

gulp.task 'default', [
  'clean'
  'images'
  'js'
  'html'
  'json'
  'js'
  'css'
#  'watch'
]
