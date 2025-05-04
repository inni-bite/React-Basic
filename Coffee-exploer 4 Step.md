# Coffee Explorer Project Documentation

## 프로젝트 개요

Coffee Explorer는 세계 각국의 커피 원두 정보 탐색과 나만의 블렌드를 만들 수 있는 인터랙티브 웹 애플리케이션입니다. 이 프로젝트는 커피에 관심 있는 사용자들에게 직관적이고 시각적인 방식으로 다양한 원두를 탐색하고 자신만의 블렌드를 만들 수 있는 경험을 제공합니다.

### 주요 기능
1. **원두 탐색**: 다양한 원두의 상세 정보 탐색
2. **블렌드 제작**: 여러 원두를 조합하여 나만의 블렌드 만들기
3. **아카이브**: 생성한 블렌드 저장 및 관리 (개발 중)

### 기술 스택
- **프론트엔드**: React, TypeScript
- **스타일링**: SCSS 모듈
- **상태 관리**: Jotai
- **애니메이션**: CSS 애니메이션
- **사운드 처리**: Howler.js
- **번들러**: Vite

## 프로젝트 구조

```
coffee-explorer/
├── public/              # 정적 파일 (이미지, 폰트, 소리 등)
├── src/
│   ├── assets/          # 내부 에셋 (스타일, 이미지 등)
│   │   ├── images/
│   │   ├── sounds/
│   │   └── styles/
│   ├── components/      # 리액트 컴포넌트
│   │   ├── BlendCompare/
│   │   ├── BlendResult/
│   │   ├── BlendingMachine/
│   │   ├── BlendingWorkstation/
│   │   ├── CoffeeDetails/
│   │   ├── CoffeeImage/
│   │   ├── CoffeeSelector/
│   │   ├── LandingPage/
│   │   ├── Layout/
│   │   ├── Loading/
│   │   ├── MemoStyleNotes/
│   │   └── TasteVisualizer/
│   ├── data/            # 데이터 파일
│   │   ├── coffeeData.ts
│   │   └── blendData.ts
│   ├── jotai/           # 상태 관리
│   │   └── atoms/
│   ├── types/           # 타입 정의
│   ├── utilities/       # 유틸리티 함수
│   ├── App.css          # 앱 기본 스타일
│   ├── App.tsx          # 메인 앱 컴포넌트
│   └── main.tsx         # 진입점
```

## 주요 컴포넌트 설명

### 1. App.tsx
애플리케이션의 메인 컴포넌트로, 탭 네비게이션과 라우팅을 처리합니다. 랜딩 페이지, 원두 탐색, 블렌드 제작, 아카이브 탭 간의 전환을 관리합니다.

### 2. LandingPage
첫 화면으로, 다크 테마 기반의 풀스크린 랜딩 페이지입니다. 로고 애니메이션과 네비게이션 버튼을 포함합니다.

### 3. CoffeeSelector
원두 탐색 페이지로, 다양한 원두를 그리드 형태로 표시합니다. 원두 필터링 및 선택 기능을 제공합니다.

### 4. CoffeeDetails
선택한 원두의 상세 정보를 모달 형태로 표시합니다. 원두의 특성, 맛 프로필, 추천 정보 등을 보여줍니다.

### 5. BlendingMachine
블렌드 제작 페이지의 메인 컴포넌트입니다. 좌측에 커피 머신 이미지와 "Create Coffee" 버튼, 우측에 BlendingWorkstation을 포함합니다.

### 6. BlendingWorkstation
원두 선택 및 블렌드 제작 인터페이스를 제공합니다. 원두를 선택하고 비율을 조정하여 블렌드를 만들 수 있습니다.

### 7. BlendResult
블렌드 결과를 모달 형태로 표시합니다. 계산된 맛 프로필, 특성, 시각적 요소 등을 보여줍니다.

### 8. BlendCompare
두 블렌드를 비교할 수 있는 인터페이스를 제공합니다. 특성 차이를 시각적으로 보여줍니다.

## 상태 관리

프로젝트에서는 Jotai를 사용하여 상태를 관리합니다. 주요 상태들은 다음과 같습니다:

### coffeeAtoms.ts
```typescript
// 원두 관련 상태
export const selectedCoffeeAtom = atom<CoffeeBean | null>(null);
export const showCoffeeDetailsAtom = atom<boolean>(false);
export const isGrindingSoundPlayingAtom = atom<boolean>(false);
export const isLoadingModalAtom = atom<boolean>(false);
```

