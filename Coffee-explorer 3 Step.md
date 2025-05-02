# Coffee-Explorer 3단계 개발 가이드

## 1. 프로젝트 개요

Coffee-Explorer는 세계 각국의 커피 원두 정보 탐색과 나만의 블렌드를 만들 수 있는 인터랙티브 웹 애플리케이션입니다. 1단계에서는 기본적인 원두 탐색 기능을, 2단계에서는 커피 블렌딩 기능을 구현했으며, 3단계에서는 랜딩 페이지와 시각적 개선 사항을 추가했습니다.

### 핵심 컨셉
- 모던하고 세련된 다크 테마 랜딩 페이지
- 커피 머신 인터랙션을 통한 원두 탐색
- 나만의 블렌드 제작을 위한 블렌딩 워크스테이션
- 가챠 스타일의 블렌드 결과 도출
- 시각적이고 감각적인 맛 표현
- 메모 형식의 감성적 맛 설명
- 커스텀 마우스 포인터

## 2. 기술 스택

- **프론트엔드**: React, TypeScript
- **스타일링**: SCSS 모듈
- **상태 관리**: Jotai
- **애니메이션**: CSS 애니메이션
- **사운드 처리**: Howler.js
- **번들러**: Vite
- **폰트**: Univers Next Pro, Noto Sans KR

## 3. 3단계 주요 구현 사항

### 3.1 랜딩 페이지 구현
- 다크 테마 기반의 풀스크린 랜딩 페이지
- 심플하고 세련된 UI 디자인
- 로고 애니메이션 기능
- 3개의 네비게이션 버튼 (Coffee Bean, Blend, Archive)
- 반응형 디자인 적용

### 3.2 로고 애니메이션
- 로고 글자 순차적 표시 애니메이션 (C, O, F, F, E, E, Bean)
- 1.3초 간격으로 애니메이션 전환
- 커피 원두 이미지 크기 2배 확대 표시
- 화면 우측에 위치한 애니메이션 영역

### 3.3 디자인 개선
- Univers Next Pro 폰트 통합
- 화살표 아이콘 디자인 수정
- 모바일 환경에서 레이아웃 최적화
- 커스텀 마우스 포인터 적용

### 3.4 사용자 경험 개선
- 자연스러운 페이지 전환 효과
- 클릭, 호버 피드백 개선
- 반응형 레이아웃으로 다양한 기기 지원

## 4. 디렉토리 구조

```
coffee-explorer/
├── public/
│   ├── logo C.png        # 로고 애니메이션용 이미지
│   ├── Logo O.png        # 로고 애니메이션용 이미지
│   ├── Logo F.png        # 로고 애니메이션용 이미지
│   ├── Logo E.png        # 로고 애니메이션용 이미지
│   ├── coffee-bean.png   # 로고 애니메이션용 이미지
│   ├── mouse.png         # 커스텀 마우스 포인터 이미지
│   └── fonts/            # Univers Next Pro 폰트 파일
├── src/
│   ├── assets/
│   │   ├── images/       # 이미지 리소스
│   │   ├── sounds/       # 오디오 파일
│   │   └── styles/       # 글로벌 스타일
│   │       ├── main.scss     # 메인 스타일
│   │       ├── fonts.css     # 폰트 설정
│   │       ├── landing.css   # 랜딩 페이지 스타일
│   │       └── cursor.css    # 커서 스타일
│   ├── components/
│   │   ├── LandingPage/  # 랜딩 페이지 컴포넌트
│   │   ├── CoffeeMachine/# 원두 탐색용 커피 머신 컴포넌트
│   │   ├── CoffeeSelector/# 원두 선택 그리드
│   │   ├── CoffeeDetails/# 원두 상세 정보 모달
│   │   ├── BlendingMachine/# 블렌드 탐색용 커피 머신 컴포넌트
│   │   ├── BlendingWorkstation/# 블렌드 제작 인터페이스
│   │   ├── BlendResult/  # 블렌드 결과 표시 모달
│   │   ├── BlendCompare/ # 블렌드 비교 화면
│   │   ├── TasteVisualizer/# 맛/향 시각화 컴포넌트
│   │   └── MemoStyleNotes/# 메모 스타일 컴포넌트
│   ├── data/             # 데이터 파일
│   ├── jotai/            # 상태 관리
│   ├── utilities/        # 유틸리티 함수
│   ├── App.tsx           # 앱 컴포넌트
│   └── main.tsx          # 진입점
└── ...
```

