import { auth, db } from "./config";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";

const user = auth.currentUser;
const userUid = user.uid;

//write
const writeToDatabase = (message) => {
  const uuid = uid();
  set(ref(db, `/${userUid}`), {
    message,
    uuid,
  });

};

//update
// const handleUpdate = (todo) => {
//   setIsEdit(true);
//   setTempUuid(todo.uuid);
//   setTodo(todo.todo);
// };

export { writeToDatabase };