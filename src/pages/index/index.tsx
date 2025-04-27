import styles from './styles/index.module.scss';

function index() {
  return (
    <div className={styles.page}>
        {/*공통 헤더 UI 부분 */}
        {/* 공통 네비게이션 UI 부분 */}
        <div className={styles.page_contents}>
            <div className={styles.page_contents_introBox}>
                <div className={styles.wrapper}>
                    <span className={styles.wrapper_title}>PhotoSplash</span>
                    <span className={styles.wrapper_desc}>
                        인터넷의 시각 자료 출처입니다. <br />
                        사진을 찾고, 공유하고, 영감을 얻으세요.
                    </span>
                    {/* 검색창 UI 부분 */}
                </div>
            </div>
            <div className={styles.page_contents_imageBox}></div>
        </div>
        {/* 공통 푸터 UI 부분 */}   
    </div>
  )
}

export default index