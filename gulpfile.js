var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');

gulp.task('browser-sync', function() {
    browserSync({
        startPath:'/op_tool',
        server: {
            baseDir: "../"
        }
    });
});
gulp.task('sass', function(){
	gulp.src('src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'))
})


gulp.task('bs-reload', function () {
    browserSync.reload();
});
gulp.task('watch', function(){
    gulp.watch('src/scss/*.scss',['sass'])
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("./*.html", ['bs-reload']);
});