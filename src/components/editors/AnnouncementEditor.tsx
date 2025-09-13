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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Announcement Text</Label>
            <Input
              value={config.text}
              onChange={(e) => onChange({ text: e.target.value })}
              placeholder="Enter announcement text"
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
                placeholder="#667eea"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}