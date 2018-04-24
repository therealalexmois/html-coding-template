import gulp from 'gulp'
import runSequence from 'run-sequence'
import {get as browserSync} from 'browser-sync'
import watch from 'gulp-watch'

const bs = browserSync('server');

gulp.task('watch', () => {
    global.watch = true;

    watch(['app/sprites/**/*.png', '!app/sprites/*.png'], () => runSequence('sprites'));
    watch('app/{styles,blocks}/**/*.sass', () => {
        runSequence(['styles', 'styles:lint'], () => bs.reload('assets/styles/app.min.css'));
    });
    watch(['app/{pages,blocks}/**/*.pug'], () => runSequence('templates', bs.reload));
    watch('app/resources/**/*', () => runSequence('copy', bs.reload));
    watch('app/icons/**/*.svg', () => runSequence('icons', bs.reload));

    watch('app/{scripts,blocks}/**/*.js', () => {
        runSequence('scripts', () => bs.reload('assets/scripts/app.min.js'));
    });
});