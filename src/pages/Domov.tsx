import { Hero } from '../components/Hero';
import { NewsGrid } from '../components/NewsGrid';
import { Sidebar } from '../components/Sidebar';

export function Domov() {
  return (
    <>
      {/* Hero sekcia - úvodný banner na vrchu stránky */}
      <Hero />
      
      {/* Hlavný obsah stránky s max-width kontainerom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid layout: 2/3 obsah + 1/3 sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hlavný obsah - články (zaberie 2 stĺpce z 3) */}
          <div className="lg:col-span-2">
            <NewsGrid />
          </div>
          
          {/* Sidebar - doplnkové info (zaberie 1 stĺpec z 3) */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
