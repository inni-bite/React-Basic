import { useState, useEffect } from 'react';
import styles from './MemoStyleNotes.module.scss';

interface MemoStyleNotesProps {
  memo: string;
  animate?: boolean;
}

const MemoStyleNotes: React.FC<MemoStyleNotesProps> = ({ 
  memo,
  animate = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animate]);

  if (!memo) {
    return null;
  }

  return (
    <div className={`${styles.memoContainer} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.paperBackground}>
        <div className={styles.memoHeader}>
          <div className={styles.paperClip} />
          <div className={styles.noteLine} />
        </div>
        <div className={styles.memoContent}>
          {memo.split('\n').map((line, index) => (
            <p key={index} className={styles.memoLine}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoStyleNotes;