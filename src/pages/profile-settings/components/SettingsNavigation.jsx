import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsNavigation = ({ activeSection, onSectionChange, className = "" }) => {
  const navigationItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and avatar'
    },
    {
      id: 'account',
      label: 'Account',
      icon: 'Settings',
      description: 'Password and notifications'
    },
    {
      id: 'study',
      label: 'Study Preferences',
      icon: 'BookOpen',
      description: 'Learning goals and interests'
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: 'Palette',
      description: 'Theme and display options'
    },
    {
      id: 'data',
      label: 'Data & Privacy',
      icon: 'Shield',
      description: 'Export data and privacy settings'
    }
  ];

  return (
    <nav className={`bg-card rounded-lg border shadow-default p-4 ${className}`}>
      <h3 className="font-heading font-semibold text-foreground mb-4">Settings</h3>
      <div className="space-y-1">
        {navigationItems?.map((item) => (
          <button
            key={item?.id}
            onClick={() => onSectionChange(item?.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-left transition-all duration-200 ${
              activeSection === item?.id
                ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon 
              name={item?.icon} 
              size={18} 
              className={activeSection === item?.id ? 'text-primary' : 'text-muted-foreground'} 
            />
            <div className="flex-1 min-w-0">
              <div className={`font-medium text-sm ${
                activeSection === item?.id ? 'text-primary' : 'text-foreground'
              }`}>
                {item?.label}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 truncate">
                {item?.description}
              </div>
            </div>
            {activeSection === item?.id && (
              <Icon name="ChevronRight" size={16} className="text-primary" />
            )}
          </button>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors duration-200">
            <Icon name="Download" size={16} />
            <span>Export Data</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors duration-200">
            <Icon name="HelpCircle" size={16} />
            <span>Help & Support</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SettingsNavigation;