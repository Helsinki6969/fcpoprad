import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Ruler, Weight, Globe, Trophy, Target, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getPlayerById } from '../data/players';

export function DetailHraca() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const player = id ? getPlayerById(id) : undefined;

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Hráč nenájdený</h1>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Späť
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003474] to-[#002557] text-white py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white hover:text-[#B7975E] mb-4 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Späť na súpisku
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ľavý stĺpec - Profil */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Meno a číslo dresu */}
              <div className="flex flex-col items-center justify-center mb-6 pt-2">
                {player.jerseyNumber && (
                  <div className="bg-[#003474] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg mb-4">
                    {player.jerseyNumber}
                  </div>
                )}
                <h1 className="text-3xl font-bold text-center mb-2">
                  {player.firstName}
                </h1>
                <h2 className="text-3xl font-bold text-center text-[#003474]">
                  {player.lastName}
                </h2>
              </div>

              {/* Pozícia a kategória */}
              <div className="text-center mb-6">
                <div className="inline-block bg-[#B7975E] text-white px-4 py-2 rounded-full mb-2">
                  {player.position}
                </div>
                <div className="text-gray-600">{player.category}</div>
              </div>

              {/* Základné info */}
              <div className="space-y-3 border-t pt-4">
                {player.age && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#003474]" />
                    <div>
                      <div className="text-sm text-gray-600">Vek</div>
                      <div className="font-semibold">{player.age} rokov</div>
                    </div>
                  </div>
                )}

                {player.height && (
                  <div className="flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-[#003474]" />
                    <div>
                      <div className="text-sm text-gray-600">Výška</div>
                      <div className="font-semibold">{player.height} cm</div>
                    </div>
                  </div>
                )}

                {player.weight && (
                  <div className="flex items-center gap-3">
                    <Weight className="h-5 w-5 text-[#003474]" />
                    <div>
                      <div className="text-sm text-gray-600">Váha</div>
                      <div className="font-semibold">{player.weight} kg</div>
                    </div>
                  </div>
                )}

                {player.nationality && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-[#003474]" />
                    <div>
                      <div className="text-sm text-gray-600">Národnosť</div>
                      <div className="font-semibold">{player.nationality}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pravý stĺpec - Štatistiky a bio */}
          <div className="lg:col-span-2 space-y-8">
            {/* Štatistiky */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-[#B7975E]" />
                Štatistiky
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-[#003474]" />
                  </div>
                  <div className="text-3xl font-bold text-[#003474]">
                    {player.matchesPlayed}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Zápasy</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="h-6 w-6 text-[#003474]" />
                  </div>
                  <div className="text-3xl font-bold text-[#003474]">
                    {player.goals}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Góly</div>
                </div>


                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center h-8 mb-2">
                    <div className="w-5 h-7 bg-[#ffd700] rounded-sm border-2 border-[#e6c200] shadow-[2px_2px_0_rgba(0,0,0,0.1)] transform -rotate-12"></div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600">
                    {player.yellowCards}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Žlté karty</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center h-8 mb-2">
                    <div className="w-5 h-7 bg-[#ff4d4d] rounded-sm border-2 border-[#e60000] shadow-[2px_2px_0_rgba(0,0,0,0.1)] transform rotate-12"></div>
                  </div>
                  <div className="text-3xl font-bold text-red-600">
                    {player.redCards}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Červené karty</div>
                </div>
              </div>

              {/* Štatistická efektivita */}
              {player.matchesPlayed > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-4">Priemer na zápas</h4>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#003474]">
                        {(player.goals / player.matchesPlayed).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">Góly/zápas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-500">
                        {(player.yellowCards / player.matchesPlayed).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">ŽK/zápas</div>
                    </div>
                  </div>
                </div>
              )}
            </div>



            {/* Dátum narodenia */}
            {player.dateOfBirth && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Osobné údaje</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Dátum narodenia</div>
                    <div className="font-semibold">
                      {new Date(player.dateOfBirth).toLocaleDateString('sk-SK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  {player.nationality && (
                    <div>
                      <div className="text-sm text-gray-600">Krajina</div>
                      <div className="font-semibold">{player.nationality}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
