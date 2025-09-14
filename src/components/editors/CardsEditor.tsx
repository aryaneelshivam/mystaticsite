import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { CardsConfig, CardConfig } from '@/types/website';

interface CardsEditorProps {
  config: CardsConfig;
  onChange: (updates: Partial<CardsConfig>) => void;
}

export function CardsEditor({ config, onChange }: CardsEditorProps) {
  const addCard = () => {
    const newCard: CardConfig = {
      id: Date.now().toString(),
      title: 'New Card',
      description: 'Card description',
      image: ''
    };
    onChange({
      cards: [...config.cards, newCard]
    });
  };

  const updateCard = (id: string, field: keyof CardConfig, value: string) => {
    const updatedCards = config.cards.map(card =>
      card.id === id ? { ...card, [field]: value } : card
    );
    onChange({ cards: updatedCards });
  };

  const removeCard = (id: string) => {
    onChange({
      cards: config.cards.filter(card => card.id !== id)
    });
  };

  const generateRandomUnsplashImage = (cardId: string) => {
    const width = 400;
    const height = 300;
    const randomId = Math.floor(Math.random() * 1000);
    const unsplashUrl = `https://picsum.photos/${width}/${height}?random=${randomId}`;
    updateCard(cardId, 'image', unsplashUrl);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            checked={config.enabled}
            onCheckedChange={(checked) => onChange({ enabled: checked })}
          />
          <Label>Enable Cards Section</Label>
        </div>
        {config.enabled && (
          <Button size="sm" onClick={addCard} variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      {config.enabled && (
        <div className="space-y-3">
          {config.cards.map((card) => (
            <div key={card.id} className="space-y-3 p-3 border rounded-md">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Card {card.id}</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeCard(card.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Title</Label>
                <Input
                  value={card.title}
                  onChange={(e) => updateCard(card.id, 'title', e.target.value)}
                  placeholder="Card title"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={card.description}
                  onChange={(e) => updateCard(card.id, 'description', e.target.value)}
                  placeholder="Card description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Image URL (Optional)</Label>
                <div className="space-y-2">
                  <Input
                    value={card.image || ''}
                    onChange={(e) => updateCard(card.id, 'image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => generateRandomUnsplashImage(card.id)}
                    className="w-full h-7 text-xs"
                  >
                    🎨 Random Unsplash
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {config.cards.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <p className="text-sm">No cards yet. Click the + button to add a card.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}