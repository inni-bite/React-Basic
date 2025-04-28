# Coffee-Explorer 2단계 개발 가이드

## 1. 프로젝트 개요

Coffee-Explorer는 세계 각국의 커피 원두 정보 탐색과 나만의 블렌드를 만들 수 있는 인터랙티브 웹 애플리케이션입니다. 1단계에서는 기본적인 원두 탐색 기능을 구현했으며, 2단계에서는 커피 블렌딩 기능을 추가했습니다.

### 핵심 컨셉
- 커피 머신 인터랙션을 통한 원두 탐색
- 나만의 블렌드 제작을 위한 블렌딩 워크스테이션
- 가챠 스타일의 블렌드 결과 도출 (일본 오락실 요소 착안)
- 시각적이고 감각적인 맛 표현 (앤트러사이트 스타일)
- 메모 형식의 감성적 맛 설명 (나무사이로 스타일)
- 블렌드 비교 기능 (최대 2개)

## 2. 기술 스택

- **프론트엔드**: React, TypeScript
- **스타일링**: SCSS 모듈
- **상태 관리**: Jotai
- **애니메이션**: CSS 애니메이션
- **사운드 처리**: Howler.js
- **번들러**: Vite

## 3. 핵심 기능 및 구현 상태

### 3.1 원두 탐색 기능 (1단계 구현 완료)
- SVG 기반 커피 머신 디자인
- 그라인딩 애니메이션 및 사운드 효과
- 원두 상세 정보 모달

### 3.2 블렌딩 기능 (2단계 구현 완료)
- 블렌드 데이터 모델 및 계산 알고리즘
- 워크스테이션 인터페이스
- 블렌드 결과 시각화
- 가챠 스타일 결과 도출 애니메이션
- 블렌드 비교 기능 (최대 2개)
- 블렌딩 팁 시스템

## 4. 프로젝트 구조

```
coffee-explorer/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── elements/     # 맛/향 시각화 이미지
│   │   │   └── regions/      # 원산지 이미지
│   │   ├── sounds/           # 오디오 파일 (그라인딩, 블렌딩 등)
│   │   └── styles/           # 글로벌 스타일
│   ├── components/
│   │   ├── CoffeeMachine/    # 원두 탐색용 커피 머신 컴포넌트
│   │   ├── CoffeeSelector/   # 원두 선택 그리드
│   │   ├── CoffeeDetails/    # 원두 상세 정보 모달
│   │   ├── BlendingMachine/  # 블렌드 탐색용 커피 머신 컴포넌트
│   │   ├── BlendingWorkstation/ # 블렌드 제작 인터페이스
│   │   ├── BlendResult/      # 블렌드 결과 표시 모달
│   │   ├── BlendCompare/     # 블렌드 비교 화면
│   │   ├── TasteVisualizer/  # 맛/향 시각화 컴포넌트
│   │   └── MemoStyleNotes/   # 메모 스타일 컴포넌트
│   ├── data/
│   │   ├── coffeeData.ts     # 원두 데이터
│   │   └── blendData.ts      # 블렌드 관련 함수 및 인터페이스
│   ├── jotai/
│   │   └── atoms/            # 전역 상태 관리
│   │       ├── coffeeAtoms.ts # 원두 관련 상태
│   │       └── blendAtoms.ts  # 블렌드 관련 상태
│   ├── utilities/
│   │   └── soundManager.ts   # 사운드 관리
│   ├── App.tsx
│   └── main.tsx
└── ...
```

## 5. 데이터 모델

### 5.1 커피 빈(CoffeeBean) 인터페이스
```typescript
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

### 5.2 블렌드 관련 인터페이스

```typescript
// 블렌드 구성 요소
export interface BlendComponent {
  beanId: string;
  ratio: number; // 퍼센트(%)
}

