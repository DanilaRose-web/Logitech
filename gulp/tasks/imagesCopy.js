/**
 * Копирование изображений
 * Copying images
 */
export const copyImages = () => {
   return app.gulp.src(`${app.path.srcFolder}/img/app/**/*.{jpg,jpeg,png,gif,webp,svg}`)
      .pipe(app.gulp.dest(app.path.dist.images))
}