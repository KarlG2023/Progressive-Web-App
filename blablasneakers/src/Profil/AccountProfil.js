import React, { useEffect, useState } from "react";
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

export const AccountProfile = (props) => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  var refresh = true;

  useEffect(() => {
    const fetchUserName = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
    };
    if (refresh === true) {
      refresh = false;
      fetchUserName();
    }
  }, [user]);

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
            src={user?.avatar}
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
            {name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user?.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Télécharger une photo
        </Button>
      </CardActions>
    </Card>
  )
};