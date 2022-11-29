import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { query, collection, getDocs, where } from "firebase/firestore";
import { getProfil } from "../firebase/profil"

export const AccountProfile = (props) => {
  // const [user] = useAuthState(auth);
  const tmp = useRef({});
  const [userInfos, setUserInfos] = useState([]);
  // const [profilTmp, setProfilTmp] = useState({});

  useEffect(() => {
    function getDataProfil() {
      console.log("getProfil()", getProfil());
      tmp.current = getProfil();
      // console.log("tmp.current", tmp.current);
    };
    getDataProfil();
  });

  useEffect(() => {
    setUserInfos(tmp.current);
  }, [tmp.current])

  // useEffect(() => {
  //   function getDataProfil() {
  //     console.log("getProfil()", getProfil());
  //     setProfilTmp(getProfil);
  //     // console.log("tmp.current", tmp.current);
  //   };
  //   getDataProfil();
  // }, []);
  
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={userInfos?.photoURL}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {userInfos?.displayName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {userInfos?.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 2
        }}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          2 Sujets non Synchroniser
        </Typography>
        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="text"
          >
            Synchroniser
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
};