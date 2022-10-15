/**
 * Processing svg (merging all svgs into 1 file)
 */

import svgSprite from "gulp-svg-sprite";

export const svg = () => {
   return app.gulp.src(app.path.src.svgSprite, {})
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: 'SVG',
            message: 'Error: <%= error.message %>'
         })
      ))
      .pipe(svgSprite({
         mode: {
            stack: {
               sprite: `../icons/icons.svg`,
               // An html page is created with preview icons
               example: true
            }
         }
      }))
      .pipe(app.gulp.dest(app.path.dist.images))
      .pipe(app.plugins.browsersync.stream());
}