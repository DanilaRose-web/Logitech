/**
 * Очищение папки dist перед каждым выполнением задачи
 * Cleaning up the dist folder before every task execution
 */
import del from "del";

export const cleanDist = () => {
   return del(app.path.clean);
}