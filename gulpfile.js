// dependencies
var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  pngquant = require('imagemin-pngquant'), //深度壓縮png
  autoprefixer = require('autoprefixer'),
  mainBowerFiles = require('main-bower-files'),
  jade = require('gulp-jade'),
  $ = require('gulp-load-plugins')();


// Logs Message
gulp.task('message', function () {
  return console.log('\n' + 'Gulp 正常運作中...')
});
// Copy ALL HTML files
gulp.task('copyHtml', function () {
  gulp.src('src/**/*.html')
    .pipe($.plumber())
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream()); //自動重新整理
  return console.log('任務「CopyHtml」已完成，請到dist資料夾查看。');
});
// Jage transform into html
gulp.task('jade', function () {
  gulp
    .src('./src/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
  return console.log('任務 「JadeTemplate」已完成')
});
// Optimize Images 優化圖片
gulp.task('imageMin', function () {
  gulp.src('src/images/*')
    .pipe($.plumber())
    .pipe($.changed('./public/images'))
    .pipe($.imagemin({
      progressive: true, //無損壓縮jpg圖
      use: [pngquant()] //深度壓縮PNG
    }))
    .pipe(gulp.dest('./public/images'));

  return console.log('任務「Optimize Images」，優化圖片已完成。');
});

// Compile Scss
gulp.task('sass', function () {
  var plugins = [
    autoprefixer({ browsers: ['last 3 version'] })
  ];
  gulp.src(['src/sass/*.sass', 'src/sass/*.scss'])
    .pipe($.plumber())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss(plugins))
    // 編譯完成 CSS
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
  return console.log('任務「 Compile Sass 」，轉換成CSS已完成。');
});

// Conpile css
gulp.task('css', function () {
  gulp.src(['src/css/bootstrap.css', 'src/css/style.css', 'src/css/responsive.css'])
    .pipe($.plumber())
    .pipe($.cleanCss())
    .pipe($.concat('style.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
  return console.log('任務「 Minify CSS 」，mini CSS已打包完成。');
});

// Scripts 打包成一個main.js
gulp.task('scripts', function () {
  gulp.src(["src/js/**/*.js"])
    .pipe($.plumber())
    .pipe($.concat('main.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('maps'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
  return console.log('任務「 Scripts 」，所有js壓縮並匯集成main.js，已打包完成。');
});

gulp.task('bower', function () {
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./vendors/'))
});

gulp.task('vendorJs', ['bower'], function () {
  return gulp.src(['./vendors/**/*.js'])
    .pipe($.order([
      'jquery.js',
      'bootstrap.js'
    ]))
    .pipe($.concat('vendors.js'))
    .pipe(gulp.dest('./public/js'))
})

// Static server
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});

// Default task
gulp.task('default', [
  'message',
  'jade',
  'copyHtml',
  'imageMin',
  'sass',
  'css',
  'scripts',
  'vendorJs',
  'browserSync',
  'watch'
]);



// Watch task
gulp.task('watch', function () {

  gulp.watch('src/*.jade,', ['jade']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['imageMin']);
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['copyHtml']);
  gulp.watch('src/css/**/*.css', ['css']);

  return console.log('任務「 Watch 」，目前正在監視中。');
});