// 블렌드 결과
export interface CoffeeBlend {
  id: string;
  name: string;
  components: BlendComponent[];
  // 계산된 특성
  calculatedFlavor: string[];
  calculatedAroma: string[];
  calculatedAcidity: number;
  calculatedBody: number;
  calculatedSweetness: number;
  calculatedBitterness: number;
  // 시각 요소
  visualElements: VisualElement[];
  // 블렌드 노트
  memoStyle: string;
}
```

## 6. 주요 컴포넌트

### 6.1 원두 탐색 관련 컴포넌트

#### 6.1.1 CoffeeMachine
- 커피 머신 인터랙티브 SVG 컴포넌트
- 그라인딩 애니메이션 및 사용자 인터랙션 처리
- 원두 탐색 시작 진입점

#### 6.1.2 CoffeeSelector
- 그리드 형태로 원두 카드를 표시
- 필터링 기능 제공
- 원두 선택 및 상세 정보 표시 트리거

#### 6.1.3 CoffeeDetails
- 선택된 원두의 상세 정보를 모달 형태로 표시
- 맛과 향 프로필, 특성 점수 시각화
- 메모 스타일의 맛 설명 표현

### 6.2 블렌딩 관련 컴포넌트

#### 6.2.1 BlendingMachine
- 블렌딩 전용 커피 머신 SVG 컴포넌트
- 두 개의 그라인더와 블렌딩 애니메이션
- 블렌딩 워크스테이션 진입점

#### 6.2.2 BlendingWorkstation
- 원두 선택 및 블렌딩 비율 설정 인터페이스
- 최대 4개 원두까지 블렌드 가능
- 비율 자동 조정 기능

#### 6.2.3 BlendResult
- 블렌드 결과를 모달 형태로 표시
- 계산된 맛 프로필 시각화
- 블렌드 저장, 비교, 재시도 기능

#### 6.2.4 BlendCompare
- 두 블렌드의 특성을 나란히 비교
- 차이점 하이라이트 표시
- 선택한 블렌드로 계속하기 기능

### 6.3 공통 컴포넌트

#### 6.3.1 TasteVisualizer
- 맛과 향을 시각적 요소로 표현
- 원두 또는 블렌드의 특성에 맞는 이미지 렌더링

#### 6.3.2 MemoStyleNotes
- 나무사이로 스타일의 메모형 맛 설명 표시
- 감성적인 텍스트 레이아웃

## 7. 상태 관리 (Jotai)

### 7.1 원두 관련 상태 (coffeeAtoms.ts)
- `selectedCoffeeAtom`: 현재 선택된 커피 빈
- `showCoffeeDetailsAtom`: 커피 상세 정보 표시 여부
- `isGrindingSoundPlayingAtom`: 그라인딩 사운드 재생 상태

### 7.2 블렌드 관련 상태 (blendAtoms.ts)
- `blendingComponentsAtom`: 현재 블렌딩 작업 중인 컴포넌트 목록
- `showBlendingWorkstationAtom`: 블렌딩 워크스테이션 표시 여부
- `showBlendResultAtom`: 블렌딩 결과 표시 여부
- `blendResultAtom`: 블렌딩 결과
- `savedBlendsAtom`: 저장된 블렌드 목록
- `comparingBlendsAtom`: 비교 중인 블렌드들 (최대 2개)
- `showBlendCompareAtom`: 블렌드 비교 모달 표시 여부
- `blendAnimationStateAtom`: 블렌드 결과 애니메이션 상태

## 8. 블렌드 알고리즘

블렌드 계산은 `blendData.ts`의 `calculateBlendProfile` 함수에서 처리됩니다:

- 각 원두의 특성(산미, 바디감, 단맛, 쓴맛)을 비율에 따라 계산
- 맛과 향은 비율과 빈도수에 기반하여 통합
- 가챠 요소: 약간의 무작위성 추가 (5% 변동)
- 시각적 요소는 가중치가 높은 순으로 최대 2개 선택
- 블렌드 메모는 결과 특성에 따라 자동 생성

## 9. 사운드 매니저

`soundManager.ts`는 Howler.js를 사용하여 다양한 사운드 효과를 관리합니다:
- 그라인딩 사운드
- 블렌딩 사운드
- 완료 사운드
- 가챠 효과 사운드

## 10. 구현 상세 및 주요 기능

### 10.1 탭 네비게이션
앱은 두 개의 메인 탭으로 구성되어 있습니다:
- **원두 탐색**: 싱글 오리진 커피 정보 탐색
- **나만의 블렌드**: 블렌딩 워크스테이션 및 블렌드 기능

### 10.2 블렌딩 워크스테이션
- 원두 선택 영역: 전체 원두 목록에서 블렌딩할 원두 선택
- 선택된 원두 섹션: 선택한 원두의 비율 조정
- 총 비율 표시: 100%가 되어야 블렌드 생성 가능
- 자동 조정 기능: 총 비율을 자동으로 100%에 맞게 조정

### 10.3 블렌드 결과 표시
- 계산된 맛 프로필 시각화
- 통계 바 애니메이션 효과
- 시각적 요소 표현
- 메모 스타일 맛 설명
- 블렌드 구성 정보
- 블렌딩 팁 제공

### 10.4 블렌드 비교 기능
- 최대 2개 블렌드 나란히 비교
- 특성 차이 하이라이트
- 각 블렌드로 계속하기 옵션
- 새 블렌드 생성 옵션

### 10.5 애니메이션 및 가챠 요소
- 그라인딩 애니메이션
- 블렌딩 펄스 애니메이션
- 가챠 스타일 완료 효과
- 결과 통계 바 애니메이션

## 11. TO-DO 리스트 (3단계 개발)

### 11.1 에셋 추가
- [ ] 시각 요소용 이미지 추가 및 최적화
- [ ] 더 다양한 오디오 효과 추가
- [ ] 애니메이션 세부 조정

### 11.2 기능 확장
- [ ] 저장된 블렌드 목록 관리 인터페이스
- [ ] 블렌드 공유 기능
- [ ] 블렌드 평가 시스템
- [ ] 더 복잡한 블렌딩 알고리즘 (특별 조합 효과 추가)

### 11.3 사용자 경험 개선
- [ ] 더 다양한 디바이스 대응 반응형 최적화
- [ ] 다크 모드 지원
- [ ] 접근성 개선 (키보드 네비게이션, 스크린 리더 지원)
- [ ] 초보자를 위한 블렌딩 가이드

### 11.4 데이터 및 콘텐츠 확장
- [ ] 더 많은 원두 데이터 추가
- [ ] 원두 정보 업데이트 시스템
- [ ] 사용자 커스텀 원두 추가 기능
- [ ] 커피 관련 지식 콘텐츠 추가

### 11.5 성능 최적화
- [ ] 이미지 및 사운드 리소스 최적화
- [ ] 코드 스플리팅 및 지연 로딩
- [ ] 상태 관리 효율화

## 12. 실행 방법

프로젝트 디렉토리로 이동하여 다음 명령어 실행:
```bash
# 종속성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 13. 참고 사항

