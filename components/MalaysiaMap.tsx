import { states } from '@/data/states';
import type { DataCategory } from '@/types';
import { getCategoryLabel, getDataValue, formatValue } from '@/lib/helpers';

interface MalaysiaMapProps {
  activeState: string | null;
  selectedCategory: DataCategory;
  onStateChange: (stateId: string | null) => void;
  getStateData: (stateName: string, category: DataCategory) => any;
}

const MalaysiaMap = ({ activeState, selectedCategory, onStateChange, getStateData }: MalaysiaMapProps) => {
  return (
    <div className="relative bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-center items-center">
      {/* State name and data display */}
      <div className="absolute top-0 lg:top-20 text-center min-h-[100px] flex flex-col items-center justify-center">
        {activeState ? (
          <div className="animate-fade-in">
            <div className="text-xl lg:text-4xl font-bold text-sky-600 mb-0 lg:mb-2">
              {states.find(s => s.id === activeState)?.name}
            </div>
            {(() => {
              const stateName = states.find(s => s.id === activeState)?.name || '';
              const data = getStateData(stateName, selectedCategory);
              return data ? (
                <div className="text-xs lg:text-2xl text-gray-700">
                  <div className="font-semibold text-gray-500 text-xs lg:text-base mb-1">
                    {getCategoryLabel(selectedCategory)}
                  </div>
                  <div className="font-bold text-sky-600">
                    {formatValue(getDataValue(data, selectedCategory), selectedCategory)}
                  </div>
                </div>
              ) : (
                <div className="text-sm lg:text-base text-gray-500">
                  No data available
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="tracking-wide font-bold text-gray-400 mb-2">
            Hover over a state or select one...
          </div>
        )}
      </div>

      <div className="relative w-full">
        {/* Interactive Map */}
        <svg
          viewBox="0 0 940 400"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {states.map((state) => {
            // Determine fill color based on active state
            let fillColor = '#e5e7eb'; // default gray
            if (activeState === state.id) {
              fillColor = '#0ea5e9'; // bright blue for active state
            }

            return (
              <g key={state.id}>
                <path
                  d={state.path}
                  fill={fillColor}
                  stroke="#374151"
                  strokeWidth="1.5"
                  className="transition-all duration-200 cursor-pointer hover:fill-sky-500"
                  onMouseEnter={() => onStateChange(state.id)}
                  onMouseLeave={() => {}} // Don't clear state on mouse leave
                />
              </g>
            );
          })}
        </svg>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MalaysiaMap;

