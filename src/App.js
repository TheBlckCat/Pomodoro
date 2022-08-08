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
    primary: {
      main: "#8689AC"
      /*main: "#283347"*/
    },
    secondary: {
      main: "#8689AC"
    },
    background: {
      default: '#2F3148'
      /*default: "#586c91"*/
    },
    text: {
      primary: '#EDE8DF',
      /*primary: "#f4f7fc"*/
    },
  },
});

export const App = () => {
  const [worktime, setWorktime] = useState(10);
  const [breaktime, setBreaktime] = useState(5);
  const [mode, setMode] = useState("work")
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(10);
  const [progress, setProgress] = useState(100);

  const start = () => {
    setIsActive(true)
  }

  const pause = () => {
    setIsActive(false)
  }

  const reset = () => {
    setWorktime(0)
    setTime(0)
    setIsActive(false)
    setProgress(100)
  }

  const selectState = () => {
    isActive === false ? start() : pause()
  }

  const changeMode = (mode, worktime, breaktime) => {
    const nextMode = mode === "work" ? "break" : "work"
    const nextTime = mode === "work" ? breaktime : worktime

    setMode(nextMode)
    setTime(nextTime)
  }

  useEffect(() => {
    setProgress((time * 100) / (mode === "work" ? worktime : breaktime ) )
    const interval = setInterval(() => {
      if (isActive === false) {
        return;
      }
      if (time === 0) {
        return changeMode(mode, worktime, breaktime)
      }
      setTime(time - 1)
    }, 1000)

    return () => clearInterval(interval);
  }, [mode, isActive, time, worktime, breaktime])

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
            <Typography variant="h1" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>{timerSeconds(time)}</Typography>
            <CircularProgress variant="determinate" sx={{ color: "#283347" }} size={400} value={100} />
            <CircularProgress variant="determinate" sx={{ position: "absolute", left: 0, color: mode === "work" ? "#f54768" : "#6bbd99" }} size={400} value={progress} />
          </Box>
          <Grid container className='settings' sx={{ padding: "1.25rem" }} justifyContent="center" spacing={1}>
            <Grid item>
              <Button variant="outlined" onClick={() => { selectState() }}>{isActive === false ? "Start" : "Pause"}</Button>
            </Grid>

            <Grid item>
              <Button variant="outlined" disabled={isActive === false} onClick={() => { reset() }}>Reset</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>



    </ThemeProvider >
  );
}