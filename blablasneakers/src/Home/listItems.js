import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { logout } from "../firebase";
import LogoutIcon from '@mui/icons-material/Logout';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Accueil" />
    </ListItemButton>
    <ListItemButton href="/MySubjects">
      <ListItemIcon>
        <RateReviewIcon />
      </ListItemIcon>
      <ListItemText primary="Mes sujets" />
    </ListItemButton>
    <ListItemButton href="/SubjectFav">
      <ListItemIcon>
        <FavoriteIcon />
      </ListItemIcon>
      <ListItemText primary="Sujets favories" />
    </ListItemButton>
    <ListItemButton href="/Account">
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Mon compte" />
    </ListItemButton>
    
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment >
    <ListItemButton href="/Login">
      <ListItemIcon>
        <LoginIcon />
      </ListItemIcon>
      <ListItemText primary="Connexion" />
    </ListItemButton>
  </React.Fragment >
);

export const thirdListItems = (
  <React.Fragment >
    <ListItemButton onClick={logout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Déconnexion" />
    </ListItemButton>
  </React.Fragment >
);