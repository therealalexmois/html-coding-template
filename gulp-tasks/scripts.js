import gulp from 'gulp'
import gulpIf from 'gulp-if'
import plumber from 'gulp-plumber'
import errorHandler from 'gulp-plumber-error-handler';
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'

import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'

const isDebug = process.env.NODE_ENV !== 'production'

gulp.task('scripts', () => {
    gulp.src(['./app/scripts/*.js'], ['./app/blocks/**/*.js'])
        .pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
        .pipe(gulpIf(isDebug, sourcemaps.init()))
        // return browserify({
        //     entries: ["./app/scripts/index.js"]
        // })
        // .transform(babelify.configure({
        //     presets : ["es2015"]
        // }))
        // .bundle()
        // .pipe(source('bundle.js'))
        // .pipe(gulpIf(!isDebug, uglify()))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpIf(!isDebug, sourcemaps.write()))
        .pipe(gulp.dest('dist/scripts/'))
})