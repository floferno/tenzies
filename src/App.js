import './App.css';
import Confetti from 'react-confetti'
import Die from './components/Die'
import React from 'react';
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [roll, setRoll] = React.useState(0)
  const [start, setStart] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)
  const [minutes, setMinutes] = React.useState(0)
  const [hours, setHours] = React.useState(0)

  //Set the time
  if (seconds > 59) {
    setSeconds(0)
    setMinutes(minute => minute + 1)
  }
  if (minutes > 59) {
    setMinutes(0)
    setHours(hour => hour + 1)
  }
  if (hours > 23) {
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  }

  React.useEffect(() => {

    let timer = setInterval(() => {
      if (!start) {
        return
      }
      if (tenzies) {
        return
      }
      setSeconds(second => second + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [start, tenzies])

  const diceElements = dice.map((die, i) => <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
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
    } else {
      setStart(false)
      setTenzies(false)
      setDice(allNewDice())
      setHours(0)
      setMinutes(0)
      setSeconds(0)
      return
    }
    setRoll(prevRoll => prevRoll + 1)
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
      <h1>{tenzies ? "YOU WON!!!🎊" : "Tenzies"}</h1>
      {!start && <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
      {
        start &&
        <div className="start-menu">
          <p className="timer">Time: {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
          <p className="count-roll">Count: {roll}</p>
        </div>
      }
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
