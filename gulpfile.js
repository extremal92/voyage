const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nib = require('nib');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const sprite = require("gulp.spritesmith");
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');

//Error
const onError = function(err) {
    notify.onError({
        title:    "Gulp fail!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
    })(err);
};

//pug
gulp.task('pug', function() {
    gulp.src(['sources/pug/*.pug'])
        .pipe(pug())
        .pipe(gulp.dest('./public')).on('end', function() {
        browserSync.reload();
    });
});

//Stylus
gulp.task('stylus', function () {
    gulp.src(['sources/stylus/*.styl'])
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: onError}))
        .pipe(stylus({
            use: [nib()],
            sourceMap: { inline: true },
            compress: true,
            'include css': true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/assets/css')).on('end', function() {
        browserSync.reload();
    });
});

//Images
gulp.task('images', function () {
    gulp.src(['sources/images/**/**'])
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets/img')).on('end', function() {
            browserSync.reload();
    });
});

//Sprite
gulp.task('sprites', function () {
    const spriteOutput = gulp.src(['sources/sprites/*.png'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sprite({
            imgName: 'sprites.png',
            imgPath: '../img/sprites.png',
            cssName: 'sprites.styl',
            algorithm: 'binary-tree',
            retinaImgName: 'sprites-retina.png',
            retinaImgPath: '../img/sprites-retina.png',
            retinaSrcFilter: 'sources/sprites/*@2x.png'
        }));
    spriteOutput.css
        .pipe(gulp.dest('sources/stylus/common'));
    spriteOutput.img
        .pipe(gulp.dest('./public/assets/img')).on('end', function() {
        browserSync.reload();
    });
});

gulp.task('scripts', function(){
	return gulp.src(['sources/scripts/script.js'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(uglify())
		.pipe(gulp.dest('public/assets/js')).on('end', function() {
			browserSync.reload();
		});
});

gulp.task('fonts', function(){
	return gulp.src(['sources/fonts/*'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(gulp.dest('public/assets/fonts')).on('end', function() {
			browserSync.reload();
		});
});

gulp.task('default', ['pug', 'sprites', 'images', 'scripts', 'stylus', 'fonts'], function () {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });
	gulp.watch('sources/stylus/**/**', ['stylus']);
	gulp.watch('sources/fonts/**/**', ['fonts']);
    gulp.watch('sources/pug/**/*', ['pug']);
    gulp.watch('sources/images/**/*', ['images']);
    gulp.watch('sources/sprites/*', ['sprites']);
    gulp.watch('sources/scripts/**/*', ['scripts']);
});
