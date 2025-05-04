import { useState, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import CoffeeSelector from './components/CoffeeSelector';
import CoffeeDetails from './components/CoffeeDetails';
import BlendingMachine from './components/BlendingMachine';
import BlendResult from './components/BlendResult';
import BlendCompare from './components/BlendCompare';
import LandingPage from './components/LandingPage/LandingPage';
import { 
  showBlendResultAtom,
  blendAnimationStateAtom,
  showBlendCompareAtom
} from './jotai/atoms/blendAtoms';
import './App.css';

function App() {
  const showBlendResult = useAtomValue(showBlendResultAtom);
  const showBlendCompare = useAtomValue(showBlendCompareAtom);
  const [, setBlendAnimationState] = useAtom(blendAnimationStateAtom);
  
  // 탭 선택 (-1: 랜딩 페이지, 0: 원두 탐색, 1: 블렌드 탐색, 2: 아카이브)
  const [activeTab, setActiveTab] = useState(-1);
  
  // 페이지 전환 시 스크롤 상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);
  
  // 페이지 전환 시 body 클래스 관리
  useEffect(() => {
    document.body.classList.remove('landing-active', 'coffee-bean-active');
    
    if (activeTab === -1) {
      document.body.classList.add('landing-active');
    } else if (activeTab === 0) {
      document.body.classList.add('coffee-bean-active');
    }
  }, [activeTab]);
  
  const handleBlend = () => {
    // 블렌딩 애니메이션 상태 변경
    setBlendAnimationState('processing');
    
    // 애니메이션 지연 후 '완료' 상태로 전환
    setTimeout(() => {
      setBlendAnimationState('complete');
    }, 3000);
  };
  
  // 뒤로가기 핸들러
  const handleGoBack = () => {
    setActiveTab(-1); // 랜딩 페이지로 돌아가기
  };
  
  return (
    <div className={`app ${activeTab === 0 ? 'coffee-bean-view' : ''}`}>
      {activeTab === -1 ? (
        // 랜딩 페이지
        <LandingPage onSelectTab={setActiveTab} />
      ) : activeTab === 0 ? (
        // Coffee Bean 페이지
        <CoffeeSelector />
      ) : (
        // 기존 기능 페이지
        <>
          <main className="app-main">
            {activeTab === 1 ? (
              // 블렌드 탭
              <>
                <div className="machine-container">
                  <BlendingMachine onBlend={handleBlend} />
                </div>
                
                {/* 블렌드 결과 및 비교 컴포넌트 */}
                {showBlendResult && <BlendResult />}
                {showBlendCompare && <BlendCompare />}
              </>
            ) : activeTab === 2 ? (
              // 아카이브 탭 (추후 구현)
              <div className="archive-container">
                <h2>아카이브 기능은 현재 개발 중입니다.</h2>
              </div>
            ) : null}
          </main>
          
          <footer className="app-footer">
            <p>© {new Date().getFullYear()} Coffee Explorer. All rights reserved.</p>
          </footer>
        </>
      )}
      
      {/* Coffee details modal (controlled by jotai state) */}
      <CoffeeDetails />
    </div>
  );
}

export default App;