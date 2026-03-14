import { useNavigate } from 'react-router';
import { Player } from '../data/players';
import { Eye } from 'lucide-react';
import { Button } from './ui/button';

interface PlayerTableProps {
  players: Player[];
}

export function PlayerTable({ players }: PlayerTableProps) {
  const navigate = useNavigate();

  // Funkcia na správne skloňovanie slova "hráč"
  const getPlayerCountText = (count: number): string => {
    if (count === 1) return '1 hráč';
    if (count >= 2 && count <= 4) return `${count} hráči`;
    return `${count} hráčov`;
  };

  // Zoskupiť hráčov podľa pozície
  const groupedPlayers = players.reduce((acc, player) => {
    if (!acc[player.position]) {
      acc[player.position] = [];
    }
    acc[player.position].push(player);
    return acc;
  }, {} as Record<string, Player[]>);

  const positionOrder = ['Brankár', 'Obranca', 'Stredný záložník', 'Útočník'];
  const positionPluralNames: Record<string, string> = {
    'Brankár': 'Brankári',
    'Obranca': 'Obrancovia',
    'Stredný záložník': 'Strední záložníci',
    'Útočník': 'Útočníci'
  };

  return (
    <div className="space-y-12">
      {positionOrder.map((position) => {
        const positionPlayers = groupedPlayers[position];
        
        if (!positionPlayers || positionPlayers.length === 0) {
          return null;
        }

        return (
          <div key={position} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Hlavička pozície */}
            <div className="bg-gradient-to-r from-[#003474] to-[#002557] text-white px-6 py-4">
              <h2 className="text-2xl font-bold">{positionPluralNames[position]}</h2>
              <p className="text-sm text-gray-200">{getPlayerCountText(positionPlayers.length)}</p>
            </div>

            {/* Tabuľka hráčov */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Číslo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Meno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                      Vek
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                      Zápasy
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                      Góly
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {positionPlayers.map((player) => (
                    <tr 
                      key={player.id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/hrac/${player.id}`)}
                    >
                      {/* Číslo dresu */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center w-10 h-10 bg-[#003474] text-white rounded-full font-bold">
                          {player.jerseyNumber || '-'}
                        </div>
                      </td>

                      {/* Meno a priezvisko */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {player.firstName} {player.lastName}
                            </div>
                            <div className="text-sm text-gray-500 md:hidden">
                              {player.age ? `${player.age} rokov` : ''}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Vek */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">
                        {player.age ? `${player.age} rokov` : '-'}
                      </td>

                      {/* Zápasy */}
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900 hidden lg:table-cell">
                        {player.matchesPlayed}
                      </td>

                      {/* Góly */}
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900 hidden lg:table-cell">
                        {player.goals}
                      </td>

                      {/* Detail tlačidlo */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/hrac/${player.id}`);
                          }}
                          className="text-[#003474] hover:text-[#B7975E] cursor-pointer"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Detail</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}