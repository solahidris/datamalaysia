import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { states } from '@/data/states';

const Home = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Peta Malaysia
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Visualizing data in a friendlier way
        </p>

        <div className="relative bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-center items-center">
          {/* State name display */}
          <div className="absolute top-4 lg:top-20 text-center h-8">
            {hoveredState && (
              <div className="text-xl lg:text-4xl font-bold text-sky-600 animate-fade-in">
                {states.find(s => s.id === hoveredState)?.name}
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
                    transition={{ duration: 0.05 }}
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
                          animationSpeed={3}
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
                    onMouseEnter={() => setHoveredState(state.id)}
                    onMouseLeave={() => setHoveredState(null)}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Malaysia consists of 13 states and 3 federal territories</p>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 border-2 border-gray-700"></div>
              <span>Default</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-sky-500 border-2 border-gray-700"></div>
              <span>Hover</span>
            </div>
          </div>
        </div>
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

export default Home;