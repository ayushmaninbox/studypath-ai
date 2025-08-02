import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import { Checkbox } from '../../../components/ui/Checkbox';

const AppearanceSettings = ({ onThemeChange }) => {
  const [theme, setTheme] = useState('light');
  const [systemPreference, setSystemPreference] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const savedSystemPref = localStorage.getItem('useSystemTheme') === 'true';
    
    if (savedSystemPref) {
      setSystemPreference(true);
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
      setTheme(systemTheme);
    } else if (savedTheme) {
      setTheme(savedTheme);
    }

    // Load other preferences
    setAnimations(localStorage.getItem('animations') !== 'false');
    setCompactMode(localStorage.getItem('compactMode') === 'true');
  }, []);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (systemPreference) {
        const newTheme = e?.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery?.addEventListener('change', handleChange);
    return () => mediaQuery?.removeEventListener('change', handleChange);
  }, [systemPreference]);

  const applyTheme = (newTheme) => {
    document.documentElement?.classList?.remove('light', 'dark');
    document.documentElement?.classList?.add(newTheme);
    
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setSystemPreference(false);
    
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('useSystemTheme', 'false');
    
    applyTheme(newTheme);
  };

  const handleSystemPreferenceToggle = () => {
    const newSystemPref = !systemPreference;
    setSystemPreference(newSystemPref);
    
    localStorage.setItem('useSystemTheme', newSystemPref?.toString());
    
    if (newSystemPref) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
      setTheme(systemTheme);
      applyTheme(systemTheme);
    }
  };

  const handleAnimationsToggle = () => {
    const newAnimations = !animations;
    setAnimations(newAnimations);
    localStorage.setItem('animations', newAnimations?.toString());
    
    // Apply animations preference
    document.documentElement?.style?.setProperty(
      '--animation-duration', 
      newAnimations ? '200ms' : '0ms'
    );
  };

  const handleCompactModeToggle = () => {
    const newCompactMode = !compactMode;
    setCompactMode(newCompactMode);
    localStorage.setItem('compactMode', newCompactMode?.toString());
    
    // Apply compact mode
    document.documentElement?.classList?.toggle('compact-mode', newCompactMode);
  };

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      description: 'Clean and bright interface',
      icon: 'Sun',
      preview: 'bg-white border-gray-200'
    },
    {
      value: 'dark',
      label: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: 'Moon',
      preview: 'bg-gray-900 border-gray-700'
    }
  ];

  return (
    <div className="bg-card rounded-lg border shadow-default p-6">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Appearance & Display
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Customize the look and feel of your StudyPath experience
        </p>
      </div>
      <div className="space-y-8">
        {/* Theme Selection */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Palette" size={18} className="mr-2 text-primary" />
            Theme
          </h4>
          
          {/* System Preference Toggle */}
          <div className="mb-4">
            <Checkbox
              label="Use system preference"
              description="Automatically switch between light and dark themes based on your system settings"
              checked={systemPreference}
              onChange={handleSystemPreferenceToggle}
            />
          </div>

          {/* Theme Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themeOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleThemeChange(option?.value)}
                disabled={systemPreference}
                className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  theme === option?.value && !systemPreference
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                } ${systemPreference ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-full ${option?.preview} flex items-center justify-center`}>
                    <Icon 
                      name={option?.icon} 
                      size={16} 
                      className={option?.value === 'dark' ? 'text-white' : 'text-gray-600'} 
                    />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{option?.label}</div>
                    <div className="text-xs text-muted-foreground">{option?.description}</div>
                  </div>
                </div>
                
                {/* Theme Preview */}
                <div className="flex space-x-1">
                  <div className={`w-full h-2 rounded-sm ${option?.preview}`} />
                  <div className={`w-1/3 h-2 rounded-sm ${
                    option?.value === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                  }`} />
                </div>

                {theme === option?.value && !systemPreference && (
                  <div className="absolute top-2 right-2">
                    <Icon name="Check" size={16} className="text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Display Options */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Monitor" size={18} className="mr-2 text-primary" />
            Display Options
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Enable animations"
              description="Show smooth transitions and micro-interactions throughout the app"
              checked={animations}
              onChange={handleAnimationsToggle}
            />

            <Checkbox
              label="Compact mode"
              description="Reduce spacing and padding for a more dense layout"
              checked={compactMode}
              onChange={handleCompactModeToggle}
            />
          </div>
        </div>

        {/* Accessibility */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Eye" size={18} className="mr-2 text-primary" />
            Accessibility
          </h4>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="space-y-3">
              <Checkbox
                label="High contrast mode"
                description="Increase contrast for better visibility"
              />
              
              <Checkbox
                label="Reduce motion"
                description="Minimize animations for users sensitive to motion"
              />
              
              <Checkbox
                label="Large text"
                description="Increase font size throughout the application"
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Eye" size={18} className="mr-2 text-primary" />
            Preview
          </h4>
          
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="GraduationCap" size={16} className="text-white" />
              </div>
              <div>
                <div className="font-medium text-foreground">StudyPath AI</div>
                <div className="text-sm text-muted-foreground">Your learning companion</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-2 bg-primary/20 rounded-full">
                <div className="h-2 bg-primary rounded-full w-3/4" />
              </div>
              <div className="text-xs text-muted-foreground">
                Progress: 75% complete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;