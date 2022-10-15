/**
 * Creating a folder archive with the result
 */

import del from "del"; // Removal
import zipPlugin from "gulp-zip" // Creating an archive

export const zip = () => {
   del(`./${app.path.rootFolder}.zip`);
   return app.gulp.src(`${app.path.distFolder}/**/*.*`, {})
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "ZIP",
            message: 'Error: <%= error.message %>'
         })
      ))
      .pipe(zipPlugin(`${app.path.rootFolder}.zip`)) // Creating an archive of the project root folder
      .pipe(app.gulp.dest('./'))
}