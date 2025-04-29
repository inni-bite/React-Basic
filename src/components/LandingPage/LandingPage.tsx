import React, { useEffect, useState } from 'react';
import './LandingPage.scss';

// 로고 이미지 배열 정의
const logoImages = [
  "/logo C.png",
  "/Logo O.png",
  "/Logo F.png",
  "/Logo F.png",
  "/Logo E.png",
  "/Logo E.png",
  "/coffee-bean.png"
];

interface LandingPageProps {
  onSelectTab: (tab: number) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectTab }) => {
  // body 클래스 관리
  useEffect(() => {
    // 랜딩 페이지 활성화 시 body에 클래스 추가
    document.body.classList.add('landing-active');
    
    // 컴포넌트 언마운트 시 클래스 제거
    return () => {
      document.body.classList.remove('landing-active');
    };
  }, []);

  // 로고 애니메이션 상태 관리
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLogoIndex(prevIndex => (prevIndex + 1) % logoImages.length);
    }, 1300); // 1300ms 애니메이션 속도
    
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="landing-page">
      {/* 로고 및 태그라인 */}
      <header className="landing-header">
        <div className="logo" onClick={() => onSelectTab(-1)}>
          <h1>Coffee2</h1>
        </div>
        <div className="tagline">
          <p>A celebration of coffee and the moments that brew them.</p>
        </div>
      </header>
      
      <div className="divider"></div>
      
      {/* 로고 애니메이션 */}
      <div className="logo-animation">
        {logoImages.map((src, index) => (
          <img 
            key={index}
            src={src}
            alt={`Logo ${index}`}
            className={index === currentLogoIndex ? 'active' : ''}
          />
        ))}
      </div>
      
      {/* 버튼 네비게이션 */}
      <footer className="landing-footer">
        <button 
          className="nav-button" 
          onClick={() => onSelectTab(0)}
        >
          Coffee Bean
          <div className="arrow-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
        
        <button 
          className="nav-button"
          onClick={() => onSelectTab(1)}
        >
          Blend
          <div className="arrow-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
        
        <button 
          className="nav-button"
          onClick={() => onSelectTab(2)}
        >
          Archive
          <div className="arrow-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </footer>
    </div>
  );
};

export default LandingPage;