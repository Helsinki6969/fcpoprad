import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { supabase } from '../../config/supabase';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  type?: 'article' | 'gallery' | 'general' | 'video';
  required?: boolean;
  helpText?: string;
}

export function ImageUpload({ 
  label, 
  value, 
  onChange, 
  type = 'general',
  required = false,
  helpText 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validácia na klientskej strane
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Neplatný formát súboru. Povolené: JPG, PNG, GIF, WebP');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Súbor je príliš veľký. Maximálna veľkosť: 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // 1. Vytvorenie unikátneho názvu súboru (zabráni prepísaniu, ak sa dva súbory volajú 'fotka.jpg')
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${type}/${fileName}`;

      // 2. Samotné nahratie súboru do úložiska (bucketu) s názvom 'uploads' na Supabase serveri.
      const { data, error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Po úspešnom nahratí vyžiadame zo Supabase verejnú verejnú URL adresu k tomuto obrázku.
      // Túto URL adresu potom uložíme do databázy k článku, aby sa mohla zobraziť návštevníkom.
      const { data: publicUrlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      onChange(publicUrlData.publicUrl);
      
    } catch (err: any) {
      console.error('Supabase upload error:', err);
      setError(err.message || 'Nahrávanie zlyhalo');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {!value ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#003474] transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            id={`upload-${label}`}
            disabled={uploading}
          />
          <label htmlFor={`upload-${label}`} className="cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              {uploading ? (
                <>
                  <div className="animate-spin h-8 w-8 border-2 border-[#003474] border-t-transparent rounded-full" />
                  <p className="text-sm text-gray-600">Nahrávam...</p>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Kliknite pre výber súboru alebo ho pretiahnite sem
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG, GIF, WebP (max. 5MB)
                  </p>
                </>
              )}
            </div>
          </label>
        </div>
      ) : (
        <div className="relative border rounded-lg p-2 bg-gray-50">
          <img
            src={value}
            alt="Preview"
            className="w-full max-w-md h-48 object-cover rounded"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Chyba+načítania';
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            className="absolute top-4 right-4"
          >
            <X className="h-4 w-4 mr-1" />
            Odstrániť
          </Button>
          <p className="text-xs text-gray-500 mt-2 break-all">{value}</p>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}
