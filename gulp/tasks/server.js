/**
 * Start local server, automatic page refresh
 */

export const server = (done) => {
   app.plugins.browsersync.init({
      server: {
         baseDir: `${app.path.dist.html}` // running head .html file
      },
      notify: false, // display error notifications
      port: 3000,
   })
}