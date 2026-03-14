import { Menu, ChevronDown, User, X } from 'lucide-react'; // Ikony z Lucide
import { useState, useEffect } from 'react'; // React hooky
import { Link, useLocation } from 'react-router'; // Navigácia a zistenie aktuálnej URL
import logo from '../assets/logo.png'; // Logo FC Poprad

export function Header() {
  // State pre otvorenie/zatvorenie mobilného menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State pre sledovanie, ktoré dropdown menu je práve otvorené (null = žiadne)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Hook pre zistenie aktuálnej URL cesty
  const location = useLocation();

  // Efekt pre zablokovanie scrollovania body pri otvorenom mobilnom menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  /**
   * Štruktúra navigačného menu
   * Každá položka môže mať dropdown s podpoložkami
   */
  const menuItems = [
    {
      label: 'DOMOV',
      href: '/',
      dropdown: [
        { label: 'Aktuálne', href: '/clanky' },
        { label: 'Klubová TV', href: '/klubova-tv' },
        { label: 'Štadión', href: '/stadion' },
        { label: 'Stráže pod Tatrami', href: '/straze' },
        { label: 'Klubová hymna', href: '/klubova-hymna' }
      ]
    },
    {
      label: 'O NÁS',
      href: '/historia',
      dropdown: [
        { label: 'História', href: '/historia' },
        { label: 'Predstavitelia klubu', href: '/osoby' },
        { label: 'Poslanie', href: '/misia' },
        { label: 'Ako sa zlepšujeme', href: '/vylepsenie' },
        { label: 'Klubová hymna', href: '/klubova-hymna' }
      ]
    },
    {
      label: 'TÍMY',
      href: '/timy',
      dropdown: [
        { label: 'A-tím', href: '/atim' },
        { label: 'U19', href: '/u19' },
        { label: 'U17', href: '/u17' },
        { label: 'U15', href: '/u15' },
        { label: 'U13', href: '/u13' }
      ]
    },
    {
      label: 'MARKETING',
      href: '/partneri',
      dropdown: [
        { label: 'Partneri', href: '/partneri' },
        { label: 'Ako nám môžeš pomôcť?', href: '/ako-pomohnut' },
        { label: 'Kontakt', href: '/kontakt' }
      ]
    },
    { label: 'KONTAKTY', href: '/kontakt' }, // Bez dropdown menu
    { label: 'TÝŽDENNÝ MIKROCYKLUS', href: '/tyzdennik' }, // Bez dropdown menu
  ];

  return (
    <>
      {/* Zlatý Top Bar - oznamovací pás */}
      <div className="bg-gradient-to-r from-[#B7975E] to-[#C5A878] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            {/* Ľavá strana - názov klubu */}
            <div className="flex items-center space-x-6">
              <span className="font-medium">FC Poprad - Stráže</span>
            </div>
            {/* Pravá strana - oznámenie (skryté na mobile) */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="hover:text-[#D4B88E] transition-colors">
                FUTBAL JE HRA A HRAŤ BY SA MAL ČLOVEK PRE RADOSŤ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hlavná navigačná lišta - modrá (#003474) */}
      <nav className="bg-[#003474] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo a názov klubu */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3">
                <img src={logo} alt="FC Poprad Logo" className="w-12 h-12" />
                <div className="hidden sm:block">
                  <div className="font-bold text-xl">FC POPRAD - STRÁŽE</div>
                  <div className="text-xs text-blue-200">Futbalový klub</div>
                </div>
              </Link>
            </div>

            {/* Desktop Menu - zobrazuje sa na veľkých obrazovkách (lg a väčšie) */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  // Otvorí dropdown pri najetí myšou
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  // Zatvorí dropdown pri odjedení myšou
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* Hlavná položka menu */}
                  <Link
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium hover:bg-blue-700 rounded transition-colors ${
                      location.pathname === item.href ? 'bg-blue-700' : '' // Zvýrazní aktívnu stránku
                    }`}
                  >
                    {item.label}
                    {/* Šípka dolu, ak má dropdown */}
                    {item.dropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                  </Link>
                  
                  {/* Dropdown menu - zobrazí sa len ak je activeDropdown nastavené na túto položku */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-1">
                      <div className="w-56 bg-white rounded-lg shadow-xl py-2 text-gray-800">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pravá strana - vyhľadávanie, hamburger menu, logo partnera */}
            <div className="flex items-center space-x-4">
              {/* Ikona konta - odkaz na Admin Panel */}
              <Link 
                to="/admin"
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                title="Admin Panel"
              >
                <User className="w-5 h-5" />
              </Link>
              
              {/* Hamburger menu tlačidlo - zobrazuje sa len na mobiloch */}
              <button
                className="lg:hidden p-2 hover:bg-blue-700 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobilné menu - Fullscreen overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] bg-[#003474] flex flex-col pt-20 overflow-y-auto">
            {/* Tlačidlo na zatvorenie v pravom hornom rohu */}
            <button
              className="absolute top-6 right-6 p-2 text-white hover:bg-blue-700 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="px-6 py-8 space-y-6 pb-20">
              {menuItems.map((item) => (
                <div key={item.label} className="border-b border-blue-700/50 pb-4">
                  {/* Hlavná položka - výraznejšia */}
                  <Link
                    to={item.href}
                    className={`block py-2 text-xl font-bold transition-colors ${
                      location.pathname === item.href ? 'text-[#B7975E]' : 'text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>

                  {/* Rozbalené podpoložky priamo pod hlavnou položkou */}
                  {item.dropdown && (
                    <div className="mt-3 grid grid-cols-1 gap-3 pl-4">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block text-blue-200 text-base py-1 hover:text-white transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Odkaz na admin panel v mobilnom menu */}
              <Link
                to="/admin"
                className="flex items-center space-x-3 py-4 text-blue-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-6 h-6" />
                <span className="font-medium text-lg text-white">Administrácia</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}