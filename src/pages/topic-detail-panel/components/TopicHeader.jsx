import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopicHeader = ({ 
  topic,
  isCompleted,
  onToggleComplete,
  onClose,
  onBookmark,
  isBookmarked = false,
  className = ""
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleComplete = () => {
    setIsAnimating(true);
    onToggleComplete();
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-green-600 bg-green-50';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-50';
      case 'advanced':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className={`bg-card border-b p-4 lg:p-6 ${className}`}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <div className="w-12 h-1 bg-muted rounded-full mx-auto" />
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          iconName="X"
          iconSize={20}
          className="absolute right-4 top-4"
        />
      </div>
      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Topic Details
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          iconName="X"
          iconSize={20}
        />
      </div>
      {/* Topic Title */}
      <div className="mb-4">
        <h1 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-2">
          {topic?.name}
        </h1>
        
        {/* Topic Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {topic?.estimatedTime && (
            <div className="flex items-center text-muted-foreground">
              <Icon name="Clock" size={16} className="mr-1" />
              {topic?.estimatedTime}
            </div>
          )}
          
          {topic?.difficulty && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic?.difficulty)}`}>
              {topic?.difficulty}
            </span>
          )}
          
          {topic?.category && (
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
              {topic?.category}
            </span>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Completion Toggle */}
          <Button
            variant={isCompleted ? "success" : "outline"}
            size="sm"
            onClick={handleToggleComplete}
            iconName={isCompleted ? "CheckCircle2" : "Circle"}
            iconSize={18}
            className={`transition-all duration-300 ${
              isAnimating ? 'completion-feedback' : ''
            }`}
          >
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </Button>

          {/* Bookmark Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onBookmark}
            iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
            iconSize={18}
            className={isBookmarked ? 'text-primary' : ''}
          />
        </div>

        {/* Share Button */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Share2"
          iconSize={18}
        >
          <span className="hidden sm:inline ml-1">Share</span>
        </Button>
      </div>
      {/* Progress Indicator */}
      {isCompleted && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg animate-fade-in">
          <div className="flex items-center text-success text-sm">
            <Icon name="Trophy" size={16} className="mr-2" />
            <span className="font-medium">
              Completed on {new Date()?.toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicHeader;