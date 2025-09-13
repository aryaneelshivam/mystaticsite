import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { FooterConfig, SocialLink } from '@/types/website';
import { useRef, useState } from 'react';

interface FooterEditorProps {
  config: FooterConfig;
  onChange: (updates: Partial<FooterConfig>) => void;
}

export function FooterEditor({ config, onChange }: FooterEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const addLink = () => {
    const newLink = {
      id: Date.now().toString(),
      text: 'New Link',
      url: '#'
    };
    onChange({
      links: [...config.links, newLink]
    });
  };

  const updateLink = (id: string, field: 'text' | 'url', value: string) => {
    const updatedLinks = config.links.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    );
    onChange({ links: updatedLinks });
  };

  const removeLink = (id: string) => {
    onChange({
      links: config.links.filter(link => link.id !== id)
    });
  };

  const addSocialLink = () => {
    const newSocialLink: SocialLink = {
      id: Date.now().toString(),
      platform: 'facebook',
      url: 'https://facebook.com'
    };
    onChange({
      socialLinks: [...(config.socialLinks || []), newSocialLink]
    });
  };

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
    const updatedSocialLinks = (config.socialLinks || []).map(link =>
      link.id === id ? { ...link, [field]: value } : link
    );
    onChange({ socialLinks: updatedSocialLinks });
  };

  const removeSocialLink = (id: string) => {
    onChange({
      socialLinks: (config.socialLinks || []).filter(link => link.id !== id)
    });
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onChange({ 
          logo: {
            type: 'image',
            content: dataUrl
          }
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
        <Label>Footer Text</Label>
        <Input
          value={config.text}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder="© 2024 Your Website. All rights reserved."
        />
      </div>

      <div className="space-y-2">
        <Label>Logo (Optional)</Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={config.logo?.type === 'text' ? 'default' : 'outline'}
              onClick={() => onChange({ logo: { type: 'text', content: 'Your Logo' } })}
            >
              Text Logo
            </Button>
            <Button
              size="sm"
              variant={config.logo?.type === 'image' ? 'default' : 'outline'}
              onClick={() => fileInputRef.current?.click()}
            >
              Image Logo
            </Button>
          </div>
          
          {config.logo?.type === 'text' && (
            <Input
              value={config.logo.content}
              onChange={(e) => onChange({ logo: { type: 'text', content: e.target.value } })}
              placeholder="Enter logo text"
            />
          )}
          
          {config.logo?.type === 'image' && config.logo.content && (
            <div className="space-y-2">
              <img 
                src={config.logo.content} 
                alt="Logo preview" 
                className="w-20 h-12 object-contain border rounded"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Change
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onChange({ logo: undefined })}
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
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
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Footer Links</Label>
          <Button size="sm" onClick={addLink} variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {config.links.map((link) => (
          <div key={link.id} className="space-y-2 p-3 border rounded-md">
            <div className="flex items-center justify-between">
              <Input
                value={link.text}
                onChange={(e) => updateLink(link.id, 'text', e.target.value)}
                placeholder="Link text"
                className="flex-1 mr-2"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeLink(link.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              value={link.url}
              onChange={(e) => updateLink(link.id, 'url', e.target.value)}
              placeholder="URL"
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Social Links</Label>
          <Button size="sm" onClick={addSocialLink} variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {(config.socialLinks || []).map((socialLink) => (
          <div key={socialLink.id} className="space-y-2 p-3 border rounded-md">
            <div className="flex items-center justify-between">
              <Select
                value={socialLink.platform}
                onValueChange={(platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'github' | 'custom') => 
                  updateSocialLink(socialLink.id, 'platform', platform)
                }
              >
                <SelectTrigger className="flex-1 mr-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeSocialLink(socialLink.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              value={socialLink.url}
              onChange={(e) => updateSocialLink(socialLink.id, 'url', e.target.value)}
              placeholder="https://example.com"
            />
            {socialLink.platform === 'custom' && (
              <Input
                value={socialLink.customIcon || ''}
                onChange={(e) => updateSocialLink(socialLink.id, 'customIcon', e.target.value)}
                placeholder="Custom icon URL or emoji"
              />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Alignment</Label>
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
    </div>
  );
}