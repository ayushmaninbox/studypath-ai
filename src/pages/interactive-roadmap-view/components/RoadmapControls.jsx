import React, { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoadmapControls = ({ 
  onLayoutChange, 
  currentLayout = 'tree',
  onSearchToggle,
  isSearchOpen = false,
  onSettingsOpen,
  className = ""
}) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [isExpanded, setIsExpanded] = useState(false);

  const layoutOptions = [
    { value: 'tree', label: 'Tree View', icon: 'GitBranch' },
    { value: 'flowchart', label: 'Flowchart', icon: 'Workflow' },
    { value: 'hierarchical', label: 'Hierarchical', icon: 'Layers' }
  ];

  const handleFitView = () => {
    fitView({ 
      padding: 0.1, 
      includeHiddenNodes: false,
      duration: 800 
    });
  };

  return (
    <div className={`fixed bottom-4 right-4 z-20 ${className}`}>
      {/* Mobile Floating Action Button */}
      <div className="md:hidden">
        <div className="relative">
          {/* Expanded Controls */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg p-2 space-y-2 animate-slide-up">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => zoomIn()}
                iconName="ZoomIn"
                iconSize={18}
                className="w-full justify-start"
              >
                Zoom In
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => zoomOut()}
                iconName="ZoomOut"
                iconSize={18}
                className="w-full justify-start"
              >
                Zoom Out
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFitView}
                iconName="Maximize2"
                iconSize={18}
                className="w-full justify-start"
              >
                Fit View
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onSearchToggle}
                iconName="Search"
                iconSize={18}
                className="w-full justify-start"
              >
                {isSearchOpen ? 'Close Search' : 'Search'}
              </Button>
              
              <hr className="border-border" />
              
              {layoutOptions?.map((layout) => (
                <Button
                  key={layout?.value}
                  variant={currentLayout === layout?.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onLayoutChange(layout?.value)}
                  iconName={layout?.icon}
                  iconSize={18}
                  className="w-full justify-start"
                >
                  {layout?.label}
                </Button>
              ))}
              
              <hr className="border-border" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onSettingsOpen}
                iconName="Settings"
                iconSize={18}
                className="w-full justify-start"
              >
                Settings
              </Button>
            </div>
          )}

          {/* Main FAB */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-floating flex items-center justify-center transition-all duration-200 hover:shadow-xl active:scale-95"
          >
            <Icon 
              name={isExpanded ? "X" : "Settings"} 
              size={24} 
            />
          </button>
        </div>
      </div>
      {/* Desktop Controls */}
      <div className="hidden md:flex flex-col space-y-2">
        {/* Zoom Controls */}
        <div className="bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg p-2">
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => zoomIn()}
              iconName="ZoomIn"
              iconSize={18}
              className="justify-start"
            >
              Zoom In
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => zoomOut()}
              iconName="ZoomOut"
              iconSize={18}
              className="justify-start"
            >
              Zoom Out
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFitView}
              iconName="Maximize2"
              iconSize={18}
              className="justify-start"
            >
              Fit View
            </Button>
          </div>
        </div>

        {/* Layout Controls */}
        <div className="bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg p-2">
          <div className="flex flex-col space-y-1">
            <div className="text-xs font-medium text-muted-foreground px-2 py-1">
              Layout
            </div>
            {layoutOptions?.map((layout) => (
              <Button
                key={layout?.value}
                variant={currentLayout === layout?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onLayoutChange(layout?.value)}
                iconName={layout?.icon}
                iconSize={16}
                className="justify-start text-xs"
              >
                {layout?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Additional Controls */}
        <div className="bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg p-2">
          <div className="flex flex-col space-y-1">
            <Button
              variant={isSearchOpen ? "default" : "ghost"}
              size="sm"
              onClick={onSearchToggle}
              iconName="Search"
              iconSize={18}
              className="justify-start"
            >
              Search
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsOpen}
              iconName="Settings"
              iconSize={18}
              className="justify-start"
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapControls;