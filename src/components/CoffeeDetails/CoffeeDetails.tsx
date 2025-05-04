/* 
  필요한 외부 라이브러리와 커스텀 모듈 가져오기.
  - React: 기본 리액트 기능.
  - useAtom: Jotai 상태 관리 훅.
  - styles: SCSS 모듈 스타일.
  - selectedCoffeeAtom, showCoffeeDetailsAtom: 커피 관련 상태.
*/
import React from 'react';
import { useAtom } from 'jotai';
import styles from './CoffeeDetails.module.scss';
import { selectedCoffeeAtom, showCoffeeDetailsAtom } from '../../jotai/atoms/coffeeAtoms';

/* 
  플레이버 이름에 맞는 이미지 경로를 반환하는 헬퍼 함수.
  정규화된 이름으로 매핑하여 이미지 경로 생성.
*/
const getFlavorImagePath = (flavorName: string): string => {
  const normalizedName = flavorName.toLowerCase();
  const flavorImageMap: Record<string, string> = {
    'caramel': 'Caramel.jpg',
    'apple': 'apple.jpg',
    'lemon': 'lemon.jpg',
    'chocolate': 'chocolate.jpg',
    'nuts': 'Caramel.jpg', // 너츠 이미지 없음 시 대체
  };
  return `/images/Flavours/${flavorImageMap[normalizedName] || flavorImageMap['caramel']}`;
};

/* 
  수치값을 테이스팅 옵션 인덱스로 매핑하는 헬퍼 함수.
  값 범위를 옵션 개수에 맞게 조정.
*/
const mapValueToTastingOption = (value: number, options: string[]): number => {
  const optionCount = options.length;
  const step = 10 / optionCount;
  return Math.min(Math.floor(value / step), optionCount - 1);
};

