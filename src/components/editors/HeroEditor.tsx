import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { HeroConfig } from '@/types/website';
import { useRef, useState } from 'react';

interface HeroEditorProps {
  config: HeroConfig;
  onChange: (updates: Partial<HeroConfig>) => void;
}

export function HeroEditor({ config, onChange }: HeroEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onChange({ 
          backgroundImage: dataUrl,
          backgroundImageFile: file 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Background Image</Label>
        
        {/* Image Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {config.backgroundImage ? (
            <div className="space-y-3">
              <img 
                src={config.backgroundImage} 
                alt="Hero background preview" 
                className="w-full h-24 object-cover rounded border"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Image
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onChange({ backgroundImage: '' })}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Upload background image</p>
                <p className="text-xs text-muted-foreground">
                  Drag & drop or click to browse
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse Files
              </Button>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
        
        {/* URL Input as Alternative */}
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Or enter image URL:</Label>
          <Input
            value={typeof config.backgroundImage === 'string' && !config.backgroundImage.startsWith('data:') ? config.backgroundImage : ''}
            onChange={(e) => onChange({ backgroundImage: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Heading Text</Label>
        <Textarea
          value={config.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
          placeholder="Enter your main heading"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Text Alignment</Label>
        <Select
          value={config.alignment}
          onValueChange={(alignment: 'left' | 'center' | 'right') => 
            onChange({ alignment })
          }
        >
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
        <Label>Hero Section Height</Label>
        <Select
          value={config.height}
          onValueChange={(height: 'small' | 'medium' | 'large' | 'full') => 
            onChange({ height })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small (300px)</SelectItem>
            <SelectItem value="medium">Medium (500px)</SelectItem>
            <SelectItem value="large">Large (700px)</SelectItem>
            <SelectItem value="full">Full Screen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Font Family</Label>
        <Select
          value={config.font}
          onValueChange={(font) => onChange({ font })}
        >
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
  );
}