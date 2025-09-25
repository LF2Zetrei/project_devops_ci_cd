import React, { useEffect, useState, useRef, useCallback } from "react";

const ALPHABET = " abcdefghijklmnopqrstuvwxyz ";

function App() {
  const [letters, setLetters] = useState([" "]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const timeoutRef = useRef(null);

  const incrementLetter = useCallback(() => {
    setLetters((prev) => {
      const updated = [...prev];
      const currentLetter = updated[currentIndex];
      const nextLetter =
        ALPHABET[(ALPHABET.indexOf(currentLetter) + 1) % ALPHABET.length];
      updated[currentIndex] = nextLetter;
      return updated;
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setLetters((prev) => [...prev, " "]);
      setCurrentIndex((prev) => prev + 1);
    }, 2000);
  }, [currentIndex]);

  const handleSearch = useCallback(() => {
    const query = letters.join("");
    window.location.href = `https://www.google.com/search?q=${query}`;
  }, [letters]);

  const handleFeelingLucky = useCallback(() => {
    setShowRules(true);
    setTimeout(() => setShowRules(false), 5000);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      } else if (e.key === "Backspace") {
        setLetters((prev) => {
          if (prev.length === 1) return [" "];
          const updated = [...prev];
          updated.pop();
          return updated;
        });
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else {
        incrementLetter();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleSearch, incrementLetter]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "3em" }}>
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#DB4437" }}>o</span>
        <span style={{ color: "#F4B400" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#0F9D58" }}>l</span>
        <span style={{ color: "#DB4437" }}>e</span>
      </h1>

      {/* Barre de recherche style 2010 */}
      <div
        style={{
          display: "inline-block",
          fontSize: "1.5em",
          margin: "20px",
          padding: "8px 12px",
          width: "400px",
          border: "1px solid #d9d9d9",
          borderRadius: "16px",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          textAlign: "left",
          minHeight: "40px",
        }}
      >
        {letters.join("")}
      </div>

      <div>
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Rechercher
        </button>

        <button
          onClick={handleFeelingLucky}
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            marginTop: "20px",
            marginLeft: "20px",
            cursor: "pointer",
          }}
        >
          I am feeling lucky ...
        </button>
      </div>
      {showRules && (
        <div
          style={{
            marginTop: "15px",
            fontSize: "1em",
            color: "#555",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          Tapez vos lettres avec les flèches ou le clavier, utilisez "Backspace"
          pour corriger, et appuyez sur "Enter" pour lancer la recherche 😉
        </div>
      )}
    </div>
  );
}

export default App;
