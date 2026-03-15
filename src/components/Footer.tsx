import { Facebook, Instagram, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { Link } from 'react-router';
import logo from '../assets/logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Supabase storage base URL for images
  const STORAGE_URL = 'https://cnhgzdliqiixlxyiksio.supabase.co/storage/v1/object/public/images';

  return (
    <footer className="bg-[#003474] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info */}
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="FC Poprad Logo" className="w-12 h-12" />
              <div>
                <div className="font-bold text-lg">FC POPRAD</div>
                <div className="text-xs text-blue-200">Futbalový klub</div>
              </div>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed">
              Futbal je emocia, aj nádej a pre radosť. Podporujte váš lokálny futbalový klub.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-4">
              <a
                href="https://www.facebook.com/fcpopradstraze"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-700 hover:bg-[#B7975E] rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/fcppstraze/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-700 hover:bg-[#B7975E] rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="tel:+421911988600"
                className="w-10 h-10 bg-blue-700 hover:bg-[#B7975E] rounded-full flex items-center justify-center transition-colors"
                aria-label="Telefón"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="mailto:fcpopradstraze@gmail.com"
                className="w-10 h-10 bg-blue-700 hover:bg-[#B7975E] rounded-full flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-[#B7975E]">Rýchle odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Domov
                </Link>
              </li>
              <li>
                <Link to="/clanky" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Aktuálne
                </Link>
              </li>
              <li>
                <Link to="/klubova-hymna" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Klubová hymna
                </Link>
              </li>
              <li>
                <Link to="/tyzdennik" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Týždenný mikrocyklus
                </Link>
              </li>
              <li>
                <Link to="/osoby" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Činovníci a tréneri
                </Link>
              </li>
              <li>
                <Link to="/misia" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Poslanie
                </Link>
              </li>
              <li>
                <Link to="/vylepsenie" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Ako sa zlepšujeme
                </Link>
              </li>
            </ul>
          </div>

          {/* Club Sections */}
          <div>
            <h3 className="font-bold mb-4 text-[#B7975E]">Klub</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/historia" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  História
                </Link>
              </li>
              <li>
                <Link to="/stadion" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Štadión
                </Link>
              </li>
              <li>
                <Link to="/osoby" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Činovníci a tréneri
                </Link>
              </li>
              <li>
                <Link to="/misia" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Poslanie
                </Link>
              </li>
              <li>
                <Link to="/vylepsenie" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  Ako sa zlepšujeme
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-[#B7975E]">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#B7975E] flex-shrink-0 mt-0.5" />
                <div className="text-blue-200 text-sm">
                  <div>FC Poprad - Stráže</div>
                  <div>Kukučínová 4131/22</div>
                  <div>058 01 Poprad</div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#B7975E] flex-shrink-0" />
                <a href="tel:+421911988600" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  +421 911 988 600
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#B7975E] flex-shrink-0" />
                <a href="mailto:fcpopradstraze@gmail.com" className="text-blue-200 hover:text-[#B7975E] transition-colors text-sm">
                  fcpopradstraze@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-200 text-sm text-center md:text-left">
              © {currentYear} FC Poprad - Stráže. Všetky práva vyhradené.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <a href="#" className="text-blue-200 hover:text-[#B7975E] transition-colors">
                Ochrana osobných údajov
              </a>
              <a href="#" className="text-blue-200 hover:text-[#B7975E] transition-colors">
                Podmienky používania
              </a>
              <a href="#" className="text-blue-200 hover:text-[#B7975E] transition-colors">
                GDPR
              </a>
              <Link 
                to="/admin" 
                className="text-blue-200 hover:text-[#B7975E] transition-colors inline-flex items-center gap-1"
              >
                <Lock className="w-3 h-3" />
                Admin
              </Link>
            </div>
          </div>
          
          {/* Partner Logos Section */}
          <div className="mt-8 pt-6 border-t border-blue-700">
            <div className="text-center text-blue-200 text-sm mb-4">Partneri klubu</div>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="bg-white rounded-lg p-4 h-20 w-32 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={`${STORAGE_URL}/mestopoprad.png`}
                  alt="Mesto Poprad"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="bg-white rounded-lg p-4 h-20 w-32 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={`${STORAGE_URL}/jubema.png`}
                  alt="Jubema"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="bg-white rounded-lg p-4 h-20 w-32 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={`${STORAGE_URL}/lunys.png`}
                  alt="Lunys"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="bg-white rounded-lg p-4 h-20 w-32 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={`${STORAGE_URL}/tatraclima.png`}
                  alt="Tatra Clima"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}