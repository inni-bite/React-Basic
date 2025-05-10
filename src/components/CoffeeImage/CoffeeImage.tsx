/* 
  필요한 외부 라이브러리와 커스텀 모듈 가져오기.
  - useState: React 상태 관리 훅.
  - styles: SCSS 모듈 스타일.
*/
import React, { useState } from 'react';
import styles from './CoffeeImage.module.scss';

/* 
  컴포넌트가 받을 속성(props)의 타입 정의.
  - src: 이미지 URL.
  - alt: 이미지 대체 텍스트.
  - className: 추가적인 클래스 이름 (선택 사항).
*/
interface CoffeeImageProps {
  src: string;
  alt: string;
  className?: string;
}

/* 
  CoffeeImage 컴포넌트: 이미지를 표시하고 로딩/오류 상태를 관리.
  로딩 중 스피너 표시, 오류 발생 시 아이콘 표시.
*/
const CoffeeImage: React.FC<CoffeeImageProps> = ({ src, alt, className }) => {
  /* 
    상태 관리:
    - isLoading: 이미지 로딩 상태.
    - hasError: 이미지 로딩 오류 상태.
  */
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  /* 
    이미지 URL 인코딩: 파일 이름에 공백 등이 있을 경우 처리.
    각 경로 부분을 인코딩하여 안전한 URL 생성.
  */
  const encodeImageSrc = (url: string): string => {
    return url
      .split('/')
      .map(part => encodeURIComponent(part))
      .join('/');
  };

  const encodedSrc = encodeImageSrc(src);

  /* 
    handleImageLoad: 이미지 로딩 완료 시 실행.
    로딩 상태를 false로 변경.
  */
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  /* 
    handleImageError: 이미지 로딩 실패 시 실행.
    로딩 상태와 오류 상태 업데이트.
  */
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  /* 
    컴포넌트 렌더링:
    - 로딩 중일 때는 스피너 표시.
    - 오류 발생 시 오류 아이콘 표시.
    - 정상 로딩 시 이미지를 표시.
  */
  return (
    <div className={`${styles.imageContainer} ${className || ''}`}>
      {/* 로딩 중일 때 표시되는 스피너 */}
      {isLoading && (
        <div className={styles.loadingPlaceholder}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}

      {/* 오류 발생 시 표시되는 아이콘 */}
      {hasError ? (
        <div className={styles.errorPlaceholder}>
          <div className={styles.errorIcon}>!</div>
        </div>
      ) : (
        /* 정상 로딩 시 표시되는 이미지 */
        <img
          src={encodedSrc}
          alt={alt}
          className={styles.image} /* 전역 스타일이 필요하면 별도 클래스 추가 */
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  );
};

/* 
  컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄.
  import CoffeeImage from './CoffeeImage'로 가져올 수 있음.
*/
export default CoffeeImage;