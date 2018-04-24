import gulp from 'gulp'
import gulpIf from 'gulp-if'
import pug from 'gulp-pug'
import pugLinter from 'gulp-pug-linter'
import inheritance from 'gulp-pug-inheritance'
import plumber from 'gulp-plumber'
import errorHandler from 'gulp-plumber-error-handler'
import filter from 'gulp-filter'
import prettify from 'gulp-jsbeautifier'
import cached from 'gulp-cached'
import rename from 'gulp-rename'
import browserSync from 'browser-sync'
import fs from 'fs'
import data from 'gulp-data'

const reload = browserSync.reload

gulp.task('templates', () => {
    gulp.src('app/pages/*.pug')
        .pipe(plumber({errorHandler: errorHandler(`Error in \'templates\' task`)}))
        // .pipe(cached('pug'))
        .pipe(gulpIf(global.watch, inheritance({basedir: 'app'})))
        .pipe(filter(file => /app[\\\/]pages/.test(file.path)))
        .pipe(data(function(file) {
            return JSON.parse(fs.readFileSync('app/data/data.json'))
        }))
        .pipe(pug())
        .pipe(prettify({
            braceStyle: 'expand',
            indentWithTabs: true,
            indentInnerHtml: true,
            preserveNewlines: true,
            endWithNewline: true,
            wrapLineLength: 120,
            maxPreserveNewlines: 50,
            wrapAttributesIndentSize: 1,
            unformatted: ['use']
        }))
        .pipe(rename({dirname: '.'}))
        .pipe(gulp.dest('dist'))
});

gulp.task('templates:lint', () =>
    gulp
        .src('app/**/*.pug')
        .pipe(pugLinter())
        .pipe(pugLinter.reporter('fail'))
);