var gulp = require('gulp');
var browserSync =require('browser-sync');

gulp.task('default', ['browser-sync']);


gulp.task('browser-sync', function() {
    browserSync({
        server: {
             baseDir: "."       //$BBP>]%G%#%l%/%H%j(B
            ,index  : "index.html"      //$B%$%s%G%C%/%9%U%!%$%k(B
        }
    });
});

//
//$B%V%i%&%6%j%m!<%I(B
//
gulp.task('bs-reload', function () {
    browserSync.reload();
});

//
//$B4F;k%U%!%$%k(B
//
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("*.html",            ['bs-reload']);
    gulp.watch("./css/*.css", ['bs-reload']);
    gulp.watch("./js/*.js",   ['bs-reload']);
});

