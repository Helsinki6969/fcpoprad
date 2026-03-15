import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Video } from '../../data/videos';
import { ImageUpload } from './ImageUpload';
import { X } from 'lucide-react';

interface VideoFormProps {
  video?: Video;
  onSubmit: (videoData: Omit<Video, 'id' | 'views'>) => void;
  onCancel: () => void;
}

export function VideoForm({ video, onSubmit, onCancel }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: video?.title || '',
    description: video?.description || '',
    date: video?.date || new Date().toISOString().split('T')[0],
    youtubeUrl: video?.youtubeUrl || (video?.youtubeId ? `https://www.youtube.com/watch?v=${video.youtubeId}` : ''),
    videoUrl: video?.videoUrl || '',
    youtubeId: video?.youtubeId || '',
    thumbnail: video?.thumbnail || '',
    category: video?.category || 'Zápasy',
    tags: video?.tags || [] as string[]
  });

  const [tagInput, setTagInput] = useState('');

  // Automaticky extrahuje YouTube ID z URL
  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  // Generuje thumbnail URL z YouTube ID
  const getYoutubeThumbnail = (youtubeId: string) => {
    if (!youtubeId) return '';
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  };

  const handleYoutubeUrlChange = (url: string) => {
    const id = extractYoutubeId(url);
    setFormData({ 
      ...formData, 
      youtubeUrl: url,
      youtubeId: id,
      thumbnail: getYoutubeThumbnail(id)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ak je to priame MP4 video, náhľad je povinný
    if (!formData.youtubeId && !formData.thumbnail) {
      alert("Pri priamom videu (MP4) musíte nahrať náhľadový obrázok!");
      return;
    }

    // Ak thumbnail nebol manuálne nastavený a máme youtubeId, vygeneruj z YouTube
    const submitData = {
      ...formData,
      views: video?.views || 0,
      thumbnail: formData.thumbnail || (formData.youtubeId ? getYoutubeThumbnail(formData.youtubeId) : '')
    };
    onSubmit(submitData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const categories = ['Zápasy', 'Tréningy', 'Rozhovory', 'Góly', 'Mládež', 'Ostatné'];

  // Aktuálny thumbnail (buď vlastný alebo z YouTube)
  const currentThumbnail = formData.thumbnail || getYoutubeThumbnail(formData.youtubeId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{video ? 'Upraviť video' : 'Pridať nové video'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Názov videa *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Zadajte názov videa"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Popis *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Zadajte popis videa"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Dátum *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Kategória *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte kategóriu" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="youtubeUrl">URL videa na YouTube (vloží sa automaticky náhľad)</Label>
            <Input
              id="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={(e) => handleYoutubeUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div>
            <Label htmlFor="videoUrl">Priama URL na video (napr. MP4 súbor)</Label>
            <Input
              id="videoUrl"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value, youtubeId: e.target.value ? '' : formData.youtubeId })}
              placeholder="https://domena.sk/video.mp4"
            />
            <p className="text-sm text-gray-500 mt-1">
              Použite, ak video nie je na YouTube. Zadajte plnú adresu k súboru.
            </p>
          </div>

          <ImageUpload
            label="Náhľadový obrázok *"
            value={formData.thumbnail}
            onChange={(url) => setFormData({ ...formData, thumbnail: url })}
            type="video"
            helpText={formData.videoUrl ? "Pri MP4 videu je náhľad POVINNÝ." : "Pri YouTube sa náhľad načíta sám, ale môžete ho tu zmeniť."}
          />

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tagy (tie isté ako pri článkoch)</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Zadajte tag a stlačte Enter"
              />
              <Button type="button" onClick={addTag} className="bg-[#003474]">Pridať</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#003474] text-white rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-gray-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {currentThumbnail && !formData.thumbnail && (
            <div className="mt-4">
              <Label>Automatický náhľad z YouTube</Label>
              <img
                src={currentThumbnail}
                alt="YouTube náhľad"
                className="w-full max-w-md h-48 object-cover rounded-lg mt-2 border border-gray-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-[#003474] hover:bg-[#002557]">
              {video ? 'Uložiť zmeny' : 'Pridať video'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Zrušiť
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}