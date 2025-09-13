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
      <p className="text-xs text-muted-foreground">
        Tip: Use • to separate different text segments
      </p>
    </div>
  );
}