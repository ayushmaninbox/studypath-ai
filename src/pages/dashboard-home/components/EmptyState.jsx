import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = () => {
  const navigate = useNavigate();

  const handleCreateRoadmap = () => {
    navigate('/roadmap-creation');
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Icon name="Map" size={48} className="text-primary/60" />
      </div>
      
      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
        No roadmaps yet
      </h3>
      
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Create your first learning roadmap to get started. Upload a syllabus or describe what you want to learn, and we'll generate a personalized study path for you.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={handleCreateRoadmap}
          iconName="Plus"
          iconPosition="left"
        >
          Create Your First Roadmap
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {/* Show demo roadmap */}}
          iconName="Play"
          iconPosition="left"
        >
          View Demo
        </Button>
      </div>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Upload" size={24} className="text-accent" />
          </div>
          <h4 className="font-medium text-foreground mb-1">Upload Syllabus</h4>
          <p className="text-xs text-muted-foreground">
            Upload PDF or paste text content
          </p>
        </div>
        
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Sparkles" size={24} className="text-secondary" />
          </div>
          <h4 className="font-medium text-foreground mb-1">AI Processing</h4>
          <p className="text-xs text-muted-foreground">
            Smart topic extraction & structuring
          </p>
        </div>
        
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Target" size={24} className="text-primary" />
          </div>
          <h4 className="font-medium text-foreground mb-1">Track Progress</h4>
          <p className="text-xs text-muted-foreground">
            Visual roadmap with completion tracking
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;