### 13.1 블렌딩 알고리즘 확장 가능성
현재 블렌딩 알고리즘은 기본적인 선형 계산을 사용합니다. 향후 비선형적인 상호작용이나 특별 조합 효과를 추가할 수 있습니다.

### 13.2 에셋 관리
필요한 이미지와 사운드 파일은 각각 다음 경로에 추가해야 합니다:
- 맛/향 이미지: `/src/assets/images/elements/`
- 원산지 이미지: `/src/assets/images/regions/`
- 사운드: `/src/assets/sounds/`

### 13.3 블렌드 저장 시스템
현재는 애플리케이션 메모리에만 블렌드가 저장됩니다. 향후 개발에서는 영구 저장소(로컬 스토리지 또는 백엔드 데이터베이스)를 고려해야 합니다.

## 14. 결론

Coffee-Explorer의 2단계 개발을 통해 원두 탐색에서 나아가 사용자가 직접 블렌드를 제작하고 비교할 수 있는 기능을 구현했습니다. 가챠 스타일 요소와 직관적인 UI/UX는 사용자들에게 재미와 교육적 가치를 동시에 제공합니다. 앞으로 3단계 개발에서는 저장 시스템 확장, 사용자 커스터마이징 옵션, 그리고 더 복잡한 블렌딩 알고리즘을 통해 애플리케이션을 더욱 풍부하게 만들 예정입니다.