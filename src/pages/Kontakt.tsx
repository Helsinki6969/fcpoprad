import { Mail, Phone, MapPin, Clock, Send, Briefcase, Landmark } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { supabase } from '../config/supabase';

export function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Posielame dáta priamo do Supabase tabuľky 'contact_messages'
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        ]);

      if (error) throw error;

      // Volanie PHP mailera na odoslanie notifikácie na mail
      try {
        const mailResponse = await fetch('/api/contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const mailData = await mailResponse.json();
        
        if (!mailResponse.ok) {
          console.warn('E-mail notification partially failed:', mailData.error);
          setSubmitStatus('error');
          setErrorMessage(`Správa bola uložená v databáze, ale e-mailovú notifikáciu sa nepodarilo odoslať: ${mailData.error}`);
          return; // V prípade chyby mailu nebudeme vymazávať formulár, aby ho užívateľ videl
        }

        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err: any) {
        console.error('Email notification failed:', err);
        setSubmitStatus('error');
        setErrorMessage('Správa bola uložená v databáze, ale spojenie s e-mailovým serverom zlyhalo.');
        return;
      }
      
      // Skryť success správu po 5 sekundách
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(`Chyba pri odosielaní: ${error.message || 'Skúste to prosím neskôr.'}`);
      console.error('Error sending contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#003474] to-blue-700 rounded-2xl shadow-xl p-12 mb-12 text-white">
          <h1 className="text-4xl mb-4">Kontakt</h1>
          <p className="text-xl text-blue-100">
            Sme tu pre vás - kontaktujte nás kedykoľvek
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo */}
          <div className="flex items-start justify-center lg:justify-start">
            <div className="bg-white rounded-xl shadow-md p-8 w-full h-full flex items-center justify-center">
              <img src={logo} alt="FC Poprad Logo" className="w-full h-auto" />
            </div>
          </div>

          {/* Column 2: Info & Contact */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl mb-6 text-[#003474]">Info & Kontakt</h2>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-[#003474] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600">
                    FC Poprad - Stráže<br />
                    Kukučínová 4131/22<br />
                    05801 Poprad<br />
                    Slovensko
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-[#B7975E] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600">
                    Vladimír Bycko<br />
                    +421 911 988 600
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-[#003474] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600">
                    turlik.adrian167@gmail.com
                  </p>
                </div>
              </div>

              {/* Business ID */}
              <div className="flex items-start">
                <Briefcase className="w-6 h-6 text-[#B7975E] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600">
                    IČO: 31305792<br />
                    DIČ: 2020655516
                  </p>
                </div>
              </div>

              {/* Bank Account */}
              <div className="flex items-start">
                <Landmark className="w-6 h-6 text-[#003474] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600">
                    Bankový účet:<br />
                    SK51 0900 0000 0000 9328 0784<br />
                    Slovenská sporiteľňa a.s.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl mb-6 text-[#003474]">Napíšte nám</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-700">
                  Meno a priezvisko *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003474] focus:border-transparent"
                  placeholder="Vaše meno"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003474] focus:border-transparent"
                  placeholder="vas@email.sk"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-gray-700">
                  Predmet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003474] focus:border-transparent"
                  placeholder="Predmet správy"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-gray-700">
                  Správa *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003474] focus:border-transparent resize-none"
                  placeholder="Vaša správa..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#003474] to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                Odoslať správu
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 text-green-500">
                  <p>Ďakujeme za vašu správu! Budeme vás kontaktovať čoskoro.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 text-red-500">
                  <p>{errorMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Map - Full Width Below */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-96 bg-gray-200 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.8!2d20.3056!3d49.0615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473e35e8c0a8e8a1%3A0x0!2sKuku%C4%8D%C3%ADnov%C3%A1%204131%2F22%2C%20058%2001%20Poprad!5e0!3m2!1ssk!2ssk!4v1234567890"
              className="w-full h-full border-0"
              loading="lazy"
              title="Mapa FC Poprad"
            />
          </div>
        </div>
      </div>
    </div>
  );
}