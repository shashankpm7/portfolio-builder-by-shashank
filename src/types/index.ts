export type Section = {
  id: string;
  type: 'hero' | 'about' | 'portfolio' | 'contact' | 'techstack' | 'experience' | 'custom';
  content: Record<string, any>;
};

export type Theme = {
  primaryColor: string;
  secondaryColor: string;
  darkMode: boolean;
};

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export type Portfolio = {
  sections: Section[];
  theme: Theme;
  previewDevice: DeviceType;
};