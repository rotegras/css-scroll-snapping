const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const del = require('del');
const autoprefixer = require('autoprefixer');


const cfg = require('./gulpconfig.json');
const paths = cfg.paths;


// browser-sync
gulp.task('browser-sync', function() {
  browserSync.init(cfg.browserSyncWatchFiles, cfg.browserSyncOptions);
});


gulp.task('scss', function() {
  return gulp.src(paths.src.scss + '/*.scss')
  .pipe(
    plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ errLogToConsole: true }))
    .pipe(postcss([autoprefixer(
      {overrideBrowserslist: ['last 2 versions']}
    )]))
    .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.stream());
  });
  
  
  // bundle js
  gulp.task('scripts', function() {
    return gulp.src(paths.src.js + '/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest(paths.dest.js))
    .pipe(browserSync.stream());
  });
  
  // vendor js
  gulp.task('vendorscripts', function() {
    return gulp.src(paths.src.js + '/vendor/*.js' )
    .pipe(gulp.dest(paths.dest.js + '/vendor'))
    .pipe(browserSync.stream());
  });
  
  // copy fonts   
  gulp.task('fonts', function () {
    return gulp.src(paths.src.fonts + '/*.{woff,woff2}').pipe(gulp.dest(paths.dest.fonts));
  });
  
  // copy images   
  gulp.task('images', function () {
    return gulp.src(paths.src.images + '/*.{png,jpg,svg}').pipe(gulp.dest(paths.dest.images));
  });
  
  // watch for css and js changes
  gulp.task('watch', function () {
    gulp.watch(paths.src.scss + '/**/*.scss', gulp.series('scss'));
    gulp.watch(paths.src.js + '/*.js', gulp.series('scripts'));
  });
  
  
  // clean dist directory
  gulp.task('clean-dist', function () {
    return del(paths.dest.dist + '/**');
  });
  
  // copy all assets on init
  gulp.task('init', gulp.series('scss', 'scripts', 'vendorscripts', 'fonts', 'images'));
  
  gulp.task('w.bs', gulp.parallel('browser-sync', 'watch'));
  
  gulp.task('default', gulp.series('init', 'w.bs'));
  
  