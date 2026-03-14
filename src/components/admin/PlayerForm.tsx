import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Player } from '../../data/players';
import { ImageUpload } from './ImageUpload';

interface PlayerFormProps {
  player?: Player;
  onSubmit: (playerData: Omit<Player, 'id' | 'age' | 'isActive'>) => void;
  onCancel: () => void;
}

export function PlayerForm({ player, onSubmit, onCancel }: PlayerFormProps) {
  const [formData, setFormData] = useState({
    firstName: player?.firstName || '',
    lastName: player?.lastName || '',
    jerseyNumber: player?.jerseyNumber || 0,
    position: player?.position || 'Útočník',
    category: player?.category || 'A tím',
    dateOfBirth: player?.dateOfBirth || '',
    height: player?.height || 0,
    weight: player?.weight || 0,
    nationality: player?.nationality || 'Slovensko',
    bio: player?.bio || '',
    matchesPlayed: player?.matchesPlayed || 0,
    goals: player?.goals || 0,
    assists: player?.assists || 0,
    yellowCards: player?.yellowCards || 0,
    redCards: player?.redCards || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const positions = ['Brankár', 'Obranca', 'Stredný záložník', 'Útočník'];
  const categories = ['A tím', 'Dorast', 'Žiaci', 'Prípravka'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{player ? 'Upraviť hráča' : 'Pridať nového hráča'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Základné údaje */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Meno *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Martin"
                required
              />
            </div>

            <div>
              <Label htmlFor="lastName">Priezvisko *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Novák"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="jerseyNumber">Číslo dresu</Label>
              <Input
                id="jerseyNumber"
                type="number"
                min="1"
                max="99"
                value={formData.jerseyNumber || ''}
                onChange={(e) => setFormData({ ...formData, jerseyNumber: parseInt(e.target.value) || 0 })}
                placeholder="10"
              />
            </div>

            <div>
              <Label htmlFor="position">Pozícia *</Label>
              <Select
                value={formData.position}
                onValueChange={(value) => setFormData({ ...formData, position: value as Player['position'] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte pozíciu" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Kategória *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as Player['category'] })}
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

          {/* Osobné údaje */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="dateOfBirth">Dátum narodenia</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="height">Výška (cm)</Label>
              <Input
                id="height"
                type="number"
                min="150"
                max="220"
                value={formData.height || ''}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                placeholder="180"
              />
            </div>

            <div>
              <Label htmlFor="weight">Váha (kg)</Label>
              <Input
                id="weight"
                type="number"
                min="50"
                max="120"
                value={formData.weight || ''}
                onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
                placeholder="75"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="nationality">Národnosť</Label>
            <Input
              id="nationality"
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              placeholder="Slovensko"
            />
          </div>

          {/* Biografia */}
          <div>
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Krátky popis hráča, jeho štýl hry, silné stránky..."
              rows={4}
            />
          </div>

          {/* Štatistiky */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Štatistiky</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="matchesPlayed">Zápasy</Label>
                <Input
                  id="matchesPlayed"
                  type="number"
                  min="0"
                  value={formData.matchesPlayed}
                  onChange={(e) => setFormData({ ...formData, matchesPlayed: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div>
                <Label htmlFor="goals">Góly</Label>
                <Input
                  id="goals"
                  type="number"
                  min="0"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div>
                <Label htmlFor="assists">Asistencie</Label>
                <Input
                  id="assists"
                  type="number"
                  min="0"
                  value={formData.assists}
                  onChange={(e) => setFormData({ ...formData, assists: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div>
                <Label htmlFor="yellowCards">ŽK</Label>
                <Input
                  id="yellowCards"
                  type="number"
                  min="0"
                  value={formData.yellowCards}
                  onChange={(e) => setFormData({ ...formData, yellowCards: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div>
                <Label htmlFor="redCards">ČK</Label>
                <Input
                  id="redCards"
                  type="number"
                  min="0"
                  value={formData.redCards}
                  onChange={(e) => setFormData({ ...formData, redCards: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          {/* Tlačidlá */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-[#003474] hover:bg-[#002557]">
              {player ? 'Uložiť zmeny' : 'Pridať hráča'}
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
