import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSummaryCards = ({ stats }) => {
  const summaryCards = [
    {
      id: 'roadmaps',
      title: 'Total Roadmaps',
      value: stats?.totalRoadmaps,
      icon: 'Map',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+2 this week'
    },
    {
      id: 'completion',
      title: 'Avg. Completion',
      value: `${stats?.avgCompletion}%`,
      icon: 'Target',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+12% this month'
    },
    {
      id: 'streak',
      title: 'Study Streak',
      value: `${stats?.studyStreak} days`,
      icon: 'Flame',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: 'Keep it up!'
    },
    {
      id: 'time',
      title: 'Weekly Time',
      value: `${stats?.weeklyTime}h`,
      icon: 'Clock',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+3h from last week'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryCards?.map((card) => (
        <div key={card?.id} className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center justify-center w-10 h-10 ${card?.bgColor} rounded-lg`}>
              <Icon name={card?.icon} size={20} className={card?.color} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-heading font-semibold text-foreground">
                {card?.value}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">
              {card?.title}
            </h3>
            <p className="text-xs text-accent font-medium">
              {card?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressSummaryCards;