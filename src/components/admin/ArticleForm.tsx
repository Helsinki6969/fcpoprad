import { useState, useEffect } from 'react';
import { Article } from '../../data/articles';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X, RefreshCw } from 'lucide-react';
import { getActiveAdmins } from '../../data/admins';
import { ImageUpload } from './ImageUpload';

interface ArticleFormProps {
  article?: Article;
  onSubmit: (articleData: Omit<Article, 'id'>) => void;
  onCancel: () => void;
}

export function ArticleForm({ article, onSubmit, onCancel }: ArticleFormProps) {
  const admins = getActiveAdmins();
  
  const [formData, setFormData] = useState<Omit<Article, 'id'>>({
    slug: '',
    title: '',
    date: new Date().toLocaleDateString('sk-SK'),
    category: 'Novinky',
    image: '',
    excerpt: '',
    author: admins[0]?.fullName || 'FC Poprad', // Default autor
    authorId: admins[0]?.id, // Default author ID
    authorImage: '',
    content: '',
    tags: [],
    readTime: 5
  });

  const [isSlugEdited, setIsSlugEdited] = useState(false);

  useEffect(() => {
    if (article) {
      setFormData({
        slug: article.slug,
        title: article.title,
        date: article.date,
        category: article.category,
        image: article.image,
        excerpt: article.excerpt,
        author: article.author,
        authorId: article.authorId,
        authorImage: article.authorImage || '',
        content: article.content,
        tags: article.tags,
        readTime: article.readTime
      });
      // Ak má článok ID, predpokladáme, že slug je už nastavený a nechceme ho prepisovať automaticky
      setIsSlugEdited(true);
    }
  }, [article]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .normalize('NFD') // Rozdelí diakritiku (napr. á -> a + ´)
      .replace(/[\u0300-\u036f]/g, '') // Odstráni diakritické znamienka
      .replace(/\s+/g, '-') // Nahradí medzery pomlčkami
      .replace(/[^\w-]+/g, '') // Odstráni všetky nealfanumerické znaky okrem pomlčiek
      .replace(/--+/g, '-') // Odstráni viacnásobné pomlčky
      .replace(/^-+/, '') // Odstráni pomlčky na začiatku
      .replace(/-+$/, ''); // Odstráni pomlčky na konci
  };

  const handleChange = (field: keyof Omit<Article, 'id' | 'tags'>, value: string | number) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Ak používateľ manuálne zmení slug, vypneme automatiku
      if (field === 'slug') {
        setIsSlugEdited(true);
      }

      // Ak meníme nadpis a slug nebol manuálne upravený (alebo sme v režime "Nový článok"), aktualizujeme ho
      if (field === 'title' && typeof value === 'string' && !isSlugEdited) {
        newData.slug = slugify(value);
      }
      
      return newData;
    });
  };

  const syncSlug = () => {
    const newSlug = slugify(formData.title);
    setFormData(prev => ({ ...prev, slug: newSlug }));
    setIsSlugEdited(true); // Po manuálnom vynútení ostane "zafixovaný" až kým ho znova neprepíše
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => {
      const isSelected = prev.tags.includes(tag);
      if (isSelected) {
        return { ...prev, tags: prev.tags.filter(t => t !== tag) };
      } else {
        return { ...prev, tags: [...prev.tags, tag] };
      }
    });
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const categories = ['Novinky', 'Klubová TV', 'A Tím', 'U19', 'U17', 'U15', 'U13'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{article ? 'Upraviť článok' : 'Nový článok'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Nadpis článku *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                placeholder="Napríklad: Víťazstvo v derby proti Kežmarku"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL slug *</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  required
                  placeholder="vitazstvo-v-derby-proti-kezmarku"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={syncSlug}
                  title="Synchronizovať s nadpisom"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <ImageUpload
            label="Titulný obrázok článku"
            value={formData.image}
            onChange={(url) => handleChange('image', url)}
            type="article"
            helpText="Odporúčaná veľkosť: 1200x600px. Ak obrázok nevyberiete a článok obsahuje video, použije sa náhľad z videa."
          />

          {/* Category and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Kategória *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Dátum *</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
                placeholder="21.11.2025"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Krátky popis *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              required
              placeholder="Krátky popis článku, ktorý sa zobrazí v zozname článkov..."
              rows={3}
            />
          </div>

          {/* Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Autor *</Label>
              <Select 
                value={formData.authorId?.toString() || '1'} 
                onValueChange={(value) => {
                  const selectedAdmin = admins.find(a => a.id === parseInt(value));
                  if (selectedAdmin) {
                    handleChange('author', selectedAdmin.fullName);
                    setFormData(prev => ({ ...prev, authorId: selectedAdmin.id }));
                  }
                }}
              >
                <SelectTrigger id="author">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {admins.map(admin => (
                    <SelectItem key={admin.id} value={admin.id.toString()}>
                      {admin.fullName} ({admin.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">Vyberte autora z administrátorov</p>
            </div>

          </div>

          {/* Read Time */}
          <div className="space-y-2">
            <Label htmlFor="readTime">Čas čítania (minúty) *</Label>
            <Input
              id="readTime"
              type="number"
              min="1"
              max="60"
              value={formData.readTime}
              onChange={(e) => handleChange('readTime', parseInt(e.target.value))}
              required
            />
          </div>

          {/* Tags (Selectable) */}
          <div className="space-y-3">
            <Label>Vyberte tagy (kategórie)</Label>
            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
              {categories.map(tag => {
                const isSelected = formData.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isSelected 
                        ? 'bg-[#003474] text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-300 hover:border-[#003474] hover:text-[#003474]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-500">Kliknutím pridáte alebo odoberiete tag.</p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Obsah článku (HTML) *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              required
              placeholder="<p>Obsah článku v HTML formáte...</p>"
              rows={15}
              className="font-mono text-sm"
            />
            <p className="text-sm text-gray-500">
              Podporované tagy: &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="bg-[#003474] hover:bg-[#002557]">
              {article ? 'Uložiť zmeny' : 'Vytvoriť článok'}
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