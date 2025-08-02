import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoadmapNavigationOverlay = ({ 
  roadmapTitle = "Learning Roadmap",
  progress = 0,
  totalTopics = 0,
  completedTopics = 0,
  onSettingsClick = () => {},
  onProgressClick = () => {},
  className = ""
}) => {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleBackToDashboard = () => {
    navigate('/dashboard-home');
  };

  const progressPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className={`fixed top-20 left-4 right-4 z-30 pointer-events-none ${className}`}>
      <div className="flex justify-between items-start">
        {/* Left Controls */}
        <div className="flex flex-col space-y-2 pointer-events-auto">
          {/* Back Button */}
          <div className="bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              iconName="ArrowLeft"
              iconSize={18}
              className="hover:bg-muted/50"
            >
              <span className="hidden sm:inline ml-1">Dashboard</span>
            </Button>
          </div>

          {/* Roadmap Info - Collapsible */}
          {!isMinimized && (
            <div className="bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg p-3 max-w-xs animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-medium text-sm text-foreground truncate">
                  {roadmapTitle}
                </h3>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 ml-2"
                  aria-label="Minimize roadmap info"
                >
                  <Icon name="Minimize2" size={14} />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary font-medium">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {completedTopics} of {totalTopics} topics completed
                </div>
              </div>
            </div>
          )}

          {/* Minimized State */}
          {isMinimized && (
            <div className="bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg p-2 animate-fade-in">
              <button
                onClick={() => setIsMinimized(false)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Show roadmap info"
              >
                <div className="w-8 bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary rounded-full h-1.5 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium">{progressPercentage}%</span>
                <Icon name="Maximize2" size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex flex-col space-y-2 pointer-events-auto">
          {/* Settings Menu */}
          <div className="bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg p-2">
            <div className="flex flex-col space-y-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onSettingsClick}
                iconName="Settings"
                iconSize={18}
                className="hover:bg-muted/50 justify-start"
              >
                <span className="hidden sm:inline ml-1">Settings</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onProgressClick}
                iconName="BarChart3"
                iconSize={18}
                className="hover:bg-muted/50 justify-start"
              >
                <span className="hidden sm:inline ml-1">Progress</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Controls */}
      <div className="fixed bottom-4 left-4 right-4 sm:hidden pointer-events-auto">
        <div className="bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToDashboard}
                iconName="ArrowLeft"
                iconSize={18}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground truncate">
                  {roadmapTitle}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-primary rounded-full h-1.5 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-primary font-medium">
                    {progressPercentage}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onProgressClick}
                iconName="BarChart3"
                iconSize={18}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={onSettingsClick}
                iconName="Settings"
                iconSize={18}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapNavigationOverlay;