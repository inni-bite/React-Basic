import React from 'react';
import { useAtom } from 'jotai';
import { 
  comparingBlendsAtom, 
  showBlendCompareAtom,
  showBlendingWorkstationAtom,
  blendingComponentsAtom
} from '../../jotai/atoms/blendAtoms';
import coffeeBeans from '../../data/coffeeData';
import styles from './BlendCompare.module.scss';

const BlendCompare: React.FC = () => {
  const [comparingBlends, setComparingBlends] = useAtom(comparingBlendsAtom);
  const [, setShowBlendCompare] = useAtom(showBlendCompareAtom);
  const [, setShowBlendingWorkstation] = useAtom(showBlendingWorkstationAtom);
  const [, setBlendingComponents] = useAtom(blendingComponentsAtom);
  
  // 비교창 닫기
  const handleClose = () => {
    setShowBlendCompare(false);
  };
  
  // 새 블렌드 만들기
  const handleNewBlend = () => {
    // 블렌딩 컴포넌트 초기화
    setBlendingComponents([]);
    
    // 비교창 닫고 블렌딩 워크스테이션 열기
    setShowBlendCompare(false);
    setShowBlendingWorkstation(true);
  };
  
  // 블렌드 중 하나로 계속 블렌딩하기
  const handleContinueWithBlend = (index: number) => {
    const blend = comparingBlends[index];
    if (blend) {
      setBlendingComponents(blend.components);
      setShowBlendCompare(false);
      setShowBlendingWorkstation(true);
    }
  };
  
  // 비교할 블렌드가 두 개가 아니면 빈 화면 반환
  if (comparingBlends.length !== 2) {
    return (
      <div className={styles.compareModal}>
        <div className={styles.compareContent} style={{ padding: '30px', textAlign: 'center' }}>
          <h3>비교할 블렌드가 부족합니다</h3>
          <p>블렌드 비교를 위해서는 두 개의 블렌드가 필요합니다.</p>
          <button onClick={handleClose} style={{ marginTop: '20px' }}>닫기</button>
        </div>
      </div>
    );
  }
  
  const [blend1, blend2] = comparingBlends;
  
  // 통계 값의 차이 계산과 색상 선택 함수
  const getDifferenceClass = (value1: number, value2: number) => {
    if (Math.abs(value1 - value2) < 0.5) return '';
    return value1 > value2 ? styles.higher : styles.lower;
  };
  
  return (
    <div className={styles.compareModal}>
      <div className={styles.compareContent}>
        <button className={styles.closeButton} onClick={handleClose}>×</button>
        
        <div className={styles.header}>
          <h2>블렌드 비교</h2>
          <p>두 블렌드의 특성을 비교해보세요</p>
        </div>
        
        <div className={styles.compareContainer}>
          {/* 블렌드 1 정보 */}
          <div className={styles.blendColumn}>
            <h3>{blend1.name}</h3>
            
            <div className={styles.sectionTitle}>맛 프로필</div>
            <div className={styles.flavorTags}>
              {blend1.calculatedFlavor.map((flavor, index) => (
                <span key={`flavor1-${index}`} className={styles.tag}>{flavor}</span>
              ))}
            </div>
            
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <div className={styles.statLabel}>산미</div>
                  <div className={`${styles.statValue} ${getDifferenceClass(blend1.calculatedAcidity, blend2.calculatedAcidity)}`}>
                    {blend1.calculatedAcidity.toFixed(1)}
                  </div>
                </div>
                <div className={styles.statBars}>
                  <div 
                    className={styles.bar1} 
                    style={{ width: `${blend1.calculatedAcidity * 10}%` }}
                  />
                </div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <div className={styles.statLabel}>바디감</div>
                  <div className={`${styles.statValue} ${getDifferenceClass(blend1.calculatedBody, blend2.calculatedBody)}`}>
                    {blend1.calculatedBody.toFixed(1)}
                  </div>
                </div>
                <div className={styles.statBars}>
                  <div 
                    className={styles.bar1} 
                    style={{ width: `${blend1.calculatedBody * 10}%` }}
                  />
                </div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <div className={styles.statLabel}>단맛</div>
                  <div className={`${styles.statValue} ${getDifferenceClass(blend1.calculatedSweetness, blend2.calculatedSweetness)}`}>
                    {blend1.calculatedSweetness.toFixed(1)}
                  </div>
                </div>
                <div className={styles.statBars}>
                  <div 
                    className={styles.bar1} 
                    style={{ width: `${blend1.calculatedSweetness * 10}%` }}
                  />
                </div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <div className={styles.statLabel}>쓴맛</div>
                  <div className={`${styles.statValue} ${getDifferenceClass(blend1.calculatedBitterness, blend2.calculatedBitterness)}`}>
                    {blend1.calculatedBitterness.toFixed(1)}
                  </div>
                </div>
                <div className={styles.statBars}>
                  <div 
                    className={styles.bar1} 
                    style={{ width: `${blend1.calculatedBitterness * 10}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.sectionTitle}>구성 원두</div>
            <div className={styles.components}>
              {blend1.components.map(comp => {
                const bean = coffeeBeans.find(b => b.id === comp.beanId);
                if (!bean) return null;
                
                return (
                  <div key={`comp1-${comp.beanId}`} className={styles.componentItem}>
                    <div className={styles.componentHeader}>
                      <h4>{bean.koreanName}</h4>
                      <span className={styles.ratio}>{comp.ratio}%</span>
                    </div>
                    <p>{bean.koreanOrigin} | {bean.koreanRoastLevel}</p>
                  </div>
                );
              })}
            </div>
            
            <div className={styles.sectionTitle}>맛 노트</div>
            <div className={styles.memoBox}>
              {blend1.memoStyle}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => handleContinueWithBlend(0)}
                className={styles.blendButton}
              >
                이 블렌드로 계속하기
              </button>
            </div>
          </div>
          
          {/* 분리선 */}
          <div className={styles.vsLine} />
          
          {/* 블렌드 2 정보 */}
          <div className={styles.blendColumn}>
            <h3>{blend2.name}</h3>
            
            <div className={styles.sectionTitle}>맛 프로필</div>
            <div className={styles.flavorTags}>
              {blend2.calculatedFlavor.map((flavor, index) => (
                <span key={`flavor2-${index}`} className={styles.tag}>{flavor}</span>
              ))}
            </div>
            
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <div className={styles.statLabel}>산미</div>
                  <div className={`${styles.statValue} ${getDifferenceClass(blend2.calculatedAcidity, blend1.calculatedAcidity)}`}>
                    {blend2.calculatedAcidity.toFixed(1)}
                  </div>
                </div>
                <div className={styles.statBars}>
                  <div 
                    className={styles.bar2} 
                    style={{ width: `${blend2.calculatedAcidity * 10}%` }}
                  />
                </div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <div className={styles.statLabel}>바디감</div>
                  <div className={`${styles.statValue} ${getDifferenceClass(blend2.calculatedBody, blend1.calculatedBody)}`}>
                    {blend2.calculatedBody.toFixed(1)}
                  </div>
                </div>
                <div className={styles.statBars}>
                  <div 
                    className={styles.bar2} 
                    style={{ width: `${blend2.calculatedBody * 10}%` }}
                  />
                </div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <div className={styles.statLabel}>단맛</div>
                  <div className={`${styles.statValue} ${getDifferenceClass(blend2.calculatedSweetness, blend1.calculatedSweetness)}`}>
                    {blend2.calculatedSweetness.toFixed(1)}
                  </div>
                </div>
                <div className={styles.statBars}>
                  <div 
                    className={styles.bar2} 
                    style={{ width: `${blend2.calculatedSweetness * 10}%` }}
                  />
                </div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <div className={styles.statLabel}>쓴맛</div>
                  <div className={`${styles.statValue} ${getDifferenceClass(blend2.calculatedBitterness, blend1.calculatedBitterness)}`}>
                    {blend2.calculatedBitterness.toFixed(1)}
                  </div>
                </div>
                <div className={styles.statBars}>
                  <div 
                    className={styles.bar2} 
                    style={{ width: `${blend2.calculatedBitterness * 10}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.sectionTitle}>구성 원두</div>
            <div className={styles.components}>
              {blend2.components.map(comp => {
                const bean = coffeeBeans.find(b => b.id === comp.beanId);
                if (!bean) return null;
                
                return (
                  <div key={`comp2-${comp.beanId}`} className={styles.componentItem}>
                    <div className={styles.componentHeader}>
                      <h4>{bean.koreanName}</h4>
                      <span className={styles.ratio}>{comp.ratio}%</span>
                    </div>
                    <p>{bean.koreanOrigin} | {bean.koreanRoastLevel}</p>
                  </div>
                );
              })}
            </div>
            
            <div className={styles.sectionTitle}>맛 노트</div>
            <div className={styles.memoBox}>
              {blend2.memoStyle}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => handleContinueWithBlend(1)}
                className={styles.blendButton}
              >
                이 블렌드로 계속하기
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.actionsRow}>
          <button className={`${styles.closeButton}`} onClick={handleClose}>
            닫기
          </button>
          <button className={`${styles.blendButton}`} onClick={handleNewBlend}>
            새 블렌드 만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlendCompare;