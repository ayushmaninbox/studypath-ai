import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudyPreferences = ({ preferences, onUpdatePreferences }) => {
  const [studyGoals, setStudyGoals] = useState({
    dailyStudyTime: preferences?.dailyStudyTime || '60',
    preferredLearningFormat: preferences?.preferredLearningFormat || 'mixed',
    studySchedule: preferences?.studySchedule || 'flexible'
  });

  const [subjectInterests, setSubjectInterests] = useState(
    preferences?.subjectInterests || []
  );

  const [learningStyles, setLearningStyles] = useState(
    preferences?.learningStyles || []
  );

  const [isLoading, setIsLoading] = useState(false);

  const studyTimeOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
    { value: '180', label: '3 hours' },
    { value: '240', label: '4+ hours' }
  ];

  const learningFormatOptions = [
    { value: 'visual', label: 'Visual (Diagrams, Charts)' },
    { value: 'text', label: 'Text-based (Articles, Notes)' },
    { value: 'video', label: 'Video Content' },
    { value: 'interactive', label: 'Interactive Content' },
    { value: 'mixed', label: 'Mixed Formats' }
  ];

  const scheduleOptions = [
    { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 10 PM)' },
    { value: 'night', label: 'Night (10 PM - 2 AM)' },
    { value: 'flexible', label: 'Flexible Schedule' }
  ];

  const subjectOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'Engineering', 'Business', 'Economics', 'Psychology', 'History',
    'Literature', 'Languages', 'Art & Design', 'Music', 'Philosophy'
  ];

  const learningStyleOptions = [
    'Visual Learning', 'Auditory Learning', 'Kinesthetic Learning',
    'Reading/Writing', 'Social Learning', 'Solitary Learning',
    'Logical Learning', 'Verbal Learning'
  ];

  const handleStudyGoalChange = (field, value) => {
    setStudyGoals(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubjectToggle = (subject) => {
    setSubjectInterests(prev => 
      prev?.includes(subject)
        ? prev?.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleLearningStyleToggle = (style) => {
    setLearningStyles(prev => 
      prev?.includes(style)
        ? prev?.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      const updatedPreferences = {
        ...studyGoals,
        subjectInterests,
        learningStyles
      };
      await onUpdatePreferences(updatedPreferences);
      alert('Study preferences saved successfully');
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-default p-6">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Study Preferences
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your learning experience for better resource curation
        </p>
      </div>
      <div className="space-y-8">
        {/* Study Goals */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Target" size={18} className="mr-2 text-primary" />
            Daily Study Goals
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Daily Study Time"
              options={studyTimeOptions}
              value={studyGoals?.dailyStudyTime}
              onChange={(value) => handleStudyGoalChange('dailyStudyTime', value)}
              description="Target study duration per day"
            />

            <Select
              label="Preferred Learning Format"
              options={learningFormatOptions}
              value={studyGoals?.preferredLearningFormat}
              onChange={(value) => handleStudyGoalChange('preferredLearningFormat', value)}
              description="How you prefer to consume content"
            />

            <Select
              label="Study Schedule"
              options={scheduleOptions}
              value={studyGoals?.studySchedule}
              onChange={(value) => handleStudyGoalChange('studySchedule', value)}
              description="When you typically study"
            />
          </div>
        </div>

        {/* Subject Interests */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="BookOpen" size={18} className="mr-2 text-primary" />
            Subject Interests
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Select subjects you're interested in for better resource recommendations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {subjectOptions?.map((subject) => (
              <Checkbox
                key={subject}
                label={subject}
                checked={subjectInterests?.includes(subject)}
                onChange={() => handleSubjectToggle(subject)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Learning Styles */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Brain" size={18} className="mr-2 text-primary" />
            Learning Styles
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Choose learning styles that work best for you
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {learningStyleOptions?.map((style) => (
              <Checkbox
                key={style}
                label={style}
                checked={learningStyles?.includes(style)}
                onChange={() => handleLearningStyleToggle(style)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Study Environment */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Settings" size={18} className="mr-2 text-primary" />
            Study Environment
          </h4>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Volume2" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Background Sounds</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['None', 'White Noise', 'Nature Sounds', 'Lo-fi Music']?.map((sound) => (
                <Checkbox
                  key={sound}
                  label={sound}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-border">
          <Button
            variant="default"
            onClick={handleSavePreferences}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Save Study Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudyPreferences;