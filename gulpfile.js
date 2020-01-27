"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

function compileSass() {
  return gulp
    .src("contact/scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("contact/css"))
    .pipe(browserSync.stream());
}

// function fonts() {
//   return gulp.src('contact/fonts/**/*.ttf')
//     .pipe(gulp.dest('contact/dist/fonts'))
// }



function watch() {
  browserSync.init({
    server: {
      baseDir: "./contact",
      index: "./index.html"
    }
  });
  gulp.watch("contact/scss/**/*.scss", compileSass);
  gulp.watch("contact/*.html").on("change", browserSync.reload);
  gulp.watch("contact/js/**/*.js").on("change", browserSync.reload);
}

const build = gulp.series(gulp.parallel(compileSass));


exports.watch = watch;
exports.compileSass = compileSass;
exports.build = build;