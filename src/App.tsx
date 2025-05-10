import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import CoffeeSelector from './components/CoffeeSelector';
import CoffeeDetails from './components/CoffeeDetails';
import BlendingMachine from './components/BlendingMachine';
import LandingPage from './components/LandingPage/LandingPage';
import { 
  blendAnimationStateAtom
} from './jotai/atoms/blendAtoms';
import './App.css';

function App() {
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
  
  return (
    <>
      {activeTab === -1 ? (
        // 랜딩 페이지
        <LandingPage onSelectTab={setActiveTab} />
      ) : activeTab === 0 ? (
        // Coffee Bean 페이지
        <CoffeeSelector onSelectTab={setActiveTab} />
      ) : activeTab === 1 ? (
        // 블렌드 탭
        <div className="machine-container">
          <BlendingMachine onBlend={handleBlend} onSelectTab={setActiveTab} />
        </div>
      ) : activeTab === 2 ? (
        // 아카이브 탭
        <div className="archive-container">
          <h2>아카이브 기능은 현재 개발 중입니다.</h2>
        </div>
      ) : null}
      
      {/* Coffee details modal (controlled by jotai state) */}
      <CoffeeDetails />
    </>
  );
}

export default App;