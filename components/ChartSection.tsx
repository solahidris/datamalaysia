import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { states } from '@/data/states';
import DataChart from './DataChart';
import { CHART_CONFIGS, type ChartType } from '@/lib/constants';

interface ChartSectionProps {
  selectedState: string;
  selectedChartType: ChartType;
  chartData: {
    income: any[];
    population: any[];
    crime: any[];
    water: any[];
    expense: any[];
  };
  onStateChange: (state: string) => void;
  onChartTypeChange: (type: ChartType) => void;
}

const ChartSection = ({
  selectedState,
  selectedChartType,
  chartData,
  onStateChange,
  onChartTypeChange
}: ChartSectionProps) => {
  const config = CHART_CONFIGS[selectedChartType];
  const dataMap = {
    income: chartData.income,
    population: chartData.population,
    crime: chartData.crime,
    water: chartData.water,
    expense: chartData.expense
  };

  return (
    <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">State Data Trends</h2>

      <div className='flex flex-col gap-4 lg:flex-row justify-center items-center mb-8 w-full px-4 lg:px-0'>
        {/* State Selector Dropdown */}
        <div className="w-full md:w-auto">
          <p className="text-xs font-medium text-gray-700 text-start">Select a state</p>
          <div className="w-full">
            <Select value={selectedState} onValueChange={onStateChange}>
              <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.id} value={state.name}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chart Type Selector Dropdown */}
        <div className="w-full md:w-auto">
          <p className="text-xs font-medium text-gray-700 text-start">Select data</p>
          <div className="w-full">
            <Select value={selectedChartType} onValueChange={onChartTypeChange}>
              <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CHART_CONFIGS).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.emoji} {config.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Single Chart Display */}
      <div className="max-w-4xl mx-auto">
        <DataChart
          data={dataMap[selectedChartType]}
          dataKey={config.dataKey}
          color={config.color}
          title={config.title}
          description={`${config.title} trend for ${selectedState}`}
        />
      </div>
    </div>
  );
};

export default ChartSection;

