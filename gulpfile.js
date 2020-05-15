const gulp = require("gulp");
const prettier = require("gulp-prettier");

gulp.task("default", () => {
    return gulp
        .src(["api/**/*.js", "data/**/*.js", "package.json", "gulpfile.js"])
        .pipe(prettier({ editorconfig: true }))
        .pipe(gulp.dest((file) => file.base));
});
