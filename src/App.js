import './App.css';
import Confetti from 'react-confetti'
import Die from './components/Die'
import ScoreBoard from './components/ScoreBoard';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [roll, setRoll] = useState(0)
  const [start, setStart] = useState(false)
  const [bestRoll, setBestRoll] = useState(
    JSON.parse(localStorage.getItem("bestRoll")) || 0
  )
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval = null;
    if (!start || tenzies) {
      return
    }
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);

    // else if (tenzies || !start) {
    //   clearInterval(interval);
    // }
    return () => clearInterval(interval);
  }, [start, tenzies]);

  //Set the time
  // if (seconds > 59) {
  //   setSeconds(0)
  //   setMinutes(minute => minute + 1)
  // }
  // if (minutes > 59) {
  //   setMinutes(0)
  // }

  // useEffect(() => {

  //   let timer = setInterval(() => {
  //     if (!start) {
  //       return
  //     }
  //     if (tenzies) {
  //       return
  //     }
  //     setSeconds(second => second + 1)
  //   }, 1000)

  //   return () => clearInterval(timer)
  // }, [start, tenzies])

  // useEffect(() => {
  //   localStorage.setItem("bestTime", JSON.stringify(bestTime));
  // }, [bestTime]);

  useEffect(() => {
    localStorage.setItem("bestRoll", JSON.stringify(bestRoll));
  }, [bestRoll, setRecords]);

  function setRecords() {
    // Check if bestRoll doesn't exist yet or newest rolls are better (smaller amount) than bestRolls if so reassign the variable
    if (!bestRoll || roll < bestRoll) {
      setBestRoll(roll);
    }
  }

  const diceElements = dice.map((die, i) => <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)


  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true);
      setRecords();
      console.log("You won!")
    }
  }, [dice])


  function generateNewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }
  }

  // function utk generate 10 angka acak saat load page
  function allNewDice() {
    const numbers = []
    for (let i = 0; i < 10; i++) {
      numbers.push(generateNewDie())
    }
    return numbers
  }

  //function untuk rollDice lagi setiap klik tombol
  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      })
      )
      setRoll(prevRoll => prevRoll + 1)
    } else {
      setStart(true)
      setTenzies(false)
      setDice(allNewDice())
      setTime(0)
      setRoll(0)
      return
    }
  }

  function holdDice(id) {
    setStart(true)
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {
        ...die, isHeld: !die.isHeld
      } : die
    }))
  }


  return (
    <main>
      {tenzies && <Confetti />}
      <h1>{tenzies ? "CONGRATULATIONS! YOU WON!" : "Tenzies"}</h1>
      {!start && <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
      {
        start &&
        <div className="start-menu">
          {/* <p className="timer">Time: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p> */}
          <p className="count-roll">Roll count: {roll}</p>
          <p>
            Timer: {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
            {("0" + ((time / 10) % 1000)).slice(-2)}
          </p>
        </div>
      }
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      <ScoreBoard bestRoll={bestRoll}></ScoreBoard>
    </main>
  );
}

export default App;
