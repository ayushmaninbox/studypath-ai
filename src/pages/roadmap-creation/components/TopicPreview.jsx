import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TopicPreview = ({ 
  extractedTopics = [], 
  onTopicsUpdate, 
  onGenerateRoadmap,
  isGenerating = false 
}) => {
  const [topics, setTopics] = useState(extractedTopics);
  const [editingTopic, setEditingTopic] = useState(null);
  const [newTopicName, setNewTopicName] = useState('');
  const [showAddTopic, setShowAddTopic] = useState(false);

  const handleTopicEdit = (topicId, newName) => {
    const updatedTopics = topics?.map(topic => 
      topic?.id === topicId ? { ...topic, name: newName } : topic
    );
    setTopics(updatedTopics);
    onTopicsUpdate(updatedTopics);
    setEditingTopic(null);
  };

  const handleTopicDelete = (topicId) => {
    const updatedTopics = topics?.filter(topic => topic?.id !== topicId);
    setTopics(updatedTopics);
    onTopicsUpdate(updatedTopics);
  };

  const handleAddTopic = () => {
    if (newTopicName?.trim()) {
      const newTopic = {
        id: Date.now()?.toString(),
        name: newTopicName?.trim(),
        level: 1,
        subtopics: []
      };
      const updatedTopics = [...topics, newTopic];
      setTopics(updatedTopics);
      onTopicsUpdate(updatedTopics);
      setNewTopicName('');
      setShowAddTopic(false);
    }
  };

  const handleSubtopicEdit = (topicId, subtopicIndex, newName) => {
    const updatedTopics = topics?.map(topic => {
      if (topic?.id === topicId) {
        const updatedSubtopics = [...topic?.subtopics];
        updatedSubtopics[subtopicIndex] = newName;
        return { ...topic, subtopics: updatedSubtopics };
      }
      return topic;
    });
    setTopics(updatedTopics);
    onTopicsUpdate(updatedTopics);
  };

  const handleLevelChange = (topicId, newLevel) => {
    const updatedTopics = topics?.map(topic => 
      topic?.id === topicId ? { ...topic, level: newLevel } : topic
    );
    setTopics(updatedTopics);
    onTopicsUpdate(updatedTopics);
  };

  const getLevelColor = (level) => {
    const colors = {
      1: 'bg-primary/10 text-primary border-primary/20',
      2: 'bg-secondary/10 text-secondary border-secondary/20',
      3: 'bg-accent/10 text-accent border-accent/20'
    };
    return colors?.[level] || colors?.[1];
  };

  const getLevelLabel = (level) => {
    const labels = {
      1: 'Module',
      2: 'Chapter', 
      3: 'Section'
    };
    return labels?.[level] || 'Topic';
  };

  if (topics?.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileX" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          No Topics Detected
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          We couldn't extract topics from your content. Please try uploading a different file or use manual text input with clear structure.
        </p>
        <Button variant="outline" onClick={() => window.location?.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground">
            Extracted Topics
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Review and customize your learning path structure
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {topics?.length} topics found
        </div>
      </div>
      {/* Topics List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {topics?.map((topic, index) => (
          <div key={topic?.id} className="bg-card border rounded-lg p-4 space-y-3">
            {/* Topic Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono text-muted-foreground">
                    {String(index + 1)?.padStart(2, '0')}
                  </span>
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getLevelColor(topic?.level)}`}>
                    {getLevelLabel(topic?.level)}
                  </div>
                </div>
                
                <div className="flex-1">
                  {editingTopic === topic?.id ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        defaultValue={topic?.name}
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e?.key === 'Enter') {
                            handleTopicEdit(topic?.id, e?.target?.value);
                          } else if (e?.key === 'Escape') {
                            setEditingTopic(null);
                          }
                        }}
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingTopic(null)}
                        iconName="X"
                      />
                    </div>
                  ) : (
                    <div 
                      className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors duration-200"
                      onClick={() => setEditingTopic(topic?.id)}
                    >
                      {topic?.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Topic Actions */}
              <div className="flex items-center space-x-1">
                {/* Level Selector */}
                <select
                  value={topic?.level}
                  onChange={(e) => handleLevelChange(topic?.id, parseInt(e?.target?.value))}
                  className="text-xs border border-border rounded px-2 py-1 bg-background"
                >
                  <option value={1}>Module</option>
                  <option value={2}>Chapter</option>
                  <option value={3}>Section</option>
                </select>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingTopic(topic?.id)}
                  iconName="Edit2"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTopicDelete(topic?.id)}
                  iconName="Trash2"
                  className="text-error hover:text-error"
                />
              </div>
            </div>

            {/* Subtopics */}
            {topic?.subtopics && topic?.subtopics?.length > 0 && (
              <div className="ml-8 space-y-2">
                {topic?.subtopics?.map((subtopic, subtopicIndex) => (
                  <div key={subtopicIndex} className="flex items-center space-x-2 text-sm">
                    <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                    <span 
                      className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors duration-200"
                      onClick={() => {
                        const newName = prompt('Edit subtopic:', subtopic);
                        if (newName && newName?.trim()) {
                          handleSubtopicEdit(topic?.id, subtopicIndex, newName?.trim());
                        }
                      }}
                    >
                      {subtopic}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Add New Topic */}
      <div className="border-t pt-4">
        {showAddTopic ? (
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter new topic name..."
              value={newTopicName}
              onChange={(e) => setNewTopicName(e?.target?.value)}
              onKeyDown={(e) => {
                if (e?.key === 'Enter') {
                  handleAddTopic();
                } else if (e?.key === 'Escape') {
                  setShowAddTopic(false);
                  setNewTopicName('');
                }
              }}
              className="flex-1"
              autoFocus
            />
            <Button
              variant="default"
              size="sm"
              onClick={handleAddTopic}
              disabled={!newTopicName?.trim()}
              iconName="Plus"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowAddTopic(false);
                setNewTopicName('');
              }}
              iconName="X"
            />
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowAddTopic(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Custom Topic
          </Button>
        )}
      </div>
      {/* Generate Button */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t pt-4">
        <Button
          variant="default"
          onClick={() => onGenerateRoadmap(topics)}
          disabled={topics?.length === 0 || isGenerating}
          loading={isGenerating}
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
          className="h-12"
        >
          {isGenerating ? 'Generating Roadmap...' : 'Generate Interactive Roadmap'}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center mt-2">
          This will create your personalized learning roadmap with curated resources
        </p>
      </div>
    </div>
  );
};

export default TopicPreview;