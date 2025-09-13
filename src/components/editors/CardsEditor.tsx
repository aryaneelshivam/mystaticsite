import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Cards</Label>
        <Button size="sm" onClick={addCard} variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

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
            <Input
              value={card.image || ''}
              onChange={(e) => updateCard(card.id, 'image', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      ))}
    </div>
  );
}