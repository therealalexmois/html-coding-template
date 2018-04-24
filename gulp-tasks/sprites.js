import gulp from 'gulp'
import spritesmith from 'gulp.spritesmith'
import merge from 'merge-stream'

gulp.task('sprites', () => {

    const spriteData = 
        gulp.src('./app/sprites/*')
            .pipe(spritesmith({
                imgName: '../images/sprites/sprite.png',
                retinaSrcFilter: ['./app/sprites/*@2x.png'],
                retinaImgName: '../images/sprites/sprite@2x.png',
                cssName: '_sprite.sass',
                algorithm: 'binary-tree',
                padding: 8,
                cssVarMap: function(sprite) {
                    sprite.name = 'sprite-' + sprite.name
                }
            }));

    const imgStream = spriteData.img.pipe(gulp.dest('./dist/sprites'));
    const styleStream = spriteData.css.pipe(gulp.dest('./app/styles/'));

    return merge(imgStream, styleStream);

});