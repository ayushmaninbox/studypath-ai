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
    <div className="card-elevated rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-border/50 animate-fade-in">
      {/* Thumbnail */}
      <div className="relative h-36 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50"></div>
        <Icon 
          name={getSubjectIcon(roadmap?.subject)} 
          size={40} 
          className="text-primary/70 relative z-10" 
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(roadmap?.status)}`}>
            {roadmap?.status?.replace('-', ' ')}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-bold text-foreground text-base line-clamp-2 flex-1 group-hover:text-primary transition-colors duration-200">
            {roadmap?.title}
          </h3>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="px-3 py-1.5 bg-muted/80 rounded-lg text-xs font-medium text-muted-foreground">
            {roadmap?.subject}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {roadmap?.totalTopics} topics
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground font-medium">Progress</span>
            <span className="text-primary font-bold">{roadmap?.progress}%</span>
          </div>
          <div className="progress-bar h-2.5">
            <div 
              className="progress-fill h-2.5"
              style={{ width: `${roadmap?.progress}%` }}
            />
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-5">
          <span className="font-medium">Updated {roadmap?.lastUpdated}</span>
          <div className="flex items-center">
            <Icon name="Clock" size={12} className="mr-1" />
            <span className="font-medium">{roadmap?.estimatedTime}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="gradient"
            size="sm"
            onClick={handleViewRoadmap}
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
            className="flex-1 shadow-md hover:shadow-lg"
          >
            View
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(roadmap?.id)}
            iconName="Edit"
            iconSize={16}
            className="hover:bg-primary/10 hover:text-primary hover:border-primary/20"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare(roadmap?.id)}
            iconName="Share"
            iconSize={16}
            className="hover:bg-secondary/10 hover:text-secondary hover:border-secondary/20"
          />
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;