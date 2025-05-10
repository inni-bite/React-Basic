import React from 'react';
import { blendingComponentsAtom, showBlendingWorkstationAtom } from '../../jotai/atoms/blendAtoms';
import styles from './BlendCompare.module.scss';

// 더 이상 사용되지 않는 컴포넌트이지만 코드 유지를 위해 빈 화면 반환
const BlendCompare: React.FC = () => {
  return (
    <div className={styles.compareModal}>
      <div className={styles.compareContent} style={{ display: 'none' }}>
        {/* 빈 컴포넌트 */}
      </div>
    </div>
  );
};

export default BlendCompare;