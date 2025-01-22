import { create } from 'zustand';
import { Section, Theme, Portfolio, DeviceType } from '../types';

interface PortfolioState {
  portfolio: Portfolio;
  addSection: (section: Section) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, content: Record<string, any>) => void;
  updateTheme: (theme: Partial<Theme>) => void;
  reorderSections: (sections: Section[]) => void;
  setPreviewDevice: (device: DeviceType) => void;
}

const defaultTheme: Theme = {
  primaryColor: '#3b82f6',
  secondaryColor: '#1e40af',
  darkMode: false,
};

const useStore = create<PortfolioState>((set) => ({
  portfolio: {
    sections: [],
    theme: defaultTheme,
    previewDevice: 'desktop',
  },
  addSection: (section) =>
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        sections: [...state.portfolio.sections, section],
      },
    })),
  removeSection: (id) =>
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        sections: state.portfolio.sections.filter((s) => s.id !== id),
      },
    })),
  updateSection: (id, content) =>
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        sections: state.portfolio.sections.map((s) =>
          s.id === id ? { ...s, content } : s
        ),
      },
    })),
  updateTheme: (theme) =>
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        theme: { ...state.portfolio.theme, ...theme },
      },
    })),
  reorderSections: (sections) =>
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        sections,
      },
    })),
  setPreviewDevice: (device) =>
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        previewDevice: device,
      },
    })),
}));

export default useStore;