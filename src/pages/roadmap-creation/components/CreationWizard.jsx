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
    <div className="card-glass border border-border/50 rounded-xl p-8 mb-8 shadow-lg">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.number}>
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${
                step?.number < currentStep
                  ? 'bg-success text-success-foreground shadow-success/25'
                  : step?.number === currentStep
                    ? 'bg-primary text-primary-foreground shadow-primary/25 animate-glow'
                    : 'bg-muted text-muted-foreground shadow-sm'
              }`}>
                {step?.number < currentStep ? (
                  <Icon name="Check" size={22} />
                ) : (
                  <Icon name={step?.icon} size={22} />
                )}
              </div>
              
              <div className="hidden sm:block">
                <div className={`font-semibold text-base transition-colors duration-300 ${
                  step?.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {step?.description}
                </div>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-6 transition-colors duration-500 rounded-full ${
                step?.number < currentStep ? 'bg-success shadow-sm' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Mobile Step Indicator */}
      <div className="sm:hidden mt-4 text-center">
        <div className="text-base font-semibold text-foreground">
          Step {currentStep} of {totalSteps}: {steps?.[currentStep - 1]?.title}
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          {steps?.[currentStep - 1]?.description}
        </div>
      </div>
    </div>
  );
};

export default CreationWizard;