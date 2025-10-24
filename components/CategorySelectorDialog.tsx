import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type DataCategory = 'income_median' | 'population' | 'crime' | 'water_consumption' | 'expenditure';

interface CategorySelectorDialogProps {
  selectedCategory: DataCategory;
  onCategoryChange: (category: DataCategory) => void;
}

const CategorySelectorDialog = ({ selectedCategory, onCategoryChange }: CategorySelectorDialogProps) => {
  const [open, setOpen] = useState(false);
  
  const categories = [
    { id: 'income_median' as DataCategory, label: '💰 Income', description: 'Median household income data' },
    { id: 'population' as DataCategory, label: '👥 Population', description: 'Population statistics by state' },
    { id: 'crime' as DataCategory, label: '🚨 Crime', description: 'Crime rate information' },
    { id: 'water_consumption' as DataCategory, label: '💧 Water', description: 'Water consumption patterns' },
    { id: 'expenditure' as DataCategory, label: '💸 Expenditure', description: 'Government expenditure data' },
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const handleCategorySelect = (category: DataCategory) => {
    onCategoryChange(category);
    setOpen(false); // Auto-close dialog after selection
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-0 shadow-md w-full justify-between p-6 rounded-xl">
          <span className="flex items-center gap-2">
            {selectedCategoryData?.label}
          </span>
          <svg
            className="h-4 w-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-100">
        <DialogHeader>
          <DialogTitle>Select Data Category</DialogTitle>
          <DialogDescription>
            Choose a data category to visualize on the map
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`border-0 justify-start h-auto p-4 transition-all duration-200 shadow-md ${
                selectedCategory === category.id 
                  ? "bg-gray-900 text-white hover:bg-gray-800 border-gray-900" 
                  : "bg-white hover:bg-gray-50 border-gray-300"
              }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-base font-medium">{category.label}</span>
                <span className={`text-xs ${
                  selectedCategory === category.id 
                    ? "text-gray-300" 
                    : "text-muted-foreground"
                }`}>
                  {category.description}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategorySelectorDialog;
