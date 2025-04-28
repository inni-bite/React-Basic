import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { 
  blendingComponentsAtom, 
  showBlendingWorkstationAtom, 
  showBlendResultAtom,
  blendResultAtom,
  blendAnimationStateAtom
} from '../../jotai/atoms/blendAtoms';
import { CoffeeBean } from '../../data/coffeeData';
import { BlendComponent, calculateBlendProfile } from '../../data/blendData';
import coffeeBeans from '../../data/coffeeData';
import styles from './BlendingWorkstation.module.scss';

const BlendingWorkstation: React.FC = () => {
  const [blendingComponents, setBlendingComponents] = useAtom(blendingComponentsAtom);
  const [, setShowBlendingWorkstation] = useAtom(showBlendingWorkstationAtom);
  const [, setShowBlendResult] = useAtom(showBlendResultAtom);
  const [, setBlendResult] = useAtom(blendResultAtom);
  const [, setBlendAnimationState] = useAtom(blendAnimationStateAtom);
  
  // 선택된 원두 ID 목록 (UI 관리용)
  const [selectedBeanIds, setSelectedBeanIds] = useState<string[]>([]);
  
  // 총 비율 계산
  const totalRatio = blendingComponents.reduce((sum, comp) => sum + comp.ratio, 0);
  const isRatioValid = totalRatio === 100;
  
  // 원두 선택 핸들러
  const handleBeanSelect = (bean: CoffeeBean) => {
    if (selectedBeanIds.includes(bean.id)) {
      // 이미 선택된 원두인 경우 제거
      setSelectedBeanIds(selectedBeanIds.filter(id => id !== bean.id));
      setBlendingComponents(blendingComponents.filter(comp => comp.beanId !== bean.id));
    } else {
      // 새 원두 추가 (최대 4개까지)
      if (selectedBeanIds.length < 4) {
        setSelectedBeanIds([...selectedBeanIds, bean.id]);
        
        // 기존 비율에 따라 새 원두의 비율 계산
        const newRatio = Math.max(5, Math.min(100, Math.floor((100 - totalRatio) / (selectedBeanIds.length + 1))));
        
        // 비율 조정
        const adjustedComponents = [...blendingComponents];
        
        if (totalRatio + newRatio > 100) {
          // 비율 합이 100을 초과할 경우 기존 원두들의 비율 감소
          const excess = totalRatio + newRatio - 100;
          const reduction = Math.ceil(excess / adjustedComponents.length);
          
          adjustedComponents.forEach(comp => {
            comp.ratio = Math.max(5, comp.ratio - reduction);
          });
        }
        
        // 새 원두 추가
        setBlendingComponents([
          ...adjustedComponents,
          { beanId: bean.id, ratio: newRatio }
        ]);
      }
    }
  };
  
  // 비율 조정 핸들러
  const handleRatioChange = (beanId: string, change: number) => {
    const newComponents = blendingComponents.map(comp => {
      if (comp.beanId === beanId) {
        return { ...comp, ratio: Math.max(5, Math.min(100, comp.ratio + change)) };
      }
      return comp;
    });
    
    setBlendingComponents(newComponents);
  };
  
  // 원두 제거 핸들러
  const handleRemoveBean = (beanId: string) => {
    setSelectedBeanIds(selectedBeanIds.filter(id => id !== beanId));
    setBlendingComponents(blendingComponents.filter(comp => comp.beanId !== beanId));
  };
  
  // 블렌드 생성 핸들러
  const handleCreateBlend = () => {
    if (!isRatioValid || blendingComponents.length === 0) return;
    
    // 블렌딩 애니메이션 시작
    setBlendAnimationState('processing');
    
    // 블렌드 결과 계산
    const blendProfile = calculateBlendProfile(blendingComponents, coffeeBeans);
    
    // 시간차를 두고 결과 표시 (가챠 효과)
    setTimeout(() => {
      // 새 블렌드 ID 생성 (타임스탬프)
      const newBlendId = `blend-${Date.now()}`;
      
      // 블렌드 이름 생성
      const beanNames = blendingComponents
        .sort((a, b) => b.ratio - a.ratio)
        .map(comp => {
          const bean = coffeeBeans.find(b => b.id === comp.beanId);
          return bean ? bean.name.split(' ')[0] : '';
        })
        .filter(Boolean)
        .slice(0, 2);
      
      const blendName = beanNames.length > 1 
        ? `${beanNames.join(' & ')} Blend`
        : `${beanNames[0]} Blend`;
        
      // 블렌드 결과 저장
      const newBlend = {
        id: newBlendId,
        name: blendName,
        components: [...blendingComponents],
        ...blendProfile
      };
      
      setBlendResult(newBlend);
      setBlendAnimationState('complete');
      
      // 워크스테이션 닫고 결과 표시
      setTimeout(() => {
        setShowBlendingWorkstation(false);
        setShowBlendResult(true);
      }, 500);
    }, 2000); // 2초 지연 (가챠 효과)
  };
  
  // 작업 취소 및 창 닫기
  const handleClose = () => {
    setShowBlendingWorkstation(false);
  };
  
  // 비율 자동 조정 (100%에 맞추기)
  const adjustRatiosTo100 = () => {
    if (blendingComponents.length === 0) return;
    
    // 100%에서 얼마나 차이가 나는지 계산
    const diff = 100 - totalRatio;
    
    if (diff === 0) return; // 이미 100%면 조정 필요 없음
    
    const newComponents = [...blendingComponents];
    
    if (diff > 0) {
      // 비율 합이 100%보다 작을 때: 비율이 가장 큰 원두에 추가
      const maxRatioComp = newComponents.reduce((prev, curr) => 
        prev.ratio > curr.ratio ? prev : curr
      );
      
      const index = newComponents.findIndex(comp => comp.beanId === maxRatioComp.beanId);
      newComponents[index].ratio += diff;
    } else {
      // 비율 합이 100%보다 클 때: 비율이 가장 큰 원두에서 차감
      const maxRatioComp = newComponents.reduce((prev, curr) => 
        prev.ratio > curr.ratio ? prev : curr
      );
      
      const index = newComponents.findIndex(comp => comp.beanId === maxRatioComp.beanId);
      newComponents[index].ratio = Math.max(5, newComponents[index].ratio + diff);
    }
    
    setBlendingComponents(newComponents);
  };
  
  // 비율이 100%가 아닐 때 자동 조정 버튼 표시 여부
  const showAdjustButton = totalRatio !== 100 && blendingComponents.length > 0;
  
  // 비율이 변경될 때마다 자동 조정 전 사용자에게 확인
  useEffect(() => {
    const timer = setTimeout(() => {
      if (blendingComponents.length > 0 && totalRatio !== 100) {
        // 자동 조정 버튼만 표시하고 사용자가 클릭하면 조정
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [totalRatio, blendingComponents]);
  
  return (
    <div className={styles.blendingWorkstation}>
      <button className={styles.closeButton} onClick={handleClose}>×</button>
      
      <h2>나만의 커피 블렌딩</h2>
      
      <div className={styles.beanSelectionArea}>
        {coffeeBeans.map(bean => (
          <div
            key={bean.id}
            className={`${styles.beanCard} ${selectedBeanIds.includes(bean.id) ? styles.selected : ''}`}
            onClick={() => handleBeanSelect(bean)}
          >
            <h4>{bean.koreanName}</h4>
            <p>{bean.koreanOrigin}</p>
            <div 
              className={`${styles.roastLevel} ${
                bean.roastLevel === 'light' ? styles.light :
                bean.roastLevel === 'medium' ? styles.medium :
                bean.roastLevel === 'medium-dark' ? styles.mediumDark :
                styles.dark
              }`}
            >
              {bean.koreanRoastLevel}
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.blendingArea}>
        <div className={styles.selectedBeansSection}>
          <h3>선택한 원두</h3>
          
          {blendingComponents.length === 0 ? (
            <div className={styles.noBeansSelected}>
              블렌딩할 원두를 선택해주세요 (최대 4개)
            </div>
          ) : (
            <>
              <div className={styles.selectedBeansList}>
                {blendingComponents.map(comp => {
                  const bean = coffeeBeans.find(b => b.id === comp.beanId);
                  if (!bean) return null;
                  
                  return (
                    <div key={comp.beanId} className={styles.selectedBeanItem}>
                      <div className={styles.beanInfo}>
                        <h4>{bean.koreanName}</h4>
                        <p>{bean.koreanOrigin} | {bean.koreanRoastLevel}</p>
                      </div>
                      
                      <div className={styles.ratioControl}>
                        <button onClick={() => handleRatioChange(comp.beanId, -5)}>-</button>
                        <span>{comp.ratio}%</span>
                        <button onClick={() => handleRatioChange(comp.beanId, 5)}>+</button>
                      </div>
                      
                      <button 
                        className={styles.removeButton}
                        onClick={() => handleRemoveBean(comp.beanId)}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
              
              <div className={`${styles.totalRatio} ${!isRatioValid ? styles.error : ''}`}>
                총 비율: {totalRatio}%
                {!isRatioValid && <span> (100%가 되어야 합니다)</span>}
                {showAdjustButton && (
                  <button 
                    onClick={adjustRatiosTo100}
                    style={{ marginLeft: '10px', fontSize: '0.8rem' }}
                  >
                    자동 조정
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className={styles.createBlendSection}>
          <button 
            disabled={!isRatioValid || blendingComponents.length === 0}
            onClick={handleCreateBlend}
          >
            블렌드 만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlendingWorkstation;