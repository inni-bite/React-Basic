import { useEffect, useState } from 'react';
import { VisualElement } from '../../data/coffeeData';
import styles from './TasteVisualizer.module.scss';

interface TasteVisualizerProps {
  visualElements: VisualElement[];
  animate?: boolean;
}

const TasteVisualizer: React.FC<TasteVisualizerProps> = ({ 
  visualElements, 
  animate = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animate) {
      // 애니메이션 효과를 위한 타이머 설정
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animate]);

  if (!visualElements || visualElements.length === 0) {
    return null;
  }

  return (
    <div className={styles.visualizerContainer}>
      <div className={styles.elementsContainer}>
        {visualElements.map((element, index) => (
          <div
            key={`${element.type}-${index}`}
            className={`${styles.elementItem} ${isVisible ? styles.visible : ''}`}
            style={{ 
              transitionDelay: `${index * 0.2}s`,
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div className={styles.imageContainer}>
              <img 
                src={element.image} 
                alt={element.name} 
                className={styles.elementImage} 
                onError={(e) => {
                  // 이미지 로드 실패 시 대체 이미지 표시
                  e.currentTarget.src = '/src/assets/images/placeholder.jpg';
                }}
              />
            </div>
            <div className={styles.elementInfo}>
              <h4 className={styles.elementName}>{element.name}</h4>
              <p className={styles.elementDescription}>{element.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasteVisualizer;