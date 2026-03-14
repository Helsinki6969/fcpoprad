/**
 * FC POPRAD - Article Service
 * 
 * Služba pre správu článkov – komunikuje s PHP/MySQL API.
 * Fallback na localStorage ak API nie je dostupné.
 */

import { Article } from '../data/articles';
import { supabase } from '../config/supabase';

// Inicializácia bola potrebná pre LocalStorage fallback, v Supabase netreba
export function initializeArticles(fallbackArticles: Article[]) {
  // Žiadna akcia - máme cloudovú DB
}

/**
 * Získať všetky články (Čítanie)
 */
export async function getAllArticles(): Promise<Article[]> {
  // Kľúčové slovo 'await' (počkaj) znamená, že kód tu na chvíľu zastane, odošle 
  // dopyt po sieti na server do Supabase a čaká na výsledok ('data') alebo chybu ('error').
  const { data, error } = await supabase
    .from('articles') // z tabuľky articles
    .select('*')      // vyber všetky stĺpce
    .order('date', { ascending: false }); // naposledy pridané (podľa dátumu) pôjdu prvé

  if (error) {
    console.error('Chyba pri načítaní článkov zo Supabase:', error);
    return [];
  }

  return (data || []).map(article => ({
    ...article,
    author: article.author || 'FC Poprad - Stráže',
    readTime: article.readTime || 5,
    tags: article.tags || []
  }));
}

/**
 * Získať článok podľa ID
 */
export async function getArticleById(id: number): Promise<Article | undefined> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Chyba pri hľadaní článku podľa ID:', error);
    return undefined;
  }

  return data ? {
    ...data,
    author: data.author || 'FC Poprad - Stráže',
    readTime: data.readTime || 5,
    tags: data.tags || []
  } : undefined;
}

/**
 * Získať článok podľa slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Chyba pri hľadaní článku podľa slugu:', error);
    return undefined;
  }

  return data ? {
    ...data,
    author: data.author || 'FC Poprad - Stráže',
    readTime: data.readTime || 5,
    tags: data.tags || []
  } : undefined;
}

/**
 * Pomocná funkcia na prevod dátumu z DD.MM.YYYY na YYYY-MM-DD (pre Supabase)
 */
function formatToDbDate(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  
  // Ak je už vo formáte YYYY-MM-DD, vrátime ho
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  
  // Ak je vo formáte DD.MM.YYYY
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  
  return new Date().toISOString().split('T')[0];
}

/**
 * Vytvoriť nový článok (Zápis)
 */
export async function createArticle(articleData: Omit<Article, 'id'>): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .insert([
      {
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        content: articleData.content,
        image: articleData.image,
        category: articleData.category,
        author: articleData.author,
        tags: articleData.tags || [],
        readTime: articleData.readTime,
        date: formatToDbDate(articleData.date),
        is_published: true
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Chyba pri vytváraní článku:', error);
    throw error;
  }

  return {
    ...data,
    author: data.author || 'FC Poprad - Stráže',
    readTime: data.readTime || 5,
    tags: data.tags || []
  };
}

/**
 * Aktualizovať existujúci článok
 */
export async function updateArticle(id: number, articleData: Partial<Article>): Promise<Article> {
  const dbUpdates: any = { ...articleData };
  
  // Odstránime ID ak náhodou prešlo (primary key sa nemení)
  delete dbUpdates.id;
  
  // Prevod dátumu ak je prítomný
  if (dbUpdates.date) {
    dbUpdates.date = formatToDbDate(dbUpdates.date);
  }

  // Ak existuje authorId, v databáze ho nemáme (máme len author meno), 
  // môžeme ho nechať ak by sme ho chceli do budúcna pridať, 
  // ale momentálne ho radšej odstránime aby nespôsobil chybu ak nie je v schéme.
  delete dbUpdates.authorId;
  delete dbUpdates.authorImage;
  delete dbUpdates.publishedDate;
  
  const { data, error } = await supabase
    .from('articles')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Chyba pri aktualizácii článku:', error);
    throw error;
  }

  return {
    ...data,
    author: data.author || 'FC Poprad - Stráže',
    readTime: data.readTime || 5,
    tags: data.tags || []
  };
}

/**
 * Vymazať článok
 */
export async function deleteArticle(id: number): Promise<void> {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
        console.error('Chyba pri odstraňovaní článku:', error);
        throw error;
    }
}

/**
 * Získať súvisiace články
 */
export async function getRelatedArticles(
  currentArticleId: number,
  category: string,
  limit: number = 3
): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .neq('id', currentArticleId)
    .limit(limit);

  if (error) {
    console.error('Chyba pri načítaní súvisiacich článkov:', error);
    return [];
  }

  return (data || []).map(article => ({
    ...article,
    author: article.author || 'FC Poprad - Stráže',
    readTime: article.readTime || 5,
    tags: article.tags || []
  }));
}