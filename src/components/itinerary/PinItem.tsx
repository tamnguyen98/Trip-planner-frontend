import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MapPin, GripVertical, X } from 'lucide-react';
import type { Pin } from '../../types';

interface PinItemProps {
  pin: Pin;
  index: number;
  onUpdate: (pin: Pin) => void;
  onRemove: () => void;
}

export const PinItem = React.memo(({ pin, index, onUpdate, onRemove }: PinItemProps) => {
  return (
    <Draggable draggableId={pin.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200"
        >
          <div {...provided.dragHandleProps} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>
          <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <input
            type="text"
            value={pin.name}
            onChange={(e) => onUpdate({ ...pin, name: e.target.value })}
            className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none"
            placeholder="Enter location name"
          />
          <button
            onClick={onRemove}
            className="p-1 hover:bg-gray-200 rounded-full flex-shrink-0"
            type="button"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      )}
    </Draggable>
  );
});

PinItem.displayName = 'PinItem';