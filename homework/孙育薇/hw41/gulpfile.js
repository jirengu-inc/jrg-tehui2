var gulp = require('gulp');

var minifycss = require('gulp-minify-css'), // CSS压缩
		uglify = require('gulp-uglify'), // js压缩
		concat = require('gulp-concat'), // 合并文件
		imagemin = require('gulp-imagemin'); //图片压缩

gulp.task('css', function(argument) {
		gulp.src('src/css/*.css')
		.pipe(concat('merge.min.css'))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css/'));
});
gulp.task('js', function(argument) {
	gulp.src('src/js/*.js')
		.pipe(concat('merge.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('img', function(argument){
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['css', 'js', 'img']);