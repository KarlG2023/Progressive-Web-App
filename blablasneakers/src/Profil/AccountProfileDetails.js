import React, { useEffect, useState, useRef } from "react";
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
import {updateProfilInfo} from "../firebase/profil"

export const AccountProfileDetails = (props) => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const submitChanges = () => {
    console.log("name", name);
    console.log("photoURL", photoURL);
    updateProfilInfo(name, photoURL);
  }
  
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
                onChange={(e) => setName(e.target.value)}
                value={name}
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
                label="URL photo"
                name="photoURL"
                onChange={(e) => setPhotoURL(e.target.value)}
                value={photoURL}
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
            onClick={() => submitChanges()}
          >
            Mettre à jour
          </Button>
        </Box>
      </Card>
    </form>
  );
};