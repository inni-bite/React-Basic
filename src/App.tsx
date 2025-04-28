import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import CoffeeMachine from './components/CoffeeMachine';
import CoffeeSelector from './components/CoffeeSelector';
import CoffeeDetails from './components/CoffeeDetails';
import BlendingMachine from './components/BlendingMachine';
import BlendingWorkstation from './components/BlendingWorkstation';
import BlendResult from './components/BlendResult';
import BlendCompare from './components/BlendCompare';
import { isGrindingSoundPlayingAtom } from './jotai/atoms/coffeeAtoms';
import { 
  showBlendingWorkstationAtom, 
  showBlendResultAtom,
  blendAnimationStateAtom,
  showBlendCompareAtom
} from './jotai/atoms/blendAtoms';
import soundManager from './utilities/soundManager';
import './App.css';

function App() {
  const [showSelector, setShowSelector] = useState(false);
  const [, setIsGrindingSoundPlaying] = useAtom(isGrindingSoundPlayingAtom);
  const [showBlendingWorkstation] = useAtom(showBlendingWorkstationAtom);
  const [showBlendResult] = useAtom(showBlendResultAtom);
  const [showBlendCompare] = useAtom(showBlendCompareAtom);
  const [, setBlendAnimationState] = useAtom(blendAnimationStateAtom);
  
  // 탭 선택 (0: 원두 탐색, 1: 블렌드 탐색)
  const [activeTab, setActiveTab] = useState(0);
  
  const handleGrind = () => {
    // Play grinding sound
    soundManager.playSound('grinding');
    setIsGrindingSoundPlaying(true);
    
    // Show selector after grinding animation (3 seconds)
    setTimeout(() => {
      setShowSelector(true);
      setIsGrindingSoundPlaying(false);
    }, 3000);
  };
  
  const handleBlend = () => {
    // 블렌딩 애니메이션 상태 변경
    setBlendAnimationState('processing');
    
    // 애니메이션 지연 후 '완료' 상태로 전환
    setTimeout(() => {
      setBlendAnimationState('complete');
    }, 3000);
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Coffee Explorer</h1>
        <p>세상의 모든 원두를 탐험하세요</p>
        
        {/* 탭 네비게이션 */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => setActiveTab(0)}
          >
            원두 탐색
          </button>
          <button 
            className={`tab-button ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            나만의 블렌드
          </button>
        </div>
      </header>
      
      <main className="app-main">
        {activeTab === 0 ? (
          // 원두 탐색 탭
          <>
            <div className="machine-container">
              <CoffeeMachine onGrind={handleGrind} />
            </div>
            
            {showSelector && (
              <div className="selector-container">
                <CoffeeSelector />
              </div>
            )}
            
            {/* Coffee details modal (controlled by jotai state) */}
            <CoffeeDetails />
          </>
        ) : (
          // 블렌드 탭
          <>
            <div className="machine-container">
              <BlendingMachine onBlend={handleBlend} />
            </div>
            
            {/* 블렌드 관련 컴포넌트들 */}
            {showBlendingWorkstation && <BlendingWorkstation />}
            {showBlendResult && <BlendResult />}
            {showBlendCompare && <BlendCompare />}
          </>
        )}
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Coffee Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;