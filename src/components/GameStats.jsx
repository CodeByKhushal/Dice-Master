import styled from "styled-components";

const GameStats = ({ gameStats }) => {
  const accuracy = gameStats.totalRolls > 0 
    ? Math.round((gameStats.correctGuesses / gameStats.totalRolls) * 100) 
    : 0;

  return (
    <StatsContainer>
      <div className="stat">
        <span className="label">Total Rolls:</span>
        <span className="value">{gameStats.totalRolls}</span>
      </div>
      <div className="stat">
        <span className="label">Correct Guesses:</span>
        <span className="value">{gameStats.correctGuesses}</span>
      </div>
      <div className="stat">
        <span className="label">Accuracy:</span>
        <span className="value">{accuracy}%</span>
      </div>
    </StatsContainer>
  );
};

export default GameStats;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .label {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }

  .value {
    font-size: 18px;
    font-weight: 700;
    color: #333;
  }
`; 