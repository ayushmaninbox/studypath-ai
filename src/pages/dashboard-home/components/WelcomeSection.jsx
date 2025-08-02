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
    <div className="card-glass bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-xl p-8 mb-8 border border-border/50 shadow-lg animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2 text-gradient">
            {getGreeting()}, {user?.name || 'Learner'}! 👋
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            {formatDate()} • Ready to continue your learning journey?
          </p>
        </div>
        <div className="hidden sm:flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl shadow-lg animate-float">
          <Icon name="BookOpen" size={36} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;