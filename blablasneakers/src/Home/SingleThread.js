import React, { useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import SubjectFavCard from './SubjectFavCard';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import { postMessage, getThread } from '../firebase/thread';

import moment from 'moment';

import OutlinedCard from './singleCardSujet';

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
const mdTheme = createTheme();

export default function SingleThread(props) {
  const { state } = useLocation();
  const { id } = state || {};
  const { name } = state || {};

  const [msg, setMsg] = React.useState("");
  const saveId = React.useRef(id)
  const [messages, setMessages] = React.useState([]);
  const [refresh, setRefresh] = React.useState(true);

  const handleSubmitMsg = (event) => {
    event.preventDefault();
    setMsg(event.target.value);
  }

  useEffect(() => {
    async function getData() {
      await getThread(saveId.current)
        .then(function (response) {
          // console.log("response", response);
          setMessages(response);
          formatData(response);
          setRefresh(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getData();
  }, [refresh]);

  const onPostMessage = () => {
    if (msg && saveId.current)
      postMessage(msg, saveId.current);
    setRefresh(true);
  };

  const formatData = (data) => {
    var elements = [];

    // eslint-disable-next-line array-callback-return
    data.map((sujet) => {
      var date = moment(sujet[2]).format("DD-MM-YYYY HH:mm:ss")
      var item = sujet;

      // console.log(date);
      if (elements[date]) {
        elements[item].push(date);
      } else {
        item.push(date)
        elements.push(item)
      }
    })
    // console.log(elements);

    setMessages(elements);
  };

  return (
    // <div> hello world --------- {id} </div>
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
        <Container id="wesh" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3} columns={12}>

            <Grid item xs={12} md={8} lg={9}>
              <Typography color="primary" sx={{ typography: { sm: 'h4', xs: 'h5' } }} gutterBottom >
                Sujet {name}
              </Typography>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {messages.map((sujet) => (
                  <OutlinedCard key={sujet} data={sujet} />
                  ))}
              </Paper>

              <Typography sx={{ pt: 2, typography: { sm: 'h4', xs: 'h5' } }} component="h2" variant="h6" color="primary" gutterBottom>
                Nouveau Message
              </Typography>
              <Stack spacing={2} sx={{ pb: 2, pt: 2, justifyContent: 'space-between' }}>
                <form id="sujet-form">
                  <Grid container spacing={1} >
                    <Grid xs={12} item>
                      <TextField name="message" placeholder="Saisir le message" onChange={(e) => handleSubmitMsg(e)} label="Message" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" fullWidth onClick={() => onPostMessage()} >Poster</Button>
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