/* 
  CoffeeDetails 컴포넌트: 선택된 커피의 상세 정보를 표시.
  모달 형태로 열리며, 닫기 기능 포함.
*/
const CoffeeDetails: React.FC = () => {
  /* 
    상태 관리:
    - selectedCoffee: 선택된 커피 정보.
    - showCoffeeDetails: 모달 표시 여부, 설정 함수 포함.
  */
  const [selectedCoffee] = useAtom(selectedCoffeeAtom);
  const [showCoffeeDetails, setShowCoffeeDetails] = useAtom(showCoffeeDetailsAtom);

  /* 
    조건: 선택된 커피나 모달 표시 상태가 없으면 렌더링 중지.
  */
  if (!selectedCoffee || !showCoffeeDetails) {
    return null;
  }

  /* 
    handleClose: 모달 닫기 처리.
    모달 표시 상태를 false로 설정.
  */
  const handleClose = () => {
    setShowCoffeeDetails(false);
  };

  /* 
    테이스팅 옵션 배열 정의.
    각 옵션은 0~10 범위를 5단계로 매핑.
  */
  const sweetOptions = ['No', 'Low', 'Medium', 'Good', 'High'];
  const bodyOptions = ['Very Light', 'Light', 'Medium', 'Full', 'Very Full'];
  const acidityOptions = ['No', 'Low', 'Medium', 'Good', 'High'];
  const bitterOptions = ['No', 'Low', 'Medium', 'Good', 'High'];

  /* 
    수치값을 옵션 인덱스로 변환.
    선택된 커피의 속성에 따라 인덱스 계산.
  */
  const selectedSweetIndex = mapValueToTastingOption(selectedCoffee.sweetness, sweetOptions);
  const selectedBodyIndex = mapValueToTastingOption(selectedCoffee.body, bodyOptions);
  const selectedAcidityIndex = mapValueToTastingOption(selectedCoffee.acidity, acidityOptions);
  const selectedBitterIndex = mapValueToTastingOption(selectedCoffee.bitterness, bitterOptions);

  /* 
    플레이버 목록: 최대 4개까지만 추출.
  */
  const flavors = selectedCoffee.flavor.slice(0, 4);

  /* 
    컴포넌트 렌더링:
    - 모달 오버레이와 콘텐츠 포함.
    - 각 섹션(헤더, 프로필, 요약 등)별로 데이터 표시.
  */
  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* 헤더 섹션: 제목과 닫기 버튼 */}
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{selectedCoffee.name}</h1>
            <button className={styles.exitButton} onClick={handleClose}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <span className={styles.koreanTitle}>{selectedCoffee.koreanName}</span>
        </div>

        {/* 프로필 섹션: 커피 기본 정보 */}
        <div className={styles.profileSection}>
          <h2 className={styles.profileTitle}>Profile</h2>
          <div className={styles.profileGrid}>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Origin (원산지)</span>
              <span className={styles.profileValue}>{selectedCoffee.origin}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Processing Method (가공 방식)</span>
              <span className={styles.profileValue}>{selectedCoffee.process}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Roast Level (로스팅)</span>
              <span className={styles.profileValue}>
                {selectedCoffee.roastLevel.charAt(0).toUpperCase() + selectedCoffee.roastLevel.slice(1)} Roast
              </span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Altitude (고도)</span>
              <span className={styles.profileValue}>{selectedCoffee.altitude}</span>
            </div>
          </div>
        </div>

        {/* 요약 섹션: 커피 설명 */}
        <div className={styles.summarySection}>
          <p className={styles.summaryText}>
            {selectedCoffee.koreanDescription || selectedCoffee.memoStyle}
          </p>
        </div>

        {/* 플레이버 섹션: 맛 프로필 이미지 */}
        <div className={styles.flavoursSection}>
          <h2 className={styles.flavoursTitle}>Flavours</h2>
          <div className={styles.flavourGrid}>
            {flavors.map((flavor, index) => (
              <div key={index} className={styles.flavourCard}>
                <div className={styles.imageContainer}>
                  <div className={styles.imageBorder}></div>
                  <div
                    className={styles.flavorImage}
                    style={{
                      backgroundImage: `url(${getFlavorImagePath(flavor)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
                <span className={styles.flavourName}>{flavor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 테이스팅 노트 섹션: 맛 옵션 표시 */}
        <div className={styles.tastingSection}>
          <h2 className={styles.tastingTitle}>Tasting Note</h2>
          <div className={styles.tastingOptions}>
            <div className={`${styles.tastingOption} ${styles.sweetOption}`}>
              <span className={styles.tastingLabel}>{'SWEET\n(단맛)'}</span>
              <div className={styles.optionValues}>
                {sweetOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.optionValue} ${
                      index === selectedSweetIndex ? styles.selected : ''
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.tastingOption} ${styles.bodyOption}`}>
              <span className={styles.tastingLabel}>{'BODY\n(바디감)'}</span>
              <div className={styles.optionValues}>
                {bodyOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.optionValue} ${
                      index === selectedBodyIndex ? styles.selected : ''
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.tastingOption} ${styles.acidityOption}`}>
              <span className={styles.tastingLabel}>{'ACIDITY\n(산미)'}</span>
              <div className={styles.optionValues}>
                {acidityOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.optionValue} ${
                      index === selectedAcidityIndex ? styles.selected : ''
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.tastingOption} ${styles.bitterOption}`}>
              <span className={styles.tastingLabel}>{'Bitter\n(쓴맛)'}</span>
              <div className={styles.optionValues}>
                {bitterOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.optionValue} ${
                      index === selectedBitterIndex ? styles.selected : ''
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 추천 섹션: 적합한 용도 */}
        <div className={styles.perfectForSection}>
          <h2 className={styles.perfectForTitle}>Perfect For</h2>
          <p className={styles.perfectForText}>{selectedCoffee.recommendFor}</p>
        </div>
      </div>
    </div>
  );
};

/* 
  컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄.
  import CoffeeDetails from './CoffeeDetails'로 가져올 수 있음.
*/
export default CoffeeDetails;