/**
 * Copying .html files from src root to dist
 */

import fileinclude from "gulp-file-include";  // concatenates (joins) files .html https://www.npmjs.com/package/gulp-file-include
import webpHtmlNoSvg from "gulp-webp-html-nosvg";  // generates <picture> tag
import versionNumber from "gulp-version-number";  // adds hash (current date and time) to files so they are not cached


export const html = () => {
   return app.gulp.src(app.path.src.html)  // take files from the src path specified in path.js (all .html files from the src root) 
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: 'HTML',
            message: 'Error: <%= error.message %>'
         })
      ))
      .pipe(fileinclude()) // use fileInclude
      .pipe(app.plugins.replace(/@img\//g, 'img/'))
      .pipe(webpHtmlNoSvg())
      .pipe(versionNumber({
         'value': '%DT%',
         'append': {
            'key': '_v',
            'cover': 0,
            'to': [
               'css',
               'js',
            ]
         },
         'output': {
            'file': 'gulp/version.json'
         }
      }))
      .pipe(app.gulp.dest(app.path.dist.html)) // put on the dist path specified in path.js (at the root of the dist folder)
      .pipe(app.plugins.browsersync.stream());
}








/**
 * -------------------------------------------
 * PAY ATTENTION
 * -------------------------------------------
 */

/**
 * In this assembly, we are trying to model some kind of component base for .html files.
 * We store pages in the root of the src/ folder, and individual components in the src/components folder.
 * With this structure, there is a path conflict in the final concatenated .css file when including images in the root (src/) .scss files and .scss files in src/components
 * The path in the root (src/) .scss files must be specified - background: url(@img/girl.jpg') no-repeat center;. The path in components (src/components) .scss should be - background: url('../../img/girl.jpg') no-repeat center;
 * 
 * ----------------------------------------------------------------
 * 
 * SOLUTION:
 * 1. Install plugin for vs code - Path Autocomplete,
 *    add alias to settings.json (see parameter - path-autocomplete.pathMappings)
 * 2. Install gulp-file-include plugin (npm i -D gulp-file-include),
 *    to replace path to files in final .html (/@img\//g, 'img/')
 */









/**
 * -------------------------------------------
 * ОБРАТИ ВНИМАНИЕ
 * -------------------------------------------
 */

/**
 * В данной сборке мы пытаемся смоделировать некое подобие компонетной основы для файлов .html.
 * Мы храним страницы в корне папки src/, а отдельные компоненты в папке src/components.
 * При такой структуре возникает конфликт путей в итоговом сконкатинированном файле .css при подключении изображений в корневые (src/) файлы .scss и файлы .scss в src/components
 * Путь в корневых (src/) файлах .scss нужно указать - background: url(@img/girl.jpg') no-repeat center;. Путь в компонентах (src/components) .scss должен быть - background: url('../../img/girl.jpg') no-repeat center;
 * 
 * ----------------------------------------------------------------
 * 
 * РЕШЕНИЕ:
 * 1. Устанавливаем плагин для vs code - Path Autocomplete 
 *    добавляем в settings.json alias (смотри параметр - path-autocomplete.pathMappings)
 * 2. Устанавливаем плагин gulp-file-include (npm i -D gulp-file-include)
 *    для замены пути к файлам в итоговом .html (/@img\//g, 'img/')
 */