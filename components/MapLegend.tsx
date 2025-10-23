const MapLegend = () => {
  return (
    <div className="mt-8 text-center text-sm text-gray-600">
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 border-2 border-gray-700"></div>
          <span>Default</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-sky-500 border-2 border-gray-700"></div>
          <span>Hover to view data</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;

