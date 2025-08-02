import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      'topic_completed': 'CheckCircle',
      'roadmap_created': 'Plus',
      'milestone_achieved': 'Award',
      'streak_milestone': 'Flame',
      'resource_bookmarked': 'Bookmark'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'topic_completed': 'text-accent',
      'roadmap_created': 'text-primary',
      'milestone_achieved': 'text-warning',
      'streak_milestone': 'text-warning',
      'resource_bookmarked': 'text-secondary'
    };
    return colorMap?.[type] || 'text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return time?.toLocaleDateString();
  };

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      {activities?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Clock" size={32} className="text-muted-foreground/50 mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  {activity?.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                  {activity?.roadmapTitle && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-primary">
                        {activity?.roadmapTitle}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;