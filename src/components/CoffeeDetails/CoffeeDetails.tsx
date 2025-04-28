import { useAtom } from 'jotai';
import { selectedCoffeeAtom, showCoffeeDetailsAtom } from '../../jotai/atoms/coffeeAtoms';
import styles from './CoffeeDetails.module.scss';
import TasteVisualizer from '../TasteVisualizer';
import MemoStyleNotes from '../MemoStyleNotes';

const CoffeeDetails: React.FC = () => {
  const [selectedCoffee] = useAtom(selectedCoffeeAtom);
  const [showDetails, setShowDetails] = useAtom(showCoffeeDetailsAtom);
  
  if (!selectedCoffee || !showDetails) return null;
  
  // 맛과 향 프로필을 태그로 렌더링
  const renderTags = (items: string[], koreanItems: string[]) => {
    return (
      <div className={styles.tags}>
        {koreanItems.map((item, index) => (
          <span key={index} className={styles.tag}>
            {item}
            <span className={styles.tagEnglish}>{items[index]}</span>
          </span>
        ))}
      </div>
    );
  };
  
  // 특성 점수 막대 차트 렌더링
  const renderRatingBar = (value: number, label: string) => {
    return (
      <div className={styles.ratingContainer}>
        <span className={styles.ratingLabel}>{label}</span>
        <div className={styles.ratingBar}>
          <div 
            className={styles.ratingFill} 
            style={{ width: `${value * 10}%` }}
          />
        </div>
        <span className={styles.ratingValue}>{value}</span>
      </div>
    );
  };
  
  return (
    <>
      <div className={styles.backdrop} onClick={() => setShowDetails(false)} />
      <div className={styles.coffeeDetails}>
        <button 
          className={styles.closeButton}
          onClick={() => setShowDetails(false)}
          aria-label="닫기"
        >
          ×
        </button>
        
        <h2 className={styles.coffeeName}>{selectedCoffee.koreanName}</h2>
        <h3 className={styles.coffeeNameEnglish}>{selectedCoffee.name}</h3>
        
        <div className={styles.originInfo}>
          <span className={styles.origin}>{selectedCoffee.koreanOrigin}</span>
          <span className={styles.altitude}>{selectedCoffee.altitude}</span>
          <span className={styles.process}>{selectedCoffee.koreanProcess}</span>
          <span className={`${styles.roastLevel} ${styles[selectedCoffee.roastLevel]}`}>
            {selectedCoffee.koreanRoastLevel}
          </span>
        </div>
        
        <MemoStyleNotes memo={selectedCoffee.memoStyle} />
        
        <p className={styles.description}>{selectedCoffee.koreanDescription}</p>
        
        <div className={styles.sectionTitle}>맛 프로필</div>
        {renderTags(selectedCoffee.flavor, selectedCoffee.koreanFlavor)}
        
        <div className={styles.sectionTitle}>향 프로필</div>
        {renderTags(selectedCoffee.aroma, selectedCoffee.koreanAroma)}
        
        <div className={styles.sectionTitle}>시각적 표현</div>
        <TasteVisualizer visualElements={selectedCoffee.visualElements} />
        
        <div className={styles.sectionTitle}>특성</div>
        <div className={styles.ratings}>
          {renderRatingBar(selectedCoffee.acidity, '산미')}
          {renderRatingBar(selectedCoffee.body, '바디감')}
          {renderRatingBar(selectedCoffee.sweetness, '단맛')}
          {renderRatingBar(selectedCoffee.bitterness, '쓴맛')}
        </div>
        
        <div className={styles.sectionTitle}>이런 분들에게 추천합니다</div>
        <p className={styles.recommendText}>{selectedCoffee.recommendFor}</p>
        
        <div className={styles.sectionTitle}>추천 추출 방법</div>
        <div className={styles.tags}>
          {selectedCoffee.koreanBrewingMethods.map((method, index) => (
            <span key={index} className={`${styles.tag} ${styles.brewingTag}`}>
              {method}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoffeeDetails;