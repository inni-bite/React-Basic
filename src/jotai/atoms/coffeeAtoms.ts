import { atom } from 'jotai';
import { CoffeeBean } from '../../data/coffeeData';

// Atom for the selected coffee bean
export const selectedCoffeeAtom = atom<CoffeeBean | null>(null);

// Atom for controlling the display of coffee details
export const showCoffeeDetailsAtom = atom<boolean>(false);

// Atom for tracking the grinding sound playing state
export const isGrindingSoundPlayingAtom = atom<boolean>(false);