# Coffee-Explorer 1단계 개발 가이드

## 1. 서비스 개요

Coffee-Explorer는 세계 각국의 커피 원두에 대한 정보를 시각적이고 감각적인 방식으로 탐색할 수 있는 웹 서비스입니다. 커피를 잘 모르는 사용자도 쉽게 이해할 수 있도록 직관적인 UI/UX를 제공합니다.

### 핵심 컨셉
- 커피 머신 인터랙션을 통한 원두 탐색 시작
- 원두별 맛과 향을 돌, 질감 등의 시각적 요소로 표현 (앤트러사이트 스타일)
- 메모 형식의 감성적 맛 설명 (나무사이로 스타일)
- 한국어 사용자에 최적화된, 미니멀하고 세련된 디자인

## 2. 기술 스택

- **프론트엔드**: React, TypeScript
- **스타일링**: SCSS 모듈
- **상태 관리**: Jotai
- **애니메이션**: CSS 애니메이션
- **사운드 처리**: Howler.js
- **번들러**: Vite

## 3. 프로젝트 구조

```
coffee-explorer/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── elements/     # 맛/향 시각화 이미지
│   │   │   └── regions/      # 원산지 이미지
│   │   ├── sounds/           # 오디오 파일
│   │   └── styles/           # 글로벌 스타일
│   ├── components/
│   │   ├── CoffeeMachine/    # 커피 머신 컴포넌트
│   │   ├── CoffeeDetails/    # 원두 상세 정보 모달
│   │   ├── CoffeeSelector/   # 원두 선택 그리드
│   │   ├── TasteVisualizer/  # 맛/향 시각화 컴포넌트
│   │   └── MemoStyleNotes/   # 메모 스타일 컴포넌트
│   ├── data/
│   │   └── coffeeData.ts     # 원두 데이터
│   ├── jotai/
│   │   └── atoms/            # 전역 상태 관리
│   ├── utilities/
│   │   └── soundManager.ts   # 사운드 관리
│   ├── App.tsx
│   └── main.tsx
└── ...
```

## 4. 핵심 기능 및 구현 상태

### 4.1 커피 머신 인터랙션 (구현 완료)
- SVG 기반 커피 머신 디자인
- 그라인딩 애니메이션 및 사운드 효과
- 호버 및 클릭 인터랙션

### 4.2 원두 데이터 관리 (구현 완료)
- 확장된 데이터 구조 (한국어 정보, 메모 스타일 설명, 시각 요소)
- 현재 4개의 샘플 원두 데이터 포함

### 4.3 원두 선택 인터페이스 (구현 완료)
- 그리드 기반 원두 카드 디자인
- 로스팅 레벨별 필터링 기능
- 애니메이션 효과

### 4.4 상세 정보 표시 (구현 완료)
- 모달 형태의 상세 정보 페이지
- 맛/향 프로필, 특성 점수 시각화
- 메모 스타일의 맛 설명 표현

### 4.5 시각적 표현 (부분 구현)
- TasteVisualizer 컴포넌트 구현
- MemoStyleNotes 컴포넌트 구현
- 이미지 에셋 필요 (아직 추가되지 않음)

### 4.6 사운드 효과 (부분 구현)
- 사운드 매니저 구현
- 실제 오디오 파일 필요 (아직 추가되지 않음)

## 5. 데이터 모델

