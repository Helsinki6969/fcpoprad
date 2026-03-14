export function AkoSaZlepsujeme() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-[30px] shadow-lg p-8 md:p-12 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Ako sa zlepšujeme
          </h1>
          <p className="text-xl text-white">Naša cesta k dokonalosti</p>
        </div>

        {/* Graph Placeholder */}
        <div className="bg-white rounded-[30px] shadow-lg p-6 md:p-8">
          <div className="bg-[#f8f9fa] border-2 border-dashed border-gray-300 rounded-[20px] w-full flex items-center justify-center min-h-[400px]">
            <div className="text-center p-8">
              <p className="text-2xl font-medium text-gray-600 mb-2">Vizualizácia pokroku klubu</p>
              <p className="text-sm text-gray-400 italic">Doplnková grafika vo vývoji</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
