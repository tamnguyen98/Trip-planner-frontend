import React, { useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { PinItem } from './PinItem';
import type { Pin } from '../../types';
import { StrictModeDroppable } from '../StrictModeDroppable';

interface Props {
  pins: Pin[];
  onChange: (pins: Pin[]) => void;
}

export const PinsList = ({ pins, onChange }: Props) => {
  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    const items = Array.from(pins);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChange(items);
  }, [pins, onChange]);

  const handleUpdatePin = useCallback((index: number, updatedPin: Pin) => {
    const newPins = [...pins];
    newPins[index] = updatedPin;
    onChange(newPins);
  }, [pins, onChange]);

  const handleRemovePin = useCallback((index: number) => {
    onChange(pins.filter((_, i) => i !== index));
  }, [pins, onChange]);

  const handleAddPin = useCallback(() => {
    const newPin: Pin = {
      id: Date.now().toString(),
      name: '',
      description: '',
      location: { city: '', country: '' },
      images: [],
      rating: 0
    };
    onChange([...pins, newPin]);
  }, [pins, onChange]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Pins</h2>
        <button
          onClick={handleAddPin}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Pin
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable droppableId="pins-list">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="space-y-3 min-h-[200px]"
            >
              {pins.map((pin, index) => (
                <PinItem
                  key={pin.id}
                  pin={pin}
                  index={index}
                  onUpdate={(updatedPin) => handleUpdatePin(index, updatedPin)}
                  onRemove={() => handleRemovePin(index)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};