### CoffeeBean 인터페이스
```typescript
export interface VisualElement {
  type: string;       // 시각 요소의 유형 (예: 'stone', 'fruit', 'texture')
  image: string;      // 이미지 경로
  name: string;       // 요소 이름
  description: string; // 설명
}

export interface CoffeeBean {
  id: string;
  name: string;
  koreanName: string;                // 한국어 이름
  origin: string;
  koreanOrigin: string;              // 한국어 원산지 이름
  altitude: string;
  process: string;
  koreanProcess: string;             // 한국어 가공방식
  roastLevel: 'light' | 'medium' | 'medium-dark' | 'dark';
  koreanRoastLevel: string;          // 한국어 로스팅 레벨
  flavor: string[];
  koreanFlavor: string[];            // 한국어 맛 프로필
  aroma: string[];
  koreanAroma: string[];             // 한국어 향 프로필
  acidity: number;                   // 1-10
  body: number;                      // 1-10
  sweetness: number;                 // 1-10
  bitterness: number;                // 1-10
  description: string;
  koreanDescription: string;         // 한국어 설명
  memoStyle: string;                 // 나무사이로 스타일 메모
  visualElements: VisualElement[];   // 시각적 요소
  regionImage: string;               // 원산지 이미지
  recommendFor: string;              // 추천 대상
  brewingMethods: string[];
  koreanBrewingMethods: string[];    // 한국어 추출 방법
  imageUrl?: string;
}
```

## 6. 주요 컴포넌트

### 6.1 CoffeeMachine
커피 머신 인터랙티브 SVG 컴포넌트로, 그라인딩 애니메이션 및 사용자 인터랙션을 처리합니다.

### 6.2 CoffeeSelector
그리드 형태로 원두 카드를 표시하고, 필터링 기능을 제공합니다.

### 6.3 CoffeeDetails
선택된 원두의 상세 정보를 모달 형태로 표시합니다.

### 6.4 TasteVisualizer
맛과 향을 시각적 요소로 표현하는 컴포넌트입니다.

### 6.5 MemoStyleNotes
나무사이로 스타일의 메모형 설명을 표시하는 컴포넌트입니다.

## 7. TO-DO 리스트

### 7.1 에셋 추가
- [ ] `/src/assets/images/elements/` 폴더에 맛/향 관련 이미지 추가
- [ ] `/src/assets/images/regions/` 폴더에 원산지 이미지 추가
- [ ] `/src/assets/sounds/` 폴더에 그라인딩 사운드 등 오디오 파일 추가

### 7.2 디자인 개선
- [ ] 다양한 디바이스에서 반응형 테스트
- [ ] 다크 모드 지원 고려
- [ ] 색상 팔레트 최종 조정

### 7.3 기능 확장
- [ ] 더 많은 원두 데이터 추가
- [ ] 원두 비교 기능 구현
- [ ] 사용자 취향 기반 추천 시스템 구현
- [ ] 검색 기능 추가

### 7.4 성능 최적화
- [ ] 이미지 최적화
- [ ] 코드 스플리팅 및 지연 로딩 적용
- [ ] 렌더링 성능 개선

### 7.5 접근성
- [ ] 키보드 네비게이션 지원
- [ ] 스크린 리더 지원
- [ ] 색상 대비 확인

## 8. 구현 참고 사항

### 8.1 디자인 영감
- **나무사이로**: 메모 스타일의 맛 설명, 직관적인 원두 분류
- **앤트러사이트**: 시각적 맛 표현, 돌 등 오브젝트 활용
- **한국 사용자 친화적 UI**: 한글 타이포그래피, 여백, 정보 계층화

### 8.2 한국어 최적화
- Noto Sans KR 폰트 사용
- 워드 브레이크 및 줄 바꿈 조정
- 한글에 최적화된 간격과 여백

### 8.3 애니메이션 및 인터랙션
- 자연스러운 전환 효과
- 클릭, 호버 피드백
- 로딩 상태 표시

## 9. 실행 방법

프로젝트 디렉토리로 이동하여 다음 명령어 실행:
```bash
npm run dev
```

## 10. 향후 계획 (2단계)

### 10.1 사용자 경험 향상
- 사용자 계정 및 원두 즐겨찾기 기능
- 맞춤형 추천 시스템
- 원두 비교 기능

### 10.2 콘텐츠 확장
- 더 많은 원두 데이터베이스 구축
- 추출 방법 가이드 추가
- 커피 관련 용어 사전

### 10.3 커뮤니티 기능
- 사용자 리뷰 및 평가
- 소셜 공유 기능
- 커피 관련 정보 공유 게시판