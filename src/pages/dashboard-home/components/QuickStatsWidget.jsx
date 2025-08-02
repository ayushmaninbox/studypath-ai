import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsWidget = ({ weeklyStats, upcomingReminders }) => {
  return (
    <div className="space-y-4">
      {/* Weekly Study Time */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-foreground">This Week</h3>
          <Icon name="TrendingUp" size={20} className="text-accent" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Study Time</span>
            <span className="text-lg font-semibold text-foreground">{weeklyStats?.studyTime}h</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Topics Completed</span>
            <span className="text-lg font-semibold text-accent">{weeklyStats?.topicsCompleted}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Sessions</span>
            <span className="text-lg font-semibold text-secondary">{weeklyStats?.sessions}</span>
          </div>
        </div>

        {/* Weekly progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Weekly Goal</span>
            <span className="text-primary font-medium">{Math.round((weeklyStats?.studyTime / weeklyStats?.weeklyGoal) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${Math.min((weeklyStats?.studyTime / weeklyStats?.weeklyGoal) * 100, 100)}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {weeklyStats?.studyTime} / {weeklyStats?.weeklyGoal} hours
          </div>
        </div>
      </div>
      {/* Upcoming Reminders */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-foreground">Reminders</h3>
          <Icon name="Bell" size={20} className="text-warning" />
        </div>
        
        {upcomingReminders?.length === 0 ? (
          <div className="text-center py-4">
            <Icon name="CheckCircle" size={24} className="text-accent mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">All caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingReminders?.map((reminder) => (
              <div key={reminder?.id} className="flex items-start space-x-3 p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center w-6 h-6 bg-warning/20 rounded-full mt-0.5">
                  <Icon name="Clock" size={12} className="text-warning" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {reminder?.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {reminder?.time} • {reminder?.roadmapTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickStatsWidget;