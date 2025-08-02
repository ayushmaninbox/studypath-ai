import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationWrapper';
import AppHeader from '../../components/ui/AppHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import ProfileSection from './components/ProfileSection';
import AccountSettings from './components/AccountSettings';
import StudyPreferences from './components/StudyPreferences';
import AppearanceSettings from './components/AppearanceSettings';
import DataManagement from './components/DataManagement';
import SettingsNavigation from './components/SettingsNavigation';

const ProfileSettings = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user preferences
  const [userPreferences, setUserPreferences] = useState({
    dailyStudyTime: '60',
    preferredLearningFormat: 'mixed',
    studySchedule: 'flexible',
    subjectInterests: ['Computer Science', 'Mathematics', 'Physics'],
    learningStyles: ['Visual Learning', 'Interactive Content']
  });

  useEffect(() => {
    // Load user preferences from localStorage or API
    const savedPreferences = localStorage.getItem('user_preferences');
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleUpdateProfile = async (profileData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateUser(profileData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSettings = async (settings) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update user settings in context or localStorage
      localStorage.setItem('user_settings', JSON.stringify(settings));
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Failed to update settings:', error);
      alert('Failed to update settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePreferences = async (preferences) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserPreferences(preferences);
      localStorage.setItem('user_preferences', JSON.stringify(preferences));
      alert('Preferences updated successfully!');
    } catch (error) {
      console.error('Failed to update preferences:', error);
      alert('Failed to update preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeChange = (theme) => {
    // Theme change is handled within AppearanceSettings component
    console.log('Theme changed to:', theme);
  };

  const handleDataAction = async (action, data) => {
    setIsLoading(true);
    try {
      // Handle various data actions (export, delete, etc.)
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Data action:', action, data);
    } catch (error) {
      console.error('Data action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthAction = (action) => {
    if (action === 'logout') {
      logout();
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <ProfileSection
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'account':
        return (
          <AccountSettings
            user={user}
            onUpdateSettings={handleUpdateSettings}
          />
        );
      case 'study':
        return (
          <StudyPreferences
            preferences={userPreferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        );
      case 'appearance':
        return (
          <AppearanceSettings
            onThemeChange={handleThemeChange}
          />
        );
      case 'data':
        return (
          <DataManagement
            user={user}
            onDataAction={handleDataAction}
          />
        );
      default:
        return (
          <ProfileSection
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        );
    }
  };

  const getSectionTitle = () => {
    const sectionTitles = {
      profile: 'Profile Information',
      account: 'Account Settings',
      study: 'Study Preferences',
      appearance: 'Appearance & Display',
      data: 'Data & Privacy'
    };
    return sectionTitles?.[activeSection] || 'Settings';
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} onAuthAction={handleAuthAction} />
      <div className="content-max-width content-spacing py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={18} className="text-primary" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Settings
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your account preferences and customize your StudyPath experience
          </p>
        </div>

        {/* Mobile Section Selector */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            iconPosition="left"
          >
            {getSectionTitle()}
          </Button>
          
          {isMobileMenuOpen && (
            <div className="mt-4 animate-slide-up">
              <SettingsNavigation
                activeSection={activeSection}
                onSectionChange={(section) => {
                  setActiveSection(section);
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation - Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <SettingsNavigation
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Section Header - Mobile */}
              <div className="lg:hidden">
                <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {getSectionTitle()}
                </h2>
              </div>

              {/* Loading Overlay */}
              {isLoading && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Loader2" size={20} className="text-primary animate-spin" />
                      <span className="text-foreground">Updating settings...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Section Content */}
              {renderActiveSection()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>Need help? Contact our support team at support@studypath.ai</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="hover:text-foreground transition-colors duration-200">
                Terms of Service
              </button>
              <button className="hover:text-foreground transition-colors duration-200">
                Help Center
              </button>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-4">
            © {new Date()?.getFullYear()} StudyPath AI. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;