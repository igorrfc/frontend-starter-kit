const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    sequence = require('gulp-sequence'),
    babel = require('gulp-babel'),
    inject = require('gulp-inject-string'),
    concat = require('gulp-concat'),
    webpack = require('webpack-stream'),
    config = require('../config');

const WEBPACK_CONFIG_PATH = '../../webpack.config.js';

gulp.task('build-html', () => {
  return gulp.src(config.root.src  + '/index.html')
    .pipe(inject.after('</title>', config.root.html.style))
    .pipe(inject.before('</body>', config.root.html.script))
    .pipe(gulp.dest(config.root.dest));
});

gulp.task('sass', () => {
  return gulp.src(config.root.src + '/**/*.scss')
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(config.root.dest))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('script', () => {
  return gulp.src(config.root.src + '/*.js')
    .pipe(webpack(require(WEBPACK_CONFIG_PATH)))
    .pipe(gulp.dest(config.root.dest));
});

gulp.task('dev-server', () => {
  browserSync({
    server: {
      baseDir: config.root.dest,
    },
  });

  gulp.watch('**/*.js', { cwd: config.root.src }, ['script']);
  gulp.watch('**/*.scss', { cwd: config.root.src }, ['sass']);

  gulp.watch(['*.html', '**/*.scss', '**/*.js'], { cwd: config.root.src }, browserSync.reload);
});

gulp.task('default', sequence('script', 'sass', 'build-html', 'dev-server'));
