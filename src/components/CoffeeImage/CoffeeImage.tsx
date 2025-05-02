import React, { useState } from 'react';
import styles from './CoffeeImage.module.scss';

interface CoffeeImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CoffeeImage: React.FC<CoffeeImageProps> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // 이미지 URL 인코딩 (파일 이름에 공백이 있는 경우 처리)
  const encodedSrc = src.split('/').map(part => encodeURIComponent(part)).join('/');
  
  // 이미지 로딩 완료 처리
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  // 이미지 로딩 오류 처리
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  
  return (
    <div className={`${styles.imageContainer} ${className || ''}`}>
      {isLoading && (
        <div className={styles.loadingPlaceholder}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
      
      {hasError ? (
        <div className={styles.errorPlaceholder}>
          <div className={styles.errorIcon}>!</div>
        </div>
      ) : (
        <img
          src={encodedSrc}
          alt={alt}
          className={`${styles.image} image`} // 'image' 클래스 추가하여 전역 스타일 적용 가능하게
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      )}
    </div>
  );
};

export default CoffeeImage;