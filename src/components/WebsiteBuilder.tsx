import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Code, Eye, Palette, Download } from 'lucide-react';
import { WebsiteConfig } from '@/types/website';
import { NavbarEditor } from './editors/NavbarEditor';
import { HeroEditor } from './editors/HeroEditor';
import { AnnouncementEditor } from './editors/AnnouncementEditor';
import { ScrollingTextEditor } from './editors/ScrollingTextEditor';
import { CardsEditor } from './editors/CardsEditor';
import { TextAreaEditor } from './editors/TextAreaEditor';
import { FooterEditor } from './editors/FooterEditor';
import { WebsitePreview } from './WebsitePreview';
import { CodeGenerator } from './CodeGenerator';
import defaultHeroBg from '@/assets/default-hero-bg.jpg';

const defaultConfig: WebsiteConfig = {
  navbar: {
    enabled: true,
    logo: { type: 'text', content: 'Your Logo' },
    links: [
      { id: '1', text: 'Home', url: '#' },
      { id: '2', text: 'About', url: '#about' },
      { id: '3', text: 'Contact', url: '#contact' }
    ],
    alignment: 'left',
    font: 'Inter'
  },
  hero: {
    backgroundImage: defaultHeroBg,
    heading: 'Welcome to Your Website',
    alignment: 'center',
    font: 'Inter'
  },
  announcement: {
    enabled: false,
    text: 'Special offer: 50% off all products!'
  },
  scrollingText: {
    text: 'Building amazing websites • No code required • Professional results'
  },
  cards: {
    cards: [
      { id: '1', title: 'Feature One', description: 'Amazing feature description', image: '' },
      { id: '2', title: 'Feature Two', description: 'Another great feature', image: '' },
      { id: '3', title: 'Feature Three', description: 'One more awesome feature', image: '' }
    ]
  },
  textArea: {
    content: 'Add your main content here. This is where you can tell your story, describe your services, or share any important information with your visitors.'
  },
  footer: {
    text: '© 2024 Your Website. All rights reserved.',
    links: [
      { id: '1', text: 'Privacy Policy', url: '#privacy' },
      { id: '2', text: 'Terms of Service', url: '#terms' }
    ],
    alignment: 'center'
  }
};

export function WebsiteBuilder() {
  const [config, setConfig] = useState<WebsiteConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const updateConfig = (section: keyof WebsiteConfig, updates: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <div className="border-b bg-card shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">Website Builder</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={activeTab === 'preview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('preview')}
                className="transition-smooth"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                variant={activeTab === 'code' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('code')}
                className="transition-smooth"
              >
                <Code className="w-4 h-4 mr-2" />
                Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Editor Panel */}
        <div className="w-96 h-screen overflow-y-auto editor-panel border-r">
          <div className="p-6 space-y-4">
            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Navigation Bar</CardTitle>
              </CardHeader>
              <CardContent>
                <NavbarEditor
                  config={config.navbar}
                  onChange={(updates) => updateConfig('navbar', updates)}
                />
              </CardContent>
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Hero Section</CardTitle>
              </CardHeader>
              <CardContent>
                <HeroEditor
                  config={config.hero}
                  onChange={(updates) => updateConfig('hero', updates)}
                />
              </CardContent>
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Announcement Bar</CardTitle>
              </CardHeader>
              <CardContent>
                <AnnouncementEditor
                  config={config.announcement}
                  onChange={(updates) => updateConfig('announcement', updates)}
                />
              </CardContent>
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Scrolling Text</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollingTextEditor
                  config={config.scrollingText}
                  onChange={(updates) => updateConfig('scrollingText', updates)}
                />
              </CardContent>
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Cards Section</CardTitle>
              </CardHeader>
              <CardContent>
                <CardsEditor
                  config={config.cards}
                  onChange={(updates) => updateConfig('cards', updates)}
                />
              </CardContent>
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Text Area</CardTitle>
              </CardHeader>
              <CardContent>
                <TextAreaEditor
                  config={config.textArea}
                  onChange={(updates) => updateConfig('textArea', updates)}
                />
              </CardContent>
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Footer</CardTitle>
              </CardHeader>
              <CardContent>
                <FooterEditor
                  config={config.footer}
                  onChange={(updates) => updateConfig('footer', updates)}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview/Code Panel */}
        <div className="flex-1 h-screen overflow-hidden">
          {activeTab === 'preview' ? (
            <WebsitePreview config={config} />
          ) : (
            <CodeGenerator config={config} />
          )}
        </div>
      </div>
    </div>
  );
}