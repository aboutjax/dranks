var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    ghPages = require('gulp-gh-pages'),
    reload = browserSync.reload;

gulp.task('styles', function() {
    return gulp.src('./app/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/styles'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('scripts', function() {
    return gulp.src('./app/scripts/*.js')
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('images', function() {
    return gulp.src('./app/images/*')
        .pipe(gulp.dest('./dist/images'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('build', ['styles', 'scripts', 'images', 'html']);

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('serve', ['build'], function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['./dist']
        }
    });

    // Reload when example files change
    gulp.watch([
        './app/*.{js,html,css}',
    ]).on('change', reload);

    // Watch src files and stream changes to dist dir and reload browser
    gulp.watch('./app/*.html', ['html']);
    gulp.watch('./app/styles/*.scss', ['styles']);
    gulp.watch('./app/scripts/*.js', ['scripts']);
    gulp.watch('./app/images/*', ['images']);
});

gulp.task('default', ['serve']);
