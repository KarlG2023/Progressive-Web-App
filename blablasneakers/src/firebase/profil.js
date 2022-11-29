import { auth } from "./config";
import { updateProfile } from "firebase/auth";

const getProfil = () => {
  const user = auth.currentUser;

  if (user !== null) {
    return (user.providerData[0]);
  }
}

const getProfilName = () => {
  const user = auth.currentUser;

  if (user !== null) {
    return (user.providerData[0].displayName);
  }
}

const getProfilEmail = () => {
  const user = auth.currentUser;

  if (user !== null) {
    return (user.providerData[0].email);
  }
}

const getProfilPhoto = () => {
  const user = auth.currentUser;

  if (user !== null) {
    return (user.providerData[0].photoURL)
  }
}

const updateProfilInfo = (name, photo_URL) => {
  updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: photo_URL,
  })
    .then((response) => {
      // Profile updated!
      // ...
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

export {
  getProfil,
  getProfilName,
  getProfilEmail,
  getProfilPhoto,
  updateProfilInfo
};