## 5. 컴포넌트 상세

### 5.1 LandingPage 컴포넌트
랜딩 페이지는 다크 테마 기반의 전체 화면 컴포넌트로, 로고 애니메이션과 세 가지 네비게이션 버튼을 제공합니다.

```tsx
// LandingPage.tsx 주요 구조
const LandingPage: React.FC<LandingPageProps> = ({ onSelectTab }) => {
  // 로고 애니메이션 상태 관리
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  // 1.3초마다 로고 이미지 변경
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLogoIndex(prevIndex => (prevIndex + 1) % logoImages.length);
    }, 1300);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="landing-page">
      {/* 로고 및 태그라인 */}
      <header className="landing-header">
        <div className="logo">
          <h1>Coffee2</h1>
        </div>
        <div className="tagline">
          <p>A celebration of coffee and the moments that brew them.</p>
        </div>
      </header>
      
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
        <button className="nav-button" onClick={() => onSelectTab(0)}>
          Coffee Bean
          <div className="arrow-icon">
            <svg>...</svg>
          </div>
        </button>
        
        <button className="nav-button" onClick={() => onSelectTab(1)}>
          Blend
          <div className="arrow-icon">
            <svg>...</svg>
          </div>
        </button>
        
        <button className="nav-button" onClick={() => onSelectTab(2)}>
          Archive
          <div className="arrow-icon">
            <svg>...</svg>
          </div>
        </button>
      </footer>
    </div>
  );
};
```

### 5.2 커스텀 커서
전체 앱에 커스텀 마우스 포인터를 적용했습니다.

```css
/* cursor.css */
.app {
  cursor: url('/mouse.png'), auto;
}
```

## 6. 스타일링 상세

### 6.1 랜딩 페이지 스타일
```scss
// LandingPage.scss 주요 스타일
.landing-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #080808;
  color: #fff;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  padding: 0 48px;
  box-sizing: border-box;
  font-family: 'Univers Next Pro', sans-serif;
  position: relative;
}

// 로고 애니메이션
.logo-animation {
  position: absolute;
  top: 50%;
  right: 25%;
  transform: translateY(-50%);
  z-index: 0;
  width: 200px;
  height: 200px;
}

.logo-animation img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
  object-fit: contain;
}

// 커피 원두 이미지 크기 조정
.logo-animation img[src*="coffee-bean"] {
  transform: scale(2);
  transform-origin: center;
}

// 네비게이션 버튼
.nav-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Univers Next Pro', sans-serif;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.04em;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
  line-height: 1;
}

// 화살표 아이콘
.arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: none;
  margin-left: 8px;
  margin-bottom: 2px;
}

// 반응형 디자인
@media (max-width: 768px) {
  .landing-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .tagline {
    margin-top: 20px;
  }
  
  .logo-animation {
    right: auto;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```

### 6.2 폰트 설정
```css
/* fonts.css */
@font-face {
  font-family: 'Univers Next Pro';
  src: url('/fonts/UniversNextProRegular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Univers Next Pro';
  src: url('/fonts/UniversNextProBold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

## 7. 향후 계획 (4단계)

### 7.1 에셋 추가 및 최적화
- 더 다양한 시각 요소 추가
- 이미지 및 애니메이션 최적화
- 커스텀 사운드 효과 추가

### 7.2 사용자 경험 개선
- 페이지 전환 애니메이션 고도화
- 더 부드러운 반응형 전환 효과
- 접근성 개선 (키보드 네비게이션, 스크린 리더 지원)

### 7.3 기능 확장
- 아카이브 기능 구현
- 저장된 블렌드 관리 시스템
- 사용자 프로필 및 설정
- 소셜 공유 기능

### 7.4 성능 최적화
- 코드 스플리팅 및 지연 로딩
- 이미지 및 애셋 최적화
- 캐싱 전략 구현

## 8. 실행 방법

프로젝트 디렉토리로 이동하여 다음 명령어 실행:

```bash
# 종속성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 9. 결론

Coffee-Explorer의 3단계 개발을 통해 시각적으로 매력적인 랜딩 페이지와 사용자 경험 개선 사항을 추가했습니다. 다크 테마 디자인, 로고 애니메이션, 그리고 커스텀 마우스 포인터는 애플리케이션에 독특하고 세련된 느낌을 부여합니다. 앞으로 4단계 개발에서는 기능 확장과 성능 최적화를 중점적으로 진행할 예정입니다.