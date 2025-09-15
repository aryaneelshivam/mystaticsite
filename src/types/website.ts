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
  enabled: boolean;
  cards: CardConfig[];
}

export interface TextSection {
  id: string;
  heading?: string;
  content: string;
  image?: string;
  imageFile?: File;
  alignment: 'left' | 'center' | 'right';
  layout: 'text-only' | 'image-left' | 'image-right' | 'image-top' | 'image-bottom';
}

export interface TextAreaConfig {
  sections: TextSection[];
}

export interface CTAConfig {
  heading: string;
  subtitle?: string;
  ctaButtons: CTAButton[];
  backgroundColor: string;
  textColor: string;
  alignment: 'left' | 'center' | 'right';
  font: string;
  buttonAlignment: 'left' | 'center' | 'right';
  image?: string;
  imageFile?: File;
  layout: 'text-only' | 'image-left' | 'image-right' | 'image-top' | 'image-bottom';
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

export interface SEOConfig {
  enabled: boolean;
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  twitterSite: string;
  twitterCreator: string;
  canonicalUrl: string;
  robots: string;
  viewport: string;
  themeColor: string;
  favicon: string;
}

export type SectionType = 'announcement' | 'navbar' | 'hero' | 'scrollingText' | 'textArea' | 'cards' | 'cta' | 'footer';

export interface WebsiteConfig {
  navbar: NavbarConfig;
  hero: HeroConfig;
  announcement: AnnouncementConfig;
  scrollingText: ScrollingTextConfig;
  cards: CardsConfig;
  textArea: TextAreaConfig;
  cta: CTAConfig;
  footer: FooterConfig;
  sectionOrder: SectionType[];
  seo?: SEOConfig;
}