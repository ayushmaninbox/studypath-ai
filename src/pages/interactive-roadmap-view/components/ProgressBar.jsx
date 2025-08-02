import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressBar = ({ 
  progress = 0, 
  totalTopics = 0, 
  completedTopics = 0,
  roadmapTitle = "Learning Roadmap",
  className = "" 
}) => {
  const progressPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className={`bg-card/95 backdrop-blur-sm border-b border-border ${className}`}>
      <div className="content-max-width content-spacing py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-semibold text-lg truncate">
              {roadmapTitle}
            </h1>
            <div className="flex items-center mt-1 space-x-2 text-sm text-muted-foreground">
              <span>{completedTopics} of {totalTopics} topics completed</span>
              <span>•</span>
              <span>{progressPercentage}% complete</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {progressPercentage}%
              </div>
              <div className="text-xs text-muted-foreground">
                Progress
              </div>
            </div>
            
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              progressPercentage === 100 
                ? 'bg-success text-success-foreground' 
                : 'bg-primary/10 text-primary'
            }`}>
              <Icon 
                name={progressPercentage === 100 ? "Trophy" : "Target"} 
                size={20} 
              />
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary to-secondary rounded-full h-2 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Milestone Indicators */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Start</span>
          <span className={progressPercentage >= 25 ? 'text-primary font-medium' : ''}>
            25%
          </span>
          <span className={progressPercentage >= 50 ? 'text-primary font-medium' : ''}>
            50%
          </span>
          <span className={progressPercentage >= 75 ? 'text-primary font-medium' : ''}>
            75%
          </span>
          <span className={progressPercentage === 100 ? 'text-success font-medium' : ''}>
            Complete
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;