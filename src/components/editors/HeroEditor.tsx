import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeroConfig } from '@/types/website';

interface HeroEditorProps {
  config: HeroConfig;
  onChange: (updates: Partial<HeroConfig>) => void;
}

export function HeroEditor({ config, onChange }: HeroEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Background Image URL</Label>
        <Input
          value={config.backgroundImage}
          onChange={(e) => onChange({ backgroundImage: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
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