import { getUserId } from "./auth";
import { uid } from "uid";
import { db } from "./config";
import { writeToDatabase, deleteInDatabase } from "./handleDb";
import { ref, get, serverTimestamp } from "firebase/database";
import { TenMp } from "@mui/icons-material";


const createSubject = async (title, message) => {
  const uuid = uid();
  const userid = await getUserId();
  const pathTopic = `subjects/${uuid}`;
  const pathThread = `threads/${uuid}`;
  var messages = [];
  var subjects = [];

  subjects.push([title, userid, serverTimestamp()]);

  writeToDatabase(subjects, pathTopic)

  messages.push([message, userid, serverTimestamp()]);

  writeToDatabase(messages, pathThread)
};

const postMessage = async (message, threadUid) => {
  const userid = await getUserId();
  const path = `threads/${threadUid}`;

  var messages = [];

  await get(ref(db, `threads/${threadUid}`))
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

  writeToDatabase(messages, path)
};

const deleteSubject = async (uuid) => {
  const userid = await getUserId();

  await get(ref(db, `subjects/${uuid}`))
    .then((snapshot) => {
      if (snapshot.exists() && snapshot.val().data[0][1] === userid) {
        deleteInDatabase(`subjects/${uuid}`);
        deleteInDatabase(`threads/${uuid}`);
      } else {
        console.log("Not the creator");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const getSubject = async (uuid) => {
  var returnValue;

  await get(ref(db, `subjects/${uuid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        returnValue = snapshot.val().data;
      } else {
        console.log("subject does not exist");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return returnValue;
};

const getSubjects = async () => {
  var returnValue;

  await get(ref(db, `subjects`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        returnValue = snapshot.val();
      } else {
        console.log("subject does not exist");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return returnValue;
};

const getThread = async (uuid) => {
  var returnValue;

  await get(ref(db, `threads/${uuid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        returnValue = snapshot.val().data;
      } else {
        console.log("thread does not exist");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return returnValue;
};


export { createSubject, deleteSubject, postMessage, getSubject, getSubjects, getThread };