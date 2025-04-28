import { useAtom } from 'jotai';
import { useState } from 'react';
import { selectedCoffeeAtom, showCoffeeDetailsAtom } from '../../jotai/atoms/coffeeAtoms';
import { coffeeBeans } from '../../data/coffeeData';
import styles from './CoffeeSelector.module.scss';

const CoffeeSelector: React.FC = () => {
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
      setShowCoffeeDetails(true);
    }
  };
  
  return (
    <div className={styles.coffeeSelectorContainer}>
      <h2 className={styles.title}>원두 탐색</h2>
      
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
      
      <div className={styles.beansGrid}>
        {filteredBeans.map((bean, index) => (
          <div 
            key={bean.id}
            className={styles.beanCard}
            onClick={() => handleCoffeeSelect(bean.id)}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className={`${styles.roastIndicator} ${styles[bean.roastLevel]}`}>
              {bean.koreanRoastLevel}
            </div>
            <h3 className={styles.beanName}>{bean.koreanName}</h3>
            <div className={styles.beanOrigin}>{bean.koreanOrigin}</div>
            <div className={styles.beanFlavors}>
              {bean.koreanFlavor.slice(0, 3).join(', ')}
              {bean.koreanFlavor.length > 3 ? '...' : ''}
            </div>
            <div className={styles.beanMemo}>
              "{bean.memoStyle.split('.')[0]}..."
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoffeeSelector;