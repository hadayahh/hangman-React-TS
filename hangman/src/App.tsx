import { useState, useEffect} from 'react'
import words from "./wordList.json"

import { HangmanDrawing } from "./Hangmandrawing"
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'

import './App.css';

import swal from 'sweetalert';


function share(): void {
  let url = document.location.href;
  const cb = navigator.clipboard;
  cb.writeText(url).then(() => {
    swal('URL has been copied!')
  })
}

function winner(): any{
    swal(`Winner! - Press 'OK' to refresh!`)
}

function loser(): any {
    swal(`Loser! - Press 'OK' to refresh and try again!`)
}

function getWord(): string {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {

  const [wordToGuess, setWordToGuess] = useState <string>(getWord())
    // return 'test'
  
  const [guessedLetters, setGuessedLetters] = useState <string[]>([])
  //explicity defining a type for useState
  //Ex: useState<string>('') or useState<number>(0)
  //In this Example: useState <string[]>([])
  //An array of strings

  const incorrectLetters = guessedLetters.filter(letter => {
   return !wordToGuess.includes(letter)
  })

  const isLoser = incorrectLetters.length >= 6;

  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  function addGuessedLetter(letter: string){
    if(guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }
  
  const lettersToCheck = 'abcdefghijklmnopqrstuvwxyz'.split('');

  useEffect(() => {
    
    console.log('wordToGuess:',wordToGuess)
    console.log('lettersToCheck:',lettersToCheck)
    
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      console.log(key)
      if(!lettersToCheck.includes(key)) return
       
      e.preventDefault()
      addGuessedLetter(key)
      
    }
    
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  },[guessedLetters, isWinner, isLoser])

  console.log(guessedLetters)

  useEffect(() => {
      const handler = (e: KeyboardEvent) => {
      const key = e.key;
      
      if(key !== "Enter") return
      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  },[])

  return (
    <div style={{maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: 'auto', alignItems: 'center'}}>
      <div style={{marginTop: '50px '}}>
        <span style={{color: 'red', fontSize: '6rem', letterSpacing: '27px'}}>H</span>
        <span style={{color: 'yellow', fontSize: '6rem', letterSpacing: '27px'}}>A</span>
        <span style={{color: 'orange', fontSize: '6rem', letterSpacing: '27px'}}>N</span>
        <span style={{color: 'red', fontSize: '6rem', letterSpacing: '27px'}}>G</span>
        <span style={{color: 'orange', fontSize: '6rem', letterSpacing: '27px'}}>M</span>
        <span style={{color: 'yellow', fontSize: '6rem', letterSpacing: '27px'}}>A</span>
        <span style={{color: 'red', fontSize: '6rem'}}>N</span>
      </div>
      <h1 style={{fontSize: "3rem"}}>Things you should consider</h1>
      <ul style={{fontSize: '25px'}}>
        <li>The objective of hangman is to guess the secret word before the stick figure is hung.</li>
        <li>Players take turns selecting letters to narrow the word down, you may choose to play solo as well.</li>
        <li>Gameplay continues until the players guess the word or they run out of guesses and the stick figure is hung.</li>
        <li>Feel free to refresh the browser should you want to tackle a shorter word in length.</li>
      </ul>
      <h3 style={{fontSize: "3rem"}}>Have at it!</h3>
      {isWinner? winner() : null} {isLoser? loser() : null}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord reveal={isLoser} wordToGuess={wordToGuess} guessedLetters={guessedLetters}/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter}/>
      </div>
      <button style={{marginBottom: '50px'}} id= 'button' onClick={() => share()}>Share with friends!</button>
    </div>
  )
}

export default App
