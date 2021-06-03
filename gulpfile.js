const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
var mqpacker = require("css-mqpacker");
const minify = require('gulp-csso');
const browserSync = require('browser-sync').create();
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var rigger = require("gulp-rigger");
const webpack = require('webpack-stream');
var gulpif = require('gulp-if');

sass.compiler = require('node-sass');

/*Сборка SVG-спрайтов*/
var svgstore = require("gulp-svgstore");

/*Минификация SVG-файлов*/
var svgmin = require("gulp-svgmin");
var webp = require('gulp-webp');

var del = require("del");

// Combine JS files with webpack
var webpackMode = true;
var withoutWebpackMode = !webpackMode;


gulp.task('sass', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber())
    .pipe(postcss([    
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('html:build', function () {
  return gulp.src('source/*.html') 
      .pipe(plumber())
      .pipe(rigger()) 
      .pipe(gulp.dest("build")) 
      .pipe(browserSync.stream()); 
});

gulp.task('html:watch', function () {
  gulp.watch('source/**/*.html', ['html:build']);
});


gulp.task("symbols", function() {
  return gulp.src("build/img/vector/*.svg")
    .pipe(svgmin())       
    .pipe(svgstore({      
      inLineSvg: true
    }))
    .pipe(rename("symbols.svg")) 
    .pipe(gulp.dest("build/img"));
});



gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: './build'
        },
        tunnel: false,
        host: 'localhost',
        port: 9000
    });
    
    gulp.watch('source/sass/**/*.scss',gulp.series('sass'));
    //gulp.watch('source/*.html',gulp.series('html:copy'));
    gulp.watch('source/**/*.html',gulp.series('html:build'));
    gulp.watch('source/js/*.js',gulp.series('js:copy'));
    gulp.watch('source/js/data/*.json',gulp.series('json:copy'));
    gulp.watch('build/*.html').on('change', browserSync.reload);
    gulp.watch('build/js/*.js').on('change', browserSync.reload);
    gulp.watch('build/js/data/*.json').on('change', browserSync.reload);
    
});

gulp.task('html:copy', function() {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
    
});

gulp.task('js:copy', function() {
  return gulpif(webpackMode, gulp.src("source/js/index.js"), gulp.src("source/js/*.js"))
    .pipe(gulpif(webpackMode, webpack( require('./webpack.config.js') )))
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
});


gulp.task('js:build', function() {
  return gulpif(webpackMode, gulp.src("source/js/index.js"), gulp.src("source/js/*.js"))
    .pipe(gulpif(webpackMode, webpack( require('./webpack.config.js') )))
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
});


gulp.task('js:webpack', function() {
  return gulp.src("source/js/index.js")
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest("build/js"));
});

gulp.task('json:copy', function() {
  return gulp.src("source/js/data/*.json")
    .pipe(gulp.dest("build/js/data"));
    
});


/*Таск для копирования*/
gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/data/**",
    "source/*.txt",
    "source/*.htaccess",
    "source/*.xml", 
    "source/*.ico" 
    ], {
      /*gulp по умолчанию раскрывает путь до первых *(звездочек).
       Говорим что базовый путь начинается из корня*/
      base: "source/"
    })
  .pipe(gulp.dest("build"));
});

/* Таск для удаления */
gulp.task("clean", function() {
  return del("build");
});

// Image optimization
gulp.task("images", function() {
  
  return gulp.src("build/img/*.{png,jpg,gif}")
    .pipe(imagemin([      
      imagemin.optipng({optimizationLevel: 3}), 
      imagemin.jpegtran({progressive: true}),  
      ]))
  
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function(){
   return gulp.src("build/img/rester*.{jpg,png}")
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest("build/img/raster"))
});


// Build task
gulp.task('build',gulp.series(['clean','copy','html:build','sass','js:build','images','webp','symbols']), function(done) { 
    
  done();
});;


// Default task
gulp.task('default',gulp.series(['clean','copy','html:build','sass', 'js:build', 'images', 'webp','symbols','serve']), function(done) { 
    
    done();
});;