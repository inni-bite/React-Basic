/* 
  React와 useEffect를 가져옴. React는 화면(UI)을 만드는 도구이고, 
  useEffect는 특정 조건이 바뀔 때 추가 작업(예: 오디오 재생)을 처리.
*/
import React, { useEffect } from 'react';
/* 
  useAtom은 jotai라는 상태 관리 도구에서 가져옴. 
  이를 통해 오디오 재생 상태를 앱 전체에서 공유.
*/
import { useAtom } from 'jotai';
/* 
  오디오 재생 상태를 관리하는 atom(상태 저장소). 
  이 상태는 로딩 중 오디오가 재생 중인지 나타냄.
*/
import { isGrindingSoundPlayingAtom } from '../../jotai/atoms/coffeeAtoms';
/* 
  SCSS 모듈로 작성된 스타일 파일. 
  로딩 화면의 디자인(예: 위치, 크기)을 정의.
*/
import styles from './Loading.module.scss';

/* 
  Loading 컴포넌트가 받을 속성(props)의 타입 정의.
  isVisible: 로딩 화면을 보여줄지(true) 숨길지(false) 결정.
*/
interface LoadingProps {
  isVisible: boolean;
}

/* 
  Loading 컴포넌트: 로딩 화면을 표시하고, 오디오와 비디오를 재생.
  React.FC는 함수형 컴포넌트를 의미하며, LoadingProps 타입을 따름.
*/
const Loading: React.FC<LoadingProps> = ({ isVisible }) => {
  /* 
    jotai의 useAtom을 사용해 오디오 재생 상태를 읽고 업데이트.
    setIsGrindingSoundPlaying: 오디오 재생 상태를 변경하는 함수.
  */
  const [, setIsGrindingSoundPlaying] = useAtom(isGrindingSoundPlayingAtom);

  /* 
    오디오 관련 상수: 하드코딩된 값을 한 곳에 모아 관리.
    이렇게 하면 나중에 값을 바꾸기 쉬움.
  */
  const AUDIO_SETTINGS = {
    SRC: '/grinding-coffee.mp3', // 재생할 오디오 파일 경로
    INITIAL_VOLUME: 0.5, // 시작 볼륨 (0~1 사이, 0.5는 중간)
    START_TIME: 9.2, // 오디오 재생 시작 지점 (9.2초부터)
    DURATION: 2200, // 총 재생 시간 (2.2초)
    FADE_OUT_START: 1700, // 페이드아웃 시작 시점 (1.7초)
    FADE_OUT_INTERVAL: 50, // 볼륨 조절 간격 (50ms마다)
  };

  /* 
    useEffect: isVisible 값이 바뀔 때마다 실행.
    로딩 화면이 보일 때(isVisible이 true) 오디오를 재생하고, 
    사라질 때 cleanup(정리) 작업 수행.
  */
  useEffect(() => {
    if (isVisible) {
      /* 
        새로운 오디오 객체 생성. 
        '/grinding-coffee.mp3' 파일을 재생할 준비.
      */
      const audio = new Audio(AUDIO_SETTINGS.SRC);
      /* 
        오디오 재생 상태를 true로 설정.
        앱에서 "지금 오디오가 재생 중"임을 알림.
      */
      setIsGrindingSoundPlaying(true);

      /* 
        오디오 초기 설정:
        - 볼륨: 0.5 (중간 크기)
        - 시작 지점: 9.2초부터 재생
      */
      audio.volume = AUDIO_SETTINGS.INITIAL_VOLUME;
      audio.currentTime = AUDIO_SETTINGS.START_TIME;

      /* 
        오디오 재생 시간과 페이드아웃을 관리하기 위한 변수.
        - startTime: 오디오가 시작된 시점 (현재 시간)
      */
      const startTime = Date.now();

      /* 
        페이드아웃 효과: 오디오 볼륨을 점점 줄이는 함수.
        50ms마다 실행되어 볼륨을 조절.
      */
      const fadeOutInterval = setInterval(() => {
        /* 
          현재 시간이 시작 시점에서 얼마나 지났는지 계산.
          예: 1000ms는 1초 경과.
        */
        const currentTime = Date.now() - startTime;

        /* 
          페이드아웃 시작 시점(1.7초) 이후라면 볼륨을 점점 줄임.
          - fadeProgress: 페이드아웃 진행 정도 (0~1 사이)
          - 볼륨은 0.5에서 시작해 0까지 부드럽게 감소.
        */
        if (currentTime >= AUDIO_SETTINGS.FADE_OUT_START) {
          const fadeProgress =
            (currentTime - AUDIO_SETTINGS.FADE_OUT_START) /
            (AUDIO_SETTINGS.DURATION - AUDIO_SETTINGS.FADE_OUT_START);
          audio.volume = Math.max(0, AUDIO_SETTINGS.INITIAL_VOLUME * (1 - fadeProgress));
        }

        /* 
          총 재생 시간(2.2초)에 도달하면:
          - 페이드아웃 타이머 종료
          - 오디오 재생 중지
          - 오디오 재생 상태를 false로 설정
        */
        if (currentTime >= AUDIO_SETTINGS.DURATION) {
          clearInterval(fadeOutInterval);
          audio.pause();
          setIsGrindingSoundPlaying(false);
        }
      }, AUDIO_SETTINGS.FADE_OUT_INTERVAL);

      /* 
        오디오 재생 시작.
        오류가 발생하면(예: 브라우저 제한) 콘솔에 오류 메시지 출력.
      */
      audio.play().catch((error) => {
        console.error('Audio playback failed:', error);
      });

      /* 
        cleanup 함수: 컴포넌트가 사라지거나 isVisible이 false가 될 때 실행.
        - 페이드아웃 타이머 종료
        - 오디오 재생 중지
        - 오디오 재생 위치를 처음(0초)으로 되돌림
        - 오디오 재생 상태를 false로 설정
      */
      return () => {
        clearInterval(fadeOutInterval);
        audio.pause();
        audio.currentTime = 0;
        setIsGrindingSoundPlaying(false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, setIsGrindingSoundPlaying]); // 의존성 배열: isVisible이나 setIsGrindingSoundPlaying이 바뀔 때 useEffect 재실행

  /* 
    로딩 화면이 보이지 않을 때(isVisible이 false) 아무것도 렌더링하지 않음.
    null을 반환하면 화면에 아무것도 표시되지 않음.
  */
  if (!isVisible) return null;

  /* 
    로딩 화면 렌더링:
    - loadingWrapper: 전체 로딩 화면을 감싸는 div
    - loadingContent: 비디오를 가운데 정렬하는 div
    - video: 로딩 애니메이션 비디오(/images/loading/loading.mp4)를 재생
  */
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingContent}>
        <video
          src="/images/loading/loading.mp4" // 재생할 비디오 파일 경로
          autoPlay // 페이지 로드 시 자동 재생
          muted // 비디오 소음 방지를 위해 음소거
          playsInline // 모바일에서 전체 화면으로 재생되지 않도록
          className={styles.loadingImage} // 비디오에 적용할 스타일 클래스
        />
      </div>
    </div>
  );
};

/* 
  컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄.
  다른 코드에서 import Loading from './Loading'으로 가져올 수 있음.
*/
export default Loading;