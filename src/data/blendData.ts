import { CoffeeBean } from './coffeeData';

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
  visualElements: {
    type: string;
    image: string;
    name: string;
    description: string;
  }[];
  // 블렌드 노트
  memoStyle: string;
}

// 블렌드 팁 생성
export const getBlendingTips = (components: BlendComponent[], allBeans: CoffeeBean[]): string[] => {
  const tips: string[] = [];
  
  // 사용된 원두의 특성 분석
  const highAcidityBeans = components.filter(c => {
    const bean = allBeans.find(b => b.id === c.beanId);
    return bean?.acidity > 7;
  });
  
  const darkRoastBeans = components.filter(c => {
    const bean = allBeans.find(b => b.id === c.beanId);
    return bean?.roastLevel === 'dark' || bean?.roastLevel === 'medium-dark';
  });
  
  // 팁 생성
  if (highAcidityBeans.length > 0 && highAcidityBeans.length === components.length) {
    tips.push("모든 원두가 산미가 높습니다. 좀 더 균형 잡힌 맛을 위해 중배전이나 진한 배전의 원두를 추가해보세요.");
  }
  
  if (darkRoastBeans.length > 0 && darkRoastBeans.length === components.length) {
    tips.push("어두운 로스팅 원두만 사용했습니다. 밝은 로스팅 원두를 추가하면 더 다양한 풍미를 경험할 수 있습니다.");
  }
  
  // 비율 관련 팁
  const ratios = components.map(c => c.ratio);
  const maxRatio = Math.max(...ratios);
  if (maxRatio > 70) {
    tips.push("한 원두의 비율이 매우 높습니다. 다양한 맛을 경험하려면 원두 간의 비율을 좀 더 균등하게 조정해보세요.");
  }
  
  return tips;
};

// 블렌드 계산 함수
export const calculateBlendProfile = (components: BlendComponent[], allBeans: CoffeeBean[]): Omit<CoffeeBlend, 'id' | 'name' | 'components'> => {
  // 각 원두의 특성을 비율에 따라 계산
  const profile = {
    calculatedFlavor: [] as string[],
    calculatedAroma: [] as string[],
    calculatedAcidity: 0,
    calculatedBody: 0,
    calculatedSweetness: 0,
    calculatedBitterness: 0,
    memoStyle: '',
    visualElements: [] as {
      type: string;
      image: string;
      name: string;
      description: string;
    }[],
  };
  
  // 비율의 합이 0인 경우 처리
  const totalRatio = components.reduce((sum, comp) => sum + comp.ratio, 0);
  if (totalRatio === 0) {
    return profile;
  }
  
  // 맛과 향을 저장할 세트
  const flavorSet = new Set<string>();
  const aromaSet = new Set<string>();
  const visualElementsMap = new Map<string, {
    type: string;
    image: string;
    name: string;
    description: string;
    weight: number;
  }>();
  
  // 비율에 따른 기본 특성 계산
  components.forEach(comp => {
    const bean = allBeans.find(b => b.id === comp.beanId);
    if (!bean) return;
    
    const ratio = comp.ratio / totalRatio; // 정규화된 비율
    
    profile.calculatedAcidity += bean.acidity * ratio;
    profile.calculatedBody += bean.body * ratio;
    profile.calculatedSweetness += bean.sweetness * ratio;
    profile.calculatedBitterness += bean.bitterness * ratio;
    
    // 맛과 향은 빈도수와 비율을 고려하여 통합
    bean.flavor.forEach(f => {
      if (Math.random() < ratio) {
        flavorSet.add(f);
      }
    });
    
    bean.aroma.forEach(a => {
      if (Math.random() < ratio) {
        aromaSet.add(a);
      }
    });
    
    // 시각적 요소 통합
    bean.visualElements.forEach(ve => {
      const key = ve.type + '-' + ve.name;
      const existingElement = visualElementsMap.get(key);
      
      if (existingElement) {
        visualElementsMap.set(key, {
          ...existingElement,
          weight: existingElement.weight + ratio
        });
      } else {
        visualElementsMap.set(key, {
          ...ve,
          weight: ratio
        });
      }
    });
  });
  
  // 결과 프로필에 값 할당
  profile.calculatedFlavor = Array.from(flavorSet);
  profile.calculatedAroma = Array.from(aromaSet);
  
  // 메모 스타일 생성
  profile.memoStyle = generateBlendMemo(
    profile.calculatedFlavor,
    profile.calculatedAroma,
    profile.calculatedAcidity,
    profile.calculatedBody,
    profile.calculatedSweetness,
    profile.calculatedBitterness
  );
  
  // 시각적 요소 선택 (가중치가 높은 순으로 최대 2개)
  const sortedVisualElements = Array.from(visualElementsMap.values())
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2)
    .map(({ type, image, name, description }) => ({ type, image, name, description }));
  
  profile.visualElements = sortedVisualElements;
  
  // 가챠 요소: 약간의 무작위성 추가 (5% 변동)
  profile.calculatedAcidity *= 0.95 + Math.random() * 0.1;
  profile.calculatedBody *= 0.95 + Math.random() * 0.1;
  profile.calculatedSweetness *= 0.95 + Math.random() * 0.1;
  profile.calculatedBitterness *= 0.95 + Math.random() * 0.1;
  
  // 값 범위 조정 (1-10 사이로)
  profile.calculatedAcidity = Math.max(1, Math.min(10, profile.calculatedAcidity));
  profile.calculatedBody = Math.max(1, Math.min(10, profile.calculatedBody));
  profile.calculatedSweetness = Math.max(1, Math.min(10, profile.calculatedSweetness));
  profile.calculatedBitterness = Math.max(1, Math.min(10, profile.calculatedBitterness));
  
  return profile;
};

