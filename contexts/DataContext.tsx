import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import type { DataCategory } from '@/types';
import { useDataFetching } from '@/hooks/useDataFetching';
import { mapStateName, getLatestData, filterAndSortByState } from '@/lib/helpers';
import { type ChartType } from '@/lib/constants';

interface DataContextType {
  // State
  hoveredState: string | null;
  selectedCategory: DataCategory;
  selectedStateForChart: string;
  selectedChartType: ChartType;
  
  // Actions
  setHoveredState: (state: string | null) => void;
  setSelectedCategory: (category: DataCategory) => void;
  setSelectedStateForChart: (state: string) => void;
  setSelectedChartType: (type: ChartType) => void;
  
  // Computed data
  getStateData: (stateName: string, category: DataCategory) => any;
  chartData: {
    income: any[];
    population: any[];
    crime: any[];
    water: any[];
    expense: any[];
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<DataCategory>('income_median');
  const [selectedStateForChart, setSelectedStateForChart] = useState<string>('Selangor');
  const [selectedChartType, setSelectedChartType] = useState<ChartType>('income');

  const {
    incomeData,
    populationData,
    crimeData,
    waterConsumptionData,
    householdExpenseData
  } = useDataFetching();

  const getStateData = useCallback((stateName: string, category: DataCategory) => {
    const mappedName = mapStateName(stateName);

    switch (category) {
      case 'income_median':
        return getLatestData(incomeData, mappedName);
      case 'population':
        return getLatestData(populationData, mappedName);
      case 'crime':
        return getLatestData(crimeData, mappedName);
      case 'water_consumption':
        return getLatestData(waterConsumptionData, mappedName);
      case 'expenditure':
        return getLatestData(householdExpenseData, mappedName);
      default:
        return undefined;
    }
  }, [incomeData, populationData, crimeData, waterConsumptionData, householdExpenseData]);

  const chartData = useMemo(() => {
    const mappedName = mapStateName(selectedStateForChart);

    return {
      income: filterAndSortByState(incomeData, mappedName),
      population: filterAndSortByState(populationData, mappedName),
      crime: filterAndSortByState(crimeData, mappedName),
      water: filterAndSortByState(waterConsumptionData, mappedName),
      expense: filterAndSortByState(householdExpenseData, mappedName)
    };
  }, [selectedStateForChart, incomeData, populationData, crimeData, waterConsumptionData, householdExpenseData]);

  const value = {
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
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

