var gulp = require("gulp"),
    less = require("gulp-less");
//     path = require("path");

// var minifycss = require("gulp-minify-css"),
//     uglify = require("gulp-uglify"),
//     concat = require("gulp-concat"),
//     rename = require("gulp-rename"),
//     clean = require("gulp-clean"),
//     minhtml = require("gulp-htmlmin"),
//     jshint = require("gulp-jshint"),
//     imagemin = require("gulp-imagemin");

gulp.task("less",function(){
	gulp.src("./less/**/*.less")
	           .pipe(less())
	           // .pipe(minifycss());
	           .pipe(gulp.dest("css/"));
});

// gulp.task("html",function(){
// 	return gulp.src("src/*.html")
//         .pipe(minhtml({collapseWhitespace:true}))
//         .pipe(gulp.dest("dist"));
// });

// gulp.task("css",function(arguments){
// 	return gulp.src("src/css/*.css")
// 	    .pipe(concat("merge.min.css"))
// 	    .pipe(minifycss())
// 	    .pipe(gulp.dest("dist/css/"));
// });

// gulp.task("js",function(){
// 	return gulp.src("src/js/*.js")
// 	    .pipe(jshint())
// 	    .pipe(jshint.reporter("default"))
// 	    .pipe(concat("merge.js"))
// 	    .pipe(uglify())
// 	    .pipe(gulp.dest("dist/js/"));
// });

// gulp.task("img",function(arguments){
// 	return gulp.src("src/img/*")
// 	    .pipe(imagemin())
// 	    .pipe(gulp.dest("dist/img/"))
// });

gulp.task("default",["less"]);