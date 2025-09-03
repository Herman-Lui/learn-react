import { create } from 'zustand';
export const useTheme = create((set) => ({
    dark: false,
    toggle: () => set((s) => ({ dark: !s.dark }))
}));
