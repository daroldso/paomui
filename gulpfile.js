var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var nunjucks = require('gulp-nunjucks');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('style', function() {
  return gulp
    .src('src/stylus/style.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', function() {
  return gulp
    .src('src/template/*.html')
    .pipe(nunjucks.compile())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css-vendors', function() {
  gulp
    .src(['node_modules/swiper/dist/css/swiper.css'])
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js-vendors', function() {
  gulp
    .src([
      'node_modules/skrollr/dist/skrollr.min.js',
      'node_modules/swiper/dist/js/swiper.min.js'
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('image', function() {
  gulp
    .src('src/img/*')
    .pipe(
      imagemin({
        optimizationLevel: 2,
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()]
      })
    )
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
  gulp.watch('src/stylus/**/*.styl', ['style']);
  gulp.watch('src/template/**/*.html', ['html']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('dev', ['html', 'style', 'browser-sync', 'watch']);
gulp.task('build', ['html', 'style']);
gulp.task('buildAll', ['html', 'style', 'css-vendors', 'js-vendors', 'image']);
