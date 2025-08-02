import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSettings = ({ user, onUpdateSettings }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    studyReminders: true,
    progressUpdates: true,
    weeklySummary: false,
    emailDigest: true,
    pushNotifications: true
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e?.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handlePasswordSubmit = async () => {
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
      alert('Password updated successfully');
    } catch (error) {
      console.error('Password change failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      await onUpdateSettings({ notifications });
      alert('Notification preferences saved');
    } catch (error) {
      console.error('Failed to save notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="bg-card rounded-lg border shadow-default p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Password & Security
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account security settings
            </p>
          </div>
          {!isChangingPassword && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsChangingPassword(true)}
              iconName="Key"
              iconPosition="left"
            >
              Change Password
            </Button>
          )}
        </div>

        {isChangingPassword ? (
          <div className="space-y-4">
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              placeholder="Enter current password"
              value={passwordData?.currentPassword}
              onChange={handlePasswordChange}
              required
            />

            <Input
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              value={passwordData?.newPassword}
              onChange={handlePasswordChange}
              description="Password must be at least 8 characters long"
              required
            />

            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={passwordData?.confirmPassword}
              onChange={handlePasswordChange}
              required
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button
                variant="default"
                onClick={handlePasswordSubmit}
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
              >
                Update Password
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
                disabled={isLoading}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Password last updated on January 15, 2025</span>
          </div>
        )}
      </div>
      {/* Notification Settings */}
      <div className="bg-card rounded-lg border shadow-default p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Notification Preferences
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Choose how you want to receive updates and reminders
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Study Reminders"
              description="Daily reminders to maintain your study schedule"
              checked={notifications?.studyReminders}
              onChange={() => handleNotificationChange('studyReminders')}
            />

            <Checkbox
              label="Progress Updates"
              description="Notifications when you complete topics or milestones"
              checked={notifications?.progressUpdates}
              onChange={() => handleNotificationChange('progressUpdates')}
            />

            <Checkbox
              label="Weekly Summary"
              description="Weekly reports of your learning progress"
              checked={notifications?.weeklySummary}
              onChange={() => handleNotificationChange('weeklySummary')}
            />

            <Checkbox
              label="Email Digest"
              description="Receive important updates via email"
              checked={notifications?.emailDigest}
              onChange={() => handleNotificationChange('emailDigest')}
            />

            <Checkbox
              label="Push Notifications"
              description="Browser notifications for real-time updates"
              checked={notifications?.pushNotifications}
              onChange={() => handleNotificationChange('pushNotifications')}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={handleSaveNotifications}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              Save Notification Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;