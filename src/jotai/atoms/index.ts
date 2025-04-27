import { atom } from 'jotai';
import type { ReactNode } from 'react';

// Constants
const GRID_SIZE = 5;

// Types
export interface Equipment {
  id: string;
  name: string;
  icon: string | ReactNode;
}

export interface GridCell {
  id: string;
  equipmentId: string | null;
}

// Sample Data
const dummyEquipments: Equipment[] = [
  { id: 'tent', name: '텐트', icon: '🏕️' },
  { id: 'chair', name: '의자', icon: '🪑' },
  { id: 'fire', name: '캠프파이어', icon: '🔥' },
  { id: 'lantern', name: '랜턴', icon: '🏮' },
  { id: 'tree', name: '나무', icon: '🌲' },
  { id: 'backpack', name: '배낭', icon: '🎒' },
];

// Grid Generation
const createInitialGrid = (): GridCell[][] =>
  Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, col) => ({
      id: `${row}-${col}`,
      equipmentId: null,
    }))
  );

// Atoms
export const equipmentsAtom = atom<Equipment[]>(dummyEquipments);

// selectedEquipmentAtom 수정: get 매개변수 제거
export const selectedEquipmentAtom = atom<Equipment | null, [Equipment | null], void>(
  null, // 초기값
  (_get, set, update) => {
    set(selectedEquipmentAtom, update); // _get으로 변경하여 사용하지 않음을 명시
  }
);

export const campGridAtom = atom<GridCell[][]>(createInitialGrid());