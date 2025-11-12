
import { create } from 'zustand';

export const useStore = create((set) => ({
  currentTrip: null,

  isDay: () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 20;
  },

  startTrip: (tripData) => set({ currentTrip: tripData }),
  clearTrip: () => set({ currentTrip: null }),
}));