import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const TopicDetailPanel = ({ 
  topic, 
  isOpen, 
  onClose, 
  onToggleComplete,
  className = "" 
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [isOpen, topic]);

  if (!topic || !isOpen) return null;

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    try {
      await onToggleComplete(topic?.id);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleOpenFullDetail = () => {
    navigate('/topic-detail-panel', { 
      state: { 
        topic,
        returnTo: '/interactive-roadmap-view'
      }
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'resources', label: 'Resources', icon: 'BookOpen' },
    { id: 'progress', label: 'Progress', icon: 'BarChart3' }
  ];

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className={`md:hidden fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-xl shadow-xl max-h-[80vh] overflow-hidden animate-slide-up">
          {/* Handle */}
          <div className="flex justify-center py-2">
            <div className="w-8 h-1 bg-muted rounded-full" />
          </div>
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
            <div className="flex-1 min-w-0">
              <h2 className="font-heading font-semibold text-lg truncate">
                {topic?.label}
              </h2>
              <div className="flex items-center mt-1 space-x-2">
                <span className="text-xs text-muted-foreground">
                  {topic?.difficulty} • ~30min
                </span>
                {topic?.isCompleted && (
                  <div className="flex items-center text-xs text-success">
                    <Icon name="Check" size={12} className="mr-1" />
                    Completed
                  </div>
                )}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={18}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Description */}
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {topic?.description}
                </p>
              </div>
              
              {/* Quick Resources */}
              {topic?.resources && topic?.resources?.length > 0 && (
                <div>
                  <h3 className="font-medium text-sm mb-2">Quick Resources</h3>
                  <div className="space-y-2">
                    {topic?.resources?.slice(0, 2)?.map((resource, index) => (
                      <a
                        key={index}
                        href={resource?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center mr-3">
                          <Icon 
                            name={resource?.type === 'video' ? 'Play' : 'FileText'} 
                            size={14} 
                            className="text-primary"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {resource?.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {resource?.source}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant={topic?.isCompleted ? "outline" : "default"}
                  fullWidth
                  loading={isCompleting}
                  onClick={handleToggleComplete}
                  iconName={topic?.isCompleted ? "RotateCcw" : "Check"}
                  iconPosition="left"
                >
                  {topic?.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleOpenFullDetail}
                  iconName="ExternalLink"
                  iconPosition="left"
                >
                  View Full Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block fixed top-20 right-4 bottom-4 w-80 z-30 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex-1 min-w-0">
              <h2 className="font-heading font-semibold text-lg truncate">
                {topic?.label}
              </h2>
              <div className="flex items-center mt-1 space-x-2">
                <span className="text-xs text-muted-foreground">
                  {topic?.difficulty} • ~30min
                </span>
                {topic?.isCompleted && (
                  <div className="flex items-center text-xs text-success">
                    <Icon name="Check" size={12} className="mr-1" />
                    Completed
                  </div>
                )}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={18}
            />
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium transition-colors duration-200 ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={14} className="mr-1" />
                {tab?.label}
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {topic?.description}
                  </p>
                </div>
                
                {topic?.prerequisites && topic?.prerequisites?.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm mb-2">Prerequisites</h3>
                    <div className="space-y-1">
                      {topic?.prerequisites?.map((prereq, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <Icon name="ArrowRight" size={12} className="mr-2" />
                          {prereq}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'resources' && (
              <div className="space-y-3">
                {topic?.resources && topic?.resources?.length > 0 ? (
                  topic?.resources?.map((resource, index) => (
                    <a
                      key={index}
                      href={resource?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                          <Icon 
                            name={resource?.type === 'video' ? 'Play' : 'FileText'} 
                            size={16} 
                            className="text-primary"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {resource?.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {resource?.source} • {resource?.duration || '5 min read'}
                          </div>
                          {resource?.description && (
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {resource?.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Icon name="BookOpen" size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No resources available</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'progress' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-2">Completion Status</h3>
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${topic?.isCompleted ? 'bg-success' : 'bg-muted'}`} />
                    <span className="text-sm">
                      {topic?.isCompleted ? 'Completed' : 'Not Started'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm mb-2">Study Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Estimated: 30 minutes
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button
              variant={topic?.isCompleted ? "outline" : "default"}
              fullWidth
              loading={isCompleting}
              onClick={handleToggleComplete}
              iconName={topic?.isCompleted ? "RotateCcw" : "Check"}
              iconPosition="left"
            >
              {topic?.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Button>
            
            <Button
              variant="ghost"
              fullWidth
              onClick={handleOpenFullDetail}
              iconName="ExternalLink"
              iconPosition="left"
            >
              View Full Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicDetailPanel;