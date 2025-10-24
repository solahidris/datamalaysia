import { useData } from '@/contexts/DataContext';
import Header from '@/components/Header';
import CategorySelectorDialog from '@/components/CategorySelectorDialog';
import StateSelectorDialog from '@/components/StateSelector';
import MalaysiaMap from '@/components/MalaysiaMap';
import MapLegend from '@/components/MapLegend';
import ChartSection from '@/components/ChartSection';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';
import { useState } from 'react';

const MapB = () => {
  const {
    activeState,
    selectedCategory,
    selectedChartType,
    setActiveState,
    setSelectedCategory,
    setSelectedChartType,
    getStateData,
    chartData
  } = useData();

  const [isProMode, setIsProMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 pb-12">

      <div className='flex items-center justify-between bg-white max-w-6xl mx-auto p-4'>
        <h1 className='text-xl font-bold text-center text-gray-800'>
          Data Malaysia
        </h1>
        <h2 className='text-sm capitalize font-bold text-center text-gray-800'>
          Visualizing data better
        </h2>

      </div>

      <div className="max-w-6xl mx-auto px-4 pt-12">

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border relative">
            <div className="flex relative">
              {/* Sliding Background */}
              <motion.div
                className="absolute top-0 left-0 bg-gray-900 rounded-md shadow-sm"
                initial={false}
                animate={{
                  x: isProMode ? '100%' : '0%',
                  width: '50%'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                style={{
                  height: '100%'
                }}
              />
              
              <button
                onClick={() => setIsProMode(false)}
                className={`relative z-10 cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  !isProMode
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => setIsProMode(true)}
                className={`pr-5 text-center relative z-10 cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isProMode
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Pro
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="flex-1">
            <CategorySelectorDialog
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          <div className="flex-1">
            <StateSelectorDialog
              selectedState={activeState}
              onStateChange={setActiveState}
            />
          </div>
        </div>

        <MalaysiaMap
          activeState={activeState}
          selectedCategory={selectedCategory}
          onStateChange={setActiveState}
          getStateData={getStateData}
        />

        <MapLegend />

        {isProMode && (
          <ChartSection
            selectedState={activeState || 'Selangor'}
            selectedChartType={selectedChartType}
            chartData={chartData}
            onStateChange={setActiveState}
            onChartTypeChange={setSelectedChartType}
          />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default MapB;