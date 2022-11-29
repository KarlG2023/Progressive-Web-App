import axios from "axios";

const uploadPicture = async (file) => {
  const formData = new FormData();
  var deleteHash, link;

  // Adding our image to formData
  formData.append("image", file);
  console.log(file);

  await axios
    .post("https://api.imgur.com/3/image", formData, {
      headers: {
        // Setting header
        Authorization: "Client-ID 128d5b654d59178",
        Accept: "application/json",
      },
    })
    .then(function (res) {
      deleteHash = res.data.data.deletehash;
      link = res.data.data.link;
    })
    .catch((err) => console.log("error ma dude"));

    console.log(deleteHash, link)
    return { deleteHash, link };
};

const deletePicture = async (deleteHash) => {
  await axios
    .delete("https://api.imgur.com/3/image/" + deleteHash, {
      headers: {
        // Setting header
        Authorization: "Client-ID 128d5b654d59178",
        Accept: "application/json",
      },
    })
    .then(function (res) {
      console.log(res.data);
    })
    .catch((err) => console.log(err.message));

  return;
};

export { uploadPicture, deletePicture };
