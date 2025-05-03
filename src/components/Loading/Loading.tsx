import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { isGrindingSoundPlayingAtom } from '../../jotai/atoms/coffeeAtoms';
import styles from './Loading.module.scss';

interface LoadingProps {
  isVisible: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isVisible }) => {
  const [, setIsGrindingSoundPlaying] = useAtom(isGrindingSoundPlayingAtom);

  useEffect(() => {
    if (isVisible) {
      const audio = new Audio('/grinding-coffee.mp3');
      setIsGrindingSoundPlaying(true);

      // 초기 볼륨 설정 & 시작 지점
      audio.volume = 0.5;
      audio.currentTime = 9.2;
      
      const startTime = Date.now();
      const duration = 2200; // 총 재생 시간
      const fadeOutStart = 1700; // 페이드아웃 시작 시점 (마지막 500ms)

      const fadeOutInterval = setInterval(() => {
        const currentTime = Date.now() - startTime;
        
        // 페이드아웃 시작 시점 이후
        if (currentTime >= fadeOutStart) {
          const fadeProgress = (currentTime - fadeOutStart) / (duration - fadeOutStart);
          audio.volume = Math.max(0, 0.5 * (1 - fadeProgress));
        }

        // 총 재생 시간 도달
        if (currentTime >= duration) {
          clearInterval(fadeOutInterval);
          audio.pause();
          setIsGrindingSoundPlaying(false);
        }
      }, 50); // 50ms 간격으로 볼륨 조절

      audio.play().catch((error) => {
        console.error('Audio playback failed:', error);
      });

      return () => {
        clearInterval(fadeOutInterval);
        audio.pause();
        audio.currentTime = 0;
        setIsGrindingSoundPlaying(false);
      };
    }
  }, [isVisible, setIsGrindingSoundPlaying]);

  if (!isVisible) return null;

  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingContent}>
        <img 
          src="/images/loading/loading.jpg"
          alt="Loading..." 
          className={styles.loadingImage}
        />
      </div>
    </div>
  );
};

export default Loading;