import { useAtom } from 'jotai';
import { useState } from 'react';
import { selectedCoffeeAtom, showCoffeeDetailsAtom } from '../../jotai/atoms/coffeeAtoms';
import { coffeeBeans } from '../../data/coffeeData';
import styles from './CoffeeSelector.module.scss';

interface CoffeeSelectorProps {
  onSelectCoffee?: (coffeeId: string) => void;
  showAsList?: boolean;
}

const CoffeeSelector: React.FC<CoffeeSelectorProps> = ({ onSelectCoffee, showAsList = false }) => {
  const [, setSelectedCoffee] = useAtom(selectedCoffeeAtom);
  const [, setShowCoffeeDetails] = useAtom(showCoffeeDetailsAtom);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filterOptions = [
    { id: 'all', label: '전체' },
    { id: 'light', label: '라이트 로스팅' },
    { id: 'medium', label: '미디엄 로스팅' },
    { id: 'dark', label: '다크 로스팅' }
  ];
  
  const filteredBeans = activeFilter === 'all' 
    ? coffeeBeans 
    : coffeeBeans.filter(bean => bean.roastLevel === activeFilter);
  
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
  
  return (
    <div className={styles.coffeeSelectorContainer}>
      {!showAsList ? (
        // 기존 그리드 형태 디스플레이
        <>
          <h2 className={styles.title}>Coffee-Explorer Library</h2>
          
          <div className={styles.filterContainer}>
            {filterOptions.map(option => (
              <button
                key={option.id}
                className={`${styles.filterButton} ${activeFilter === option.id ? styles.active : ''}`}
                onClick={() => setActiveFilter(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <div className={styles.beansBookshelf}>
            {filteredBeans.map((bean, index) => (
              <div 
                key={bean.id}
                className={styles.beanBottle}
                onClick={() => handleCoffeeSelect(bean.id)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={styles.bottleImage}>
                  <img src="/dummycoffee.jpg" alt={bean.koreanName} />
                </div>
                <div className={styles.bottleLabel}>
                  <div className={`${styles.roastIndicator} ${styles[bean.roastLevel]}`}>
                    {bean.koreanRoastLevel}
                  </div>
                  <h3 className={styles.beanName}>{bean.koreanName}</h3>
                  <div className={styles.beanOrigin}>{bean.koreanOrigin}</div>
                </div>
              </div>
            ))}
          </div>
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
                <img src="/dummycoffee.jpg" alt={bean.koreanName} />
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