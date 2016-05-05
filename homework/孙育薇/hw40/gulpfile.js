var gulp = require('gulp');

var minifycss = require('gulp-minify-css'); // CSS压缩
var imagemin = require('gulp-imagemin'); //图片压缩
var concat = require('gulp-concat');           //合并
var uglify = require('gulp-uglify');           //压缩
//var amdOptimize = require("amd-optimize");
var requirejsOptimize = require('gulp-requirejs-optimize');

gulp.task("ojs", function () {
return gulp.src("src/js/main.js")
	.pipe(requirejsOptimize(function() {
		//requirejsOptimize会根据你的配置文件去找到所有依赖的js文件
		return {
			mainConfigFile:
				'src/js/main.js'
		};
	}))
	.pipe(uglify())  //使用uglifyjs去压缩你的js
	.pipe(concat("main-built.js"))  //将其合并为main-built.js
		.pipe(gulp.dest("dist/js/"));
});


gulp.task('rjs', function () {
	return gulp.src('src/js/com/*.js')
		.pipe(requirejsOptimize({
			mainConfigFile: 'src/js/main.js',
			exclude: [
				'jquery'
			]
		}))
		.pipe(gulp.dest('dist/js/com'));
});


gulp.task('css', function(argument) {
	gulp.src('src/css/*.css')
		.pipe(concat('merge.min.css'))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('mjs', function(argument) {
	gulp.src('src/js/main.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('js', function(argument) {
	gulp.src('src/js/lib/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/lib/'));
});

gulp.task('img', function(argument){
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['ojs', 'css', 'mjs', 'js', 'img']);

// gulp.task('default', function () {
// 	//监听js变化
// 	gulp.watch('src/*', function () {       //当js文件变化后，自动检验 压缩
// 		//gulp.run('lint', 'scripts');
// 		gulp.run('lint', 'combine');
// 	});
// });
