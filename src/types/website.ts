export interface NavbarConfig {
  enabled: boolean;
  logo: {
    type: 'text' | 'image';
    content: string;
  };
  links: Array<{
    id: string;
    text: string;
    url: string;
  }>;
  alignment: 'left' | 'center' | 'right';
  font: string;
}

export interface CTAButton {
  id: string;
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface HeroConfig {
  backgroundImage: string;
  backgroundImageFile?: File;
  heading: string;
  subtitle?: string;
  ctaButtons: CTAButton[];
  alignment: 'left' | 'center' | 'right';
  font: string;
  height: 'small' | 'medium' | 'large' | 'full';
}

export interface AnnouncementConfig {
  enabled: boolean;
  text: string;
  backgroundColor: string;
}

export interface ScrollingTextConfig {
  text: string;
  backgroundColor: string;
}

export interface CardConfig {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface CardsConfig {
  cards: CardConfig[];
}

export interface TextAreaConfig {
  heading?: string;
  content: string;
}

export interface SocialLink {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'github' | 'custom';
  url: string;
  customIcon?: string;
}

export interface FooterConfig {
  text: string;
  logo?: {
    type: 'text' | 'image';
    content: string;
  };
  links: Array<{
    id: string;
    text: string;
    url: string;
  }>;
  socialLinks: SocialLink[];
  alignment: 'left' | 'center' | 'right';
}

export type SectionType = 'announcement' | 'navbar' | 'hero' | 'scrollingText' | 'textArea' | 'cards' | 'footer';

export interface WebsiteConfig {
  navbar: NavbarConfig;
  hero: HeroConfig;
  announcement: AnnouncementConfig;
  scrollingText: ScrollingTextConfig;
  cards: CardsConfig;
  textArea: TextAreaConfig;
  footer: FooterConfig;
  sectionOrder: SectionType[];
}