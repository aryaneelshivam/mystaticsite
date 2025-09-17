import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MapsConfig } from '@/types/website';
import { MapPin, ExternalLink, Copy, Check } from 'lucide-react';

interface MapsEditorProps {
  config: MapsConfig;
  onChange: (config: MapsConfig) => void;
}

export function MapsEditor({ config, onChange }: MapsEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field: keyof MapsConfig, value: string) => {
    onChange({
      ...config,
      [field]: value
    });
  };

  const handleSelectChange = (field: keyof MapsConfig, value: string) => {
    onChange({
      ...config,
      [field]: value
    });
  };

  const handleToggleChange = (field: keyof MapsConfig, value: boolean) => {
    onChange({
      ...config,
      [field]: value
    });
  };

  const copyEmbedUrl = async () => {
    if (config.embedUrl) {
      await navigator.clipboard.writeText(config.embedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateSampleEmbedUrl = () => {
    // Generate a sample Google Maps embed URL for demonstration
    const sampleUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus";
    handleInputChange('embedUrl', sampleUrl);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Google Maps Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enabled">Enable Google Maps</Label>
              <p className="text-sm text-gray-500">Show or hide the maps section on your website</p>
            </div>
            <Switch
              id="enabled"
              checked={config.enabled}
              onCheckedChange={(checked) => handleToggleChange('enabled', checked)}
            />
          </div>
          
          {config.enabled && (
            <div className="space-y-2">
              <Label htmlFor="embedUrl">Google Maps Embed URL</Label>
            <div className="flex gap-2">
              <Input
                id="embedUrl"
                value={config.embedUrl}
                onChange={(e) => handleInputChange('embedUrl', e.target.value)}
                placeholder="Paste your Google Maps embed URL here"
                className="flex-1"
              />
              {config.embedUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyEmbedUrl}
                  className="shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={generateSampleEmbedUrl}
                className="text-xs"
              >
                Use Sample Map
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open('https://www.google.com/maps', '_blank')}
                className="text-xs"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Open Google Maps
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              To get an embed URL: 1) Go to Google Maps, 2) Search for your location, 3) Click "Share" → "Embed a map", 4) Copy the iframe src URL
            </p>
          </div>
            )}
        </CardContent>
      </Card>

      {config.enabled && (
        <>
          <Card>
        <CardHeader>
          <CardTitle>Map Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Map Width</Label>
              <Select value={config.width} onValueChange={(value) => handleSelectChange('width', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (400px)</SelectItem>
                  <SelectItem value="medium">Medium (600px)</SelectItem>
                  <SelectItem value="large">Large (800px)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Map Height</Label>
              <Select value={config.height} onValueChange={(value) => handleSelectChange('height', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (300px)</SelectItem>
                  <SelectItem value="medium">Medium (400px)</SelectItem>
                  <SelectItem value="large">Large (500px)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alignment">Map Alignment</Label>
            <Select value={config.alignment} onValueChange={(value) => handleSelectChange('alignment', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              value={config.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter a title for your map section"
            />
          </div>

          {config.title && (
            <div className="space-y-2">
              <Label htmlFor="titleAlignment">Title Alignment</Label>
              <Select value={config.titleAlignment} onValueChange={(value) => handleSelectChange('titleAlignment', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle (Optional)</Label>
            <Input
              id="subtitle"
              value={config.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              placeholder="Enter a subtitle"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={config.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter a description for your map"
              rows={3}
            />
          </div>

          {config.description && (
            <div className="space-y-2">
              <Label htmlFor="descriptionAlignment">Description Alignment</Label>
              <Select value={config.descriptionAlignment} onValueChange={(value) => handleSelectChange('descriptionAlignment', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titleFont">Title Font</Label>
              <Select value={config.titleFont} onValueChange={(value) => handleSelectChange('titleFont', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Poppins">Poppins</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                  <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleFont">Subtitle Font</Label>
              <Select value={config.subtitleFont} onValueChange={(value) => handleSelectChange('subtitleFont', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Poppins">Poppins</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                  <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriptionFont">Description Font</Label>
            <Select value={config.descriptionFont} onValueChange={(value) => handleSelectChange('descriptionFont', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Poppins">Poppins</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Playfair Display">Playfair Display</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
        </>
      )}
    </div>
  );
}
