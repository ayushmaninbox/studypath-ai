import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataManagement = ({ user, onDataAction }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    progressReports: true,
    roadmaps: true,
    studyHistory: true,
    preferences: false
  });
  const [privacySettings, setPrivacySettings] = useState({
    shareRoadmaps: false,
    analyticsParticipation: true,
    dataCollection: true
  });

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        user: {
          name: user?.name,
          email: user?.email,
          joinDate: "2024-12-15"
        },
        ...(exportOptions?.progressReports && {
          progressReports: [
            {
              date: "2025-01-30",
              totalRoadmaps: 5,
              completedTopics: 47,
              studyTime: "23.5 hours"
            }
          ]
        }),
        ...(exportOptions?.roadmaps && {
          roadmaps: [
            {
              id: "1",
              title: "React Development Mastery",
              createdDate: "2025-01-15",
              progress: 75,
              totalTopics: 24
            }
          ]
        }),
        ...(exportOptions?.studyHistory && {
          studyHistory: [
            {
              date: "2025-02-01",
              topic: "React Hooks",
              timeSpent: "45 minutes",
              completed: true
            }
          ]
        })
      };

      // Create and download file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `studypath-data-export-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);

      alert('Data exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearLocalStorage = () => {
    if (window.confirm('Are you sure you want to clear all local data? This action cannot be undone.')) {
      // Clear specific StudyPath data from localStorage
      const keysToRemove = ['roadmaps', 'progress', 'study_history', 'temp_roadmaps'];
      keysToRemove?.forEach(key => localStorage.removeItem(key));
      alert('Local storage cleared successfully!');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is permanent and cannot be undone.')) {
      if (window.confirm('This will permanently delete all your roadmaps, progress, and account data. Type "DELETE" to confirm.')) {
        // In real app, this would call the delete account API
        alert('Account deletion request submitted. You will receive a confirmation email.');
      }
    }
  };

  const handlePrivacyChange = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handleExportOptionChange = (key) => {
    setExportOptions(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const storageStats = {
    totalRoadmaps: 5,
    totalProgress: "47 topics completed",
    storageUsed: "2.3 MB",
    lastBackup: "January 28, 2025"
  };

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <div className="bg-card rounded-lg border shadow-default p-6">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Data Export
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Download your StudyPath data for backup or transfer
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-3">Export Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Checkbox
                label="Progress Reports"
                description="Your learning statistics and achievements"
                checked={exportOptions?.progressReports}
                onChange={() => handleExportOptionChange('progressReports')}
              />
              
              <Checkbox
                label="Roadmaps"
                description="All created roadmaps and their structure"
                checked={exportOptions?.roadmaps}
                onChange={() => handleExportOptionChange('roadmaps')}
              />
              
              <Checkbox
                label="Study History"
                description="Your complete study session history"
                checked={exportOptions?.studyHistory}
                onChange={() => handleExportOptionChange('studyHistory')}
              />
              
              <Checkbox
                label="Preferences"
                description="Your app settings and preferences"
                checked={exportOptions?.preferences}
                onChange={() => handleExportOptionChange('preferences')}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={handleExportData}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Exporting Data...' : 'Export My Data'}
            </Button>
          </div>
        </div>
      </div>
      {/* Storage Information */}
      <div className="bg-card rounded-lg border shadow-default p-6">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Storage Information
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your data usage and storage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Map" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Roadmaps</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{storageStats?.totalRoadmaps}</div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Progress</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{storageStats?.totalProgress}</div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="HardDrive" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Storage</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{storageStats?.storageUsed}</div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Last Backup</span>
            </div>
            <div className="text-sm text-muted-foreground">{storageStats?.lastBackup}</div>
          </div>
        </div>
      </div>
      {/* Privacy Settings */}
      <div className="bg-card rounded-lg border shadow-default p-6">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Privacy Settings
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Control how your data is used and shared
          </p>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Allow roadmap sharing"
            description="Enable others to view your public roadmaps"
            checked={privacySettings?.shareRoadmaps}
            onChange={() => handlePrivacyChange('shareRoadmaps')}
          />

          <Checkbox
            label="Participate in analytics"
            description="Help improve StudyPath by sharing anonymous usage data"
            checked={privacySettings?.analyticsParticipation}
            onChange={() => handlePrivacyChange('analyticsParticipation')}
          />

          <Checkbox
            label="Data collection for personalization"
            description="Allow data collection to personalize your learning experience"
            checked={privacySettings?.dataCollection}
            onChange={() => handlePrivacyChange('dataCollection')}
          />
        </div>
      </div>
      {/* Danger Zone */}
      <div className="bg-card rounded-lg border border-error/20 shadow-default p-6">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-error">
            Danger Zone
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Irreversible actions that affect your account and data
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-error/5 rounded-lg border border-error/20">
            <div className="mb-3 sm:mb-0">
              <h4 className="font-medium text-foreground">Clear Local Storage</h4>
              <p className="text-sm text-muted-foreground">
                Remove all locally stored data (roadmaps, progress, preferences)
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleClearLocalStorage}
              iconName="Trash2"
              iconPosition="left"
              className="border-error text-error hover:bg-error hover:text-white"
            >
              Clear Data
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-error/5 rounded-lg border border-error/20">
            <div className="mb-3 sm:mb-0">
              <h4 className="font-medium text-foreground">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              iconName="UserX"
              iconPosition="left"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;