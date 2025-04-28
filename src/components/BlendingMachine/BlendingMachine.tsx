import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { 
  showBlendingWorkstationAtom, 
  blendAnimationStateAtom 
} from '../../jotai/atoms/blendAtoms';
import soundManager from '../../utilities/soundManager';
import styles from './BlendingMachine.module.scss';

interface BlendingMachineProps {
  onBlend: () => void;
}

const BlendingMachine: React.FC<BlendingMachineProps> = ({ onBlend }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setShowBlendingWorkstation] = useAtom(showBlendingWorkstationAtom);
  const [blendAnimationState] = useAtom(blendAnimationStateAtom);
  const [hoverState, setHoverState] = useState(false);
  
  // 블렌딩 애니메이션 효과
  const isBlending = blendAnimationState === 'processing';
  const isComplete = blendAnimationState === 'complete';
  
  // 블렌딩 워크스테이션 열기
  const handleOpenWorkstation = () => {
    if (isProcessing || isBlending) return;
    setShowBlendingWorkstation(true);
  };
  
  // 블렌딩 시작
  const handleStartBlending = () => {
    if (isProcessing || isBlending) return;
    
    // 블렌딩 시작 상태로 변경
    setIsProcessing(true);
    
    // 그라인딩 사운드 재생
    soundManager.playSound('grinding');
    
    // 3초 후 블렌딩 종료 및 결과 표시
    setTimeout(() => {
      onBlend();
      setIsProcessing(false);
    }, 3000);
  };
  
  // 가챠 애니메이션 효과
  useEffect(() => {
    if (isComplete) {
      // 완료 사운드 효과 재생
      soundManager.playSound('complete');
    }
  }, [isComplete]);
  
  return (
    <div className={styles.blendingMachineContainer}>
      <div 
        className={`${styles.blendingMachine} ${isProcessing || isBlending ? styles.processing : ''} ${hoverState ? styles.hover : ''} ${isBlending ? styles.blendingPulse : ''} ${isComplete ? styles.gatcha : ''}`}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
        onClick={handleOpenWorkstation}
      >
        {/* 블렌딩 머신 SVG */}
        <svg
          width="320"
          height="420"
          viewBox="0 0 320 420"
          className={styles.machineSvg}
        >
          {/* 머신 본체 */}
          <rect x="50" y="100" width="220" height="250" rx="12" fill="#3d3d3d" />
          <rect x="55" y="105" width="210" height="240" rx="10" fill="#2a2a2a" />
          
          {/* 윗부분 호퍼 (원두 넣는 곳) */}
          <path
            d="M70 100 L160 65 L250 100"
            fill="#666"
            stroke="#333"
            strokeWidth="2"
          />
          <path
            d="M75 95 L160 60 L245 95"
            fill="#555"
            stroke="#222"
            strokeWidth="1"
          />
          
          {/* 블렌딩 영역 - 2개의 그라인더 */}
          <circle
            cx="120"
            cy="150"
            r="30"
            fill="#222"
            className={isProcessing ? styles.rotateGrinder : ''}
          />
          <circle
            cx="120"
            cy="150"
            r="25"
            fill="#1a1a1a"
            className={isProcessing ? styles.rotateGrinderReverse : ''}
          />
          <circle cx="120" cy="150" r="10" fill="#444" />
          
          <circle
            cx="200"
            cy="150"
            r="30"
            fill="#222"
            className={isProcessing ? styles.rotateGrinderReverse : ''}
          />
          <circle
            cx="200"
            cy="150"
            r="25"
            fill="#1a1a1a"
            className={isProcessing ? styles.rotateGrinder : ''}
          />
          <circle cx="200" cy="150" r="10" fill="#444" />
          
          {/* 그라인더 상세 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`grinder1-line-${i}`}
              x1="120"
              y1="150"
              x2={120 + 20 * Math.cos((2 * Math.PI * i) / 6)}
              y2={150 + 20 * Math.sin((2 * Math.PI * i) / 6)}
              stroke="#444"
              strokeWidth="2"
              className={isProcessing ? styles.rotateGrinder : ''}
            />
          ))}
          
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`grinder2-line-${i}`}
              x1="200"
              y1="150"
              x2={200 + 20 * Math.cos((2 * Math.PI * i) / 6)}
              y2={150 + 20 * Math.sin((2 * Math.PI * i) / 6)}
              stroke="#444"
              strokeWidth="2"
              className={isProcessing ? styles.rotateGrinderReverse : ''}
            />
          ))}
          
          {/* 블렌더 연결 파이프 */}
          <path
            d="M130 175 C140 190, 180 190, 190 175"
            stroke="#444"
            strokeWidth="10"
            fill="none"
          />
          
          {/* 컨트롤 */}
          <rect x="80" y="220" width="160" height="35" rx="5" fill="#222" />
          <circle cx="110" cy="238" r="10" fill={isProcessing ? "#f5a142" : "#888"} />
          <circle cx="160" cy="238" r="10" fill={isBlending ? "#4caf50" : "#888"} />
          <circle cx="210" cy="238" r="10" fill={isComplete ? "#2196f3" : "#888"} />
          
          {/* 하단 출력부 */}
          <rect x="135" y="350" width="50" height="10" fill="#222" />
          <rect x="150" y="360" width="20" height="40" fill="#222" />
          
          {/* 컵 플랫폼 */}
          <rect x="100" y="390" width="120" height="10" fill="#555" />
          
          {/* 장식 요소 */}
          <circle cx="160" cy="280" r="15" fill="#777" />
          <rect x="100" y="310" width="120" height="4" rx="2" fill="#777" />
          <rect x="100" y="320" width="120" height="4" rx="2" fill="#777" />
          <rect x="100" y="330" width="120" height="4" rx="2" fill="#777" />
          
          {/* 블렌딩 효과 - 원두 애니메이션 */}
          {isProcessing && (
            <>
              {/* 첫 번째 그라인더로 떨어지는 원두들 */}
              {Array.from({ length: 6 }).map((_, i) => (
                <circle
                  key={`bean1-${i}`}
                  cx={120 + Math.random() * 30 - 15}
                  cy={110 + Math.random() * 15}
                  r={2 + Math.random() * 3}
                  fill="#8c6035"
                  className={`${styles.coffeeBean} ${styles[`bean${i % 4}`]}`}
                />
              ))}
              
              {/* 두 번째 그라인더로 떨어지는 원두들 */}
              {Array.from({ length: 6 }).map((_, i) => (
                <circle
                  key={`bean2-${i}`}
                  cx={200 + Math.random() * 30 - 15}
                  cy={110 + Math.random() * 15}
                  r={2 + Math.random() * 3}
                  fill="#5e3920"
                  className={`${styles.coffeeBean} ${styles[`bean${i % 4}`]}`}
                />
              ))}
            </>
          )}
          
          {/* 머신 반사광 */}
          <path
            d="M60 115 L85 115 L85 320 L60 330 Z"
            fill="#555"
            opacity="0.2"
          />
          <path
            d="M260 115 L235 115 L235 320 L260 330 Z"
            fill="#222"
            opacity="0.3"
          />
        </svg>
      </div>
      
      <div className={styles.prompt}>
        {isProcessing 
          ? "블렌딩 중..."
          : isBlending 
            ? "맛을 계산하는 중..." 
            : isComplete 
              ? "블렌드가 완성되었습니다!" 
              : "클릭하여 블렌딩 원두 선택하기"}
      </div>
      
      {!isProcessing && !isBlending && !isComplete && (
        <button 
          className={styles.secondaryButton}
          onClick={handleOpenWorkstation}
        >
          나만의 블렌드 만들기
        </button>
      )}
      
      {isComplete && (
        <button 
          className={styles.secondaryButton}
          onClick={handleOpenWorkstation}
        >
          다른 블렌드 만들기
        </button>
      )}
    </div>
  );
};

export default BlendingMachine;