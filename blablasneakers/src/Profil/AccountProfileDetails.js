import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { query, collection, getDocs } from "firebase/firestore";

// const states = [
//   {
//     value: 'alabama',
//     label: 'Alabama'
//   },
//   {
//     value: 'new-york',
//     label: 'New York'
//   },
//   {
//     value: 'san-francisco',
//     label: 'San Francisco'
//   }
// ];

export const AccountProfileDetails = (props) => {
  const [user] = useAuthState(auth);

  const [values, setValues] = useState({
    email: '',
    name: '',
    uid: '',
  });

  const [valuesTmp, setValuesTmp] = useState({
    email: '',
    name: '',
    uid: '',
  });

  useEffect(() => {
    const fetchUserInformations = async () => {
      try {
        const q = query(collection(db, "users"));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();

        setValues({
          ...values,
          email: data.email,
          name: data.name,
          uid: data.uid,
        });

      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    fetchUserInformations();
  }, [user, values]);

  const handleChange = (event) => {
    console.log(event.target.value)
    setValuesTmp({
      ...valuesTmp,
      [event.target.name]: event.target.value,
      [event.target.email]: event.target.value,
      [event.target.uid]: event.target.value
    });
    console.log(valuesTmp);
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Vos informations peuvent être modifiées"
          title="Mon profil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nom"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Prénom"
                name="uid"
                onChange={handleChange}
                required
                value={values.uid}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Adresse e-mail"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            // onClick={() => updateProfilUserTmp(valuesTmp)}
          >
            Mettre à jour
          </Button>
        </Box>
      </Card>
    </form>
  );
};