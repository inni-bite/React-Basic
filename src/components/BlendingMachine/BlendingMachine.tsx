import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { showBlendingWorkstationAtom } from '../../jotai/atoms/blendAtoms';
import BlendingWorkstation from '../BlendingWorkstation/BlendingWorkstation';
import styles from './BlendingMachine.module.scss';

interface BlendingMachineProps {
  onBlend?: () => void;
}

const BlendingMachine: React.FC<BlendingMachineProps> = ({ onBlend }) => {
  const [showBlendingWorkstation, setShowBlendingWorkstation] = useAtom(showBlendingWorkstationAtom);
  
  // 로고 클릭 핸들러
  const handleLogoClick = () => {
    window.location.reload();
  };
  
  // 블렌딩 워크스테이션 열기
  const handleOpenWorkstation = () => {
    setShowBlendingWorkstation(true);
    if (onBlend) {
      onBlend();
    }
  };
  
  return (
    <div className={styles.blendingMachineContainer}>
      {/* 헤더: 로고 표시 */}
      <div className={styles.coffeeBeanHeader}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <h1 className={styles.clickableLogo}>Coffee2</h1>
        </div>
      </div>
      
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          <div className={styles.blendSection}>
            <div className={styles.blendingMachine}>
              <img 
                src="/before-blend.jpeg" 
                alt="Coffee Machine" 
                className={styles.coffeeMachineImage} 
              />
            </div>
            
            {!showBlendingWorkstation && (
              <button 
                className={styles.createCoffeeButton}
                onClick={handleOpenWorkstation}
              >
                Create Coffee
              </button>
            )}
          </div>
        </div>
        
        {showBlendingWorkstation && (
          <div className={styles.rightSection}>
            <BlendingWorkstation />
          </div>
        )}
      </div>
      
      {/* 푸터: 내비게이션 탭 */}
      <footer className={styles.navigationFooter}>
        <button className={styles.navButton}>
          Coffee Bean
          <div className={styles.arrowIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        <button className={`${styles.navButton} ${styles.active}`}>
          Blend
          <div className={styles.arrowIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        <button className={styles.navButton}>
          Archive
          <div className={styles.arrowIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </footer>
    </div>
  );
};

export default BlendingMachine;