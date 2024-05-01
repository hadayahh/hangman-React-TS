import { useState, useEffect } from "react";
import words from "./wordList.json";

import { HangmanDrawing } from "./Hangmandrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { SoundFile } from "./SoundFile";
import { MainHeading } from "./MainHeading";
import { SubHeading } from "./SubHeading";
import { HangmanGif } from "./HangmanGif";

import "./App.css";

import swal from "sweetalert";
import { HangmanRules } from "./HangmanRules";

function share(): void {
  let url = document.location.href;
  const cb = navigator.clipboard;
  cb.writeText(url).then(() => {
    swal("URL has been copied!");
  });
}

function winner(): any {
  swal(`Winner! - Press 'OK' to refresh!`);
}

function loser(): any {
  swal(`Loser! - Press 'OK' to refresh and try again!`);
}

function getWord(): string {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>(getWord());
  // return 'test'

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  //explicity defining a type for useState
  //Ex: useState<string>('') or useState<number>(0)
  //In this Example: useState <string[]>([])
  //An array of strings

  const incorrectLetters = guessedLetters.filter((letter) => {
    return !wordToGuess.includes(letter);
  });

  const isLoser = incorrectLetters.length >= 6;

  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  function addGuessedLetter(letter: string) {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;

    setGuessedLetters((currentLetters) => [...currentLetters, letter]);
  }

  const lettersToCheck = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    console.log("wordToGuess:", wordToGuess);
    console.log("lettersToCheck:", lettersToCheck);

    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      console.log(key);
      if (!lettersToCheck.includes(key)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, isWinner, isLoser]);

  console.log(guessedLetters);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <MainHeading />
        <SubHeading />
        <HangmanGif />
        <HangmanRules />
        <h3
          style={{
            textAlign: "center",
            fontSize: "3rem",
            color: "#573805",
          }}
        >
          Have at it!
        </h3>
        {isWinner ? winner() : null} {isLoser ? loser() : null}
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord
          reveal={isLoser}
          wordToGuess={wordToGuess}
          guessedLetters={guessedLetters}
        />
        <div
          className="keyboard"
          style={{ alignSelf: "stretch", width: "90%", margin: "auto" }}
        >
          <Keyboard
            disabled={isWinner || isLoser}
            activeLetters={guessedLetters.filter((letter) =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={incorrectLetters}
            addGuessedLetter={addGuessedLetter}
          />
        </div>
        <button
          style={{ marginBottom: "50px" }}
          id="button"
          onClick={() => share()}
        >
          Share with friends!
        </button>
      </div>
      <SoundFile />
    </>
  );
}

export default App;
