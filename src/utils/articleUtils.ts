import { Article } from '../data/articles';

/**
 * Získa náhľadový obrázok článku.
 * 1. Ak je zadaný article.image, použije sa ten.
 * 2. Ak nie je, hľadá sa v article.content YouTube odkaz a použije sa jeho thumbnail.
 * 3. Ak sa nenájde ani to, vráti sa generický klubový obrázok.
 */
export function getArticleThumbnail(article: Article): string {
  // Ak je zadaný obrázok...
  if (article.image && article.image.trim() !== '') {
    // Ak je to náhodou MP4 video (zo zdroja), vrátime placeholder alebo generické logo
    if (article.image.toLowerCase().endsWith('.mp4')) {
      return '/assets/video-placeholder.png'; // Budeme musieť zabezpečiť tento asset alebo použiť iný
    }
    return article.image;
  }

  const content = article.content || '';
  
  // 1. YouTube [embed] alebo URL
  const youtubeMatch = content.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/i);
  if (youtubeMatch && youtubeMatch[1]) {
    return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
  }

  // 2. Skúsime nájsť akýkoľvek <img> v obsahu (ak by tam niečo zostalo)
  const imgMatch = content.match(/<img[^>]+src="?([^"\s]+)"?/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }

  // 3. Ak je to video článok (Klubová TV) a nemá nič iné, skúsme video ikonu
  if (article.category === 'Klubová TV') {
    return 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80'; // Atraktívny video/štadión placeholder
  }

  // Fallback logo
  return '/assets/logo.png';
}

/**
 * Získa YouTube ID z obsahu článku, ak existuje.
 */
export function getArticleVideoId(article: Article): string | null {
  const content = article.content || '';
  
  // Skúsime nájsť [embed] youtube link
  const embedMatch = content.match(/\[embed\].*?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+).*?\[\/embed\]/i);
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1];
  }

  // Skúsime nájsť surový youtube link (iframe)
  const iframeMatch = content.match(/src="https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i);
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }

  // Skúsime nájsť surový youtube link len tak v texte
  const rawUrlMatch = content.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/i);
  if (rawUrlMatch && rawUrlMatch[1]) {
    return rawUrlMatch[1];
  }

  return null;
}
