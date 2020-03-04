// Подключение модулей
// Сам Gulp
const {src, dest, watch} = require('gulp');
// Локальный сервер BrowserSync
const browserSync = require('browser-sync').create();
// Минимизатор CSS
const cleanCSS = require('gulp-clean-css');
// Переименовываем файлы стилей CSS
const rename = require("gulp-rename");
// подключение Sass
const sass = require("gulp-sass");

// Сервер BrowserSync
function bs() {
  serveSass();
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.sass").on('change', serveSass);
  watch("./js/*.js").on('change', browserSync.reload);
};


function styles() {
  // Рабочий файл CSS
  return src('css/*.css')
  // Минимизация
  .pipe(cleanCSS({
    level: 2
}))
// Переименование с суффиксом мин
.pipe(rename({
  suffix: ".min",
  extname: ".css"
}))
// Путь куда его кладём
  .pipe(dest('dist'))
}

 function serveSass() {
  return src("/sass/*.sass")
      .pipe(sass())
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
};
 exports.serve = bs;