import styled from "styled-components";
import NumberSelector from "./NumberSelector";
import TotalScore from "./TotalScore";
import RoleDice from "./RoleDice";
import GameStats from "./GameStats";
import React, { useState, useEffect } from "react";
import { Button, OutlineButton } from "../styled/Button";
import Rules from "./Rules";

const GamePlay = () => {
  const [score, setScore] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState(1);
  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [gameStats, setGameStats] = useState({ totalRolls: 0, correctGuesses: 0 });

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const roleDice = () => {
    if (!selectedNumber) {
      setError("You have not selected any number");
      return;
    }

    if (isRolling) return; // Prevent multiple clicks

    setIsRolling(true);
    setError(""); // Clear any previous errors

    // Simulate dice rolling animation
    setTimeout(() => {
      const randomNumber = generateRandomNumber(1, 6);
      setCurrentDice((prev) => randomNumber);

      const isCorrect = selectedNumber === randomNumber;
      
      if (isCorrect) {
        setScore((prev) => prev + randomNumber);
      } else {
        setScore((prev) => Math.max(0, prev - 2)); // Prevent negative score
      }

      setGameStats(prev => ({
        totalRolls: prev.totalRolls + 1,
        correctGuesses: prev.correctGuesses + (isCorrect ? 1 : 0)
      }));

      setSelectedNumber(undefined);
      setIsRolling(false);
    }, 500);
  };

  const resetScore = () => {
    setScore(0);
    setGameStats({ totalRolls: 0, correctGuesses: 0 });
  };

  // Keyboard shortcut for rolling dice
  const handleKeyPress = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      roleDice();
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedNumber, isRolling]);

  return (
    <MainContainer>
      <div className="top_section">
        <TotalScore score={score} />
        <NumberSelector
          error={error}
          setError={setError}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
        />
      </div>
      <RoleDice currentDice={currentDice} roleDice={roleDice} isRolling={isRolling} />
      <GameStats gameStats={gameStats} />
      <div className="btns">
        <OutlineButton onClick={resetScore}>Reset Score</OutlineButton>
        <Button onClick={() => setShowRules((prev) => !prev)}>
          {showRules ? "Hide" : "Show"} Rules
        </Button>
      </div>

      {showRules && <Rules />}
    </MainContainer>
  );
};

export default GamePlay;

const MainContainer = styled.main`
  padding-top: 70px;
  .top_section {
    display: flex;
    justify-content: space-around;
    align-items: end;
  }
  .btns {
    margin-top: 40px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;
