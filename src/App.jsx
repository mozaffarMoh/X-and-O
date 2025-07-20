import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // Add item on square click
  const addItem = (index) => {
    if (squares[index] || winner) return;

    const newSquares = [...squares]; // Create a copy
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  // Calculate winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);

  // Reset game
  const reset = () => {
    setSquares(Array(9).fill(""));
    setIsXNext(true);
  };

      console.log("showInstallButton : ", showInstallButton);
  // Handle install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log("event : ", e);

      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  return (
    <>
      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          className="reset"
          style={{ marginBottom: "1rem" }}
        >
          Install App
        </button>
      )}

      <div className={`dialog ${winner ? "dialog-display" : ""}`}>
        {winner && `Winner is: ${winner}`}
      </div>

      {!winner && (
        <div>
          <label>Next Player: {isXNext ? "X" : "O"}</label>
        </div>
      )}

      <div className="all-squares">
        {squares.map((square, index) => (
          <div className="square" onClick={() => addItem(index)} key={index}>
            {square}
          </div>
        ))}
      </div>

      <button onClick={reset} className="reset">
        Reset
      </button>
    </>
  );
}

export default App;
