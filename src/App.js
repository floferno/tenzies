import './App.css';
import Confetti from 'react-confetti'
import Die from './components/Die'
import React from 'react';
import { nanoid } from 'nanoid'


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const diceElements = dice.map((die, i) => <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)
  const [tenzies, setTenzies] = React.useState(false)

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
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
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
      <p>{tenzies ? "" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
