import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { X, Flame, Save } from 'lucide-react';

interface SEOData {
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

interface SEOPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (seoData: SEOData) => void;
  initialData?: SEOData;
}

export function SEOPopup({ isOpen, onClose, onSave, initialData }: SEOPopupProps) {
  const [seoData, setSeoData] = useState<SEOData>(initialData || {
    title: '',
    description: '',
    keywords: '',
    author: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    twitterCreator: '',
    canonicalUrl: '',
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0',
    themeColor: '#667eea',
    favicon: ''
  });

  const handleSave = () => {
    onSave(seoData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-600" />
            </div>
            <CardTitle className="text-xl">SEO & Metadata Settings</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Basic SEO */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic SEO</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={seoData.title}
                  onChange={(e) => setSeoData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Your Website Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={seoData.author}
                  onChange={(e) => setSeoData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Your Name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Textarea
                id="description"
                value={seoData.description}
                onChange={(e) => setSeoData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of your website (150-160 characters)"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={seoData.keywords}
                onChange={(e) => setSeoData(prev => ({ ...prev, keywords: e.target.value }))}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>

          <Separator />

          {/* Open Graph */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Open Graph (Facebook, LinkedIn)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ogTitle">OG Title</Label>
                <Input
                  id="ogTitle"
                  value={seoData.ogTitle}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogTitle: e.target.value }))}
                  placeholder="Title for social media sharing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ogUrl">OG URL</Label>
                <Input
                  id="ogUrl"
                  value={seoData.ogUrl}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogUrl: e.target.value }))}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogDescription">OG Description</Label>
              <Textarea
                id="ogDescription"
                value={seoData.ogDescription}
                onChange={(e) => setSeoData(prev => ({ ...prev, ogDescription: e.target.value }))}
                placeholder="Description for social media sharing"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImage">OG Image URL</Label>
              <Input
                id="ogImage"
                value={seoData.ogImage}
                onChange={(e) => setSeoData(prev => ({ ...prev, ogImage: e.target.value }))}
                placeholder="https://yourwebsite.com/image.jpg"
              />
            </div>
          </div>

          <Separator />

          {/* Twitter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Twitter Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitterCard">Card Type</Label>
                <select
                  id="twitterCard"
                  value={seoData.twitterCard}
                  onChange={(e) => setSeoData(prev => ({ ...prev, twitterCard: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="app">App</option>
                  <option value="player">Player</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterSite">Twitter Site</Label>
                <Input
                  id="twitterSite"
                  value={seoData.twitterSite}
                  onChange={(e) => setSeoData(prev => ({ ...prev, twitterSite: e.target.value }))}
                  placeholder="@yourwebsite"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterCreator">Twitter Creator</Label>
                <Input
                  id="twitterCreator"
                  value={seoData.twitterCreator}
                  onChange={(e) => setSeoData(prev => ({ ...prev, twitterCreator: e.target.value }))}
                  placeholder="@yourusername"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Technical */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Technical Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  value={seoData.canonicalUrl}
                  onChange={(e) => setSeoData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="robots">Robots</Label>
                <select
                  id="robots"
                  value={seoData.robots}
                  onChange={(e) => setSeoData(prev => ({ ...prev, robots: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                  <option value="noindex, follow">No Index, Follow</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="themeColor">Theme Color</Label>
                <Input
                  id="themeColor"
                  type="color"
                  value={seoData.themeColor}
                  onChange={(e) => setSeoData(prev => ({ ...prev, themeColor: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input
                  id="favicon"
                  value={seoData.favicon}
                  onChange={(e) => setSeoData(prev => ({ ...prev, favicon: e.target.value }))}
                  placeholder="https://yourwebsite.com/favicon.ico"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
              <Save className="w-4 h-4 mr-2" />
              Save SEO Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
