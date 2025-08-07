import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CreationWizard = ({ currentStep = 1, totalSteps = 3 }) => {
  const steps = [
    {
      number: 1,
      title: 'Upload Content',
      description: 'PDF or text input',
      icon: 'Upload'
    },
    {
      number: 2,
      title: 'Review Topics',
      description: 'Customize structure',
      icon: 'Edit'
    },
    {
      number: 3,
      title: 'Generate Roadmap',
      description: 'Create learning path',
      icon: 'Map'
    }
  ];

  return (
    <div className="bg-card border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.number}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                step?.number < currentStep
                  ? 'bg-success text-success-foreground'
                  : step?.number === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {step?.number < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              
              <div className="hidden sm:block">
                <div className={`font-medium text-sm transition-colors duration-300 ${
                  step?.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {step?.description}
                </div>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-px mx-4 transition-colors duration-300 ${
                step?.number < currentStep ? 'bg-success' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Mobile Step Indicator */}
      <div className="sm:hidden mt-4 text-center">
        <div className="text-sm font-medium text-foreground">
          Step {currentStep} of {totalSteps}: {steps?.[currentStep - 1]?.title}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {steps?.[currentStep - 1]?.description}
        </div>
      </div>
    </div>
  );
};

export default CreationWizard;