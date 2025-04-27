import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { ReactNode } from 'react';

// Constants
const GRID_SIZE = 5;

// Types
export interface Equipment {
  id: string;
  name: string;
  icon: string | ReactNode;  // 아이콘 타입 확장
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
      equipmentId: null
    }))
  );

// Atoms
export const equipmentsAtom = atom<Equipment[]>(dummyEquipments);
export const selectedEquipmentAtom = atom<Equipment | null>(null);
export const campGridAtom = atom<GridCell[][]>(createInitialGrid());

// Atom Family for optimized grid cells
export const cellAtomFamily = atomFamily((id: string) => 
  atom<GridCell>({ id, equipmentId: null })
);