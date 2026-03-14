import { useState, useEffect } from 'react';
import { PlayerTable } from '../components/PlayerTable';
import { getPlayersByCategory } from '../services/playerService';
import { Player } from '../data/players';

export function U19() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPlayersByCategory('U19').then(data => {
      setPlayers(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003474]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-3xl shadow-xl p-12 mb-12 text-white">
          <h1 className="text-4xl mb-4">Kategória U19 - Dorast</h1>
          <p className="text-xl">Súpiska dorastu pre aktuálnu sezónu</p>
          <p className="text-sm mt-2 text-gray-200">
            Celkový počet hráčov: {players.length}
          </p>
        </div>

        {/* Player Table */}
        {players.length > 0 ? (
          <PlayerTable players={players} />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600">Súpiska zatiaľ nie je k dispozícii.</p>
          </div>
        )}
      </div>
    </div>
  );
}