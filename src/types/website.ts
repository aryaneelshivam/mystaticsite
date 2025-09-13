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

export interface HeroConfig {
  backgroundImage: string;
  heading: string;
  alignment: 'left' | 'center' | 'right';
  font: string;
}

export interface AnnouncementConfig {
  enabled: boolean;
  text: string;
}

export interface ScrollingTextConfig {
  text: string;
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
  content: string;
}

export interface FooterConfig {
  text: string;
  links: Array<{
    id: string;
    text: string;
    url: string;
  }>;
  alignment: 'left' | 'center' | 'right';
}

export interface WebsiteConfig {
  navbar: NavbarConfig;
  hero: HeroConfig;
  announcement: AnnouncementConfig;
  scrollingText: ScrollingTextConfig;
  cards: CardsConfig;
  textArea: TextAreaConfig;
  footer: FooterConfig;
}