// 블렌드 메모 생성 함수
const generateBlendMemo = (
  flavors: string[],
  aromas: string[],
  acidity: number,
  body: number,
  sweetness: number,
  bitterness: number
): string => {
  // 맛과 향 관련 설명 생성
  const flavorDesc = flavors.length > 0
    ? `${flavors.slice(0, 2).join('과 ')}의 맛이 어우러지는`
    : '은은한 맛이 특징인';
    
  const aromaDesc = aromas.length > 0
    ? `${aromas.slice(0, 2).join('과 ')} 향이 피어오르는`
    : '은은한 향기가 퍼지는';
  
  // 산미, 바디, 단맛, 쓴맛에 따른 표현 선택
  let acidityDesc = '';
  if (acidity > 7.5) {
    acidityDesc = '밝고 상쾌한 산미가 입안을 깨우는';
  } else if (acidity > 5) {
    acidityDesc = '적당한 산미가 균형을 이루는';
  } else {
    acidityDesc = '부드럽고 낮은 산미의';
  }
  
  let bodyDesc = '';
  if (body > 7.5) {
    bodyDesc = '묵직하고 풍부한 바디감이 특징인';
  } else if (body > 5) {
    bodyDesc = '균형 잡힌 미디엄 바디의';
  } else {
    bodyDesc = '가볍고 깔끔한 바디감의';
  }
  
  let tasteBalance = '';
  if (sweetness > bitterness + 2) {
    tasteBalance = '달콤함이 쓴맛보다 두드러지는';
  } else if (bitterness > sweetness + 2) {
    tasteBalance = '쌉쌀한 풍미가 특징적인';
  } else {
    tasteBalance = '달콤함과 쓴맛이 균형을 이루는';
  }
  
  // 최종 메모 조합
  const memoTemplates = [
    `${aromaDesc} 이 블렌드는 ${flavorDesc} 커피입니다. ${acidityDesc} 첫 모금과 ${bodyDesc} 중후함이 ${tasteBalance} 특별한 경험을 선사합니다.`,
    `아침의 여유를 위한 ${bodyDesc} 블렌드입니다. ${aromaDesc} 잔에서 ${flavorDesc} 풍미가 펼쳐지며, ${tasteBalance} 여운을 남깁니다.`,
    `${flavorDesc} 이 블렌드는 ${acidityDesc} 시작과 ${bodyDesc} 마무리가 인상적입니다. ${aromaDesc} 향기가 ${tasteBalance} 경험을 완성합니다.`
  ];
  
  // 무작위로 템플릿 선택
  const selectedTemplate = memoTemplates[Math.floor(Math.random() * memoTemplates.length)];
  
  return selectedTemplate;
};