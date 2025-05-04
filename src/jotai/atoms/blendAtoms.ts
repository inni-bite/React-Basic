import { atom } from 'jotai';
import { CoffeeBlend, BlendComponent } from '../../data/blendData';

// 현재 블렌딩 작업 중인 컴포넌트 목록
export const blendingComponentsAtom = atom<BlendComponent[]>([]);

// 블렌딩 워크스테이션 표시 여부
export const showBlendingWorkstationAtom = atom<boolean>(false);

// 블렌딩 결과 표시 여부
export const showBlendResultAtom = atom<boolean>(false);

// 블렌딩 결과
export const blendResultAtom = atom<CoffeeBlend | null, [CoffeeBlend | null], void>(
  (_get) => _get(blendResultAtom), // 읽기 getter (기본값 null)
  (_get, set, newValue: CoffeeBlend | null) => {
    set(blendResultAtom, newValue); // 쓰기 setter
  }
);

// 저장된 블렌드 목록
export const savedBlendsAtom = atom<CoffeeBlend[]>([]);

// 비교 중인 블렌드들 (최대 2개)
export const comparingBlendsAtom = atom<CoffeeBlend[]>([]);

// 블렌드 비교 모달 표시 여부
export const showBlendCompareAtom = atom<boolean>(false);

// 블렌드 결과 애니메이션 상태
export const blendAnimationStateAtom = atom<'idle' | 'processing' | 'complete'>('idle');