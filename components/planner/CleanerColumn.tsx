import { useState } from 'react';
import CleaningCard from './CleaningCard';

interface CleanerColumnProps {
  cleaner: any;
  date: string;
  cleanings: any[];
  onReassign: (cleaningId: string, fromCleanerId: string, toCleanerId: string, date: string) => void;
}

export default function CleanerColumn({ cleaner, date, cleanings, onReassign }: CleanerColumnProps) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);

    try {
      const rawData = e.dataTransfer.getData("application/json");
      if (!rawData) return;

      const payload = JSON.parse(rawData);
      
      // Support both cleaningId and taskId properties from drag payload
      const targetTaskId = payload.cleaningId || payload.taskId;

      // Only trigger if dropped onto a different cleaner
      if (payload.sourceCleanerId !== cleaner.id && targetTaskId) {
        onReassign(targetTaskId, payload.sourceCleanerId, cleaner.id, payload.date || date);
      }
    } catch (err) {
      console.error("Failed to parse dropped cleaning payload", err);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex-1 min-w-[250px] p-4 rounded-xl border transition-colors ${
        isOver ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200' : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="font-medium text-gray-700 mb-3 flex items-center justify-between">
        <span>{cleaner.name}</span>
        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
          {cleanings.length}
        </span>
      </div>

      <div className="space-y-2">
        {cleanings.map((cleaning, idx) => (
          <CleaningCard 
            key={cleaning.id || `${cleaner.id}-${idx}`}
            cleaning={cleaning} 
            cleanerId={cleaner.id} 
            date={date} 
          />
        ))}
        {cleanings.length === 0 && (
          <div className="text-xs text-gray-400 text-center py-6 border border-dashed border-gray-200 rounded-lg select-none">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}