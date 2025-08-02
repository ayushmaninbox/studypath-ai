import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopicDescription = ({ 
  topic,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description = topic?.description || `Learn about ${topic?.name} and understand its core concepts, practical applications, and how it fits into your overall learning journey. This topic covers essential knowledge that will build a strong foundation for advanced concepts.`;
  
  const objectives = topic?.objectives || [
    `Understand the fundamental concepts of ${topic?.name}`,
    "Apply theoretical knowledge to practical scenarios",
    "Identify key patterns and best practices",
    "Build confidence for advanced topics"
  ];

  const prerequisites = topic?.prerequisites || [];
  const shouldShowExpand = description?.length > 200;

  return (
    <div className={`bg-card p-4 lg:p-6 ${className}`}>
      {/* Description Section */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-primary" />
          Overview
        </h3>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {shouldShowExpand && !isExpanded 
              ? `${description?.substring(0, 200)}...`
              : description
            }
          </p>
          
          {shouldShowExpand && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
              className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </Button>
          )}
        </div>
      </div>
      {/* Learning Objectives */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Target" size={20} className="mr-2 text-primary" />
          Learning Objectives
        </h3>
        
        <ul className="space-y-2">
          {objectives?.map((objective, index) => (
            <li key={index} className="flex items-start">
              <Icon 
                name="CheckCircle2" 
                size={16} 
                className="mr-2 mt-0.5 text-success flex-shrink-0" 
              />
              <span className="text-muted-foreground text-sm">
                {objective}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Prerequisites */}
      {prerequisites?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center">
            <Icon name="AlertCircle" size={20} className="mr-2 text-warning" />
            Prerequisites
          </h3>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <ul className="space-y-1">
              {prerequisites?.map((prereq, index) => (
                <li key={index} className="flex items-center text-sm text-warning-foreground">
                  <Icon name="ArrowRight" size={14} className="mr-2" />
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* Topic Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {topic?.resourceCount || 8}
          </div>
          <div className="text-xs text-muted-foreground">Resources</div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-secondary mb-1">
            {topic?.studyTime || '2-3h'}
          </div>
          <div className="text-xs text-muted-foreground">Study Time</div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3 text-center col-span-2 lg:col-span-1">
          <div className="text-2xl font-bold text-accent mb-1">
            {topic?.difficulty || 'Intermediate'}
          </div>
          <div className="text-xs text-muted-foreground">Difficulty</div>
        </div>
      </div>
    </div>
  );
};

export default TopicDescription;