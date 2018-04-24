import gulp from 'gulp'
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import sassLint from 'gulp-sass-lint'
import plumber from 'gulp-plumber'
import gulpIf from 'gulp-if'
import gcmq from 'gulp-group-css-media-queries'
import nano from 'gulp-cssnano'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import errorHandler from 'gulp-plumber-error-handler'
import autoprefixer from 'gulp-autoprefixer'

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('styles', () => {
    gulp.src('./app/styles/**/*.sass')
        .pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
        .pipe(gulpIf(isDebug, sourcemaps.init()))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 0.01%', 'ie 8'], {cascade: false}))
        .pipe(gulpIf(!isDebug, gcmq()))
        .pipe(gulpIf(!isDebug, nano({zindex: false})))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpIf(isDebug, sourcemaps.write()))
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('styles:lint', function () {
    gulp.src(['app/**/*.sass', '!app/styles/helpers/*', '!app/styles/_sprite.sass'])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(plumber(sassLint.failOnError()))
});