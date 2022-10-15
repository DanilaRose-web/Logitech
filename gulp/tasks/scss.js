/**
 * Handling .scss files
 */

import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; // CSS File Compression
import webpCss from "gulp-webpcss"; // Rendering WebP Images
import autoprefixer from "gulp-autoprefixer"; // Adding vendor prefixes
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Grouping media queries

const sass = gulpSass(dartSass);

export const scss = () => {
   return app.gulp.src(app.path.src.scss, {sourcemaps: true})
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: 'SCSS',
            message: 'Error: <%= error.message %>'
         })
      ))
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(sass({
         outputStyle: 'expanded'
      }))

      .pipe(groupCssMediaQueries())
      .pipe(webpCss({
         webpClass: ".webp",
         noWebpClass: ".no-webp"
      }))
      .pipe(autoprefixer({
         grid: true,
         overrideBrowserslist: ["last 80 versions"],
         cascade: true
      }))
      /* 
       * The next line does not minify the css file, but creates a new unminified css file,
       * and creates a new style.css. As a result, we will get 2 files:
       * compressed style.min.css and uncompressed style.css
      */
      .pipe(app.gulp.dest(app.path.dist.css))
      .pipe(cleanCss())
      .pipe(rename({
         extname: ".min.css" // rename the final file to style.min.css
      }))
      .pipe(app.gulp.dest(app.path.dist.css))
      .pipe(app.plugins.browsersync.stream());
}

/**
 * sourcemaps: true - helps to track which css file is written in
 */