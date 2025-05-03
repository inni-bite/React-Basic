import { useAtom } from 'jotai';
import { selectedCoffeeAtom, showCoffeeDetailsAtom, isLoadingModalAtom } from '../../jotai/atoms/coffeeAtoms';
import { coffeeBeans } from '../../data/coffeeData';
import CoffeeImage from '../CoffeeImage';
import Loading from '../Loading/Loading';
import styles from './CoffeeSelector.module.scss';

interface CoffeeSelectorProps {
  onSelectCoffee?: (coffeeId: string) => void;
  showAsList?: boolean;
  onGoBack?: () => void;
}

const CoffeeSelector: React.FC<CoffeeSelectorProps> = ({ 
  onSelectCoffee, 
  showAsList = false,
  onGoBack
}) => {
  const [, setSelectedCoffee] = useAtom(selectedCoffeeAtom);
  const [, setShowCoffeeDetails] = useAtom(showCoffeeDetailsAtom);
  const [isLoadingModal, setIsLoadingModal] = useAtom(isLoadingModalAtom);

  const handleCoffeeSelect = async (coffeeId: string) => {
    const selected = coffeeBeans.find(bean => bean.id === coffeeId);
    if (selected) {
      setIsLoadingModal(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2500));
        setSelectedCoffee(selected);
        
        if (onSelectCoffee) {
          onSelectCoffee(coffeeId);
        } else {
          setShowCoffeeDetails(true);
        }
      } finally {
        setIsLoadingModal(false);
      }
    }
  };
  
  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    }
  };
  
  // Organize coffee cards into rows
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
  
  const lastRow = rows[rows.length - 1];
  if (lastRow && lastRow.length < cardsPerRow) {
    const dummyCount = cardsPerRow - lastRow.length;
    for (let i = 0; i < dummyCount; i++) {
      lastRow.push(null);
    }
  }
  
  return (
    <div className={styles.coffeeBeanPage}>
      <Loading isVisible={isLoadingModal} />
      
      {!showAsList ? (
        <>
          <div className={styles.coffeeBeanHeader}>
            <div className={styles.logo} onClick={handleGoBack}>
              <h1 className={styles.clickableLogo}>Coffee2</h1>
            </div>
          </div>
          
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
                        <CoffeeImage src={`/images/coffee-beans/${bean.id}.jpg`} alt={bean.name} />
                      </div>
                      <div className={styles.coffeeDescription}>
                        <h2 className={styles.coffeeName}>{bean.name}</h2>
                        <p className={styles.coffeeId}>{String(index + 1 + rowIndex * cardsPerRow).padStart(3, '0')}</p>
                      </div>
                    </div>
                  ) : (
                    <div key={`dummy-${rowIndex}-${index}`} className={styles.coffeeCard} style={{ visibility: 'hidden' }}></div>
                  )
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
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