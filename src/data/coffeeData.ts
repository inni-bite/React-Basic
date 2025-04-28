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

export const coffeeBeans: CoffeeBean[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Ethiopia Yirgacheffe',
    koreanName: '에티오피아 예르가체프',
    origin: 'Ethiopia',
    koreanOrigin: '에티오피아',
    altitude: '1,750 - 2,200m',
    process: 'Washed',
    koreanProcess: '워시드',
    roastLevel: 'light',
    koreanRoastLevel: '라이트 로스팅',
    flavor: ['Citrus', 'Bergamot', 'Floral', 'Lemon'],
    koreanFlavor: ['시트러스', '베르가못', '플로럴', '레몬'],
    aroma: ['Floral', 'Citrus', 'Tea-like'],
    koreanAroma: ['꽃 향기', '시트러스', '차 향기'],
    acidity: 8,
    body: 5,
    sweetness: 7,
    bitterness: 3,
    description: 'A bright and complex coffee from the birthplace of coffee. Yirgacheffe beans are known for their distinctive floral and citrus notes with a clean, tea-like body. The high altitude and unique terroir of the region contribute to its exceptional cup quality.',
    koreanDescription: '커피의 발상지에서 온 밝고 복합적인 커피입니다. 예르가체프 원두는 독특한 꽃향기와 시트러스 노트, 깔끔한 차와 같은 바디감으로 유명합니다. 고지대와 이 지역 특유의 떼루아가 뛰어난 커피 품질에 기여합니다.',
    memoStyle: '햇살이 가득한 화창한 아침, 첫 모금에서 느껴지는 은은한 꽃향기와 함께 밝은 시트러스 산미가 입 안에서 춤을 춥니다. 마지막에 느껴지는 깔끔한 홍차의 여운까지, 커피가 아닌 꽃차를 마시는 듯한 착각이 듭니다.',
    visualElements: [
      {
        type: 'stone',
        image: '/src/assets/images/elements/citrus-stone.jpg',
        name: '시트러스 스톤',
        description: '밝은 황색과 오렌지색 반점이 있는 돌로, 예르가체프의 상큼한 감귤향을 표현'
      },
      {
        type: 'texture',
        image: '/src/assets/images/elements/floral-texture.jpg',
        name: '꽃잎 텍스쳐',
        description: '부드러운 꽃잎 질감으로 예르가체프의 플로럴한 특성을 표현'
      }
    ],
    regionImage: '/src/assets/images/regions/ethiopia.jpg',
    recommendFor: '상큼한 신맛을 좋아하는 분, 차 향기가 나는 부드러운 커피를 즐기는 분, 블랙으로 커피의 깔끔한 맛을 경험하고 싶은 분께 추천합니다.',
    brewingMethods: ['Pour Over', 'Aeropress', 'Drip'],
    koreanBrewingMethods: ['핸드드립', '에어로프레스', '드립'],
  },
  {
    id: 'colombia-supremo',
    name: 'Colombia Supremo',
    koreanName: '콜롬비아 수프리모',
    origin: 'Colombia',
    koreanOrigin: '콜롬비아',
    altitude: '1,300 - 1,800m',
    process: 'Washed',
    koreanProcess: '워시드',
    roastLevel: 'medium',
    koreanRoastLevel: '미디엄 로스팅',
    flavor: ['Caramel', 'Apple', 'Nutty', 'Chocolate'],
    koreanFlavor: ['카라멜', '사과', '고소함', '초콜릿'],
    aroma: ['Sweet', 'Fruity', 'Nutty'],
    koreanAroma: ['달콤함', '과일향', '견과류'],
    acidity: 6,
    body: 7,
    sweetness: 7,
    bitterness: 4,
    description: 'A well-balanced coffee with a rich caramel sweetness and subtle fruity notes. Colombia Supremo is characterized by its consistent quality and versatility. The beans are large, with a smooth flavor profile that appeals to a wide range of coffee drinkers.',
    koreanDescription: '풍부한 카라멜 단맛과 은은한 과일향이 조화로운 균형 잡힌 커피입니다. 콜롬비아 수프리모는 일관된 품질과 다재다능함이 특징입니다. 큰 원두 크기와 부드러운 맛 프로필로 다양한 커피 애호가들에게 사랑받습니다.',
    memoStyle: '아침 식사 후 즐기는 디저트 같은 한 잔. 입 안을 가득 채우는 부드러운 카라멜 향과 살짝 씹히는 견과류의 고소함이 조화롭게 어우러집니다. 마지막에 느껴지는 사과같은 과일의 산미가 전체적인 맛의 균형을 완성합니다.',
    visualElements: [
      {
        type: 'stone',
        image: '/src/assets/images/elements/caramel-stone.jpg',
        name: '카라멜 스톤',
        description: '황금빛 갈색의 매끄러운 돌로, 콜롬비아 수프리모의 달콤한 카라멜 풍미를 표현'
      },
      {
        type: 'texture',
        image: '/src/assets/images/elements/nutty-texture.jpg',
        name: '견과류 텍스쳐',
        description: '고소한 견과류의 질감으로 수프리모의 균형 잡힌 맛을 표현'
      }
    ],
    regionImage: '/src/assets/images/regions/colombia.jpg',
    recommendFor: '균형 잡힌 맛을 좋아하는 분, 달콤하면서도 깔끔한 커피를 찾는 분, 우유를 넣어도 맛있게 즐기고 싶은 분께 추천합니다.',
    brewingMethods: ['Espresso', 'French Press', 'Drip', 'Pour Over'],
    koreanBrewingMethods: ['에스프레소', '프렌치프레스', '드립', '핸드드립'],
  },
  {
    id: 'sumatra-mandheling',
    name: 'Sumatra Mandheling',
    koreanName: '수마트라 만델링',
    origin: 'Indonesia',
    koreanOrigin: '인도네시아',
    altitude: '900 - 1,500m',
    process: 'Wet-Hulled',
    koreanProcess: '웻-헐드',
    roastLevel: 'dark',
    koreanRoastLevel: '다크 로스팅',
    flavor: ['Earthy', 'Herbal', 'Spice', 'Dark Chocolate'],
    koreanFlavor: ['흙내음', '허브향', '스파이시', '다크 초콜릿'],
    aroma: ['Earthy', 'Woody', 'Spicy'],
    koreanAroma: ['흙내음', '나무향', '스파이시'],
    acidity: 3,
    body: 9,
    sweetness: 5,
    bitterness: 7,
    description: 'A rich, full-bodied coffee with distinctive earthy tones and a complex flavor profile. Sumatra Mandheling undergoes a unique wet-hulling process that contributes to its deep, rustic character. These beans produce a coffee with low acidity and a smooth, almost syrupy mouthfeel.',
    koreanDescription: '독특한 흙내음과 복합적인 맛 프로필을 가진 풍부하고 무게감 있는 커피입니다. 수마트라 만델링은 특유의 웻-헐드 가공 방식으로 깊고 소박한 특성을 갖게 됩니다. 이 원두로 만든 커피는 산미가 적고 부드럽고 시럽 같은 질감이 특징입니다.',
    memoStyle: '깊은 숲속 오두막에서 피어오르는 모닥불 향기처럼 진하고 강렬합니다. 첫 모금에서 느껴지는 스모키한 흙내음과 다크 초콜릿의 쌉싸름함이 입 안을 감싸고, 은은한 허브와 스파이스의 뒷맛이 여운을 남깁니다. 묵직한 바디감은 마치 따뜻한 담요처럼 온몸을 감싸줍니다.',
    visualElements: [
      {
        type: 'stone',
        image: '/src/assets/images/elements/earth-stone.jpg',
        name: '어스 스톤',
        description: '어두운 갈색과 검은색 무늬가 있는 돌로, 만델링의 흙내음과 깊은 맛을 표현'
      },
      {
        type: 'texture',
        image: '/src/assets/images/elements/chocolate-texture.jpg',
        name: '다크 초콜릿 텍스쳐',
        description: '풍부한 다크 초콜릿 질감으로 만델링의 무게감 있는 바디를 표현'
      }
    ],
    regionImage: '/src/assets/images/regions/indonesia.jpg',
    recommendFor: '진하고 묵직한 커피를 좋아하는 분, 흙내음과 스모키한 향을 즐기는 분, 우유와 설탕을 넣어도 커피 맛이 살아있길 원하는 분께 추천합니다.',
    brewingMethods: ['French Press', 'Espresso', 'Cold Brew'],
    koreanBrewingMethods: ['프렌치프레스', '에스프레소', '콜드브루'],
  },
  {
    id: 'brazil-santos',
    name: 'Brazil Santos',
    koreanName: '브라질 산토스',
    origin: 'Brazil',
    koreanOrigin: '브라질',
    altitude: '800 - 1,200m',
    process: 'Natural',
    koreanProcess: '내추럴',
    roastLevel: 'medium',
    koreanRoastLevel: '미디엄 로스팅',
    flavor: ['Nutty', 'Milk Chocolate', 'Almond', 'Caramel'],
    koreanFlavor: ['고소함', '밀크 초콜릿', '아몬드', '카라멜'],
    aroma: ['Sweet', 'Nutty', 'Chocolate'],
    koreanAroma: ['달콤함', '고소함', '초콜릿'],
    acidity: 4,
    body: 6,
    sweetness: 7,
    bitterness: 5,
    description: 'A classic Brazilian coffee with a sweet, nutty flavor profile and smooth, mild acidity. Brazil Santos is the backbone of many espresso blends due to its consistent quality and well-rounded flavor. The natural processing brings out its inherent sweetness and chocolatey notes.',
    koreanDescription: '달콤하고 고소한 맛과 부드럽고 적당한 산미를 가진 클래식한 브라질 커피입니다. 브라질 산토스는 일관된 품질과 균형 잡힌 맛으로 많은 에스프레소 블렌드의 기초가 됩니다. 내추럴 가공 방식으로 원두 본연의 단맛과 초콜릿 풍미가 잘 드러납니다.',
    memoStyle: '아침에 눈을 뜨자마자 생각나는 첫 잔의 커피. 달콤한 밀크 초콜릿 같은 풍미와 고소한 아몬드의 맛이 완벽하게 어우러집니다. 부담 없는 산미와 적당한 바디감은 하루를 시작하는 활력이 되어줍니다. 어떤 방식으로 내려도 실패 없는 안정감이 매력적입니다.',
    visualElements: [
      {
        type: 'stone',
        image: '/src/assets/images/elements/nutty-stone.jpg',
        name: '넛티 스톤',
        description: '황토색과 베이지색이 섞인 돌로, 산토스의 고소하고 달콤한 맛을 표현'
      },
      {
        type: 'texture',
        image: '/src/assets/images/elements/milk-chocolate-texture.jpg',
        name: '밀크 초콜릿 텍스쳐',
        description: '부드러운 밀크 초콜릿 질감으로 산토스의 달콤함을 표현'
      }
    ],
    regionImage: '/src/assets/images/regions/brazil.jpg',
    recommendFor: '부담 없이 즐길 수 있는 커피를 찾는 분, 고소하고 달콤한 맛을 좋아하는 분, 에스프레소나 우유와 함께 마시는 커피를 즐기는 분께 추천합니다.',
    brewingMethods: ['Espresso', 'French Press', 'Moka Pot', 'Drip'],
    koreanBrewingMethods: ['에스프레소', '프렌치프레스', '모카포트', '드립'],
  }
];

export default coffeeBeans;