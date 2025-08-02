import React from 'react';
import RoadmapCard from './RoadmapCard';
import EmptyState from './EmptyState';

const RoadmapGrid = ({ roadmaps, isLoading, onEdit, onShare, onDelete }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border rounded-lg overflow-hidden animate-pulse">
            <div className="h-32 bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-2 bg-muted rounded w-full" />
              <div className="flex space-x-2">
                <div className="h-8 bg-muted rounded flex-1" />
                <div className="h-8 w-8 bg-muted rounded" />
                <div className="h-8 w-8 bg-muted rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!roadmaps || roadmaps?.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roadmaps?.map((roadmap) => (
        <RoadmapCard
          key={roadmap?.id}
          roadmap={roadmap}
          onEdit={onEdit}
          onShare={onShare}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default RoadmapGrid;