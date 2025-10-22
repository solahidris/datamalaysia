import { useState } from 'react';
import { states } from '@/components/states';

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

        <div className="relative bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center items-center">
          {/* State name display */}
          <div className="absolute top-4 lg:top-20 text-center h-8">
            {hoveredState && (
              <div className="text-xl lg:text-4xl font-bold text-blue-600 animate-fade-in">
                {states.find(s => s.id === hoveredState)?.name}
              </div>
            )}
          </div>
          <svg
            viewBox="0 0 940 400"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {states.map((state) => (
              <g key={state.id}>
                <path
                  d={state.path}
                  fill={hoveredState === state.id ? '#3b82f6' : '#e5e7eb'}
                  stroke="#374151"
                  strokeWidth="1.5"
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    filter: hoveredState === state.id ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' : 'none'
                  }}
                  onMouseEnter={() => setHoveredState(state.id)}
                  onMouseLeave={() => setHoveredState(null)}
                />
              </g>
            ))}
          </svg>
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
              <div className="w-4 h-4 bg-blue-500 border-2 border-gray-700"></div>
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