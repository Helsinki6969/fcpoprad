const historiaPdf = "https://cnhgzdliqiixlxyiksio.supabase.co/storage/v1/object/public/uploads/dokumenty/historia.pdf";
import { FileText, Download, ExternalLink } from 'lucide-react';

export function Historia() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-[30px] shadow-lg p-8 md:p-12 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            História
          </h1>
          <p className="text-xl text-white">Viac ako 70 rokov futbalovej tradície</p>
        </div>

        {/* Intro Text */}
        <div className="bg-white rounded-[30px] shadow-lg p-6 md:p-8 mb-8">
          <p className="text-xl text-gray-700 mb-4">
            <strong>Vážení priatelia nášho klubu!</strong>
          </p>
          <p className="text-xl text-gray-700">
            V tejto časti našej stránky vám prinášame obsiahle informácie z histórie klubu v dvoch častiach
            <br />
            rozdelených podľa časových období.
          </p>
        </div>

        {/* Period 2005 - Present */}
        <div className="bg-white rounded-[30px] shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#b7975e] mb-4">
            OBDOBIE OD ROKU 2005 PO SÚČASNOSŤ
          </h2>
          <p className="text-xl text-gray-700">
            Pripravujeme...
          </p>
        </div>

        {/* Period 1945 - 2005 */}
        <div className="bg-white rounded-[30px] shadow-lg mb-8 border-t-4 border-[#b7975e] overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003474] mb-4">
              OBDOBIE OD ROKU 1945 DO ROKU 2005
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Informácie z tohto obdobia si môžete nájsť v brožúrke, ktorá vznikla pri príležitosti 60. výročia vzniku klubu.
            </p>
          </div>

          {/* PDF Preview and Download Area */}
          <div className="border-t border-gray-100 bg-white">
            <div className="bg-[#003474] p-4 flex items-center justify-between text-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6" />
                <span className="font-bold hidden sm:inline">Brožúrka k 60. výročiu klubu</span>
                <span className="font-bold sm:hidden">Brožúrka 60. r.</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={historiaPdf}
                  download="Historia_FC_Poprad_Straze.pdf"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-bold transition-all"
                >
                  <Download className="w-4 h-4" />
                  Stiahnuť
                </a>
                <a
                  href={historiaPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#b7975e] hover:bg-[#a6864d] px-4 py-2 rounded-full text-sm font-bold transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  V novom okne
                </a>
              </div>
            </div>

            {/* The actual PDF component - ratio adjusted for A4 page view */}
            <div className="w-full bg-gray-100 flex flex-col">
              <iframe
                src={`${historiaPdf}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full border-none shadow-inner"
                style={{ height: '850px' }}
                title="FC Poprad Stráže - História"
              />
            </div>

            <div className="p-6 bg-[#f8f9fa] text-center text-gray-600 italic border-t border-gray-100">
              V prípade, že sa PDF správne nezobrazuje, použite tlačidlá v hornej lište pre stiahnutie alebo otvorenie v novom okne.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
