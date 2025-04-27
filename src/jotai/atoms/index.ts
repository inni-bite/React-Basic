import { atom } from 'jotai';

// 타입 정의
export interface Equipment {
  id: string;
  name: string;
  icon: string;
}

export interface GridCell {
  id: string;
  equipmentId: string | null;
}

// SetStateAction 타입을 직접 정의
export type SetStateAction<T> = T | ((prev: T) => T);
export type SetSelectedEquipment = (update: SetStateAction<Equipment | null>) => void;

// 더미 장비 데이터
const dummyEquipments: Equipment[] = [
  { id: 'tent', name: '텐트', icon: '🏕️' },
  { id: 'chair', name: '의자', icon: '🪑' },
  { id: 'fire', name: '캠프파이어', icon: '🔥' },
  { id: 'lantern', name: '랜턴', icon: '🏮' },
  { id: 'tree', name: '나무', icon: '🌲' },
  { id: 'backpack', name: '배낭', icon: '🎒' },
];

// 초기 그리드 생성 (5x5)
const createInitialGrid = (): GridCell[][] => {
  const grid: GridCell[][] = [];
  
  for (let row = 0; row < 5; row++) {
    const rowCells: GridCell[] = [];
    for (let col = 0; col < 5; col++) {
      rowCells.push({
        id: `${row}-${col}`,
        equipmentId: null
      });
    }
    grid.push(rowCells);
  }
  
  return grid;
};

// 장비 목록 상태
export const equipmentsAtom = atom<Equipment[]>(dummyEquipments);

// 현재 선택된 장비 상태
export const selectedEquipmentAtom = atom<Equipment | null>(null);

// 캠프 그리드 상태
export const campGridAtom = atom<GridCell[][]>(createInitialGrid());