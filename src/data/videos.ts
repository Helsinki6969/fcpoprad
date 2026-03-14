export interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  youtubeId?: string; // YouTube video ID (napr. "dQw4w9WgXcQ")
  youtubeUrl?: string; // Plná YouTube URL
  videoUrl?: string;   // Priamy odkaz na video súbor (napr. .mp4)
  thumbnail?: string; // Voliteľný vlastný thumbnail, inak sa použije YouTube thumbnail
  category: string;
  tags: string[];
  views: number;
}

export const videos: Video[] = [
  {
    id: '1',
    title: 'Zostrih z posledného zápasu',
    description: 'FC Poprad - Stráže vs. MFK Ružomberok - najlepšie momenty',
    date: '15.01.2026',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Zápasy',
    tags: [],
    views: 1250
  },
  {
    id: '2',
    title: 'Tréningové video',
    description: 'Príprava na jarné kolo súťaže - tréning kondície',
    date: '12.01.2026',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Tréningy',
    tags: [],
    views: 845
  },
  {
    id: '3',
    title: 'Rozhovor s trénerom',
    description: 'Plány pre jarnú časť sezóny - rozhovor s hlavným trénerom',
    date: '10.01.2026',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Rozhovory',
    tags: [],
    views: 632
  },
  {
    id: '4',
    title: 'Góly mesiaca',
    description: 'Najkrajšie góly z januára 2026',
    date: '05.01.2026',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Góly',
    tags: [],
    views: 2103
  }
];