import { useState, useEffect } from 'react';
import GameBox from './components/GameBox.js';
import './App.css';

function App() {
  const [dpx, setDpx] = useState(0);
  const [dpy, setDpy] = useState(0);
  const [fpx, setFpx] = useState(3);
  const [fpy, setFpy] = useState(3);
  const [b1x, setb1x] = useState(3);
  const [b1y, setb1y] = useState(0);
  const [b2x, setb2x] = useState(4);
  const [b2y, setb2y] = useState(2);
  const [b3x, setb3x] = useState(0);
  const [b3y, setb3y] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [meteorDeath, setMeteorDeath] = useState(false);
  const [alive, setAlive] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);  // Clear timeout if component unmounts or seconds change
    }
  }, [seconds]);

  let f = false;
  let f2 = false;
  let f3 = false;

  if (dpx === fpx && dpy === fpy) {
    f = true;
    let x = fpx;
    let y = fpy;
    while (dpx === x && dpy === y) {
      x = Math.floor(Math.random() * 5);
      y = Math.floor(Math.random() * 5);
    }

    let b1xT = b1x;
    let b1yT = b1y;
    let b2xT = b2x;
    let b2yT = b2y;
    let b3xT = b3x;
    let b3yT = b3y;

    do {
      b1xT = Math.floor(Math.random() * 5);
      b1yT = Math.floor(Math.random() * 5);
      b2xT = Math.floor(Math.random() * 5);
      b2yT = Math.floor(Math.random() * 5);
      b3xT = Math.floor(Math.random() * 5);
      b3yT = Math.floor(Math.random() * 5);

    } while ((b1xT === dpx && b1yT === dpy) || (b1xT === x && b1yT === y) || (b2xT === dpx && b2yT === dpy) || (b2xT === x && b2yT === y) || (b3xT === dpx && b3yT === dpy) || (b3xT === x && b3yT === y));

    setb1x(b1xT);
    setb1y(b1yT);
    setb2x(b2xT);
    setb2y(b2yT);
    setb3y(b3yT);
    setb3x(b3xT);
    setFpx(x);
    setFpy(y);
  }

  

  if (f) {
    setScore(score + 1);
    if (score + 1 > highScore) {
      setHighScore(score + 1);
    }
    setSeconds(2);
  }

  if ((dpx === b1x && dpy === b1y) || (dpx === b2x && dpy === b2y) || (dpx === b3x && dpy === b3y)) {
    f2 = true;
  }

  if (seconds === 0) {
    f3 = true;
  }

  if (f2 && alive) {
    setMeteorDeath(true);
    setAlive(false);
  }

  if (f3 && alive) {
    setAlive(false);
  }

  function startGame() {
    setMeteorDeath(false);
    setScore(0);
    setSeconds(2);
    setAlive(true);
    setGameStarted(true);
    setDpx(0);
    setDpy(0);
    setFpx(3);
    setFpy(3);
    setb1x(3);
    setb1y(0);
    setb2x(4);
    setb2y(2);
    setb3x(0);
    setb3y(3);

  }

  function printGrid(num, dPositionX, dPositionY, fPositionX, fPositionY, b1x, b1y, b2x, b2y, b3x, b3y) {
    const returnVal = [];
      for(let i = 0; i < num; i += 1) {
        for (let j = 0; j < num; j += 1) {
          returnVal.push(<GameBox position={[i, j]} positionDinoX={dPositionX} positionDinoY={dPositionY} positionFoodX={fPositionX} positionFoodY={fPositionY} bpx1={b1x} bpy1={b1y} bpx2={b2x} bpy2={b2y} bpx3={b3x} bpy3={b3y}/>);
        }
      }
      return returnVal;
  }

  function checkGame(alive) {
    if (seconds === 0 && gameStarted && !meteorDeath) {
      return (<h3>Game Over! You ran out of time.</h3>);
    }
    if (!alive && gameStarted && meteorDeath) {
      return (<h2>Game Over! You hit a meteor.</h2>);
    }
    return (<p></p>);
  }

  const handleKeyDown = (event) => {
    if (!alive) {
      return;
    }

    if (event.key === 'a' && dpx !== 0) {setDpx(dpx - 1);}
    else if (event.key === 'd' && dpx !== 4) {setDpx(dpx + 1);}
    else if (event.key === 'w' && dpy !== 0) {setDpy(dpy - 1);}
    else if (event.key === 's' && dpy !== 4) {setDpy(dpy + 1);}
  }

  return (
    <div className="App">
      <div className="title-div">
        <h1>DinoChomp!</h1>
      </div>
      <div className="startgame-div">
        <button onClick={startGame}>Start Game</button>
      </div>
      <div className="timer-div">
        <h3>Time Left: {seconds}</h3>
      </div>
      <div className="ihategrids">
        <div className="grid-div">
          {printGrid(5, dpx, dpy, fpx, fpy, b1x, b1y, b2x, b2y, b3x, b3y)}
        </div>
      </div>
      <div className="bombcheck-div">
        {checkGame(alive)}
      </div>
      <div className="scoreboard-div">
        <h1>Current Score: {score}</h1>
        <h1>High Score: {highScore}</h1>
      </div>
    </div>
  );
}

export default App;
