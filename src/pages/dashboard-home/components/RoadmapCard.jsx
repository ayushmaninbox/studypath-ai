import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoadmapCard = ({ roadmap, onEdit, onShare, onDelete }) => {
  const navigate = useNavigate();

  const handleViewRoadmap = () => {
    navigate('/interactive-roadmap-view', { 
      state: { roadmapId: roadmap?.id, roadmapData: roadmap } 
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-accent bg-accent/10';
      case 'in-progress':
        return 'text-primary bg-primary/10';
      case 'not-started':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getSubjectIcon = (subject) => {
    const iconMap = {
      'programming': 'Code',
      'mathematics': 'Calculator',
      'science': 'Atom',
      'language': 'Languages',
      'business': 'Briefcase',
      'default': 'BookOpen'
    };
    return iconMap?.[subject] || iconMap?.default;
  };

  return (
    <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 group">
      {/* Thumbnail */}
      <div className="relative h-32 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
        <Icon 
          name={getSubjectIcon(roadmap?.subject)} 
          size={32} 
          className="text-primary/60" 
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(roadmap?.status)}`}>
            {roadmap?.status?.replace('-', ' ')}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-foreground text-sm line-clamp-2 flex-1">
            {roadmap?.title}
          </h3>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
            {roadmap?.subject}
          </span>
          <span className="text-xs text-muted-foreground">
            {roadmap?.totalTopics} topics
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-medium">{roadmap?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${roadmap?.progress}%` }}
            />
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>Updated {roadmap?.lastUpdated}</span>
          <div className="flex items-center">
            <Icon name="Clock" size={12} className="mr-1" />
            {roadmap?.estimatedTime}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleViewRoadmap}
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            View
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(roadmap?.id)}
            iconName="Edit"
            iconSize={16}
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(roadmap?.id)}
            iconName="Share"
            iconSize={16}
          />
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;