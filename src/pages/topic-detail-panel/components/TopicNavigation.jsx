import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopicNavigation = ({ 
  currentTopic,
  previousTopic = null,
  nextTopic = null,
  onNavigate,
  relatedTopics = [],
  className = ""
}) => {
  const handleNavigate = (topic) => {
    if (onNavigate) {
      onNavigate(topic);
    }
  };

  return (
    <div className={`bg-card p-4 lg:p-6 border-t ${className}`}>
      {/* Previous/Next Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          {previousTopic ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigate(previousTopic)}
              iconName="ChevronLeft"
              iconSize={16}
              className="justify-start p-2 hover:bg-muted/50"
            >
              <div className="text-left ml-2">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="text-sm font-medium text-foreground truncate max-w-32">
                  {previousTopic?.name}
                </div>
              </div>
            </Button>
          ) : (
            <div className="text-xs text-muted-foreground p-2">
              First topic
            </div>
          )}
        </div>

        <div className="flex-1 text-right">
          {nextTopic ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigate(nextTopic)}
              iconName="ChevronRight"
              iconPosition="right"
              iconSize={16}
              className="justify-end p-2 hover:bg-muted/50"
            >
              <div className="text-right mr-2">
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="text-sm font-medium text-foreground truncate max-w-32">
                  {nextTopic?.name}
                </div>
              </div>
            </Button>
          ) : (
            <div className="text-xs text-muted-foreground p-2">
              Last topic
            </div>
          )}
        </div>
      </div>
      {/* Related Topics */}
      {relatedTopics?.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="GitBranch" size={16} className="mr-2 text-primary" />
            Related Topics
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {relatedTopics?.slice(0, 4)?.map((topic) => (
              <button
                key={topic?.id}
                onClick={() => handleNavigate(topic)}
                className="flex items-center p-3 bg-muted/30 hover:bg-muted/50 rounded-lg text-left transition-colors duration-200 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {topic?.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {topic?.category || 'Related concept'}
                  </div>
                </div>
                
                <div className="flex items-center ml-2">
                  {topic?.isCompleted && (
                    <Icon name="CheckCircle2" size={14} className="text-success mr-1" />
                  )}
                  <Icon 
                    name="ArrowRight" 
                    size={14} 
                    className="text-muted-foreground group-hover:text-primary transition-colors" 
                  />
                </div>
              </button>
            ))}
          </div>

          {relatedTopics?.length > 4 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3"
              iconName="MoreHorizontal"
              iconSize={16}
            >
              View More Related Topics
            </Button>
          )}
        </div>
      )}
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Topic {currentTopic?.order || 1} of {currentTopic?.totalTopics || 10}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              iconSize={14}
            >
              <span className="hidden sm:inline ml-1">Reset Progress</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Flag"
              iconSize={14}
            >
              <span className="hidden sm:inline ml-1">Report Issue</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Progress Indicator */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Roadmap Progress</span>
          <span className="text-xs text-primary font-medium">
            {Math.round(((currentTopic?.order || 1) / (currentTopic?.totalTopics || 10)) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-1">
          <div 
            className="bg-primary rounded-full h-1 transition-all duration-300"
            style={{ 
              width: `${((currentTopic?.order || 1) / (currentTopic?.totalTopics || 10)) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopicNavigation;