import * as React from 'react';
import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import SubjectFavCard from './SubjectFavCard';
import RecentSubject from './RecentSubject';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BlaBla Sneakers
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const mdTheme = createTheme();

function DashboardContent() {

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
          justifyContent: 'center'
        }}
      >
        <CssBaseline />
        <Toolbar />
        <Container id="wesh" maxWidth="lg" sx={{ mt: 4, mb: 4, marginLeft: "300px!important", marginRight: "50px!important" }}>
          <Grid container spacing={3} columns={12}>

            <Grid item xs={12} md={8} lg={9}>
              <Typography component="h2" variant="h4" color="primary" gutterBottom>
                Forum BlaBla Sneakers
              </Typography>
              <Stack
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
                direction="row"
                sx={{ pb: 2, justifyContent: 'space-between' }}>
                <Button href="#sujet-form" item variant="contained">Nouveau sujet</Button>
                <Search item>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Rechercher…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
                <Button item variant="outlined">Actualiser</Button>
              </Stack>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <RecentSubject />
              </Paper>
              
              <Typography sx={{ pt: 2 }} component="h2" variant="h6" color="primary" gutterBottom>
                Nouveau Sujet
              </Typography>
              <Stack spacing={2} sx={{ pb: 2, pt: 2, justifyContent: 'space-between' }}>
                <form id="sujet-form">
                  <Grid container spacing={1} >
                    <Grid xs={12} item>
                      <TextField placeholder="Saisir le titre du sujet" label="Titre du sujet" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Sujet" multiline rows={4} placeholder="Écrivez votre sujet ici..." variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary" fullWidth>Poster</Button>
                    </Grid>
                  </Grid>
                </form>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4} lg={3} >
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  MarginBottom: 50
                }}
              >
                <SubjectFavCard />
              </Paper>
            </Grid>

          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}