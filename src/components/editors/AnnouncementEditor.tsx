import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnnouncementConfig } from '@/types/website';

interface AnnouncementEditorProps {
  config: AnnouncementConfig;
  onChange: (updates: Partial<AnnouncementConfig>) => void;
}

export function AnnouncementEditor({ config, onChange }: AnnouncementEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="announcement-enabled">Enable Announcement Bar</Label>
        <Switch
          id="announcement-enabled"
          checked={config.enabled}
          onCheckedChange={(enabled) => onChange({ enabled })}
        />
      </div>

      {config.enabled && (
        <div className="space-y-2">
          <Label>Announcement Text</Label>
          <Input
            value={config.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Enter announcement text"
          />
        </div>
      )}
    </div>
  );
}