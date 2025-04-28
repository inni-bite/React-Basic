import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import styles from './CoffeeMachine.module.scss';
import { selectedCoffeeAtom } from '../../jotai/atoms/coffeeAtoms';

interface CoffeeMachineProps {
  onGrind: () => void;
}

const CoffeeMachine: React.FC<CoffeeMachineProps> = ({ onGrind }) => {
  const [isGrinding, setIsGrinding] = useState(false);
  const [selectedCoffee] = useAtom(selectedCoffeeAtom);
  const [hoverState, setHoverState] = useState(false);
  
  const handleClick = () => {
    if (isGrinding) return;
    
    setIsGrinding(true);
    onGrind();
    
    // Reset grinding state after animation completes
    setTimeout(() => {
      setIsGrinding(false);
    }, 3000); // 3 seconds for grinding animation
  };

  return (
    <div className={styles.coffeeMachineContainer}>
      <div 
        className={`${styles.coffeeMachine} ${isGrinding ? styles.grinding : ''} ${hoverState ? styles.hover : ''}`} 
        onClick={handleClick}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      >
        {/* SVG Coffee Machine */}
        <svg
          width="300"
          height="400"
          viewBox="0 0 300 400"
          className={styles.machineSvg}
        >
          {/* Machine Body */}
          <rect x="50" y="100" width="200" height="250" rx="12" fill="#444" />
          <rect x="55" y="105" width="190" height="240" rx="10" fill="#333" />
          
          {/* Top Container (Bean Hopper) */}
          <path
            d="M70 100 L150 70 L230 100"
            fill="#666"
            stroke="#333"
            strokeWidth="2"
          />
          <path
            d="M75 95 L150 65 L225 95"
            fill="#555"
            stroke="#222"
            strokeWidth="1"
          />
          
          {/* Grinder Area */}
          <circle
            cx="150"
            cy="150"
            r="40"
            fill="#222"
            className={isGrinding ? styles.rotateGrinder : ''}
          />
          <circle
            cx="150"
            cy="150"
            r="35"
            fill="#1a1a1a"
            className={isGrinding ? styles.rotateGrinderReverse : ''}
          />
          <circle cx="150" cy="150" r="15" fill="#444" />
          <circle cx="150" cy="150" r="7" fill="#333" />
          
          {/* Grinder Details */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`grinder-line-${i}`}
              x1="150"
              y1="150"
              x2={150 + 30 * Math.cos((2 * Math.PI * i) / 8)}
              y2={150 + 30 * Math.sin((2 * Math.PI * i) / 8)}
              stroke="#444"
              strokeWidth="2"
              className={isGrinding ? styles.rotateGrinder : ''}
            />
          ))}
          
          {/* Controls */}
          <rect x="80" y="220" width="140" height="30" rx="5" fill="#222" />
          <circle cx="110" cy="235" r="8" fill={isGrinding ? "#f5a142" : "#888"} />
          <circle cx="150" cy="235" r="8" fill="#888" />
          <circle cx="190" cy="235" r="8" fill="#888" />
          
          {/* Coffee Output */}
          <rect x="125" y="350" width="50" height="10" fill="#222" />
          <rect x="140" y="360" width="20" height="40" fill="#222" />
          
          {/* Cup Platform */}
          <rect x="100" y="380" width="100" height="10" fill="#555" />
          
          {/* Decorative Elements */}
          <circle cx="150" cy="260" r="10" fill="#777" />
          <rect x="100" y="280" width="100" height="4" rx="2" fill="#777" />
          <rect x="100" y="290" width="100" height="4" rx="2" fill="#777" />
          <rect x="100" y="300" width="100" height="4" rx="2" fill="#777" />
          
          {/* Coffee Beans Animation when Grinding */}
          {isGrinding && (
            <>
              {Array.from({ length: 12 }).map((_, i) => (
                <circle
                  key={`bean-${i}`}
                  cx={150 + Math.random() * 40 - 20}
                  cy={110 + Math.random() * 20}
                  r={2 + Math.random() * 3}
                  fill="#8c6035"
                  className={`${styles.coffeeBean} ${styles[`bean${i % 4}`]}`}
                />
              ))}
            </>
          )}
          
          {/* Machine Reflections */}
          <path
            d="M60 115 L85 115 L85 320 L60 330 Z"
            fill="#555"
            opacity="0.2"
          />
          <path
            d="M240 115 L215 115 L215 320 L240 330 Z"
            fill="#222"
            opacity="0.3"
          />
        </svg>
        
        <div className={styles.prompt}>
          {isGrinding 
            ? "그라인딩 중..."
            : selectedCoffee 
              ? `${selectedCoffee.koreanName} 선택됨` 
              : "클릭하여 원두 탐색하기"}
        </div>
      </div>
    </div>
  );
};

export default CoffeeMachine;