/**
 * Очищение папки /dist/img/app перед каждым выполнением задачи
 * Cleaning up the /dist/img/app folder before every task execution
 */
import del from "del";

export const cleanImagesDist = () => {
   return del(app.path.cleanImagesDist);
}