import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStatus = ({ 
  stage = 'parsing', 
  progress = 0, 
  fileName = null,
  error = null 
}) => {
  const stages = [
    {
      key: 'parsing',
      label: 'Parsing Content',
      description: 'Extracting text from your document...',
      icon: 'FileText'
    },
    {
      key: 'analyzing',
      label: 'AI Analysis',
      description: 'Identifying topics and structure...',
      icon: 'Brain'
    },
    {
      key: 'structuring',
      label: 'Building Hierarchy',
      description: 'Organizing topics into learning path...',
      icon: 'GitBranch'
    },
    {
      key: 'finalizing',
      label: 'Finalizing',
      description: 'Preparing your roadmap...',
      icon: 'CheckCircle'
    }
  ];

  const currentStageIndex = stages?.findIndex(s => s?.key === stage);
  const currentStage = stages?.[currentStageIndex];

  if (error) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="AlertCircle" size={32} className="text-error" />
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          Processing Failed
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {error}
        </p>
        <div className="text-xs text-muted-foreground">
          Please try again with a different file or check the formatting guidelines.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          Creating Your Roadmap
        </h3>
        {fileName && (
          <p className="text-sm text-muted-foreground mb-4">
            Processing: {fileName}
          </p>
        )}
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {progress}% complete
        </p>
      </div>
      {/* Stage Progress */}
      <div className="space-y-4">
        {stages?.map((stageItem, index) => {
          const isCompleted = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isPending = index > currentStageIndex;

          return (
            <div 
              key={stageItem?.key}
              className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
                isCurrent ? 'bg-primary/5 border border-primary/20' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCompleted 
                  ? 'bg-success text-success-foreground' 
                  : isCurrent 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={stageItem?.icon} size={20} />
                )}
              </div>
              <div className="flex-1">
                <div className={`font-medium text-sm transition-colors duration-300 ${
                  isCompleted 
                    ? 'text-success' 
                    : isCurrent 
                      ? 'text-primary' :'text-muted-foreground'
                }`}>
                  {stageItem?.label}
                  {isCurrent && (
                    <span className="ml-2 inline-flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stageItem?.description}
                </div>
              </div>
              {isCompleted && (
                <Icon name="CheckCircle" size={16} className="text-success" />
              )}
            </div>
          );
        })}
      </div>
      {/* Processing Tips */}
      <div className="mt-8 bg-muted/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Clock" size={16} className="mr-2 text-accent" />
          While you wait...
        </h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Our AI is analyzing your content structure</li>
          <li>• Complex syllabi may take 30-60 seconds to process</li>
          <li>• We're identifying the optimal learning sequence</li>
          <li>• Your roadmap will be ready for customization soon</li>
        </ul>
      </div>
    </div>
  );
};

export default ProcessingStatus;