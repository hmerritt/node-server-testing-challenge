const gulp = require("gulp");
const prettier = require("gulp-prettier");

gulp.task("default", () => {
    return gulp
        .src(["enhancing/**/*.js", "package.json", "gulpfile.js"])
        .pipe(prettier({ editorconfig: true }))
        .pipe(gulp.dest((file) => file.base));
});
