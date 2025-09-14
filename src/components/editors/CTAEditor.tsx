import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CTAConfig, CTAButton } from '@/types/website';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { useState } from 'react';

interface CTAEditorProps {
  config: CTAConfig;
  onChange: (updates: Partial<CTAConfig>) => void;
}

export function CTAEditor({ config, onChange }: CTAEditorProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(config.image || null);

  const addButton = () => {
    const newButton: CTAButton = {
      id: Date.now().toString(),
      text: 'New Button',
      url: '#',
      variant: 'primary'
    };
    onChange({ ctaButtons: [...config.ctaButtons, newButton] });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        onChange({ image: result, imageFile: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    onChange({ image: undefined, imageFile: undefined });
  };

  const generateRandomUnsplashImage = () => {
    const width = 800;
    const height = 600;
    const randomId = Math.floor(Math.random() * 1000);
    const unsplashUrl = `https://picsum.photos/${width}/${height}?random=${randomId}`;
    setImagePreview(unsplashUrl);
    onChange({ image: unsplashUrl });
  };

  const updateButton = (index: number, updates: Partial<CTAButton>) => {
    const updatedButtons = config.ctaButtons.map((button, i) => 
      i === index ? { ...button, ...updates } : button
    );
    onChange({ ctaButtons: updatedButtons });
  };

  const removeButton = (index: number) => {
    const updatedButtons = config.ctaButtons.filter((_, i) => i !== index);
    onChange({ ctaButtons: updatedButtons });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Heading</Label>
        <Input
          value={config.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
          placeholder="Enter CTA heading..."
        />
      </div>

      <div className="space-y-2">
        <Label>Subtitle (Optional)</Label>
        <Textarea
          value={config.subtitle || ''}
          onChange={(e) => onChange({ subtitle: e.target.value })}
          placeholder="Enter CTA subtitle..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Background Color</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="color"
            value={config.backgroundColor}
            onChange={(e) => onChange({ backgroundColor: e.target.value })}
            className="w-12 h-8 p-1 border rounded"
          />
          <Input
            value={config.backgroundColor}
            onChange={(e) => onChange({ backgroundColor: e.target.value })}
            placeholder="#667eea"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Text Color</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="color"
            value={config.textColor}
            onChange={(e) => onChange({ textColor: e.target.value })}
            className="w-12 h-8 p-1 border rounded"
          />
          <Input
            value={config.textColor}
            onChange={(e) => onChange({ textColor: e.target.value })}
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Alignment</Label>
        <Select value={config.alignment} onValueChange={(value: 'left' | 'center' | 'right') => onChange({ alignment: value })}>
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

      <div className="space-y-2">
        <Label>Font Family</Label>
        <Select value={config.font} onValueChange={(value) => onChange({ font: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Roboto">Roboto</SelectItem>
            <SelectItem value="Open Sans">Open Sans</SelectItem>
            <SelectItem value="Lato">Lato</SelectItem>
            <SelectItem value="Montserrat">Montserrat</SelectItem>
            <SelectItem value="Poppins">Poppins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Layout</Label>
        <Select value={config.layout} onValueChange={(value: 'text-only' | 'image-left' | 'image-right' | 'image-top' | 'image-bottom') => onChange({ layout: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text-only">Text Only</SelectItem>
            <SelectItem value="image-left">Image Left</SelectItem>
            <SelectItem value="image-right">Image Right</SelectItem>
            <SelectItem value="image-top">Image Top</SelectItem>
            <SelectItem value="image-bottom">Image Bottom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Image (Optional)</Label>
        {imagePreview ? (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="CTA Preview" 
              className="w-full h-32 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={removeImage}
              className="absolute top-2 right-2 h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <Label htmlFor="cta-image-upload" className="cursor-pointer">
                <span className="text-sm text-gray-600">Click to upload image</span>
                <Input
                  id="cta-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </Label>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateRandomUnsplashImage}
              className="w-full"
            >
              🎨 Use Random Unsplash Image
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Button Alignment</Label>
        <Select value={config.buttonAlignment} onValueChange={(value: 'left' | 'center' | 'right') => onChange({ buttonAlignment: value })}>
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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Call-to-Action Buttons</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addButton}
            className="h-8 px-2"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Button
          </Button>
        </div>

        <div className="space-y-3">
          {config.ctaButtons.map((button, index) => (
            <div key={button.id} className="p-3 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Button {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeButton(index)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Button Text</Label>
                  <Input
                    value={button.text}
                    onChange={(e) => updateButton(index, { text: e.target.value })}
                    placeholder="Button text"
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">URL</Label>
                  <Input
                    value={button.url}
                    onChange={(e) => updateButton(index, { url: e.target.value })}
                    placeholder="https://example.com"
                    className="h-8"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-xs">Style</Label>
                <Select 
                  value={button.variant} 
                  onValueChange={(value: 'primary' | 'secondary' | 'outline') => updateButton(index, { variant: value })}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
