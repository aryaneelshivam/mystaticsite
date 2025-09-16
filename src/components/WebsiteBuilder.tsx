import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Code, Eye, Palette, Download, GripVertical, Monitor, Smartphone, ChevronDown, ChevronRight, Camera, Lock, Flame } from 'lucide-react';
import { Logo } from './Logo';
import { AuthButton } from './AuthButton';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { WebsiteConfig, SectionType } from '@/types/website';
import { SEOPopup } from './SEOPopup';
import { NavbarEditor } from './editors/NavbarEditor';
import { HeroEditor } from './editors/HeroEditor';
import { AnnouncementEditor } from './editors/AnnouncementEditor';
import { ScrollingTextEditor } from './editors/ScrollingTextEditor';
import { CardsEditor } from './editors/CardsEditor';
import { TextAreaEditor } from './editors/TextAreaEditor';
import { StatsEditor } from './editors/StatsEditor';
import { CTAEditor } from './editors/CTAEditor';
import { FooterEditor } from './editors/FooterEditor';
import { WebsitePreview } from './WebsitePreview';
import { CodeGenerator } from './CodeGenerator';
import defaultHeroBg from '@/assets/default-hero-bg.jpg';
import html2canvas from 'html2canvas';

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
    subtitle: 'Create amazing websites with our powerful builder',
    ctaButtons: [
      { id: '1', text: 'Get Started', url: '#get-started', variant: 'primary' },
      { id: '2', text: 'Learn More', url: '#learn-more', variant: 'outline' }
    ],
    alignment: 'center',
    font: 'Inter',
    height: 'medium'
  },
  announcement: {
    enabled: false,
    text: 'Special offer: 50% off all products!',
    backgroundColor: '#667eea'
  },
  scrollingText: {
    text: 'Building amazing websites • No code required • Professional results',
    backgroundColor: '#111827'
  },
  cards: {
    enabled: false,
    cards: [
      { id: '1', title: 'Feature One', description: 'Amazing feature description', image: '' },
      { id: '2', title: 'Feature Two', description: 'Another great feature', image: '' },
      { id: '3', title: 'Feature Three', description: 'One more awesome feature', image: '' }
    ]
  },
  textArea: {
    sections: [
      {
        id: '1',
        heading: 'About Us',
        content: 'Add your main content here. This is where you can tell your story, describe your services, or share any important information with your visitors.',
        alignment: 'left',
        layout: 'text-only'
      }
    ]
  },
  stats: {
    enabled: false,
    items: [
      {
        number: '1000',
        suffix: '+',
        label: 'Happy Customers',
        description: 'Satisfied clients worldwide'
      },
      {
        number: '50',
        suffix: '+',
        label: 'Projects Completed',
        description: 'Successfully delivered projects'
      },
      {
        number: '5',
        suffix: '★',
        label: 'Average Rating',
        description: 'Based on customer reviews'
      }
    ],
    layout: 'horizontal',
    alignment: 'center',
    backgroundColor: '#f8fafc',
    numberColor: '#1e40af',
    labelColor: '#374151',
    suffixColor: '#1e40af',
    descriptionColor: '#6b7280',
    numberSize: 'large',
    labelSize: 'medium',
    labelWeight: 'normal'
  },
  cta: {
    heading: 'Ready to Get Started?',
    subtitle: 'Join thousands of satisfied customers and start building your dream website today.',
    ctaButtons: [
      { id: '1', text: 'Start Free Trial', url: '#signup', variant: 'primary' },
      { id: '2', text: 'Learn More', url: '#learn', variant: 'outline' }
    ],
    backgroundColor: '#667eea',
    textColor: '#ffffff',
    alignment: 'center',
    font: 'Inter',
    buttonAlignment: 'center',
    layout: 'text-only'
  },
  footer: {
    text: '© 2024 Your Website. All rights reserved.',
    logo: {
      type: 'text',
      content: 'Your Logo'
    },
    links: [
      { id: '1', text: 'Privacy Policy', url: '#privacy' },
      { id: '2', text: 'Terms of Service', url: '#terms' }
    ],
    socialLinks: [
      { id: '1', platform: 'facebook', url: 'https://facebook.com' },
      { id: '2', platform: 'twitter', url: 'https://twitter.com' },
      { id: '3', platform: 'instagram', url: 'https://instagram.com' }
    ],
    alignment: 'center'
  },
  sectionOrder: ['announcement', 'navbar', 'hero', 'scrollingText', 'textArea', 'cards', 'stats', 'cta', 'footer']
};

