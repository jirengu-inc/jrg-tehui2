var gulp = require('gulp');//将最主要的glup给拉出来

//引入组件
var cleancss = require('gulp-clean-css'), //css压缩
    concat = require('gulp-concat'), //合并文件
    fontmin = require('gulp-fontmin'),//字体压缩
    minhtml = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'), //图片压缩
    jshint = require('gulp-jshint'),  //js代码规范性检查
    uglify = require('gulp-uglify'); //js压缩


//设置gulp需要做得task
gulp.task('html',function () {
    return gulp.src('src/*.html')//将资源给找到
        .pipe(minhtml({collapseWhitespace:true}))//压缩html去掉内部的空格
        .pipe(gulp.dest('dist'));//在这个流的最后将其输出成为某个文件夹
});

gulp.task('css',function () {
    return gulp.src('src/css/*.css')
        .pipe(concat('merge.min.css'))  //合并成一个名叫merge.min的css文件
        .pipe(cleancss())               //压缩css
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js',function () {
    return gulp.src('src/js/**/*.js')        //将js文件夹下的所有js都给找到
        .pipe(jshint())                  //检查js文件的拼写错误
        .pipe(jshint.reporter('default'))
        .pipe(concat('merge.min.js'))     //合并js文件
        .pipe(uglify())                   //压缩js文件
        .pipe(gulp.dest('dist/js'));
});

gulp.task('pic',function () {
    return gulp.src('src/pic/*')
        .pipe(imagemin())                 //压缩图片
        .pipe(gulp.dest('dist/pic'))
});

gulp.task('font',function(){
    return gulp.src('src/fonts/*')
        .pipe(fontmin())                   //压缩字体
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('default',['html','css','js','pic','font']); //gulp build 就可以执行这四个任务