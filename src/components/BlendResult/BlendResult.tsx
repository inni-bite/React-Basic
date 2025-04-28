import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { 
  blendResultAtom,
  showBlendResultAtom,
  blendAnimationStateAtom,
  savedBlendsAtom,
  showBlendingWorkstationAtom,
  blendingComponentsAtom,
  comparingBlendsAtom,
  showBlendCompareAtom
} from '../../jotai/atoms/blendAtoms';
import { getBlendingTips } from '../../data/blendData';
import coffeeBeans from '../../data/coffeeData';
import TasteVisualizer from '../TasteVisualizer';
import MemoStyleNotes from '../MemoStyleNotes';
import styles from './BlendResult.module.scss';

const BlendResult: React.FC = () => {
  const [blendResult, setBlendResult] = useAtom(blendResultAtom);
  const [, setShowBlendResult] = useAtom(showBlendResultAtom);
  const [blendAnimationState, setBlendAnimationState] = useAtom(blendAnimationStateAtom);
  const [savedBlends, setSavedBlends] = useAtom(savedBlendsAtom);
  const [, setShowBlendingWorkstation] = useAtom(showBlendingWorkstationAtom);
  const [, setBlendingComponents] = useAtom(blendingComponentsAtom);
  const [comparingBlends, setComparingBlends] = useAtom(comparingBlendsAtom);
  const [, setShowBlendCompare] = useAtom(showBlendCompareAtom);
  
  // 통계 바 애니메이션 제어
  const [animateStats, setAnimateStats] = useState(false);
  
  // 블렌딩 팁 생성
  const blendingTips = blendResult ? getBlendingTips(blendResult.components, coffeeBeans) : [];
  
  // 통계 바 애니메이션 효과
  useEffect(() => {
    if (blendAnimationState === 'complete') {
      // 약간의 지연 후 통계 바 애니메이션 시작
      const timer = setTimeout(() => {
        setAnimateStats(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [blendAnimationState]);
  
  // 창 닫기
  const handleClose = () => {
    setShowBlendResult(false);
    setBlendAnimationState('idle');
  };
  
  // 블렌드 저장
  const handleSaveBlend = () => {
    if (!blendResult) return;
    
    // 이미 저장된 블렌드인지 확인
    const alreadySaved = savedBlends.some(blend => blend.id === blendResult.id);
    
    if (!alreadySaved) {
      setSavedBlends([...savedBlends, blendResult]);
    }
    
    // 저장 완료 메시지 표시
    alert('블렌드가 저장되었습니다.');
  };
  
  // 비교 기능으로 추가
  const handleAddToCompare = () => {
    if (!blendResult) return;
    
    // 이미 비교 목록에 있는지 확인
    const alreadyComparing = comparingBlends.some(blend => blend.id === blendResult.id);
    
    if (!alreadyComparing) {
      // 최대 2개까지만 비교 가능
      const newComparingBlends = comparingBlends.length >= 2 
        ? [comparingBlends[1], blendResult] // 가장 오래된 항목 제거
        : [...comparingBlends, blendResult];
      
      setComparingBlends(newComparingBlends);
      
      // 비교 화면으로 전환할지 물어보기
      if (newComparingBlends.length === 2) {
        if (window.confirm('두 블렌드를 비교하시겠습니까?')) {
          setShowBlendResult(false);
          setShowBlendCompare(true);
        }
      } else {
        alert('비교 목록에 추가되었습니다. 하나 더 추가하면 비교할 수 있습니다.');
      }
    } else {
      alert('이미 비교 목록에 있는 블렌드입니다.');
    }
  };
  
  // 다시 블렌딩하기
  const handleRetry = () => {
    // 현재 블렌드의 구성 요소를 워크스테이션으로 가져가기
    if (blendResult) {
      setBlendingComponents(blendResult.components);
    }
    
    // 결과 창 닫고 워크스테이션 열기
    setShowBlendResult(false);
    setShowBlendingWorkstation(true);
  };
  
  if (!blendResult) return null;
  
  return (
    <div className={styles.blendResultModal}>
      <div className={styles.blendResultContent}>
        <button className={styles.closeButton} onClick={handleClose}>×</button>
        
        <div className={styles.header}>
          <h2>{blendResult.name}</h2>
          <p>당신만의 특별한 블렌드가 완성되었습니다</p>
        </div>
        
        <div className={styles.blendInfo}>
          <div className={styles.tasteProfile}>
            <h3>맛 프로필</h3>
            
            <div className={styles.flavorTags}>
              {blendResult.calculatedFlavor.map((flavor, index) => (
                <span key={`flavor-${index}`} className={styles.tag}>{flavor}</span>
              ))}
              {blendResult.calculatedAroma.map((aroma, index) => (
                <span key={`aroma-${index}`} className={styles.tag}>{aroma}</span>
              ))}
            </div>
            
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>산미</div>
                <div className={styles.statBar}>
                  <div 
                    className={styles.statFill} 
                    style={{
                      width: animateStats ? `${blendResult.calculatedAcidity * 10}%` : '0%'
                    }}
                  />
                </div>
                <div className={styles.statValue}>{blendResult.calculatedAcidity.toFixed(1)}</div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statLabel}>바디감</div>
                <div className={styles.statBar}>
                  <div 
                    className={styles.statFill} 
                    style={{
                      width: animateStats ? `${blendResult.calculatedBody * 10}%` : '0%'
                    }}
                  />
                </div>
                <div className={styles.statValue}>{blendResult.calculatedBody.toFixed(1)}</div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statLabel}>단맛</div>
                <div className={styles.statBar}>
                  <div 
                    className={styles.statFill} 
                    style={{
                      width: animateStats ? `${blendResult.calculatedSweetness * 10}%` : '0%'
                    }}
                  />
                </div>
                <div className={styles.statValue}>{blendResult.calculatedSweetness.toFixed(1)}</div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statLabel}>쓴맛</div>
                <div className={styles.statBar}>
                  <div 
                    className={styles.statFill} 
                    style={{
                      width: animateStats ? `${blendResult.calculatedBitterness * 10}%` : '0%'
                    }}
                  />
                </div>
                <div className={styles.statValue}>{blendResult.calculatedBitterness.toFixed(1)}</div>
              </div>
            </div>
            
            {/* 시각화 컴포넌트 */}
            <div className={styles.tasteVisualizer}>
              <TasteVisualizer visualElements={blendResult.visualElements} />
            </div>
          </div>
          
          {/* 메모 스타일 노트 */}
          <div className={styles.memoSection}>
            <MemoStyleNotes memoText={blendResult.memoStyle} />
          </div>
          
          {/* 블렌드 구성 요소 */}
          <div className={styles.componentsSection}>
            <h4>블렌드 구성</h4>
            
            <div className={styles.componentsList}>
              {blendResult.components.map(comp => {
                const bean = coffeeBeans.find(b => b.id === comp.beanId);
                if (!bean) return null;
                
                return (
                  <div key={comp.beanId} className={styles.componentItem}>
                    <div className={styles.beanInfo}>
                      <h5>{bean.koreanName}</h5>
                      <p>{bean.koreanOrigin} | {bean.koreanRoastLevel}</p>
                    </div>
                    <div className={styles.ratio}>{comp.ratio}%</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 블렌딩 팁 */}
          {blendingTips.length > 0 && (
            <div className={styles.tips}>
              <h4>블렌딩 팁</h4>
              <ul>
                {blendingTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* 액션 버튼 */}
          <div className={styles.actionButtons}>
            <button className={styles.retryButton} onClick={handleRetry}>
              다시 블렌딩하기
            </button>
            
            <div>
              <button 
                className={styles.compareButton} 
                onClick={handleAddToCompare}
                style={{ marginRight: '10px' }}
              >
                비교하기
              </button>
              
              <button className={styles.saveButton} onClick={handleSaveBlend}>
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlendResult;