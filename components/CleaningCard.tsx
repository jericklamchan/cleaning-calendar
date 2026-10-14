interface CleaningCardProps {
  cleaning: any;
  cleanerId: string;
  date: string;
}

export default function CleaningCard({ cleaning, cleanerId, date }: CleaningCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    // Priority on unique task/cleaning ID
    const taskId = cleaning.id || cleaning.property?.id;

    const payload = {
      taskId: taskId,
      cleaningId: taskId, // Provided for backwards compatibility with CleanerColumn
      sourceCleanerId: cleanerId,
      date: date,
      propertyId: cleaning.property?.id,
    };

    e.dataTransfer.setData("application/json", JSON.stringify(payload));
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow select-none"
    >
      <div className="font-semibold text-gray-800">
        {cleaning.property?.name || "Property"}
      </div>
      <div className="text-xs text-gray-500">
        {cleaning.checkOut ? `Checkout: ${cleaning.checkOut.time}` : 'No checkout'}
      </div>
    </div>
  );
}