export function WebsiteBuilder() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [config, setConfig] = useState<WebsiteConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    navbar: false,
    hero: false,
    announcement: false,
    scrollingText: false,
    cards: false,
    textArea: false,
    stats: false,
    cta: false,
    footer: false
  });
  const [showSEOPopup, setShowSEOPopup] = useState(false);

  const updateConfig = (section: keyof WebsiteConfig, updates: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    setConfig(prev => {
      const newOrder = [...prev.sectionOrder];
      const [movedSection] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, movedSection);
      return {
        ...prev,
        sectionOrder: newOrder
      };
    });
  };

  const getSectionTitle = (sectionType: SectionType) => {
    const titles = {
      announcement: '🍞 Announcement Bar',
      navbar: '🍔 Navigation Bar',
      hero: '🍕 Hero Section',
      scrollingText: '🌮 Scrolling Text',
      textArea: '🍜 Text Section',
      cards: '🍰 Cards Section',
      stats: '📊 Statistics',
      cta: '🍩 Call-to-Action',
      footer: '🍪 Footer'
    };
    return titles[sectionType];
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const takeScreenshot = async () => {
    try {
      // Find the preview container
      const previewElement = document.querySelector('.preview-bg');
      if (!previewElement) {
        alert('Preview not found. Please make sure you are in preview mode.');
        return;
      }

      // Show loading state
      const button = document.querySelector('[data-screenshot-button]') as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.innerHTML = '<div class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>';
      }

      // Take screenshot
      const canvas = await html2canvas(previewElement as HTMLElement, {
        backgroundColor: '#f3f4f6', // Match the preview background
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        width: previewElement.scrollWidth,
        height: previewElement.scrollHeight,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `website-preview-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset button
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>';
      }

    } catch (error) {
      console.error('Error taking screenshot:', error);
      alert('Failed to take screenshot. Please try again.');
      
      // Reset button
      const button = document.querySelector('[data-screenshot-button]') as HTMLButtonElement;
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>';
      }
    }
  };

  // Show mobile-only message on mobile devices
  if (isMobile) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Monitor className="w-16 h-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">Desktop Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              This website builder is designed for desktop and laptop computers only. 
              Please access this application from a desktop or laptop device for the best experience.
            </p>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm font-medium">Recommended devices:</p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm">Desktop</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm">Laptop</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b bg-card shadow-md">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size={32} />
              <h1 className="text-xl font-semibold text-foreground">MyStaticSite</h1>
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
                onClick={() => user ? setActiveTab('code') : null}
                className="transition-smooth"
                disabled={!user}
              >
                {user ? (
                  <>
                    <Code className="w-4 h-4 mr-2" />
                    Code
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Code (Login Required)
                  </>
                )}
              </Button>
              
              {activeTab === 'preview' && (
                <>
                  <Separator orientation="vertical" className="h-6 mx-2" />
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('desktop')}
                      className="transition-smooth h-8 px-3"
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('mobile')}
                      className="transition-smooth h-8 px-3"
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                  <Separator orientation="vertical" className="h-6 mx-2" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={takeScreenshot}
                    className="transition-smooth h-8 px-3"
                    data-screenshot-button
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6 mx-2" />
                  <Button
                    variant={(config as any).seo?.enabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowSEOPopup(true)}
                    className="transition-smooth h-8 px-3"
                    title="SEO & Metadata"
                  >
                    <span className="text-sm">🔥</span>
                  </Button>
                </>
              )}
              <AuthButton />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full">
        {/* Editor Panel */}
        <div className="w-96 h-screen overflow-y-auto editor-panel border-r">
          <div className="p-6 space-y-4">
            {/* Section Order Editor */}
            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Section Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {config.sectionOrder.map((sectionType, index) => (
                    <div
                      key={sectionType}
                      className="flex items-center p-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-move"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', index.toString());
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                        if (fromIndex !== index) {
                          moveSection(fromIndex, index);
                        }
                      }}
                    >
                      <GripVertical className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium flex-1">
                        {getSectionTitle(sectionType)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Drag and drop to reorder sections
                </p>
              </CardContent>
            </Card>
            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection('navbar')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">🍔 Navigation Bar</CardTitle>
                  {expandedSections.navbar ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.navbar && (
                <CardContent>
                  <NavbarEditor
                    config={config.navbar}
                    onChange={(updates) => updateConfig('navbar', updates)}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection('hero')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">🍕 Hero Section</CardTitle>
                  {expandedSections.hero ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.hero && (
                <CardContent>
                  <HeroEditor
                    config={config.hero}
                    onChange={(updates) => updateConfig('hero', updates)}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection('announcement')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">🍞 Announcement Bar</CardTitle>
                  {expandedSections.announcement ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.announcement && (
                <CardContent>
                  <AnnouncementEditor
                    config={config.announcement}
                    onChange={(updates) => updateConfig('announcement', updates)}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection('scrollingText')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">🌮 Scrolling Text</CardTitle>
                  {expandedSections.scrollingText ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.scrollingText && (
                <CardContent>
                  <ScrollingTextEditor
                    config={config.scrollingText}
                    onChange={(updates) => updateConfig('scrollingText', updates)}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection('cards')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">🍰 Cards Section</CardTitle>
                  {expandedSections.cards ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.cards && (
                <CardContent>
                  <CardsEditor
                    config={config.cards}
                    onChange={(updates) => updateConfig('cards', updates)}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection('textArea')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">🍜 Text Area</CardTitle>
                  {expandedSections.textArea ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.textArea && (
                <CardContent>
                  <TextAreaEditor
                    config={config.textArea}
                    onChange={(updates) => updateConfig('textArea', updates)}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection('stats')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">📊 Statistics</CardTitle>
                  {expandedSections.stats ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.stats && (
                <CardContent>
                  <StatsEditor
                    config={config}
                    onConfigChange={setConfig}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection('cta')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">🍩 Call-to-Action</CardTitle>
                  {expandedSections.cta ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.cta && (
                <CardContent>
                  <CTAEditor
                    config={config.cta}
                    onChange={(updates) => updateConfig('cta', updates)}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="editor-section shadow-md transition-smooth hover:shadow-lg">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection('footer')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">🍪 Footer</CardTitle>
                  {expandedSections.footer ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.footer && (
                <CardContent>
                  <FooterEditor
                    config={config.footer}
                    onChange={(updates) => updateConfig('footer', updates)}
                  />
                </CardContent>
              )}
            </Card>
          </div>
        </div>

        {/* Preview/Code Panel */}
        <div className="flex-1 h-screen overflow-y-auto">
          {activeTab === 'preview' ? (
            <WebsitePreview config={config} viewMode={viewMode} />
          ) : user ? (
            <CodeGenerator config={config} />
          ) : (
            <div className="flex items-center justify-center h-full bg-background">
              <Card className="w-96">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Lock className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <CardTitle>Authentication Required</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Please sign in to view and download the generated code for your website.
                  </p>
                  <Button onClick={() => setActiveTab('preview')} className="w-full">
                    Back to Preview
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* SEO Popup */}
      <SEOPopup
        isOpen={showSEOPopup}
        onClose={() => setShowSEOPopup(false)}
        onSave={(seoData) => {
          setConfig(prev => ({
            ...prev,
            seo: {
              enabled: true,
              ...seoData
            }
          }));
        }}
        initialData={(config as any).seo}
      />
    </div>
  );
}