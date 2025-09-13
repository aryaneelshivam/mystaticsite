import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextAreaConfig } from '@/types/website';

interface TextAreaEditorProps {
  config: TextAreaConfig;
  onChange: (updates: Partial<TextAreaConfig>) => void;
}

export function TextAreaEditor({ config, onChange }: TextAreaEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Section Heading (Optional)</Label>
        <Input
          value={config.heading || ''}
          onChange={(e) => onChange({ heading: e.target.value })}
          placeholder="Enter section heading..."
        />
      </div>
      
      <div className="space-y-2">
        <Label>Content</Label>
        <Textarea
          value={config.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Enter your main content here..."
          rows={6}
        />
      </div>
    </div>
  );
}