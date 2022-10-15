/**
 * Очищение папки /src/img/app перед каждым выполнением задачи
 * Cleaning up the /src/img/app folder before every task execution
 */
import del from "del";

export const cleanImagesSrc = () => {
   return del(app.path.cleanImagesSrc);
}