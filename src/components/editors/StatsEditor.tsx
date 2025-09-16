import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { WebsiteConfig } from '@/types/website';

interface StatsEditorProps {
  config: WebsiteConfig;
  onConfigChange: (config: WebsiteConfig) => void;
}

export function StatsEditor({ config, onConfigChange }: StatsEditorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const updateStats = (updates: Partial<typeof config.stats>) => {
    onConfigChange({
      ...config,
      stats: {
        ...config.stats,
        ...updates
      }
    });
  };

  const addStat = () => {
    const newStat = {
      number: '100',
      suffix: '+',
      label: 'New Statistic',
      description: ''
    };
    
    updateStats({
      items: [...config.stats.items, newStat]
    });
  };

  const updateStat = (index: number, updates: Partial<typeof config.stats.items[0]>) => {
    const updatedItems = [...config.stats.items];
    updatedItems[index] = { ...updatedItems[index], ...updates };
    updateStats({ items: updatedItems });
  };

  const removeStat = (index: number) => {
    const updatedItems = config.stats.items.filter((_, i) => i !== index);
    updateStats({ items: updatedItems });
  };

  const moveStat = (fromIndex: number, toIndex: number) => {
    const updatedItems = [...config.stats.items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    updateStats({ items: updatedItems });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveStat(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📊</span>
          Statistics & Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable */}
        <div className="flex items-center justify-between">
          <Label htmlFor="stats-enabled">Enable Statistics Section</Label>
          <Switch
            id="stats-enabled"
            checked={config.stats.enabled}
            onCheckedChange={(enabled) => updateStats({ enabled })}
          />
        </div>

        {config.stats.enabled && (
          <>
            <Separator />

            {/* Layout Settings */}
            <div className="space-y-4">
              <h4 className="font-medium">Layout & Alignment</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stats-layout">Layout</Label>
                  <Select
                    value={config.stats.layout}
                    onValueChange={(layout) => updateStats({ layout: layout as 'horizontal' | 'vertical' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="horizontal">Horizontal</SelectItem>
                      <SelectItem value="vertical">Vertical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stats-alignment">Alignment</Label>
                  <Select
                    value={config.stats.alignment}
                    onValueChange={(alignment) => updateStats({ alignment: alignment as 'left' | 'center' | 'right' })}
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
            </div>

            <Separator />

            {/* Styling */}
            <div className="space-y-4">
              <h4 className="font-medium">Styling</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stats-bg-color">Background Color</Label>
                  <Input
                    id="stats-bg-color"
                    type="color"
                    value={config.stats.backgroundColor}
                    onChange={(e) => updateStats({ backgroundColor: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="stats-number-color">Number Color</Label>
                  <Input
                    id="stats-number-color"
                    type="color"
                    value={config.stats.numberColor}
                    onChange={(e) => updateStats({ numberColor: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="stats-label-color">Label Color</Label>
                  <Input
                    id="stats-label-color"
                    type="color"
                    value={config.stats.labelColor}
                    onChange={(e) => updateStats({ labelColor: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="stats-suffix-color">Suffix Color</Label>
                  <Input
                    id="stats-suffix-color"
                    type="color"
                    value={config.stats.suffixColor}
                    onChange={(e) => updateStats({ suffixColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="stats-number-size">Number Size</Label>
                  <Select
                    value={config.stats.numberSize}
                    onValueChange={(numberSize) => updateStats({ numberSize: numberSize as 'small' | 'medium' | 'large' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stats-label-size">Label Size</Label>
                  <Select
                    value={config.stats.labelSize}
                    onValueChange={(labelSize) => updateStats({ labelSize: labelSize as 'small' | 'medium' | 'large' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stats-label-weight">Label Weight</Label>
                  <Select
                    value={config.stats.labelWeight}
                    onValueChange={(labelWeight) => updateStats({ labelWeight: labelWeight as 'light' | 'normal' | 'bold' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Statistics Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Statistics Items</h4>
                <Button onClick={addStat} size="sm" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Statistic
                </Button>
              </div>

              <div className="space-y-3">
                {config.stats.items.map((stat, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="cursor-move p-1 hover:bg-gray-100 rounded"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        <GripVertical className="w-4 h-4 text-gray-400" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`stat-number-${index}`}>Number</Label>
                            <Input
                              id={`stat-number-${index}`}
                              value={stat.number}
                              onChange={(e) => updateStat(index, { number: e.target.value })}
                              placeholder="100"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`stat-suffix-${index}`}>Suffix</Label>
                            <Input
                              id={`stat-suffix-${index}`}
                              value={stat.suffix}
                              onChange={(e) => updateStat(index, { suffix: e.target.value })}
                              placeholder="+"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor={`stat-label-${index}`}>Label</Label>
                          <Input
                            id={`stat-label-${index}`}
                            value={stat.label}
                            onChange={(e) => updateStat(index, { label: e.target.value })}
                            placeholder="Happy Customers"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`stat-description-${index}`}>Description (Optional)</Label>
                          <Textarea
                            id={`stat-description-${index}`}
                            value={stat.description}
                            onChange={(e) => updateStat(index, { description: e.target.value })}
                            placeholder="Additional details about this statistic"
                            rows={2}
                          />
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeStat(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {config.stats.items.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No statistics added yet.</p>
                  <p className="text-sm">Click "Add Statistic" to get started.</p>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
