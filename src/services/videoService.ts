/**
 * FC POPRAD - Video Service
 * 
 * Služba pre správu videí – komunikuje s PHP/MySQL API.
 * Fallback na in-memory storage ak API nie je dostupné.
 */

import { Video } from '../data/videos';
import { supabase } from '../config/supabase';

class VideoService {
  private mapVideoFromDb(dbVideo: any): Video {
    const isYoutube = dbVideo.youtubeurl && (dbVideo.youtubeurl.includes('youtube.com') || dbVideo.youtubeurl.includes('youtu.be'));
    
    return {
      ...dbVideo,
      youtubeId: isYoutube ? dbVideo.youtubeid : undefined,
      youtubeUrl: isYoutube ? dbVideo.youtubeurl : undefined,
      videoUrl: !isYoutube ? dbVideo.youtubeurl : undefined,
      tags: dbVideo.tags || [],
    };
  }

  /**
   * Získať všetky videá
   */
  async getAllVideos(): Promise<Video[]> {
    // Podobne ako pri článkoch, vytvárame požiadavku (dopyt) na získanie dát zo Supabase čítania 'videos'
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Chyba pri načítaní videí zo Supabase:', error);
      return [];
    }

    return (data || []).map(v => this.mapVideoFromDb(v));
  }

  /**
   * Získať video podľa ID
   */
  async getVideoById(id: string): Promise<Video | undefined> {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Chyba pri načítaní videa:', error);
      return undefined;
    }

    return data ? this.mapVideoFromDb(data) : undefined;
  }

  /**
   * Pridať nové video
   */
  async addVideo(video: Omit<Video, 'id' | 'views'>): Promise<Video> {
    console.log("Pokus o pridanie videa:", video);
    
    // Validácia povinných polí predtým než pošleme do Supabase
    if (!video.title || (!video.youtubeId && !video.videoUrl)) {
      const missing = [];
      if (!video.title) missing.push('Názov');
      if (!video.youtubeId && !video.videoUrl) missing.push('YouTube ID alebo Video URL');
      throw new Error(`Chýbajú povinné polia: ${missing.join(', ')}`);
    }

    const { data, error } = await supabase
      .from('videos')
      .insert([
        {
          title: video.title,
          description: video.description || '',
          youtubeid: video.youtubeId || 'direct',
          youtubeurl: video.videoUrl || video.youtubeUrl || '',
          thumbnail: video.thumbnail || (video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80'),
          category: video.category || 'Ostatné',
          tags: video.tags || [],
          date: video.date || new Date().toISOString().split('T')[0]
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Podrobná chyba Supabase pri pridávaní videa:', error);
      throw new Error(`Supabase error: ${error.message}${error.details ? ' (' + error.details + ')' : ''}`);
    }

    return this.mapVideoFromDb(data);
  }

  /**
   * Alias pre addVideo
   */
  async createVideo(video: Omit<Video, 'id' | 'views'>): Promise<Video> {
    return this.addVideo(video);
  }

  /**
   * Aktualizovať existujúce video
   */
  async updateVideo(id: string, updates: Partial<Omit<Video, 'id' | 'views'>>): Promise<Video | null> {
    const dbUpdates: any = { ...updates };
    if (dbUpdates.youtubeId !== undefined) {
      dbUpdates.youtubeid = dbUpdates.youtubeId;
      delete dbUpdates.youtubeId;
    }
    if (dbUpdates.youtubeUrl !== undefined) {
      dbUpdates.youtubeurl = dbUpdates.youtubeUrl;
      delete dbUpdates.youtubeUrl;
    }
    if (dbUpdates.videoUrl !== undefined) {
      dbUpdates.youtubeurl = dbUpdates.videoUrl;
      delete dbUpdates.videoUrl;
    }

    const { data, error } = await supabase
      .from('videos')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Chyba pri aktualizácii videa:', error);
      return null;
    }

    return this.mapVideoFromDb(data);
  }

  /**
   * Vymazať video
   */
  async deleteVideo(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Chyba pri mazaní videa:', error);
      return false;
    }

    return true;
  }

  /**
   * Zvýšiť počet zhliadnutí.
   * Funkcia najprv stiahne aktuálne video, zistí aktuálny stav .views, pripočíta 1 a odošle novú hodnotu (.update).
   */
  async incrementViews(id: string): Promise<void> {
    const video = await this.getVideoById(id);
    if (video) {
        await supabase
            .from('videos')
            .update({ views: video.views + 1 })
            .eq('id', id); // Uisti sa, že aktualizuješ iba video so správnym ID!
    }
  }
}

export const videoService = new VideoService();