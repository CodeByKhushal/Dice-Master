import styled from "styled-components";

const RoleDice = ({ roleDice, currentDice, isRolling }) => {
  const handleImageError = (e) => {
    console.error(`Failed to load dice image: dice_${currentDice}.png`);
    e.target.style.display = 'none';
  };

  return (
    <DiceContainer>
      <div className={`dice ${isRolling ? 'rolling' : ''}`} onClick={roleDice}>
        <img 
          src={`/images/dice/dice_${currentDice}.png`} 
          alt={`dice ${currentDice}`}
          onError={handleImageError}
        />
      </div>
      <p>{isRolling ? 'Rolling...' : 'Click on Dice to roll'}</p>
    </DiceContainer>
  );
};

export default RoleDice;

const DiceContainer = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .dice {
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &.rolling {
      animation: roll 0.5s ease-in-out;
    }
  }

  @keyframes roll {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(90deg); }
    50% { transform: rotate(180deg); }
    75% { transform: rotate(270deg); }
    100% { transform: rotate(360deg); }
  }

  p {
    font-size: 24px;
  }
`;
