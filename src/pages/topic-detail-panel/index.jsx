import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TopicHeader from './components/TopicHeader';
import TopicDescription from './components/TopicDescription';
import ResourceSection from './components/ResourceSection';
import NotesSection from './components/NotesSection';
import ProgressTracker from './components/ProgressTracker';
import TopicNavigation from './components/TopicNavigation';

const TopicDetailPanel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentTopic, setCurrentTopic] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock topic data - in real app, this would come from API/props
  const mockTopic = {
    id: searchParams?.get('id') || '1',
    name: searchParams?.get('name') || 'React Hooks Fundamentals',
    description: `React Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 as a way to write components without classes.\n\nHooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. They also offer a new powerful way to combine them.\n\nUnderstanding hooks is essential for modern React development as they simplify component logic and make it more reusable.`,
    category: 'React Development',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    prerequisites: ['JavaScript ES6', 'React Components', 'JSX Syntax'],
    objectives: [
      'Understand what React Hooks are and why they were introduced',
      'Learn to use useState for managing component state',
      'Master useEffect for handling side effects and lifecycle events',
      'Explore custom hooks for reusable stateful logic',
      'Apply hooks in real-world scenarios and best practices'
    ],
    resourceCount: 12,
    studyTime: '2-3h',
    order: 5,
    totalTopics: 15,
    isCompleted: false
  };

  const relatedTopics = [
    {
      id: '2',
      name: 'useState Hook',
      category: 'React Hooks',
      isCompleted: true
    },
    {
      id: '3',
      name: 'useEffect Hook',
      category: 'React Hooks',
      isCompleted: false
    },
    {
      id: '4',
      name: 'Custom Hooks',
      category: 'React Hooks',
      isCompleted: false
    },
    {
      id: '5',
      name: 'useContext Hook',
      category: 'React Hooks',
      isCompleted: false
    }
  ];

  const previousTopic = {
    id: '4',
    name: 'React Component Lifecycle'
  };

  const nextTopic = {
    id: '6',
    name: 'Advanced Hook Patterns'
  };

  useEffect(() => {
    // Simulate loading topic data
    const loadTopic = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCurrentTopic(mockTopic);
      
      // Load saved states from localStorage
      const completedState = localStorage.getItem(`completed_${mockTopic?.id}`);
      const bookmarkedState = localStorage.getItem(`bookmarked_${mockTopic?.id}`);
      
      setIsCompleted(completedState === 'true');
      setIsBookmarked(bookmarkedState === 'true');
      setIsLoading(false);
    };

    loadTopic();
  }, [searchParams]);

  const handleToggleComplete = () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);
    localStorage.setItem(`completed_${currentTopic?.id}`, newCompletedState?.toString());
  };

  const handleBookmark = () => {
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    localStorage.setItem(`bookmarked_${currentTopic?.id}`, newBookmarkedState?.toString());
  };

  const handleClose = () => {
    setIsPanelOpen(false);
    // Navigate back to roadmap view or dashboard
    navigate('/interactive-roadmap-view');
  };

  const handleNavigateToTopic = (topic) => {
    navigate(`/topic-detail-panel?id=${topic?.id}&name=${encodeURIComponent(topic?.name)}`);
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'BookOpen' },
    { id: 'resources', label: 'Resources', icon: 'Library' },
    { id: 'notes', label: 'Notes', icon: 'StickyNote' },
    { id: 'progress', label: 'Progress', icon: 'BarChart3' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading topic details...</p>
        </div>
      </div>
    );
  }

  if (!currentTopic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
            Topic Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The requested topic could not be loaded.
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/dashboard-home')}
            iconName="ArrowLeft"
            iconSize={16}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentTopic?.name} - StudyPath AI</title>
        <meta name="description" content={`Learn ${currentTopic?.name} with curated resources, progress tracking, and personal notes.`} />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Mobile Panel */}
        <div className="lg:hidden">
          {isPanelOpen && (
            <div className="fixed inset-0 z-50 bg-background">
              <div className="h-full overflow-y-auto">
                <TopicHeader
                  topic={currentTopic}
                  isCompleted={isCompleted}
                  onToggleComplete={handleToggleComplete}
                  onClose={handleClose}
                  onBookmark={handleBookmark}
                  isBookmarked={isBookmarked}
                />

                {/* Mobile Section Navigation */}
                <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10">
                  <div className="flex overflow-x-auto px-4 py-2 space-x-1">
                    {sections?.map((section) => (
                      <button
                        key={section?.id}
                        onClick={() => setActiveSection(section?.id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                          activeSection === section?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={section?.icon} size={16} />
                        <span>{section?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="pb-20">
                  {activeSection === 'overview' && (
                    <TopicDescription topic={currentTopic} />
                  )}
                  {activeSection === 'resources' && (
                    <ResourceSection topic={currentTopic} />
                  )}
                  {activeSection === 'notes' && (
                    <NotesSection topic={currentTopic} />
                  )}
                  {activeSection === 'progress' && (
                    <ProgressTracker 
                      topic={currentTopic} 
                      isCompleted={isCompleted} 
                    />
                  )}
                </div>

                {/* Mobile Navigation Footer */}
                <TopicNavigation
                  currentTopic={currentTopic}
                  previousTopic={previousTopic}
                  nextTopic={nextTopic}
                  onNavigate={handleNavigateToTopic}
                  relatedTopics={relatedTopics}
                  className="fixed bottom-0 left-0 right-0 bg-background border-t"
                />
              </div>
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex h-screen">
          {/* Main Content Area (Roadmap Background) */}
          <div className="flex-1 bg-muted/20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Icon name="GitBranch" size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Interactive Roadmap View</p>
                <p className="text-sm">
                  The roadmap visualization would appear here with the selected topic highlighted
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Side Panel */}
          {isPanelOpen && (
            <div className="w-96 xl:w-[28rem] bg-card border-l shadow-lg flex flex-col h-full">
              <TopicHeader
                topic={currentTopic}
                isCompleted={isCompleted}
                onToggleComplete={handleToggleComplete}
                onClose={handleClose}
                onBookmark={handleBookmark}
                isBookmarked={isBookmarked}
              />

              {/* Desktop Section Tabs */}
              <div className="border-b bg-card">
                <div className="flex">
                  {sections?.map((section) => (
                    <button
                      key={section?.id}
                      onClick={() => setActiveSection(section?.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                        activeSection === section?.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={section?.icon} size={16} />
                      <span className="hidden xl:inline">{section?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Content */}
              <div className="flex-1 overflow-y-auto">
                {activeSection === 'overview' && (
                  <TopicDescription topic={currentTopic} />
                )}
                {activeSection === 'resources' && (
                  <ResourceSection topic={currentTopic} />
                )}
                {activeSection === 'notes' && (
                  <NotesSection topic={currentTopic} />
                )}
                {activeSection === 'progress' && (
                  <ProgressTracker 
                    topic={currentTopic} 
                    isCompleted={isCompleted} 
                  />
                )}
              </div>

              {/* Desktop Navigation Footer */}
              <TopicNavigation
                currentTopic={currentTopic}
                previousTopic={previousTopic}
                nextTopic={nextTopic}
                onNavigate={handleNavigateToTopic}
                relatedTopics={relatedTopics}
              />
            </div>
          )}
        </div>

        {/* Floating Action Button (when panel is closed on desktop) */}
        {!isPanelOpen && (
          <div className="hidden lg:block fixed bottom-6 right-6 z-40">
            <Button
              variant="default"
              size="lg"
              onClick={() => setIsPanelOpen(true)}
              iconName="PanelRightOpen"
              iconSize={20}
              className="shadow-floating hover:shadow-xl transition-all duration-200"
            >
              Open Topic Details
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default TopicDetailPanel;