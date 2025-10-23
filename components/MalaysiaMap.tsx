import { AnimatePresence, motion } from 'framer-motion';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { states } from '@/data/states';
import type { DataCategory } from '@/types';
import { getCategoryLabel, getDataValue, formatValue } from '@/lib/helpers';

interface MalaysiaMapProps {
  hoveredState: string | null;
  selectedCategory: DataCategory;
  onStateHover: (stateId: string | null) => void;
  getStateData: (stateName: string, category: DataCategory) => any;
}

const MalaysiaMap = ({ hoveredState, selectedCategory, onStateHover, getStateData }: MalaysiaMapProps) => {
  return (
    <div className="relative bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-center items-center">
      {/* State name and data display */}
      <div className="absolute top-0 lg:top-20 text-center min-h-[100px] flex flex-col items-center justify-center">
        {hoveredState ? (
          <div className="animate-fade-in">
            <div className="text-xl lg:text-4xl font-bold text-sky-600 mb-0 lg:mb-2">
              {states.find(s => s.id === hoveredState)?.name}
            </div>
            {(() => {
              const stateName = states.find(s => s.id === hoveredState)?.name || '';
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
            Hover over a state...
          </div>
        )}
      </div>

      <div className="relative w-full">
        {/* Canvas Reveal Effect Layer - Behind the map */}
        <svg
          viewBox="0 0 940 400"
          className="w-full h-auto absolute inset-0"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            {/* Define clip paths for each state */}
            {states.map((state) => (
              <clipPath key={`clip-${state.id}`} id={`clip-${state.id}`}>
                <path d={state.path} />
              </clipPath>
            ))}
          </defs>

          <AnimatePresence>
            {hoveredState && (
              <motion.g
                key={hoveredState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <foreignObject
                  x="0"
                  y="0"
                  width="940"
                  height="400"
                  clipPath={`url(#clip-${hoveredState})`}
                >
                  <div style={{ width: '940px', height: '400px', pointerEvents: 'none' }}>
                    <CanvasRevealEffect
                      animationSpeed={9}
                      containerClassName="bg-sky-600"
                      colors={[[125, 211, 252]]}
                    />
                  </div>
                </foreignObject>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Interactive Map Layer - On top */}
        <svg
          viewBox="0 0 940 400"
          className="w-full h-auto relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {states.map((state) => (
            <g key={state.id}>
              <path
                d={state.path}
                fill={hoveredState === state.id ? 'rgba(229, 231, 235, 0)' : '#e5e7eb'}
                stroke="#374151"
                strokeWidth="1.5"
                className="transition-all duration-100 cursor-pointer"
                style={{
                  filter: hoveredState === state.id ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0))' : 'none'
                }}
                onMouseEnter={() => onStateHover(state.id)}
                onMouseLeave={() => onStateHover(null)}
              />
            </g>
          ))}
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

