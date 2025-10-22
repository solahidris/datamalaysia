import { useState, useEffect, useMemo, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { states } from '@/data/states';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';
import CategorySelector from '@/components/CategorySelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type {
  IncomeData,
  PopulationData,
  CrimeData,
  WaterConsumptionData,
  HouseholdExpenseData,
  DataCategory
} from '@/types';

// Memoized Chart Component to prevent unnecessary re-renders
const MemoizedBarChart = memo(({ data, dataKey, color, title, description }: {
  data: any[];
  dataKey: string;
  color: string;
  title: string;
  description: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={{
        [dataKey]: {
          label: title,
          color: color,
        },
      }} className="h-[300px] w-full">
        <BarChart data={data} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.getFullYear().toString();
            }}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey={dataKey}
            fill={`var(--color-${dataKey})`}
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
));

MemoizedBarChart.displayName = 'MemoizedBarChart';

const Home = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [crimeData, setCrimeData] = useState<CrimeData[]>([]);
  const [waterConsumptionData, setWaterConsumptionData] = useState<WaterConsumptionData[]>([]);
  const [householdExpenseData, setHouseholdExpenseData] = useState<HouseholdExpenseData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DataCategory>('income_median');
  const [loading, setLoading] = useState(true);
  const [selectedStateForChart, setSelectedStateForChart] = useState<string>('Selangor');
  const [selectedChartType, setSelectedChartType] = useState<'income' | 'population' | 'crime' | 'water' | 'expense'>('income');

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch all datasets in parallel
        const [incomeRes, populationRes, crimeRes, waterRes, expenseRes] = await Promise.all([
          fetch('https://api.data.gov.my/data-catalogue?id=hh_income_state'),
          fetch('https://api.data.gov.my/data-catalogue?id=population_state'),
          fetch('https://api.data.gov.my/data-catalogue?id=crime_district'),
          fetch('https://api.data.gov.my/data-catalogue?id=water_consumption'),
          fetch('https://api.data.gov.my/data-catalogue?id=hies_state')
        ]);

        // Process income data
        if (incomeRes.ok) {
          const incomeJson = await incomeRes.json();
          const income: IncomeData[] = incomeJson.map((item: any) => ({
            state: item.state,
            date: item.date,
            income_median: parseFloat(item.income_median)
          }));
          setIncomeData(income);
        }

        // Process population data
        if (populationRes.ok) {
          const popJson = await populationRes.json();
          const pop: PopulationData[] = popJson.map((item: any) => ({
            state: item.state,
            date: item.date,
            population: parseFloat(item.population || item.pop || item.total) * 1000 // Multiply by 1000 for actual value
          }));
          setPopulationData(pop);
        }

        // Process crime data
        if (crimeRes.ok) {
          const crimeJson = await crimeRes.json();

          // Crime data is at district level, we need to aggregate by state
          // Filter for records where district is "All" or aggregate by state
          const crime: CrimeData[] = crimeJson
            .filter((item: any) => item.district === 'All' && item.state !== 'Malaysia')
            .map((item: any) => ({
              state: item.state,
              date: item.date,
              crime: parseFloat(item.crimes) // Note: field is "crimes" not "crime"
            }));
          setCrimeData(crime);
        }

        // Process water consumption data
        if (waterRes.ok) {
          const waterJson = await waterRes.json();

          // Water data has different sectors, filter for domestic or aggregate
          const water: WaterConsumptionData[] = waterJson
            .filter((item: any) => item.state !== 'Malaysia' && item.sector === 'domestic')
            .map((item: any) => ({
              state: item.state,
              date: item.date,
              consumption: parseFloat(item.value) // Note: field is "value" not "consumption"
            }));
          setWaterConsumptionData(water);
        }

        // Process household expenditure data
        if (expenseRes.ok) {
          const expenseJson = await expenseRes.json();
          const expense: HouseholdExpenseData[] = expenseJson.map((item: any) => ({
            state: item.state,
            date: item.date,
            expenditure_mean: parseFloat(item.expenditure_mean)
          }));
          setHouseholdExpenseData(expense);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const getStateData = (stateName: string, category: DataCategory) => {
    // Map state names from our data to the data.gov.my format
    const stateMapping: { [key: string]: string } = {
      'Perlis': 'Perlis',
      'Kedah': 'Kedah',
      'Pulau Pinang': 'Pulau Pinang',
      'Perak': 'Perak',
      'Terengganu': 'Terengganu',
      'Pahang': 'Pahang',
      'Kelantan': 'Kelantan',
      'Negeri Sembilan': 'Negeri Sembilan',
      'Melaka': 'Melaka',
      'Putrajaya': 'W.P. Putrajaya',
      'Selangor': 'Selangor',
      'Kuala Lumpur': 'W.P. Kuala Lumpur',
      'Johor': 'Johor',
      'Sabah': 'Sabah',
      'Labuan': 'W.P. Labuan',
      'Sarawak': 'Sarawak'
    };

    const mappedName = stateMapping[stateName] || stateName;

    // Get the appropriate data based on category
    let result;
    switch (category) {
      case 'income_median':
        result = incomeData
          .filter(d => d.state === mappedName)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        break;
      case 'population':
        result = populationData
          .filter(d => d.state === mappedName)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        break;
      case 'crime':
        result = crimeData
          .filter(d => d.state === mappedName)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        break;
      case 'water_consumption':
        result = waterConsumptionData
          .filter(d => d.state === mappedName)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        break;
      case 'expenditure':
        result = householdExpenseData
          .filter(d => d.state === mappedName)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        break;
      default:
        result = null;
    }
    return result;
  };

  const formatValue = (value: number, category: DataCategory) => {
    switch (category) {
      case 'income_median':
      case 'expenditure':
        return new Intl.NumberFormat('en-MY', {
          style: 'currency',
          currency: 'MYR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      case 'population':
        return new Intl.NumberFormat('en-MY').format(value);
      case 'crime':
        return new Intl.NumberFormat('en-MY').format(value) + ' cases';
      case 'water_consumption':
        return new Intl.NumberFormat('en-MY').format(value) + ' L';
      default:
        return value.toString();
    }
  };

  const getCategoryLabel = (category: DataCategory) => {
    switch (category) {
      case 'income_median':
        return 'Median Household Income';
      case 'population':
        return 'Population';
      case 'crime':
        return 'Crime Cases';
      case 'water_consumption':
        return 'Water Consumption';
      case 'expenditure':
        return 'Mean Household Expenditure';
      default:
        return '';
    }
  };

  const getDataValue = (data: any, category: DataCategory): number => {
    if (!data) return 0;
    switch (category) {
      case 'income_median':
        return data.income_median;
      case 'population':
        return data.population;
      case 'crime':
        return data.crime;
      case 'water_consumption':
        return data.consumption;
      case 'expenditure':
        return data.expenditure_mean;
      default:
        return 0;
    }
  };

  // Memoized chart data - only recalculates when state or data changes
  const chartData = useMemo(() => {
    // Map state names
    const stateMapping: { [key: string]: string } = {
      'Perlis': 'Perlis',
      'Kedah': 'Kedah',
      'Pulau Pinang': 'Pulau Pinang',
      'Perak': 'Perak',
      'Terengganu': 'Terengganu',
      'Pahang': 'Pahang',
      'Kelantan': 'Kelantan',
      'Negeri Sembilan': 'Negeri Sembilan',
      'Melaka': 'Melaka',
      'Putrajaya': 'W.P. Putrajaya',
      'Selangor': 'Selangor',
      'Kuala Lumpur': 'W.P. Kuala Lumpur',
      'Johor': 'Johor',
      'Sabah': 'Sabah',
      'Labuan': 'W.P. Labuan',
      'Sarawak': 'Sarawak'
    };

    const mappedName = stateMapping[selectedStateForChart] || selectedStateForChart;

    // Limit data points to prevent performance issues (max 20 most recent points)
    const MAX_POINTS = 20;

    const limitData = (data: any[]) => {
      if (data.length <= MAX_POINTS) return data;
      // Take every Nth item to get approximately MAX_POINTS
      const step = Math.ceil(data.length / MAX_POINTS);
      return data.filter((_, index) => index % step === 0).slice(-MAX_POINTS);
    };

    // Get all data points for this state and sort by date
    const income = limitData(
      incomeData
        .filter(d => d.state === mappedName)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    );

    const population = limitData(
      populationData
        .filter(d => d.state === mappedName)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    );

    const crime = limitData(
      crimeData
        .filter(d => d.state === mappedName)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    );

    const water = limitData(
      waterConsumptionData
        .filter(d => d.state === mappedName)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    );

    const expense = limitData(
      householdExpenseData
        .filter(d => d.state === mappedName)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    );

    return {
      income,
      population,
      crime,
      water,
      expense
    };
  }, [selectedStateForChart, incomeData, populationData, crimeData, waterConsumptionData, householdExpenseData]);

  // Show loader until all data is loaded
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Peta Malaysia</h2>
          <p className="text-gray-600">Fetching data from DOSM...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className='text-4xl lg:text-8xl font-bold text-center mb-4 text-gray-800'>Peta Malaysia</h1>
        <div className='mb-12'>
          <motion.div className="relative mx-4 my-4 flex items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0">
            <LayoutTextFlip
              text="Visualizing data in a"
              words={["Better", "Easier", "Faster", "Smarter"]}
            />
          </motion.div>
        </div>

        {/* Category Selector */}
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Map */}
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

        {/* Charts Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">State Data Trends</h2>

          <div className='flex flex-col gap-4 lg:flex-row justify-center items-center mb-8'>
            {/* State Selector Dropdown */}
            <div className="">
              <p className="text-xs font-medium text-gray-700 text-start">Select a state</p>
              <div className="flex justify-center">
                <Select value={selectedStateForChart} onValueChange={setSelectedStateForChart}>
                  <SelectTrigger className="w-[280px]">
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
            <div className="">
              <p className="text-xs font-medium text-gray-700 text-start">Select a data</p>
              <div className="flex justify-center">
                <Select
                  value={selectedChartType}
                  onValueChange={(value) => setSelectedChartType(value as 'income' | 'population' | 'crime' | 'water' | 'expense')}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">📊 Income</SelectItem>
                    <SelectItem value="population">👥 Population</SelectItem>
                    <SelectItem value="crime">🚨 Crime</SelectItem>
                    <SelectItem value="water">💧 Water</SelectItem>
                    <SelectItem value="expense">💰 Expenses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Single Chart Display */}
          <div className="max-w-4xl mx-auto">
            {selectedChartType === 'income' && (
              <MemoizedBarChart
                data={chartData.income}
                dataKey="income_median"
                color="#3b82f6"
                title="Median Household Income"
                description={`Monthly income trend for ${selectedStateForChart}`}
              />
            )}
            {selectedChartType === 'population' && (
              <MemoizedBarChart
                data={chartData.population}
                dataKey="population"
                color="#10b981"
                title="Population"
                description={`Population trend for ${selectedStateForChart}`}
              />
            )}
            {selectedChartType === 'crime' && (
              <MemoizedBarChart
                data={chartData.crime}
                dataKey="crime"
                color="#ef4444"
                title="Crime Cases"
                description={`Crime statistics for ${selectedStateForChart}`}
              />
            )}
            {selectedChartType === 'water' && (
              <MemoizedBarChart
                data={chartData.water}
                dataKey="consumption"
                color="#06b6d4"
                title="Water Consumption"
                description={`Domestic water usage for ${selectedStateForChart}`}
              />
            )}
            {selectedChartType === 'expense' && (
              <MemoizedBarChart
                data={chartData.expense}
                dataKey="expenditure_mean"
                color="#f59e0b"
                title="Mean Household Expenditure"
                description={`Monthly expenditure trend for ${selectedStateForChart}`}
              />
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">Malaysia consists of 13 states and 3 federal territories</p>
          <p className="text-xs text-gray-500 mb-4">
            Data source: Department of Statistics Malaysia (DOSM) - Household Income & Expenditure Survey
          </p>
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