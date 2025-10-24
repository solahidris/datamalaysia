import { useData } from '@/contexts/DataContext';
import Header from '@/components/Header';
import CategorySelectorDialog from '@/components/CategorySelectorDialog';
import StateSelectorDialog from '@/components/StateSelector';
import MalaysiaMap from '@/components/MalaysiaMap';
import MapLegend from '@/components/MapLegend';
import ChartSection from '@/components/ChartSection';
import Footer from '@/components/Footer';

const Home = () => {
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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
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
          showMapLegend={false}
        />

        <MapLegend />

        <ChartSection
          selectedState={activeState || 'Selangor'}
          selectedChartType={selectedChartType}
          chartData={chartData}
          onStateChange={setActiveState}
          onChartTypeChange={setSelectedChartType}
        />

        <Footer />
      </div>
    </div>
  );
};

export default Home;