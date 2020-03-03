// Подключение модулей
// Сам Gulp
const gulp = require('gulp');
// Локальный сервер BrowserSync
const browserSync = require('browser-sync').create();
// Минимизатор CSS
const cleanCSS = require('gulp-clean-css');
// Переименовываем файлы стилей CSS
const rename = require("gulp-rename");

// Сервер BrowserSync
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
});


//Задаём таск на стили CSS второе название может быть любым названием команды
gulp.task('styles', styles);

function styles() {
  // Рабочий файл CSS
  return gulp.src('css/*.css')
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
  .pipe(gulp.dest('dist'))
}
