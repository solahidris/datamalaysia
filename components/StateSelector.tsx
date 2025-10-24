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
        <Button variant="outline" className="w-full justify-between bg-white">
          <span className="flex items-center gap-2">
            {selectedStateData?.name || 'Select a state'}
          </span>
          <span className="text-xs text-muted-foreground">
            Choose State
          </span>
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
              className={`h-auto px-3 py-2 transition-all duration-200 ${
                selectedState === state.id 
                  ? "bg-gray-900 text-white hover:bg-gray-800 border-gray-900 shadow-lg" 
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
