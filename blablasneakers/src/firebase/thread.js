import { getUserId } from "./auth";
import { uid } from "uid";
import { db } from "./config";
import { writeToDatabase, deleteInDatabase } from "./handleDb";
import { ref, get, serverTimestamp } from "firebase/database";


const createThread = async (title, message) => {
  const uuid = uid();
  const userid = await getUserId();
  const path = `threads/${uuid}`;
  const messages = [];

  messages.push([message, userid, serverTimestamp()]);

  var data = {title, messages, userid};

  writeToDatabase(data, path)
};

const postMessage = async (message, threadUid) => {
  const userid = await getUserId();
  const path = `threads/${threadUid}/data/messages`;

  var messages = [];

  await get(ref(db, `threads/${threadUid}/data/messages`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        messages = snapshot.val().data
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  messages.push([message, userid, serverTimestamp()])

  console.log(messages);

  writeToDatabase(messages, path)
};

const deleteThread = async (uuid) => {
  deleteInDatabase(`threads/${uuid}`);
};

export { createThread, deleteThread, postMessage };