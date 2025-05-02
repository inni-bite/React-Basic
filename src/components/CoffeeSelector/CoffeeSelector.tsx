import { useAtom } from 'jotai';
import { useState } from 'react';
import { selectedCoffeeAtom, showCoffeeDetailsAtom } from '../../jotai/atoms/coffeeAtoms';
import { coffeeBeans } from '../../data/coffeeData';
import CoffeeImage from '../CoffeeImage';
import styles from './CoffeeSelector.module.scss';

interface CoffeeSelectorProps {
  onSelectCoffee?: (coffeeId: string) => void;
  showAsList?: boolean;
  onGoBack?: () => void; // 뒤로가기 핸들러 추가
}

// 네비게이션 관련 타입을 명확하게 정의
type NavTab = 'coffee' | 'blend' | 'archive';

const CoffeeSelector: React.FC<CoffeeSelectorProps> = ({ 
  onSelectCoffee, 
  showAsList = false,
  onGoBack
}) => {
  const [, setSelectedCoffee] = useAtom(selectedCoffeeAtom);
  const [, setShowCoffeeDetails] = useAtom(showCoffeeDetailsAtom);
  
  // 로컬 UI 상태로만 사용 (실제 페이지 이동은 없음)
  const [localTab, setLocalTab] = useState<NavTab>('coffee');
  
  const handleCoffeeSelect = (coffeeId: string) => {
    const selected = coffeeBeans.find(bean => bean.id === coffeeId);
    if (selected) {
      setSelectedCoffee(selected);
      
      if (onSelectCoffee) {
        onSelectCoffee(coffeeId);
      } else {
        setShowCoffeeDetails(true);
      }
    }
  };
  
  const handleGoBack = () => {
    // 뒤로가기 핸들러 호출
    if (onGoBack) {
      onGoBack();
    }
  };
  
  // 하단 네비게이션 버튼 클릭 처리
  const handleTabClick = (tab: NavTab) => {
    setLocalTab(tab);
    
    // 실제로는 App.tsx에서 페이지 전환 처리
    if (tab === 'blend' && onGoBack) {
      // 블렌드 탭으로 이동 (App.tsx에서 activeTab을 1로 설정)
      onGoBack(); // 랜딩 페이지로 돌아간 다음
      setTimeout(() => {
        // App.tsx에서 다른 방식으로 처리 가능
        const blendButton = document.querySelector('[data-tab="1"]') as HTMLElement;
        if (blendButton) blendButton.click();
      }, 100);
    } else if (tab === 'archive' && onGoBack) {
      // 아카이브 탭으로 이동 (App.tsx에서 activeTab을 2로 설정)
      onGoBack(); // 랜딩 페이지로 돌아간 다음
      setTimeout(() => {
        // App.tsx에서 다른 방식으로 처리 가능
        const archiveButton = document.querySelector('[data-tab="2"]') as HTMLElement;
        if (archiveButton) archiveButton.click();
      }, 100);
    }
    // coffee 탭은 현재 페이지이므로 특별한 처리 없음
  };
  
  // 피그마 디자인에 맞게 카드를 행으로 분할
  const cardsPerRow = 6;
  const rows = [];
  let rowItems = [];
  
  coffeeBeans.forEach((bean, index) => {
    rowItems.push(bean);
    
    if (rowItems.length === cardsPerRow || index === coffeeBeans.length - 1) {
      rows.push([...rowItems]);
      rowItems = [];
    }
  });
  
  // 필요하다면 마지막 행을 6개로 맞추기 위해 더미 아이템 추가
  const lastRow = rows[rows.length - 1];
  if (lastRow && lastRow.length < cardsPerRow) {
    const dummyCount = cardsPerRow - lastRow.length;
    for (let i = 0; i < dummyCount; i++) {
      lastRow.push(null);
    }
  }
  
  return (
    <div className={styles.coffeeBeanPage}>
      {!showAsList ? (
        // 피그마 디자인에 맞춘 레이아웃
        <>
          {/* 상단 헤더 */}
          <div className={styles.coffeeBeanHeader}>
            <div className={styles.logo} onClick={handleGoBack}>
              <h1 className={styles.clickableLogo}>Coffe2</h1>
            </div>
          </div>
          
          {/* 메인 콘텐츠 */}
          <div className={styles.coffeeBeanContent}>
            {rows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className={styles.coffeeRow}>
                {row.map((bean, index) => (
                  bean ? (
                    <div 
                      key={bean.id}
                      className={styles.coffeeCard}
                      onClick={() => handleCoffeeSelect(bean.id)}
                    >
                      <div className={styles.coffeeImage}>
                        {/* 최적화된 이미지 컴포넌트 사용 */}
                        <CoffeeImage src={`/images/coffee-beans/${bean.id}.jpg`} alt={bean.name} />
                      </div>
                      <div className={styles.coffeeDescription}>
                        <h2 className={styles.coffeeName}>{bean.name}</h2>
                        <p className={styles.coffeeId}>{String(index + 1 + rowIndex * cardsPerRow).padStart(3, '0')}</p>
                      </div>
                    </div>
                  ) : (
                    // 더미 카드 (빈 공간)
                    <div key={`dummy-${rowIndex}-${index}`} className={styles.coffeeCard} style={{ visibility: 'hidden' }}></div>
                  )
                ))}
              </div>
            ))}
          </div>
          
          {/* 하단 네비게이션 - Landing Page와 동일한 스타일 (가로 배치) */}
          <footer className={styles.navigationFooter}>
            <button 
              className={`${styles.navButton} ${localTab === 'coffee' ? styles.active : ''}`}
              onClick={() => handleTabClick('coffee')}
            >
              Coffee Bean
              <div className={styles.arrowIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
            
            <button 
              className={`${styles.navButton} ${localTab === 'blend' ? styles.active : ''}`}
              onClick={() => handleTabClick('blend')}
            >
              Blend
              <div className={styles.arrowIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
            
            <button 
              className={`${styles.navButton} ${localTab === 'archive' ? styles.active : ''}`}
              onClick={() => handleTabClick('archive')}
            >
              Archive
              <div className={styles.arrowIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </footer>
        </>
      ) : (
        // 리스트 형태 디스플레이 (메인페이지용)
        <div className={styles.coffeeBottlesList}>
          {coffeeBeans.map((bean, index) => (
            <div 
              key={bean.id}
              className={styles.coffeeBottleItem}
              onClick={() => handleCoffeeSelect(bean.id)}
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div className={styles.bottleImageSmall}>
                <CoffeeImage src={`/images/coffee-beans/${bean.id}.jpg`} alt={bean.koreanName} />
                <div className={`${styles.roastDot} ${styles[bean.roastLevel]}`}></div>
              </div>
              <div className={styles.bottleLabelSmall}>
                <h3 className={styles.beanNameSmall}>{bean.koreanName}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoffeeSelector;