import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollingTextConfig } from '@/types/website';

interface ScrollingTextEditorProps {
  config: ScrollingTextConfig;
  onChange: (updates: Partial<ScrollingTextConfig>) => void;
}

export function ScrollingTextEditor({ config, onChange }: ScrollingTextEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Scrolling Text Content</Label>
        <Input
          value={config.text}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder="Your scrolling text • Separate with bullets"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Background Color</Label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={config.backgroundColor}
            onChange={(e) => onChange({ backgroundColor: e.target.value })}
            className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
          />
          <Input
            value={config.backgroundColor}
            onChange={(e) => onChange({ backgroundColor: e.target.value })}
            placeholder="#111827"
            className="flex-1"
          />
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Tip: Use • to separate different text segments
      </p>
    </div>
  );
}