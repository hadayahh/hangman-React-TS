export function HangmanRules() {
  return (
    <div className="hangman-rules">
      <h1 className="hangman-rules-heading">Things you should consider</h1>
      <ul>
        <li>
          The objective of hangman is to guess the secret word before the stick
          figure is hung.
        </li>
        <li>
          Players take turns selecting letters to narrow the word down, you may
          choose to play solo as well.
        </li>
        <li>
          Gameplay continues until the players guess the word or they run out of
          guesses and the stick figure is hung.
        </li>
        <li>
          Feel free to refresh the browser should you want to tackle a shorter
          word in length.
        </li>
      </ul>
    </div>
  );
}
