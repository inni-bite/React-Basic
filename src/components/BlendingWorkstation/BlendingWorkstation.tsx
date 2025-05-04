import React, { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { 
  blendingComponentsAtom, 
  showBlendingWorkstationAtom, 
  showBlendResultAtom,
  blendResultAtom,
  blendAnimationStateAtom
} from '../../jotai/atoms/blendAtoms';
import { CoffeeBean } from '../../data/coffeeData';
import { calculateBlendProfile } from '../../data/blendData';
import coffeeBeans from '../../data/coffeeData';
import styles from './BlendingWorkstation.module.scss';

const BlendingWorkstation: React.FC = () => {
  const [blendingComponents, setBlendingComponents] = useAtom(blendingComponentsAtom);
  const setShowBlendingWorkstation = useSetAtom(showBlendingWorkstationAtom);
  const setShowBlendResult = useSetAtom(showBlendResultAtom);
  const setBlendResult = useSetAtom(blendResultAtom);
  const setBlendAnimationState = useSetAtom(blendAnimationStateAtom);
  
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
  
  // 모든 선택 초기화
  const handleReset = () => {
    setSelectedBeanIds([]);
    setBlendingComponents([]);
  };
  
  // 비율이 100%가 아닐 때 자동 조정 버튼 표시 여부
  const showAdjustButton = totalRatio !== 100 && blendingComponents.length > 0;
  
  // 원두 제거 핸들러
  const handleRemoveBean = (beanId: string) => {
    setSelectedBeanIds(selectedBeanIds.filter(id => id !== beanId));
    setBlendingComponents(blendingComponents.filter(comp => comp.beanId !== beanId));
  };
  
  // 작업 취소 및 창 닫기
  const handleClose = () => {
    setShowBlendingWorkstation(false);
  };
  
  return (
    <div className={styles.blendingWorkstation}>
      <div className={styles.container}>
        <div className={styles.resetButtonContainer}>
          <button className={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
          <button className={styles.closeButton} onClick={handleClose}>
            Close
          </button>
        </div>
        
        <div className={styles.selectedBeansSection}>
          {blendingComponents.length > 0 && (
            <div className={styles.selectedBeansList}>
              {blendingComponents.map(comp => {
                const bean = coffeeBeans.find(b => b.id === comp.beanId);
                if (!bean) return null;
                
                return (
                  <div key={comp.beanId} className={styles.selectedBeanItem}>
                    <div className={styles.beanInfo}>
                      <h4>{bean.name}</h4>
                      <p>{bean.origin}</p>
                      <p>{bean.roastLevel.charAt(0).toUpperCase() + bean.roastLevel.slice(1)} Roast</p>
                      <p>{bean.flavor.join(', ')}</p>
                    </div>
                    
                    <div className={styles.ratioControl}>
                      <button onClick={() => handleRatioChange(comp.beanId, -5)}>-</button>
                      <span>{comp.ratio}%</span>
                      <button onClick={() => handleRatioChange(comp.beanId, 5)}>+</button>
                      <button onClick={() => handleRemoveBean(comp.beanId)}>Remove</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* 총 비율 및 자동 조정 버튼 */}
          {blendingComponents.length > 0 && (
            <div className={styles.ratioContainer}>
              <p>총 비율 : {totalRatio}% (100%가 되어야 합니다)</p>
              {showAdjustButton && (
                <button className={styles.adjustButton} onClick={adjustRatiosTo100}>
                  자동 조정
                </button>
              )}
            </div>
          )}
          
          {/* 블렌드 버튼 */}
          <div className={styles.actionButtons}>
            <button 
              className={styles.blendButton}
              disabled={!isRatioValid || blendingComponents.length === 0}
              onClick={handleCreateBlend}
            >
              Blend
            </button>
          </div>
        </div>
        
        {/* 원두 선택 영역 */}
        <div className={styles.beanSelectionArea}>
          {coffeeBeans.map(bean => (
            <div
              key={bean.id}
              className={`${styles.beanCard} ${selectedBeanIds.includes(bean.id) ? styles.selected : ''}`}
              onClick={() => handleBeanSelect(bean)}
            >
              <div className={styles.beanImage}></div>
              <div className={styles.beanInfo}>
                <h4>{bean.name}</h4>
                <p>{bean.origin}</p>
                <p>{bean.roastLevel.charAt(0).toUpperCase() + bean.roastLevel.slice(1)} Roast</p>
                <p>{bean.flavor.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlendingWorkstation;