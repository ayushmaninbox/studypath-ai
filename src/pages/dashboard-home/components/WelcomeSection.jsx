import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ user, currentTime }) => {
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">
            {getGreeting()}, {user?.name || 'Learner'}! 👋
          </h1>
          <p className="text-muted-foreground text-sm">
            {formatDate()} • Ready to continue your learning journey?
          </p>
        </div>
        <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full">
          <Icon name="BookOpen" size={32} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;