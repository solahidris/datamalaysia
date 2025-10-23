import { useData } from '@/contexts/DataContext';
import Header from '@/components/Header';
import CategorySelector from '@/components/CategorySelector';
import MalaysiaMap from '@/components/MalaysiaMap';
import MapLegend from '@/components/MapLegend';
import ChartSection from '@/components/ChartSection';
import Footer from '@/components/Footer';

const Home = () => {
  const {
    hoveredState,
    selectedCategory,
    selectedStateForChart,
    selectedChartType,
    setHoveredState,
    setSelectedCategory,
    setSelectedStateForChart,
    setSelectedChartType,
    getStateData,
    chartData
  } = useData();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <MalaysiaMap
          hoveredState={hoveredState}
          selectedCategory={selectedCategory}
          onStateHover={setHoveredState}
          getStateData={getStateData}
        />

        <MapLegend />

        <ChartSection
          selectedState={selectedStateForChart}
          selectedChartType={selectedChartType}
          chartData={chartData}
          onStateChange={setSelectedStateForChart}
          onChartTypeChange={setSelectedChartType}
        />

        <Footer />
      </div>
    </div>
  );
};

export default Home;
