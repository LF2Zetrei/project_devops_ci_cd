import React, { useEffect, useState, useRef, useCallback } from "react";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function App() {
  const [letters, setLetters] = useState(["a"]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      setLetters((prev) => [...prev, "a"]);
      setCurrentIndex((prev) => prev + 1);
    }, 2000);
  }, [currentIndex]);

  const handleSearch = useCallback(() => {
    const query = letters.join("");
    window.location.href = `https://www.google.com/search?q=${query}`;
  }, [letters]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      } else {
        incrementLetter();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleSearch, incrementLetter]);

  return (
    <div
      style={{ textAlign: "center", marginTop: "100px", fontFamily: "Arial" }}
    >
      <h1 style={{ fontSize: "3em" }}>
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#DB4437" }}>o</span>
        <span style={{ color: "#F4B400" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#0F9D58" }}>l</span>
        <span style={{ color: "#DB4437" }}>e</span>
      </h1>
      <div style={{ fontSize: "2em", margin: "20px" }}>{letters.join("")}</div>
      <button
        onClick={handleSearch}
        style={{ padding: "10px 20px", fontSize: "1.2em" }}
      >
        Rechercher
      </button>
    </div>
  );
}

export default App;
