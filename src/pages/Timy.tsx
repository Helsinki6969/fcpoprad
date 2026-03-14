import { useNavigate } from 'react-router';
import { Users } from 'lucide-react';

interface TeamCategory {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  imageUrl: string;
}

export function Timy() {
  const navigate = useNavigate();

  const teams: TeamCategory[] = [
    {
      id: 'atim',
      title: 'A Tím',
      subtitle: 'Dospelí',
      path: '/atim',
      imageUrl: 'https://images.unsplash.com/photo-1710301431051-ee6923af04aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzb2NjZXIlMjB0ZWFtJTIwYWR1bHRzfGVufDF8fHx8MTc3MjA2Mjk3MHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'u19',
      title: 'U19',
      subtitle: 'Do 19 rokov',
      path: '/u19',
      imageUrl: 'https://images.unsplash.com/photo-1771257807779-a72e74deaa11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHNvY2NlciUyMHRlYW0lMjB0ZWVuYWdlcnN8ZW58MXx8fHwxNzcyMDYyOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'u17',
      title: 'U17',
      subtitle: 'Do 17 rokov',
      path: '/u17',
      imageUrl: 'https://images.unsplash.com/photo-1765372674571-afef5d3771b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB5b3V0aCUyMGFjYWRlbXklMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzIwNjI5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'u15',
      title: 'U15',
      subtitle: 'Do 15 rokov',
      path: '/u15',
      imageUrl: 'https://images.unsplash.com/photo-1710301431051-ee6923af04aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5pb3IlMjBzb2NjZXIlMjB0ZWFtJTIweW91bmclMjBwbGF5ZXJzfGVufDF8fHx8MTc3MjA2Mjk3MHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'u13',
      title: 'U13',
      subtitle: 'Do 13 rokov',
      path: '/u13',
      imageUrl: 'https://images.unsplash.com/photo-1609701113058-d6243c3c9311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc29jY2VyJTIwdGVhbSUyMGNoaWxkcmVufGVufDF8fHx8MTc3MjA2Mjk3MXww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-3xl shadow-xl p-12 mb-12 text-white">
          <div className="flex items-center gap-4 mb-4">
            <Users className="h-12 w-12" />
            <h1 className="text-4xl">Naše tímy</h1>
          </div>
          <p className="text-xl">Vyberte si kategóriu a prezrite si súpisku hráčov</p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => navigate(team.path)}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              {/* Thumbnail Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={team.imageUrl}
                  alt={team.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-1 group-hover:text-[#B7975E] transition-colors">
                  {team.title}
                </h2>
                <p className="text-sm text-gray-200">{team.subtitle}</p>
              </div>

              {/* Hover indicator */}
              <div className="absolute top-4 right-4 bg-[#003474] rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Users className="h-5 w-5 text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
