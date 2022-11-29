/* eslint-disable react-hooks/exhaustive-deps */
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
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { createSubject } from '../firebase/thread';
import { getSubjects } from '../firebase/thread';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Alert from '@mui/material/Alert';
import { getUserId } from "../firebase/auth";
import { uid } from "uid";
import { db } from "../firebase/config";
import { writeToDatabase, deleteInDatabase } from "../firebase/handleDb";
import { ref, get, serverTimestamp } from "firebase/database";
import { disableNetwork } from "firebase/firestore";

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
  const [titre, setTitre] = React.useState("");
  const [sujet, setSujet] = React.useState("");
  const data = React.useRef([]);
  const propertyValues = React.useRef([]);
  const allRow = React.useRef([]);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [propertyValuesTmp, setPropertyValuesTmp] = React.useState([]);
  const [row, setRow] = React.useState([]);

  const navigate = useNavigate();

  const handleSubmitTitre = (event) => {
    event.preventDefault();
    setTitre(event.target.value);
  }

  const handleSubmitSujet = (event) => {
    event.preventDefault();
    setSujet(event.target.value);
  }

  React.useEffect(() => {
    const getSubjects = async () => {
      var returnValue;
      await get(ref(db, `subjects`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            localStorage.setItem("Subjetcs", snapshot.val());
            let collection = localStorage.getItem('Subjetcs');
            console.log("collection", collection);
            data.current = [snapshot.val()];
            // console.log("typeof data", data.current[0]);
            propertyValues.current = Object.values(data.current[0]);//convertie mon object data en array
            if (!propertyValuesTmp.includes(propertyValues.current)) {
              setPropertyValuesTmp(propertyValues.current);
            }
            returnValue = snapshot.val();
          } else {
            console.log("subject does not exist");
          }
        })
        .catch((error) => {
          console.error(error);

          let collection = localStorage.getItem('Subjetcs');
          data.current = [collection];
          console.log("data", data.current);
          propertyValues.current = Object.values(data.current[0]);//convertie mon object data en array
          if (!propertyValuesTmp.includes(propertyValues.current)) {
            setPropertyValuesTmp(propertyValues.current);
          }
        });
      return returnValue;
    };
    getSubjects();
  }, [])

  // React.useEffect(() => {
  //   async function getData() {
  //     await getSubjects()
  //       .then(function (response) {
  //         localStorage.setItem("Subjetcs", JSON.stringify(response));
  //         let collection = localStorage.getItem('Subjetcs');
  //         console.log("collection",collection);
  //         // console.log("response", response);
  //         data.current = [response];
  //         // console.log("typeof data", data.current[0]);
  //         propertyValues.current = Object.values(data.current[0]);//convertie mon object data en array
  //         if (!propertyValuesTmp.includes(propertyValues.current)) {
  //           setPropertyValuesTmp(propertyValues.current);
  //         }

  //       })
  //       .catch(function (error) {
  //         let collection = localStorage.getItem('Subjetcs');
  //         console.log(collection);

  //         data.current = [collection];
  //         propertyValues.current = Object.values(data.current[0]);//convertie mon object data en array
  //         if (!propertyValuesTmp.includes(propertyValues.current)) {
  //           setPropertyValuesTmp(propertyValues.current);
  //         }
  //         console.error(error);
  //       });
  //   };
  //   getData();
  // }, []);

  React.useEffect(() => {
    console.log("propertyValuesTmp", propertyValuesTmp);
    if (propertyValuesTmp.length > 0) {
      function readUserData() {
        // console.log('start');
        // console.log("data.current", data.current);
        // console.log("propertyValues, lenght", propertyValuesTmp.length);
        for (let index = 0; index < propertyValuesTmp.length; index++) {
          console.log(propertyValuesTmp[index].data[0]);//print tout mes titres sujets directement

          if (!allRow.current.includes(propertyValuesTmp[index].data[0]) && !allRow.current.includes(propertyValuesTmp[index].data[1]) && !allRow.current.includes(propertyValuesTmp[index].data[2])) {
            allRow.current.push(propertyValuesTmp[index].data[0]);
          }
        }
      }
      readUserData();
      formatData(allRow.current);
      setPropertyValuesTmp([]);
    }
  }, [propertyValuesTmp]);

  const formatData = (data) => {
    var elements = [];
    // console.log(data);
    data.map((sujet) => {
      var date = moment(sujet[2]).format("DD-MM-YYYY HH:mm:ss")
      var item = sujet;

      console.log(date);
      if (elements[date]) {
        elements[item].push(date);
      } else {
        item.push(date)
        elements.push(item)
      }
      return (<></>)
    })
    console.log("elements", elements);

    setRow(elements);
  };

  function goSingleThread(selectedRow) {
    // setSelectedRow(sujet);
    // console.log("selectedRow", selectedRow);
    // console.log("nameSujbect", nameSujbect);
    if (selectedRow.length > 0)
      navigate(`/sujet/`, { replace: true, state: { id: selectedRow[3], name: selectedRow[0] } });
  }

  React.useEffect(() => {
    goSingleThread(selectedRow)
  }, [selectedRow])

  return (
    <ThemeProvider theme={mdTheme}>
      <Alert sx={{ justifyContent: "center" }} severity="warning">This web app works offline!</Alert>
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
        <Container id="wesh" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

          <Grid container spacing={3} columns={12}>

            <Grid item xs={12} md={8} lg={9}>
              <Typography color="primary" sx={{ typography: { sm: 'h4', xs: 'h5' } }} gutterBottom >
                Forum BlaBla Sneakers
              </Typography>
              <Stack
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
                direction="row"
                sx={{ pb: 2, justifyContent: 'space-between' }}>
                <Button href="#sujet-form" item variant="contained" sx={{ typography: { sm: 'h8', xs: 'h8' } }}>Nouveau sujet</Button>
                <Search item>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Rechercher…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
                <Button item variant="outlined" sx={{ typography: { sm: 'h8', xs: 'h8' } }}>Actualiser</Button>
              </Stack>

              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {/* <RecentSubject data={data} currentValue={propertyValues.current} /> */}
                <Title>Sujets récents</Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sujet</TableCell>
                      <TableCell>Auteur</TableCell>
                      <TableCell>Creation du sujet</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {row.map((sujet) => (
                      <TableRow key={sujet[4]} onClick={() => setSelectedRow(sujet)}>
                        <TableCell>{sujet[0]}</TableCell>
                        <TableCell>{sujet[1]}</TableCell>
                        <TableCell>{sujet[4]}</TableCell>
                      </TableRow>
                    ))}

                  </TableBody>
                </Table>
              </Paper>

              <Typography sx={{ pt: 2, typography: { sm: 'h4', xs: 'h5' } }} component="h2" variant="h6" color="primary" gutterBottom>
                Nouveau Sujet
              </Typography>
              <Stack spacing={2} sx={{ pb: 2, pt: 2, justifyContent: 'space-between' }}>
                <form id="sujet-form">
                  <Grid container spacing={1} >
                    <Grid xs={12} item>
                      <TextField name="titre" placeholder="Saisir le titre du sujet" onChange={(e) => handleSubmitTitre(e)} label="Titre du sujet" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="sujet" label="Sujet" multiline rows={4} onChange={(e) => handleSubmitSujet(e)} placeholder="Écrivez votre sujet ici..." variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary" fullWidth onClick={() => createSubject(titre, sujet)} >Poster</Button>
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