/**
 * Импорт модулей
 * ------------------------------------------------------------------
 */
import gulp from "gulp"; // Main gulp module
import { path } from "./gulp/config/path.js"; // Import paths


/**
 * Import tasks
 * ------------------------------------------------------------------
 */
import { copy } from "./gulp/tasks/copy.js";
import { copyImages } from "./gulp/tasks/imagesCopy.js";
import { cleanDist } from "./gulp/tasks/clean.js";
import { cleanImagesSrc } from "./gulp/tasks/cleanImagesSrc.js";
import { cleanImagesDist } from "./gulp/tasks/cleanImagesDist.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
/**
 * This task was done to test automatic merging of .svg icons into svg sprite
 * If this function will be used, uncomment the line below and add a task to mainTasks
 */
// import { svg } from "./gulp/tasks/svg.js";




/**
 * Import plugins object
 * ------------------------------------------------------------------
 */
import { plugins } from "./gulp/config/plugins.js"


/**
 * Passing values to a global variable
 * ------------------------------------------------------------------
 */
global.app = {
   prodMode: process.argv.includes('--build'),
   devMode: !process.argv.includes('--build'),
   path: path,
   gulp: gulp,
   plugins: plugins
}


/**
 * File/Folder Tracking (watch)
 * ------------------------------------------------------------------
 * watch() takes 2 parameters:
 *    1. the path we track
 *    2. actions to be taken while tracking
 */
function watcher() {
   gulp.watch(path.watch.libs, copy)
   gulp.watch(path.watch.html, html)
   gulp.watch(path.watch.css, scss)
   gulp.watch(path.watch.js, js)
   gulp.watch(path.watch.imagesSrc, cleanImagesSrc)
   gulp.watch(path.watch.imagesSrc, images)
   gulp.watch(path.watch.fonts, fonts)
   gulp.watch(path.watch.imagesApp, copyImages)
   gulp.watch(path.watch.imagesApp, cleanImagesDist)
   /**
    * If you want files to be uploaded via ftp on every change,
    * then change the tasks as follows:
    * gulp.watch(path.watch.html, gulp.series(html, ftp))
    */
   // gulp.watch(path.watch.svgSprite, svg)
}


/**
 * Separation (grouping) of tasks (for visual separation)
 * ------------------------------------------------------------------
 */
const mainTasks = gulp.parallel(copy, fonts, html, scss, js, gulp.series(cleanImagesDist, cleanImagesSrc, images, copyImages));



/** 
 * Building scripts (executing tasks)
 * ------------------------------------------------------------------
 * series() - последовательное выполнение задач (task sequencing)
 * parallel() - параллельное выполнение задач (parallel execution of tasks)
 * series() и parallel() можно вкалдывать друг в друга на любую глубину (you can dig into each other to any depth)
 */
const dev = gulp.series(cleanDist, mainTasks, gulp.parallel(watcher, server))
const deployZIP = gulp.series(cleanDist, mainTasks, zip) 
const deployFTP = gulp.series(cleanDist, mainTasks, ftp) 

/**
 * EXPORT scripts
 * чтобы они были видны извне (to be visible from the outside)
 */
export { deployZIP }
export { deployFTP }


/**
 * Running tasks by default
 * ------------------------------------------------------------------
 */
gulp.task('default', dev); // = gulp.series(copy, watch)







/**
 * 1. Plugin "webp-converter" must always be version 2.2.3 to work correctly
 * 1. Плагин "webp-converter" для корректоной работы должен быть всегда версии 2.2.3
 */


/**
 * 2. To automatically update plugins ghb "npm install" can be specified in package.json "latest" in each plugin
 *    For example: "gulp-zip": "latest",
 * 
 * 2. Для автоматического обновления плагинов ghb "npm install" можно указать в package.json "latest" в каждом плагине
 *    Например: "gulp-zip": "latest", 
 */


/**
 * COMMANDS
 * 1. npm run dev - runs gulp
 * 2. npm run zip - creates a folder archive with the result
 * 3. npm run deploy - sends files via ftp (for this you need to fill in the data in gulp/config/ftp.js)
 */


/**
 * КОМАНДЫ
 * 1. npm run dev - запускает сборку gulp
 * 2. npm run zip - создает архив папки с результатом
 * 3. npm run deploy - отправляет файлы по ftp (для этого необходимо заполнить данные в gulp/config/ftp.js)
 */
