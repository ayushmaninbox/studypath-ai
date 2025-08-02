import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const RoadmapSettings = ({ 
  isOpen, 
  onClose, 
  settings = {},
  onSettingsChange,
  className = "" 
}) => {
  const [localSettings, setLocalSettings] = useState({
    showCompleted: true,
    showDescriptions: true,
    showResourceCounts: true,
    nodeSize: 'medium',
    animationSpeed: 'normal',
    autoFocus: true,
    showMinimap: false,
    ...settings
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const nodeSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  const animationSpeedOptions = [
    { value: 'slow', label: 'Slow' },
    { value: 'normal', label: 'Normal' },
    { value: 'fast', label: 'Fast' },
    { value: 'none', label: 'No Animation' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className="md:hidden fixed inset-0 z-50">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-xl shadow-xl max-h-[80vh] overflow-hidden animate-slide-up">
          {/* Handle */}
          <div className="flex justify-center py-2">
            <div className="w-8 h-1 bg-muted rounded-full" />
          </div>
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
            <h2 className="font-heading font-semibold text-lg">
              Roadmap Settings
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={18}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Display Options */}
            <div>
              <h3 className="font-medium text-sm mb-3">Display Options</h3>
              <div className="space-y-3">
                <Checkbox
                  label="Show completed topics"
                  description="Display topics that have been marked as complete"
                  checked={localSettings?.showCompleted}
                  onChange={(e) => handleSettingChange('showCompleted', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show topic descriptions"
                  description="Display brief descriptions on topic nodes"
                  checked={localSettings?.showDescriptions}
                  onChange={(e) => handleSettingChange('showDescriptions', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show resource counts"
                  description="Display number of resources available for each topic"
                  checked={localSettings?.showResourceCounts}
                  onChange={(e) => handleSettingChange('showResourceCounts', e?.target?.checked)}
                />
              </div>
            </div>
            
            {/* Appearance */}
            <div>
              <h3 className="font-medium text-sm mb-3">Appearance</h3>
              <div className="space-y-4">
                <Select
                  label="Node size"
                  description="Choose the size of topic nodes"
                  options={nodeSizeOptions}
                  value={localSettings?.nodeSize}
                  onChange={(value) => handleSettingChange('nodeSize', value)}
                />
                
                <Select
                  label="Animation speed"
                  description="Control the speed of transitions and animations"
                  options={animationSpeedOptions}
                  value={localSettings?.animationSpeed}
                  onChange={(value) => handleSettingChange('animationSpeed', value)}
                />
              </div>
            </div>
            
            {/* Interaction */}
            <div>
              <h3 className="font-medium text-sm mb-3">Interaction</h3>
              <div className="space-y-3">
                <Checkbox
                  label="Auto-focus on current topic"
                  description="Automatically center the view on the current topic"
                  checked={localSettings?.autoFocus}
                  onChange={(e) => handleSettingChange('autoFocus', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show minimap"
                  description="Display a small overview map for navigation"
                  checked={localSettings?.showMinimap}
                  onChange={(e) => handleSettingChange('showMinimap', e?.target?.checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Modal */}
      <div className="hidden md:block fixed inset-0 z-50">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-heading font-semibold text-xl">
              Roadmap Settings
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={18}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Display Options */}
            <div>
              <h3 className="font-medium text-base mb-4">Display Options</h3>
              <div className="space-y-4">
                <Checkbox
                  label="Show completed topics"
                  description="Display topics that have been marked as complete"
                  checked={localSettings?.showCompleted}
                  onChange={(e) => handleSettingChange('showCompleted', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show topic descriptions"
                  description="Display brief descriptions on topic nodes"
                  checked={localSettings?.showDescriptions}
                  onChange={(e) => handleSettingChange('showDescriptions', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show resource counts"
                  description="Display number of resources available for each topic"
                  checked={localSettings?.showResourceCounts}
                  onChange={(e) => handleSettingChange('showResourceCounts', e?.target?.checked)}
                />
              </div>
            </div>
            
            {/* Appearance */}
            <div>
              <h3 className="font-medium text-base mb-4">Appearance</h3>
              <div className="space-y-4">
                <Select
                  label="Node size"
                  description="Choose the size of topic nodes"
                  options={nodeSizeOptions}
                  value={localSettings?.nodeSize}
                  onChange={(value) => handleSettingChange('nodeSize', value)}
                />
                
                <Select
                  label="Animation speed"
                  description="Control the speed of transitions and animations"
                  options={animationSpeedOptions}
                  value={localSettings?.animationSpeed}
                  onChange={(value) => handleSettingChange('animationSpeed', value)}
                />
              </div>
            </div>
            
            {/* Interaction */}
            <div>
              <h3 className="font-medium text-base mb-4">Interaction</h3>
              <div className="space-y-4">
                <Checkbox
                  label="Auto-focus on current topic"
                  description="Automatically center the view on the current topic"
                  checked={localSettings?.autoFocus}
                  onChange={(e) => handleSettingChange('autoFocus', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Show minimap"
                  description="Display a small overview map for navigation"
                  checked={localSettings?.showMinimap}
                  onChange={(e) => handleSettingChange('showMinimap', e?.target?.checked)}
                />
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadmapSettings;