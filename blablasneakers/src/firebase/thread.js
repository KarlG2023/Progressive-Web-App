import { getUserId } from "./auth";
import { uid } from "uid";
import { db } from "./config";
import { writeToDatabase, deleteInDatabase } from "./handleDb";
import { ref, get, serverTimestamp } from "firebase/database";
import { uploadPicture, deletePicture } from "./imgur";

const createSubject = async (title, message, file) => {
  const uuid = uid();
  const userid = await getUserId();
  const pathTopic = `subjects/${uuid}`;
  const pathThread = `threads/${uuid}`;
  var messages = [];
  var subjects = [];

  if (file != null) {
    await uploadPicture(file)
      .then(function (response) {
        console.log(response.deleteHash, response.link)
        subjects.push([title, userid, serverTimestamp(), uuid]);
        writeToDatabase(subjects, pathTopic);

        messages.push([message, userid, serverTimestamp(), uuid, response.link, response.deleteHash]);
        writeToDatabase(messages, pathThread);
      })
      .catch((err) => console.log(err.message));
  } else {
    subjects.push([title, userid, serverTimestamp(), uuid]);
    writeToDatabase(subjects, pathTopic);

    messages.push([message, userid, serverTimestamp(), uuid, null, null]);
    writeToDatabase(messages, pathThread);
  }
};

const postMessage = async (message, threadUid) => {
  const userid = await getUserId();
  const path = `threads/${threadUid}`;

  var messages = [];

  await get(ref(db, `threads/${threadUid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        messages = snapshot.val().data;
        console.log(messages);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  messages.push([message, userid, serverTimestamp(), threadUid]);

  writeToDatabase(messages, path);
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

export {
  createSubject,
  deleteSubject,
  postMessage,
  getSubject,
  getSubjects,
  getThread,
};
