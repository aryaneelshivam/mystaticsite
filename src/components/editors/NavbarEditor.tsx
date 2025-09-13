import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { NavbarConfig } from '@/types/website';

interface NavbarEditorProps {
  config: NavbarConfig;
  onChange: (updates: Partial<NavbarConfig>) => void;
}

export function NavbarEditor({ config, onChange }: NavbarEditorProps) {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="navbar-enabled">Enable Navbar</Label>
        <Switch
          id="navbar-enabled"
          checked={config.enabled}
          onCheckedChange={(enabled) => onChange({ enabled })}
        />
      </div>

      {config.enabled && (
        <>
          <div className="space-y-2">
            <Label>Logo Type</Label>
            <Select
              value={config.logo.type}
              onValueChange={(type: 'text' | 'image') => 
                onChange({ logo: { ...config.logo, type } })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="image">Image URL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Logo Content</Label>
            <Input
              value={config.logo.content}
              onChange={(e) => onChange({ 
                logo: { ...config.logo, content: e.target.value }
              })}
              placeholder={config.logo.type === 'text' ? 'Your Logo' : 'Image URL'}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Navigation Links</Label>
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
        </>
      )}
    </div>
  );
}