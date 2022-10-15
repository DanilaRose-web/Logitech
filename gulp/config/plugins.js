/**
 * ------------------------------------------
 * Содержит информацию о плагинах
 * ------------------------------------------
 */


/**
 * gulp-replace в нашем случае будет заменить пути alias к изображениям, и другим файлам
 */
import replace from "gulp-replace";  // Поиск и замена
import plumber from 'gulp-plumber';  // Обработка ошибок
import notify from 'gulp-notify';  // Сообщения (подсказки) уведомления
import browsersync from "browser-sync"  // Локальный сервер
import newer from "gulp-newer" // Проверка обновления
import ifPlugin from "gulp-if"; // Условия


/**
 * Объект, содержащий общие плагины, использующиеся сразу в нескольких задачах
 */
export const plugins = {
   replace: replace, // edits the paths of included files from different locations
   plumber: plumber, // helps to handle errors that occur when working with a particular file
   notify: notify, // conveniently displays a message, in particular about errors
   browsersync: browsersync, // Runs index.html locally and updates it automatically
   newer: newer, // checks if there is a picture in the folder with the result so that it is no longer run through optimization
   if: ifPlugin 
}