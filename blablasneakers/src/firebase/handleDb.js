import { db } from "./config";
import { uid } from "uid";
import { set, ref, remove, update } from "firebase/database";


//write
const writeToDatabase = async (data, path) => {
  set(ref(db, `/${path}`), {
    data,
  });
};

//delete
const deleteInDatabase = async (path) => {
  remove(ref(db, `/${path}`));
};

//update
// const handleUpdate = (todo) => {
//   setIsEdit(true);
//   setTempUuid(todo.uuid);
//   setTodo(todo.todo);
// };

export { writeToDatabase, deleteInDatabase };