/* 
  필요한 외부 라이브러리와 커스텀 모듈 가져오기.
  - useAtom: 상태 관리 라이브러리 Jotai의 훅.
  - useState: React의 상태 관리 훅.
  - atoms: 커피 관련 상태를 정의한 Jotai 원자.
  - coffeeData: 커피 데이터 배열.
  - CoffeeImage, Loading: 커스텀 컴포넌트.
  - styles: SCSS 모듈에서 가져온 스타일.
*/
import { useAtom } from 'jotai';
import { useState } from 'react';
import { selectedCoffeeAtom, showCoffeeDetailsAtom, isLoadingModalAtom } from '../../jotai/atoms/coffeeAtoms';
import { coffeeBeans } from '../../data/coffeeData';
import CoffeeImage from '../CoffeeImage';
import Loading from '../Loading/Loading';
import styles from './CoffeeSelector.module.scss';

/* 
  컴포넌트가 받을 속성(props)의 타입 정의.
  - onSelectCoffee: 커피 선택 시 호출되는 함수 (선택 사항).
*/
interface CoffeeSelectorProps {
  onSelectCoffee?: (coffeeId: string) => void;
}

/* 
  내비게이션 탭 타입: 'coffee', 'blend', 'archive' 중 하나.
  탭 전환에 사용됨.
*/
type NavTab = 'coffee' | 'blend' | 'archive';

/* 
  CoffeeSelector 컴포넌트: 커피를 선택하거나 표시하는 메인 컴포넌트.
  카드 뷰를 지원하며, 탭 기능 포함.
*/
const CoffeeSelector: React.FC<CoffeeSelectorProps> = ({ 
  onSelectCoffee
}) => {
  /* 
    상태 관리: Jotai 원자를 사용해 상태를 관리.
    - setSelectedCoffee: 선택된 커피를 저장.
    - setShowCoffeeDetails: 상세보기 모달 표시 여부.
    - isLoadingModal, setIsLoadingModal: 로딩 모달 상태.
    - localTab, setLocalTab: 현재 선택된 탭.
  */
  const [, setSelectedCoffee] = useAtom(selectedCoffeeAtom);
  const [, setShowCoffeeDetails] = useAtom(showCoffeeDetailsAtom);
  const [isLoadingModal, setIsLoadingModal] = useAtom(isLoadingModalAtom);
  const [localTab, setLocalTab] = useState<NavTab>('coffee'); // 기본 탭: 'coffee'

  /* 
    handleCoffeeSelect: 커피를 선택할 때 실행.
    - 선택된 커피를 찾아 로딩 후 상태에 저장.
    - 2.5초 지연 후 상세보기 또는 onSelectCoffee 호출.
  */
  const handleCoffeeSelect = async (coffeeId: string) => {
    const selected = coffeeBeans.find(bean => bean.id === coffeeId); // 선택된 커피 찾기
    if (selected) {
      setIsLoadingModal(true); // 로딩 시작
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2500)); // 2.5초 대기
        setSelectedCoffee(selected); // 선택된 커피 저장
        
        if (onSelectCoffee) {
          onSelectCoffee(coffeeId); // 외부 콜백 실행
        } else {
          setShowCoffeeDetails(true); /* 상세보기 열기 */
        }
      } finally {
        setIsLoadingModal(false); /* 로딩 끝 */
      }
    }
  };

  /* 
    handleTabClick: 탭 클릭 시 실행.
    - 탭 상태 변경.
  */
  const handleTabClick = (tab: NavTab) => {
    setLocalTab(tab); /* 탭 상태 업데이트 */
  };

  /* 
    handleLogoClick: 로고 클릭 시 실행.
    - 페이지 새로고침
  */
  const handleLogoClick = () => {
    window.location.reload(); // 페이지 새로고침
  };

  /* 
    카드 레이아웃 생성: 6개 카드씩 행으로 나누기.
    - rows: 각 행의 커피 배열.
    - rowItems: 현재 행에 추가되는 항목.
    - dummy 항목 추가로 마지막 행 채움.
  */
  const cardsPerRow = 6; /* 한 행에 6개 카드 */
  const rows = [];
  let rowItems = [];
  
  coffeeBeans.forEach((bean, index) => {
    rowItems.push(bean); /* 행에 커피 추가 */
    
    if (rowItems.length === cardsPerRow || index === coffeeBeans.length - 1) {
      rows.push([...rowItems]); /* 행 완료 시 추가 */
      rowItems = []; /* 새 행 시작 */
    }
  });
  
  const lastRow = rows[rows.length - 1]; /* 마지막 행 */
  if (lastRow && lastRow.length < cardsPerRow) {
    const dummyCount = cardsPerRow - lastRow.length; /* 비어 있는 칸 수 */
    for (let i = 0; i < dummyCount; i++) {
      lastRow.push(null); /* 더미 항목 추가 */
    }
  }

  /* 
    컴포넌트 렌더링:
    - 카드 뷰로만 표시.
    - 로딩, 헤더, 콘텐츠, 푸터 포함.
  */
  return (
    <div className={styles.coffeeBeanPage}>
      <Loading isVisible={isLoadingModal} /> {/* 로딩 표시 */}

      {/* 헤더: 로고 표시, 클릭 시 새로고침 */}
      <div className={styles.coffeeBeanHeader}>
        <h1 className={styles.clickableLogo} onClick={handleLogoClick}>Coffee2</h1>
      </div>

      {/* 콘텐츠: 카드 레이아웃 */}
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

      {/* 푸터: 내비게이션 탭 */}
      <footer className={styles.navigationFooter}>
        <button 
          className={`${styles.navButton} ${localTab === 'coffee' ? styles.active : ''}`}
          onClick={() => handleTabClick('coffee')}
        >
          Coffee Bean
          <div className={styles.arrowIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        <button 
          className={`${styles.navButton} ${localTab === 'blend' ? styles.active : ''}`}
          onClick={() => handleTabClick('blend')}
        >
          Blend
          <div className={styles.arrowIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        <button 
          className={`${styles.navButton} ${localTab === 'archive' ? styles.active : ''}`}
          onClick={() => handleTabClick('archive')}
        >
          Archive
          <div className={styles.arrowIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 14V5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </footer>
    </div>
  );
};

/* 
  컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄.
  import CoffeeSelector from './CoffeeSelector'로 가져올 수 있음.
*/
export default CoffeeSelector;