### blendAtoms.ts
```typescript
// 블렌드 관련 상태
export const blendingComponentsAtom = atom<BlendComponent[]>([]);
export const showBlendingWorkstationAtom = atom<boolean>(false);
export const showBlendResultAtom = atom<boolean>(false);
export const blendResultAtom = atom<CoffeeBlend | null>(null);
export const savedBlendsAtom = atom<CoffeeBlend[]>([]);
export const comparingBlendsAtom = atom<CoffeeBlend[]>([]);
export const showBlendCompareAtom = atom<boolean>(false);
export const blendAnimationStateAtom = atom<'idle' | 'processing' | 'complete'>('idle');
```

## 데이터 모델

### CoffeeBean 인터페이스
```typescript
export interface CoffeeBean {
  id: string;
  name: string;
  koreanName: string;
  origin: string;
  koreanOrigin: string;
  altitude: string;
  process: string;
  koreanProcess: string;
  roastLevel: 'light' | 'medium' | 'medium-dark' | 'dark';
  koreanRoastLevel: string;
  flavor: string[];
  koreanFlavor: string[];
  aroma: string[];
  koreanAroma: string[];
  acidity: number;
  body: number;
  sweetness: number;
  bitterness: number;
  description: string;
  koreanDescription: string;
  memoStyle: string;
  visualElements: VisualElement[];
  regionImage: string;
  recommendFor: string;
  brewingMethods: string[];
  koreanBrewingMethods: string[];
  imageUrl?: string;
}
```

### BlendComponent 및 CoffeeBlend 인터페이스
```typescript
export interface BlendComponent {
  beanId: string;
  ratio: number; // 퍼센트(%)
}

export interface CoffeeBlend {
  id: string;
  name: string;
  components: BlendComponent[];
  calculatedFlavor: string[];
  calculatedAroma: string[];
  calculatedAcidity: number;
  calculatedBody: number;
  calculatedSweetness: number;
  calculatedBitterness: number;
  visualElements: VisualElement[];
  memoStyle: string;
}
```

## CSS 모듈 및 스타일링

프로젝트는 SCSS 모듈을 사용하여 컴포넌트별로 스타일을 관리합니다. 주요 스타일링 특징:

1. **모듈화된 스타일**: 각 컴포넌트별로 독립적인 SCSS 모듈 파일
2. **반응형 디자인**: 다양한 화면 크기에 대응하는 미디어 쿼리 사용
3. **테마**: 기본 라이트 테마와 랜딩 페이지용 다크 테마
4. **CSS 애니메이션**: 부드러운 전환 효과 및 인터랙티브 애니메이션

## 주요 UI/UX 요소

### BlendingMachine 및 BlendingWorkstation

블렌딩 기능은 좌우 분할 레이아웃으로 구현되어 있습니다:

- **왼쪽 영역(672px)**: 커피 머신 이미지, "Create Coffee" 버튼, 선택된 원두 정보
- **오른쪽 영역(646px)**: 원두 선택 목록

선택된 원두는 노란색(#FFD700) 카드로 표시되며, 비율 조절 버튼(보라색 #B09EFF)을 통해 블렌드 비율을 조정할 수 있습니다.

### 피그마 디자인 참조

프로젝트는 피그마 디자인을 기반으로 구현되었습니다:
- Frame Name=Blend Default: 기본 블렌드 페이지 디자인
- Frame Name=When Click the Create Coffee: "Create Coffee" 버튼 클릭 후 화면 디자인

## 향후 개발 계획

### 1. 기능 확장
- 아카이브 기능 완성
- 사용자 계정 및 즐겨찾기 기능
- 커뮤니티 기능 (리뷰, 공유 등)

### 2. 디자인 개선
- 다크 모드 전체 지원
- 애니메이션 및 전환 효과 개선
- 접근성 향상

### 3. 성능 최적화
- 이미지 및 에셋 최적화
- 코드 스플리팅 및 지연 로딩
- 렌더링 성능 개선

## 실행 방법

### 개발 환경 설정
```bash
# 저장소 클론
git clone <repository_url>
cd coffee-explorer

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 빌드
```bash
npm run build
```

## 주의 사항

1. 일부 이미지 및 사운드 에셋이 필요합니다. 다음 경로에 추가해야 합니다:
   - 맛/향 이미지: `/src/assets/images/elements/`
   - 원산지 이미지: `/src/assets/images/regions/`
   - 원두 이미지: `/public/images/coffee-beans/`
   - 사운드 효과: `/src/assets/sounds/`

2. Univers Next Pro 폰트가 필요합니다. `/public/fonts/` 경로에 폰트 파일을 추가하세요.

## 마무리

Coffee Explorer 프로젝트는 커피 애호가들을 위한 시각적으로 매력적인 웹 애플리케이션입니다. 직관적인 UI/UX 디자인, 인터랙티브한 블렌딩 기능, 그리고 세련된 애니메이션을 통해 사용자들에게 즐거운 경험을 제공합니다. 앞으로의 개발을 통해 더 많은 기능과 개선된 사용자 경험을 제공할 계획입니다.