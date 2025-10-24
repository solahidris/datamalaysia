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
import { states } from '@/data/states';

interface StateSelectorDialogProps {
  selectedState: string | null;
  onStateChange: (state: string) => void;
}

const StateSelectorDialog = ({ selectedState, onStateChange }: StateSelectorDialogProps) => {
  const [open, setOpen] = useState(false);

  const selectedStateData = states.find(state => state.id === selectedState);

  const handleStateSelect = (stateId: string) => {
    onStateChange(stateId);
    setOpen(false); // Auto-close dialog after selection
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-0 shadow-md w-full justify-between bg-white p-6 rounded-xl">
          <span className="flex items-center gap-2">
            {selectedStateData?.name || 'Select a state'}
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
      <DialogContent className="sm:max-w-md bg-gray-100 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select State</DialogTitle>
          <DialogDescription>
            Choose a state to view its data
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 py-4">
          {states.map((state) => (
            <Button
              key={state.id}
              variant={selectedState === state.id ? "default" : "outline"}
              className={`border-0 h-auto px-3 py-2 transition-all duration-200 shadow-md ${
                selectedState === state.id 
                  ? "bg-gray-900 text-white hover:bg-gray-800 border-gray-900" 
                  : "bg-white hover:bg-gray-50 border-gray-300"
              }`}
              onClick={() => handleStateSelect(state.id)}
            >
              <span className="text-sm font-medium">{state.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StateSelectorDialog;
