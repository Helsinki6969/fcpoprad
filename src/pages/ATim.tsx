import { PlayerTable } from '../components/PlayerTable';
import { getPlayersByCategory } from '../data/players';

export function ATim() {
  const players = getPlayersByCategory('A tím');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-3xl shadow-xl p-12 mb-12 text-white">
          <h1 className="text-4xl mb-4">A tím</h1>
          <p className="text-xl">Súpiska nášho A tímu pre aktuálnu sezónu</p>
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