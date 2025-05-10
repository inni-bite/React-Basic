import { atom } from 'jotai';
import { BlendComponent } from '../../data/blendData';

// 현재 블렌딩 작업 중인 컴포넌트 목록
export const blendingComponentsAtom = atom<BlendComponent[]>([]);

// 블렌딩 워크스테이션 표시 여부
export const showBlendingWorkstationAtom = atom<boolean>(false);

// 블렌드 결과 애니메이션 상태
export const blendAnimationStateAtom = atom<'idle' | 'processing' | 'complete'>('idle');

// 블렌딩이 완료되었는지 여부 (BlendingWorkstation.tsx에서 사용)
export const isBlendedAtom = atom<boolean>(false);

// 선택된 원두 ID 목록 (BlendingWorkstation.tsx에서 UI 관리용으로 사용)
export const selectedBeanIdsAtom = atom<string[]>([]);
