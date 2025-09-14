import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TextAreaConfig, TextSection } from '@/types/website';
import { Plus, Trash2, Upload, X, GripVertical } from 'lucide-react';
import { useState } from 'react';

interface TextAreaEditorProps {
  config: TextAreaConfig;
  onChange: (updates: Partial<TextAreaConfig>) => void;
}

export function TextAreaEditor({ config, onChange }: TextAreaEditorProps) {
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});

  const addSection = () => {
    const newSection: TextSection = {
      id: Date.now().toString(),
      heading: '',
      content: '',
      alignment: 'left',
      layout: 'text-only'
    };
    onChange({ sections: [...config.sections, newSection] });
  };

  const updateSection = (sectionId: string, updates: Partial<TextSection>) => {
    const updatedSections = config.sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    );
    onChange({ sections: updatedSections });
  };

  const removeSection = (sectionId: string) => {
    const updatedSections = config.sections.filter(section => section.id !== sectionId);
    onChange({ sections: updatedSections });
    
    // Remove image preview if it exists
    const newPreviews = { ...imagePreviews };
    delete newPreviews[sectionId];
    setImagePreviews(newPreviews);
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    const newSections = [...config.sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    onChange({ sections: newSections });
  };

  const handleImageUpload = (sectionId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreviews(prev => ({ ...prev, [sectionId]: result }));
        updateSection(sectionId, { image: result, imageFile: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (sectionId: string) => {
    const newPreviews = { ...imagePreviews };
    delete newPreviews[sectionId];
    setImagePreviews(newPreviews);
    updateSection(sectionId, { image: undefined, imageFile: undefined });
  };

  const generateRandomUnsplashImage = (sectionId: string) => {
    const width = 800;
    const height = 600;
    const randomId = Math.floor(Math.random() * 1000);
    const unsplashUrl = `https://picsum.photos/${width}/${height}?random=${randomId}`;
    setImagePreviews(prev => ({ ...prev, [sectionId]: unsplashUrl }));
    updateSection(sectionId, { image: unsplashUrl });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Text Sections</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSection}
          className="h-8 px-2"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Section
        </Button>
      </div>

      <div className="space-y-4">
        {config.sections.map((section, index) => (
          <div key={section.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">Section {index + 1}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSection(section.id)}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Section Heading (Optional)</Label>
                <Input
                  value={section.heading || ''}
                  onChange={(e) => updateSection(section.id, { heading: e.target.value })}
                  placeholder="Enter section heading..."
                  className="h-8"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Content Alignment</Label>
                <Select 
                  value={section.alignment} 
                  onValueChange={(value: 'left' | 'center' | 'right') => updateSection(section.id, { alignment: value })}
                >
                  <SelectTrigger className="h-8">
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

            <div className="space-y-2">
              <Label className="text-xs">Layout</Label>
              <Select 
                value={section.layout} 
                onValueChange={(value: 'text-only' | 'image-left' | 'image-right' | 'image-top' | 'image-bottom') => updateSection(section.id, { layout: value })}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text-only">Text Only</SelectItem>
                  <SelectItem value="image-left">Image Left</SelectItem>
                  <SelectItem value="image-right">Image Right</SelectItem>
                  <SelectItem value="image-top">Image Top</SelectItem>
                  <SelectItem value="image-bottom">Image Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Image (Optional)</Label>
              {imagePreviews[section.id] ? (
                <div className="relative">
                  <img 
                    src={imagePreviews[section.id]} 
                    alt="Section Preview" 
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImage(section.id)}
                    className="absolute top-1 right-1 h-5 w-5 p-0"
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                    <Upload className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                    <Label htmlFor={`text-image-upload-${section.id}`} className="cursor-pointer">
                      <span className="text-xs text-gray-600">Click to upload image</span>
                      <Input
                        id={`text-image-upload-${section.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(section.id, e)}
                        className="hidden"
                      />
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => generateRandomUnsplashImage(section.id)}
                    className="w-full h-7 text-xs"
                  >
                    🎨 Random Unsplash
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Content</Label>
              <Textarea
                value={section.content}
                onChange={(e) => updateSection(section.id, { content: e.target.value })}
                placeholder="Enter your content here..."
                rows={4}
                className="text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {config.sections.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No text sections yet. Click "Add Section" to get started.</p>
        </div>
      )}
    </div>
  );
}