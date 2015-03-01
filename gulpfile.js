var gulp = require('gulp');
var browserSync =require('browser-sync');

gulp.task('default', ['browser-sync']);


gulp.task('browser-sync', function() {
    browserSync({
        server: {
             baseDir: "."       //対象ディレクトリ
            ,index  : "index.html"      //インデックスファイル
        }
    });
});

//
//ブラウザリロード
//
gulp.task('bs-reload', function () {
    browserSync.reload();
});

//
//監視ファイル
//
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("*.html",            ['bs-reload']);
    gulp.watch("./css/*.css", ['bs-reload']);
    gulp.watch("./js/*.js",   ['bs-reload']);
});

