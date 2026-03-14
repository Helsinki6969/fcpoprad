const mikrocyklusPdf = "https://cnhgzdliqiixlxyiksio.supabase.co/storage/v1/object/public/uploads/dokumenty/tyzdennymikrocyklus.pdf";
import { FileText, Download, ExternalLink } from 'lucide-react';

export function TyzdennyMikrocyklus() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#003474] to-blue-700 rounded-3xl shadow-xl p-12 mb-12 text-white">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="h-12 w-12" />
            <h1 className="text-5xl">Týždenný mikrocyklus</h1>
          </div>
          <p className="text-2xl text-blue-100">
            Aktuálny prehľad tréningov a zápasov všetkých kategórií
          </p>
        </div>

        {/* PDF Container Section */}
        <div className="bg-white rounded-[30px] shadow-lg mb-8 border-t-4 border-[#b7975e] overflow-hidden">
          {/* PDF Toolbar */}
          <div className="bg-[#003474] p-4 flex items-center justify-between text-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              <span className="font-bold hidden sm:inline">Týždenný mikrocyklus.pdf</span>
              <span className="font-bold sm:hidden">Mikrocyklus</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={mikrocyklusPdf}
                download="Tyzdenny_Mikrocyklus_FC_Poprad_Straze.pdf"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-bold transition-all"
              >
                <Download className="w-4 h-4" />
                Stiahnuť
              </a>
              <a
                href={mikrocyklusPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#b7975e] hover:bg-[#a6864d] px-4 py-2 rounded-full text-sm font-bold transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                V novom okne
              </a>
            </div>
          </div>

          {/* PDF Preview Area */}
          <div className="w-full bg-white flex flex-col">
            <iframe
              src={`${mikrocyklusPdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              className="w-full border-none shadow-inner"
              style={{ height: '370px' }}
              title="FC Poprad Stráže - Týždenný Mikrocyklus"
            />
          </div>

          <div className="p-6 bg-[#f8f9fa] text-center text-gray-600 italic border-t border-gray-100">
            V prípade, že sa PDF správne nezobrazuje, použite tlačidlá v hornej lište pre stiahnutie alebo otvorenie v novom okne.
          </div>
        </div>
      </div>
    </div>
  );
}
