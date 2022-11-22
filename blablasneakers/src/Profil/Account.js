// import { useState } from 'react';
import {
  Box,
  Grid} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AccountProfile } from './AccountProfil';
import { AccountProfileDetails } from './AccountProfileDetails';

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

const mdTheme = createTheme();

export default function Account(props) {
  // const [values, setValues] = useState({
  //   firstName: 'Katarina',
  //   lastName: 'Smith',
  //   email: 'demo@devias.io',
  //   phone: '',
  //   state: 'Alabama',
  //   country: 'USA'
  // });

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          display: 'flex',
          overflow: 'auto',
          height: '100vh',
          justifyContent: 'center'
        }}
      >
        <CssBaseline />
        <Toolbar />
        <Container id="wesh" maxWidth="lg" sx={{ mt: 4, mb: 4, marginLeft: "300px!important", marginRight: "50px!important" }}>
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Mon compte
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};