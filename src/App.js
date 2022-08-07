import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar } from '@mui/material';
import { Container } from '@mui/system';

const theme = createTheme({
  palette: {
      primary:{
        /*main: "#8689AC"*/
        main: "#283347"
      },
      secondary: {
        main: "#8689AC"
      },
      background: {
        /*default:'#2F3148'*/
        default: "#586c91"
      },
      text: {
        /*primary: '#EDE8DF',*/
        primary: "#f4f7fc"
      },
      buttom: {
        borderColor: "#f4f7fc"
      }

  },
});

export const App = () => {
  const [initialTime, setInitialTime] = useState(0);
  const [time, setTime] = useState(0);


  const start = (e) => {
    setInitialTime(2 * 60)
    setTime(2 * 60)
  }

  useEffect(() => {

    const interval = setInterval(() => {
      clearInterval(interval);
      if (time !== 0) {
        setTime(time - 1)
      }
    }, 1000)
  }, [initialTime, time])

  const progress = (time / (initialTime / 100));

  const timerSeconds = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />



      <AppBar>
        <Box>
          <Typography variant="h5" sx={{ padding: "1rem" }}>🍅 Pomodoro</Typography>
        </Box>
      </AppBar>


      <Container sx={{ display: 'flex', justifyContent: "center", height: "100vh", alignItems: "center" }}>
        <Box className='timer' sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ position: "relative", textAlign: "center" }}>
            <Typography variant="h1" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color:"#ffffff"}}>{timerSeconds(time)}</Typography>
            <CircularProgress variant="determinate" sx={{ color: "#283347" }} size={400} value={100} />
            <CircularProgress variant="determinate" sx={{ position: "absolute", left: 0, color: "#dfe7f2" }} size={400} value={progress} />
          </Box>
          <Grid container className='settings' sx={{ padding: "1.25rem" }} justifyContent="center" spacing={1}>
            <Grid item>
              <Button variant="outlined" onClick={e => { start(e) }}>Start</Button>
            </Grid>

            <Grid item>
              <Button variant="outlined" onClick={e => { start(e) }}>Settings</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>



    </ThemeProvider >
  );
}