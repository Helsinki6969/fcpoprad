import { useState, useEffect } from 'react';
import { Article } from '../data/articles';
import { Video } from '../data/videos';
import { Player } from '../data/players';
import { articles as defaultArticles } from '../data/articles';
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  initializeArticles
} from '../services/articleService';
import { videoService } from '../services/videoService';
import { getArticleThumbnail } from '../utils/articleUtils';
import { supabase } from '../config/supabase';
import { ArticleForm } from '../components/admin/ArticleForm';
import { VideoForm } from '../components/admin/VideoForm';
import { PlayerForm } from '../components/admin/PlayerForm';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export interface AdminUser {
  id: string | number;
  username: string;
  email: string;
  role: 'root' | 'editor';
  createdAt: string;
  lastLogin: string | null;
  isActive: boolean;
}
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Search, Lock, Video as VideoIcon, Eye, User, Target, Trophy, Users, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import {
  getAllPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer as deletePlayerService
} from '../services/playerService';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string | number; type: 'article' | 'video' | 'player' } | null>(null);
  const [loading, setLoading] = useState(false);

  // Demo credentials - root user
  const DEMO_ROOT = { username: 'admin', password: 'fcpoprad2026', role: 'root' as const };

  useEffect(() => {
    // Táto funkcia zistí, či je na tomto zariadení už niekto prihlásený (prečíta "cookies/session").
    // getSession() zavolá Supabase server a overí platnosť prístupu.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        setCurrentUser({
          id: session.user.id,
          username: session.user.email?.split('@')[0] || 'admin',
          email: session.user.email || '',
          role: 'root',
          createdAt: session.user.created_at,
          lastLogin: session.user.last_sign_in_at || new Date().toISOString(),
          isActive: true
        });
        loadArticles();
        loadVideos();
        loadPlayers();
      }
    });

    // Počúvať na zmeny prihlásenia
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        loadArticles();
        loadVideos();
        loadPlayers();
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Odošle zadaný email a heslo priamo do modulu Supabase Authentication.
      // Ak sú údaje správne, vráti objekt 'data' s informáciami o užívateľovi a systém ho pustí dnu.
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username, // Supabase expects email instead of generic username
        password: password,
      });

      if (error) {
        throw error;
      }

      const user: AdminUser = {
        id: data.user.id,
        username: data.user.email?.split('@')[0] || 'admin',
        email: data.user.email || '',
        role: 'root',
        createdAt: data.user.created_at,
        lastLogin: data.user.last_sign_in_at || new Date().toISOString(),
        isActive: true
      };

      setIsAuthenticated(true);
      setCurrentUser(user);
      loadArticles();
      loadVideos();
      loadPlayers();
      toast.success('Prihlásenie úspešné');
    } catch (error: any) {
      toast.error('Zlé prihlasovacie údaje alebo chyba siete: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUsername('');
    setPassword('');
  };

  const loadArticles = async () => {
    try {
      initializeArticles(defaultArticles);
      const data = await getAllArticles();
      setArticles(data);
    } catch (error) {
      toast.error('Chyba pri načítaní článkov');
      console.error(error);
    }
  };

  const loadVideos = async () => {
    try {
      const data = await videoService.getAllVideos();
      setVideos(data);
    } catch (error) {
      toast.error('Chyba pri načítaní videí');
      console.error(error);
    }
  };


  const loadPlayers = async () => {
    setLoading(true);
    try {
      const data = await getAllPlayers();
      setPlayers(data);
    } catch (error) {
      toast.error('Chyba pri načítaní hráčov');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateArticle = async (articleData: Omit<Article, 'id'>) => {
    setLoading(true);
    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, articleData);
        toast.success('Článok bol úspešne aktualizovaný');
      } else {
        await createArticle(articleData);
        toast.success('Článok bol úspešne vytvorený');
      }
      await loadArticles();
      setShowArticleForm(false);
      setEditingArticle(null);
    } catch (error: any) {
      toast.error('Chyba pri ukladaní článku: ' + (error.message || 'Neznáma chyba'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateVideo = async (videoData: Omit<Video, 'id' | 'views'>) => {
    setLoading(true);
    try {
      if (editingVideo) {
        await videoService.updateVideo(editingVideo.id, videoData);
        toast.success('Video bolo úspešne aktualizované');
      } else {
        await videoService.createVideo(videoData);
        toast.success('Video bolo úspešne vytvorené');
      }
      await loadVideos();
      setShowVideoForm(false);
      setEditingVideo(null);
    } catch (error: any) {
      toast.error('Chyba pri ukladaní videa: ' + (error.message || 'Neznáma chyba'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleCreateOrUpdatePlayer = async (playerData: Omit<Player, 'id' | 'age' | 'isActive'>) => {
    setLoading(true);
    try {
      const age = calculateAge(playerData.dateOfBirth);
      const extendedPlayerData = { ...playerData, age };

      if (editingPlayer) {
        // Aktualizácia v Supabase
        const result = await updatePlayer(editingPlayer.id, extendedPlayerData);
        if (result) {
          toast.success('Hráč bol úspešne aktualizovaný');
        } else {
          throw new Error('Nepodarilo sa aktualizovať hráča v databáze');
        }
      } else {
        // Vytvorenie v Supabase
        const result = await createPlayer(extendedPlayerData);
        if (result) {
          toast.success('Hráč bol úspešne vytvorený');
        } else {
          throw new Error('Nepodarilo sa vytvoriť hráča v databáze');
        }
      }
      await loadPlayers();
      setShowPlayerForm(false);
      setEditingPlayer(null);
    } catch (error: any) {
      toast.error('Chyba pri ukladaní hráča: ' + (error.message || ''));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateOfBirth?: string): number | undefined => {
    if (!dateOfBirth) return undefined;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    setLoading(true);
    try {
      if (itemToDelete.type === 'article') {
        await deleteArticle(itemToDelete.id as number);
        toast.success('Článok bol úspešne vymazaný');
        await loadArticles();
      } else if (itemToDelete.type === 'video') {
        await videoService.deleteVideo(itemToDelete.id as string);
        toast.success('Video bolo úspešne vymazané');
        await loadVideos();
      } else if (itemToDelete.type === 'player') {
        // Soft delete hráča v Supabase
        const success = await deletePlayerService(itemToDelete.id.toString());
        if (success) {
          toast.success('Hráč bol úspešne vymazaný');
          await loadPlayers();
        } else {
          throw new Error('Nepodarilo sa vymazať hráča z databázy');
        }
      }
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      toast.error('Chyba pri vymazávaní');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string | number, type: 'article' | 'video' | 'player') => {
    setItemToDelete({ id, type });
    setDeleteDialogOpen(true);
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setShowArticleForm(true);
  };

  const handleEditVideo = (video: Video) => {
    setEditingVideo(video);
    setShowVideoForm(true);
  };


  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
    setShowPlayerForm(true);
  };

  const handleNewArticle = () => {
    setEditingArticle(null);
    setShowArticleForm(true);
  };

  const handleNewVideo = () => {
    setEditingVideo(null);
    setShowVideoForm(true);
  };


  const handleNewPlayer = () => {
    setEditingPlayer(null);
    setShowPlayerForm(true);
  };

  const handleCancelForm = () => {
    setShowArticleForm(false);
    setShowVideoForm(false);
    setShowPlayerForm(false);
    setEditingArticle(null);
    setEditingVideo(null);
    setEditingPlayer(null);
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlayers = players.filter(player =>
    player.isActive && (
      player.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003474] to-[#002557] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-3">
            <div className="w-16 h-16 bg-[#003474] rounded-full flex items-center justify-center mx-auto">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-center text-2xl">Admin Panel FC Poprad - Stráže</CardTitle>
            <p className="text-center text-gray-600">Správa článkov a videí</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  E-mail
                </label>
                <Input
                  id="username"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Zadajte prihlasovací e-mail"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Heslo
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Zadajte heslo"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#003474] hover:bg-[#002557]">
                Prihlásiť sa
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#003474] text-white py-6 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-blue-200 mt-1">Správa obsahu FC Poprad</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-transparent text-white border-white hover:bg-white hover:text-[#003474] transition-colors"
          >
            Odhlásiť sa
          </Button>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Form views */}
        {showArticleForm ? (
          <ArticleForm
            article={editingArticle || undefined}
            onSubmit={handleCreateOrUpdateArticle}
            onCancel={handleCancelForm}
          />
        ) : showVideoForm ? (
          <VideoForm
            video={editingVideo || undefined}
            onSubmit={handleCreateOrUpdateVideo}
            onCancel={handleCancelForm}
          />
        ) : showPlayerForm ? (
          <PlayerForm
            player={editingPlayer || undefined}
            onSubmit={handleCreateOrUpdatePlayer}
            onCancel={handleCancelForm}
          />
        ) : (
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="articles">Články</TabsTrigger>
              <TabsTrigger value="videos">Videá</TabsTrigger>
              <TabsTrigger value="players">Hráči</TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="mt-6">
              {/* Articles Actions */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Hľadať články..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleNewArticle} className="bg-[#003474] hover:bg-[#002557]">
                  <Plus className="h-4 w-4 mr-2" />
                  Nový článok
                </Button>
              </div>

              {/* Articles list */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Načítavanie...</p>
                </div>
              ) : filteredArticles.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-gray-500">
                      {searchQuery ? 'Nenašli sa žiadne články' : 'Zatiaľ nemáte žiadne články'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredArticles.map(article => (
                    <Card key={article.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-48 h-32 flex-shrink-0">
                            <img
                              src={getArticleThumbnail(article)}
                              alt={article.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                  <span className="font-semibold text-[#003474]">{article.category}</span>
                                  <span>•</span>
                                  <span>{article.date}</span>
                                  <span>•</span>
                                  <span>{article.author}</span>
                                  <span>•</span>
                                  <span>{article.readTime} min</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {article.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEditArticle(article)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => confirmDelete(article.id, 'article')}
                                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              {/* Videos Actions */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Hľadať videá..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleNewVideo} className="bg-[#003474] hover:bg-[#002557]">
                  <Plus className="h-4 w-4 mr-2" />
                  Nové video
                </Button>
              </div>

              {/* Videos list */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Načítavanie...</p>
                </div>
              ) : filteredVideos.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-gray-500">
                      {searchQuery ? 'Nenašli sa žiadne videá' : 'Zatiaľ nemáte žiadne videá'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredVideos.map(video => (
                    <Card key={video.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-48 h-32 flex-shrink-0 relative bg-gray-200 rounded overflow-hidden">
                            {video.thumbnail ? (
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                <VideoIcon className="w-8 h-8" />
                              </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                              <div className="bg-white/90 rounded-full p-2">
                                <VideoIcon className="w-6 h-6 text-[#003474]" />
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-xl font-bold">{video.title}</h3>
                                  {(video as any).featured && (
                                    <span className="px-2 py-1 bg-[#b7975e] text-white rounded text-xs font-bold">
                                      Vybrané
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                  <span className="font-semibold text-[#003474]">{video.category}</span>
                                  <span>•</span>
                                  <span>{video.date}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {video.views}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                    {video.category}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEditVideo(video)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => confirmDelete(video.id, 'video')}
                                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="players" className="mt-6">
              {/* Players Actions */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Hľadať hráčov..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleNewPlayer} className="bg-[#003474] hover:bg-[#002557]">
                  <Plus className="h-4 w-4 mr-2" />
                  Pridať hráča
                </Button>
              </div>

              {/* Players list */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Načítavanie...</p>
                </div>
              ) : filteredPlayers.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-gray-500">
                      {searchQuery ? 'Nenašli sa žiadni hráči' : 'Zatiaľ nemáte žiadnych hráčov'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredPlayers.map(player => (
                    <Card key={player.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  {player.jerseyNumber && (
                                    <div className="w-10 h-10 bg-[#003474] text-white rounded-full flex items-center justify-center font-bold">
                                      {player.jerseyNumber}
                                    </div>
                                  )}
                                  <h3 className="text-xl font-bold">
                                    {player.firstName} {player.lastName}
                                  </h3>
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                                  <span className="font-semibold text-[#003474]">{player.position}</span>
                                  <span>•</span>
                                  <span>{player.category}</span>
                                  {player.age && (
                                    <>
                                      <span>•</span>
                                      <span>{player.age} rokov</span>
                                    </>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm">
                                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#003474] rounded-full font-medium border border-blue-100">
                                    <Target className="w-4 h-4" />
                                    {player.goals} gólov
                                  </span>
                                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full font-medium border border-yellow-200">
                                    <div className="w-3 h-4 rounded-sm border border-yellow-600/30 shadow-sm" style={{ backgroundColor: '#fbbf24' }} title="Žltá karta" />
                                    {player.yellowCards} ŽK
                                  </span>
                                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full font-medium border border-red-200">
                                    <div className="w-3 h-4 rounded-sm border border-red-700/30 shadow-sm" style={{ backgroundColor: '#ef4444' }} title="Červená karta" />
                                    {player.redCards} ČK
                                  </span>
                                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full font-medium border border-gray-200">
                                    <Users className="w-4 h-4" />
                                    {player.matchesPlayed} zápasov
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEditPlayer(player)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => confirmDelete(player.id, 'player')}
                                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Naozaj chcete vymazať {itemToDelete?.type === 'article' ? 'tento článok' : 'toto video'}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Táto akcia je nevratná. Položka bude natrvalo odstránená.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušiť</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Vymazať
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}