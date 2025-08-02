import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import Icon from '../../../components/AppIcon';

const RoadmapNode = memo(({ data, selected }) => {
  const { 
    label, 
    description, 
    isCompleted, 
    isCurrent, 
    resourceCount, 
    nodeType = 'topic',
    onNodeClick,
    difficulty = 'medium'
  } = data;

  const getNodeStyles = () => {
    if (isCompleted) {
      return 'bg-success/10 border-success text-success-foreground shadow-lg hover:shadow-xl border-2';
    }
    if (isCurrent) {
      return 'bg-primary/10 border-primary text-primary-foreground shadow-xl ring-2 ring-primary/30 border-2 animate-glow';
    }
    if (selected) {
      return 'bg-accent/10 border-accent text-accent-foreground shadow-xl ring-2 ring-accent/30 border-2';
    }
    return 'card-glass border-border text-card-foreground shadow-md hover:shadow-lg hover:-translate-y-1 border';
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'hard': return 'text-error';
      default: return 'text-warning';
    }
  };

  const handleClick = (e) => {
    e?.stopPropagation();
    onNodeClick?.(data);
  };

  return (
    <div 
      className={`
        relative min-w-[220px] max-w-[300px] p-5 rounded-xl
        transition-all duration-300 cursor-pointer touch-target
        ${getNodeStyles()}
      `}
      onClick={handleClick}
    >
      {/* Input/Output Handles */}
      <Handle
        type="target"
        position={Position?.Top}
        className="w-4 h-4 bg-primary border-2 border-white shadow-md"
      />
      <Handle
        type="source"
        position={Position?.Bottom}
        className="w-4 h-4 bg-primary border-2 border-white shadow-md"
      />
      {/* Node Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-base leading-tight truncate">
            {label}
          </h3>
          {nodeType === 'topic' && (
            <div className="flex items-center mt-2 space-x-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor()} bg-opacity-20`}>
                {difficulty?.charAt(0)?.toUpperCase() + difficulty?.slice(1)}
              </span>
              {resourceCount > 0 && (
                <div className="flex items-center text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                  <Icon name="BookOpen" size={10} className="mr-1" />
                  {resourceCount}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Status Icon */}
        <div className="flex-shrink-0 ml-2">
          {isCompleted ? (
            <div className="w-7 h-7 bg-success rounded-full flex items-center justify-center shadow-md">
              <Icon name="Check" size={16} color="white" />
            </div>
          ) : isCurrent ? (
            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center animate-pulse shadow-md">
              <Icon name="Play" size={14} color="white" />
            </div>
          ) : (
            <div className="w-7 h-7 bg-muted rounded-full flex items-center justify-center shadow-sm">
              <Icon name="Circle" size={14} className="text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
      {/* Node Description */}
      {description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {description}
        </p>
      )}
      {/* Node Footer */}
      <div className="flex items-center justify-between text-xs mt-3">
        <div className="flex items-center space-x-2">
          {nodeType === 'topic' && (
            <>
              <div className="flex items-center text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                <Icon name="Clock" size={12} className="mr-1" />
                <span>~30min</span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
        </div>
      </div>
      {/* Progress Indicator for Subtopics */}
      {nodeType === 'chapter' && data?.subtopics && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Progress</span>
            <span className="font-semibold">
              {data?.completedSubtopics || 0}/{data?.subtopics?.length}
            </span>
          </div>
          <div className="progress-bar h-2 mt-2">
            <div 
              className="progress-fill h-2"
              style={{ 
                width: `${((data?.completedSubtopics || 0) / data?.subtopics?.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

RoadmapNode.displayName = 'RoadmapNode';

export default RoadmapNode;