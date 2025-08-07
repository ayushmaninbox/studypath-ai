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
      return 'bg-success/10 border-success text-success-foreground shadow-md';
    }
    if (isCurrent) {
      return 'bg-primary/10 border-primary text-primary-foreground shadow-lg ring-2 ring-primary/20';
    }
    if (selected) {
      return 'bg-accent/10 border-accent text-accent-foreground shadow-lg ring-2 ring-accent/20';
    }
    return 'bg-card border-border text-card-foreground shadow-default hover:shadow-md';
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
        relative min-w-[200px] max-w-[280px] p-4 rounded-lg border-2 
        transition-all duration-200 cursor-pointer touch-target
        ${getNodeStyles()}
      `}
      onClick={handleClick}
    >
      {/* Input/Output Handles */}
      <Handle
        type="target"
        position={Position?.Top}
        className="w-3 h-3 bg-primary border-2 border-white"
      />
      <Handle
        type="source"
        position={Position?.Bottom}
        className="w-3 h-3 bg-primary border-2 border-white"
      />
      {/* Node Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-sm leading-tight truncate">
            {label}
          </h3>
          {nodeType === 'topic' && (
            <div className="flex items-center mt-1 space-x-2">
              <span className={`text-xs font-medium ${getDifficultyColor()}`}>
                {difficulty?.charAt(0)?.toUpperCase() + difficulty?.slice(1)}
              </span>
              {resourceCount > 0 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="BookOpen" size={12} className="mr-1" />
                  {resourceCount}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Status Icon */}
        <div className="flex-shrink-0 ml-2">
          {isCompleted ? (
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} color="white" />
            </div>
          ) : isCurrent ? (
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Play" size={12} color="white" />
            </div>
          ) : (
            <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Circle" size={12} className="text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
      {/* Node Description */}
      {description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
          {description}
        </p>
      )}
      {/* Node Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          {nodeType === 'topic' && (
            <>
              <div className="flex items-center text-muted-foreground">
                <Icon name="Clock" size={12} className="mr-1" />
                <span>~30min</span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <Icon name="ChevronRight" size={12} className="text-muted-foreground" />
        </div>
      </div>
      {/* Progress Indicator for Subtopics */}
      {nodeType === 'chapter' && data?.subtopics && (
        <div className="mt-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {data?.completedSubtopics || 0}/{data?.subtopics?.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 mt-1">
            <div 
              className="bg-primary rounded-full h-1.5 transition-all duration-300"
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