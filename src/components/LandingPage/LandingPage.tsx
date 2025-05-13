/* 
  React와 훅(useEffect, useState)을 가져옴. 
  React는 화면(UI)을 만들고, useEffect는 부가 작업(예: 타이머 설정), 
  useState는 컴포넌트 상태(예: 현재 로고)를 관리.
*/
import React, { useEffect, useState } from 'react';
/* 
  SCSS 모듈 파일을 가져옴. 
  랜딩 페이지의 스타일(예: 색상, 위치, 애니메이션)을 정의.
  CSS 모듈을 사용하여 스타일 충돌 방지.
*/
import styles from './LandingPage.module.scss';

/* 로고 이미지 배열: 애니메이션에 사용할 이미지 경로. 순서대로 표시되며, 마지막에 커피콩 이미지가 나타남. */
const LOGO_IMAGES = [
  '/images/logos/logo-c.png',
  '/images/logos/logo-o.png',
  '/images/logos/logo-f.png',
  '/images/logos/logo-f.png',
  '/images/logos/logo-e.png',
  '/images/logos/logo-e.png',
  '/images/logos/coffee-bean.png',
];

/* 애니메이션 설정: 로고 이미지 전환 속도. 1300ms(1.3초)마다 이미지가 바뀜. */
const ANIMATION_INTERVAL = 1300;

/* LandingPage 컴포넌트가 받을 속성(props)의 타입 정의. onSelectTab: 버튼 클릭 시 호출되는 함수로, 선택한 탭 번호를 전달. */
interface LandingPageProps {
  onSelectTab: (tab: number) => void;
}

/* 내비게이션 버튼 컴포넌트: 푸터의 버튼을 재사용 가능하게 분리. 버튼 텍스트, 탭 번호, 클릭 핸들러를 받아 렌더링. */
const NavButton: React.FC<{
  label: string;
  tabIndex: number;
  onClick: (tab: number) => void;
}> = ({ label, tabIndex, onClick }) => (
  <button className={styles['nav-button']} onClick={() => onClick(tabIndex)}>
    {label} {/* 버튼 텍스트, 예: "Coffee Bean" */}
    <div className={styles['arrow-icon']}>
      {/* 화살표 아이콘: SVG로 그려진 화살표, 호버 시 이동 */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </button>
);

/*  LandingPage 컴포넌트: 랜딩 페이지를 표시. 로고 애니메이션, 헤더, 푸터를 포함하며, 탭 선택 기능을 제공. */
const LandingPage: React.FC<LandingPageProps> = ({ onSelectTab }) => {
  /* 
    body 클래스 관리: 페이지가 활성화될 때 body에 클래스를 추가.
    스타일이나 레이아웃을 조정하기 위해 사용.
  */
  useEffect(() => {
    /* 
      페이지가 로드되면 body에 'landing-active' 클래스 추가.
      예: 배경색 변경, 스크롤 비활성화 등에 사용 가능.
    */
    document.body.classList.add('landing-active');

    /* 
      cleanup 함수: 페이지가 사라질 때 실행.
      'landing-active' 클래스를 제거해 원래 상태로 복구.
    */
    return () => {
      document.body.classList.remove('landing-active');
    };
  }, []); // 빈 배열: 컴포넌트가 처음 로드될 때 한 번만 실행

  /* 
    로고 애니메이션 상태: 현재 표시 중인 로고 이미지의 인덱스.
    0부터 시작해 이미지를 순서대로 전환.
  */
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  /* 
    로고 애니메이션 타이머: 1.3초마다 로고 이미지를 전환.
    useEffect를 사용해 타이머를 설정하고 정리.
  */
  useEffect(() => {
    /* 
      setInterval: 1.3초마다 실행되는 타이머.
      현재 로고 인덱스를 증가시키고, 배열 끝에 도달하면 0으로 돌아감.
    */
    const intervalId = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % LOGO_IMAGES.length);
    }, ANIMATION_INTERVAL);

    /* 
      cleanup 함수: 컴포넌트가 사라질 때 타이머 제거.
      메모리 누수를 방지하고 불필요한 실행 중지.
    */
    return () => clearInterval(intervalId);
  }, []); // 빈 배열: 컴포넌트가 처음 로드될 때 한 번만 실행

  /* 
    화면 렌더링:
    - landing-page: 전체 페이지를 감싸는 div
    - 헤더: 로고와 태그라인
    - 구분선: 헤더 아래 얇은 선
    - 로고 애니메이션: 이미지 전환
    - 푸터: 내비게이션 버튼
  */
  return (
    <div className={styles['landing-page']}>
      {/* 헤더: 로고와 태그라인을 표시 */}
      <header className={styles['landing-header']}>
        <div className={styles.logo} onClick={() => onSelectTab(-1)}>
          {/* 로고 텍스트: 클릭 시 onSelectTab(-1) 호출 */}
          <h1>Coffe2</h1>
        </div>
        <div className={styles.tagline}>
          {/* 태그라인: 커피와 관련된 문구 */}
          <p>A celebration of coffee and the moments that brew them.</p>
        </div>
      </header>

      {/* 구분선: 헤더와 본문을 구분하는 얇은 선 */}
      <div className={styles.divider} />

      {/* 로고 애니메이션: 이미지들이 순서대로 페이드 인/아웃 */}
      <div className={styles['logo-animation']}>
        {LOGO_IMAGES.map((src, index) => (
          <img
            key={index} // 각 이미지에 고유 키 부여 (React 요구사항)
            src={src} // 이미지 경로
            alt={`Logo ${index}`} // 접근성을 위한 대체 텍스트
            className={index === currentLogoIndex ? styles.active : ''} // 현재 인덱스에 active 클래스 추가
          />
        ))}
      </div>

      {/* 푸터: 내비게이션 버튼들 */}
      <footer className={styles['landing-footer']}>
        {/* NavButton 컴포넌트로 각 버튼 렌더링 */}
        <NavButton label="Coffee Bean" tabIndex={0} onClick={onSelectTab} />
        <NavButton label="Blend" tabIndex={1} onClick={onSelectTab} />
        <NavButton label="Archive" tabIndex={2} onClick={onSelectTab} />
      </footer>
    </div>
  );
};

/* 
  컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄.
  다른 코드에서 import LandingPage from './LandingPage'로 가져올 수 있음.
*/
export default LandingPage;