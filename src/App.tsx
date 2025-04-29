import { useState } from 'react';
import { useAtom } from 'jotai';
import CoffeeMachine from './components/CoffeeMachine';
import CoffeeSelector from './components/CoffeeSelector';
import CoffeeDetails from './components/CoffeeDetails';
import BlendingMachine from './components/BlendingMachine';
import BlendingWorkstation from './components/BlendingWorkstation';
import BlendResult from './components/BlendResult';
import BlendCompare from './components/BlendCompare';
import LandingPage from './components/LandingPage/LandingPage';
import { isGrindingSoundPlayingAtom, showCoffeeDetailsAtom, selectedCoffeeAtom } from './jotai/atoms/coffeeAtoms';
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
  const [, setShowCoffeeDetails] = useAtom(showCoffeeDetailsAtom);
  const [, setSelectedCoffee] = useAtom(selectedCoffeeAtom);
  const [showBlendingWorkstation] = useAtom(showBlendingWorkstationAtom);
  const [showBlendResult] = useAtom(showBlendResultAtom);
  const [showBlendCompare] = useAtom(showBlendCompareAtom);
  const [, setBlendAnimationState] = useAtom(blendAnimationStateAtom);
  
  // 탭 선택 (-1: 랜딩 페이지, 0: 원두 탐색, 1: 블렌드 탐색, 2: 아카이브)
  const [activeTab, setActiveTab] = useState(-1);
  
  // 원두 선택 시 그라인더 화면으로 전환
  const handleSelectCoffee = (_coffeeId: string) => {
    setShowSelector(true);
  };

  const handleGrind = () => {
    // 그라인딩 사운드 재생
    soundManager.playSound('grinding');
    setIsGrindingSoundPlaying(true);
    
    // 그라인딩 애니메이션 이후 커피 상세 정보 표시 (3초)
    setTimeout(() => {
      // 그라인딩 사운드 중지
      soundManager.stopSound('grinding');
      setIsGrindingSoundPlaying(false);
      setShowCoffeeDetails(true);
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
      {activeTab === -1 ? (
        // 랜딩 페이지
        <LandingPage onSelectTab={setActiveTab} />
      ) : (
        // 기능 페이지
        <>
          <header className="app-header">
            <h1 onClick={() => setActiveTab(-1)}>Coffee Explorer</h1>
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
              <button 
                className={`tab-button ${activeTab === 2 ? 'active' : ''}`}
                onClick={() => setActiveTab(2)}
              >
                아카이브
              </button>
            </div>
          </header>
          
          <main className="app-main">
            {activeTab === 0 ? (
              // 원두 탐색 탭
              <>
                {!showSelector && (
                  <div className="coffee-bottles-container">
                    <CoffeeSelector onSelectCoffee={handleSelectCoffee} showAsList={true} />
                  </div>
                )}
                
                {showSelector && (
                  <div className="machine-container">
                    <CoffeeMachine onGrind={handleGrind} />
                  </div>
                )}
                
                {/* Coffee details modal (controlled by jotai state) */}
                <CoffeeDetails />
              </>
            ) : activeTab === 1 ? (
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
            ) : (
              // 아카이브 탭 (추후 구현)
              <div className="archive-container">
                <h2>아카이브 기능은 현재 개발 중입니다.</h2>
              </div>
            )}
          </main>
          
          <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} Coffee Explorer. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;