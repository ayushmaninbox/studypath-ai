import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationWrapper';
import AppHeader from '../../components/ui/AppHeader';
import CreationWizard from './components/CreationWizard';
import UploadSection from './components/UploadSection';
import ProcessingStatus from './components/ProcessingStatus';
import TopicPreview from './components/TopicPreview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RoadmapCreation = () => {
  const navigate = useNavigate();
  const { user, login, register, logout } = useAuth();
  
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadMode, setUploadMode] = useState('pdf');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('parsing');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingError, setProcessingError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedTopics, setExtractedTopics] = useState([]);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

  // Mock extracted topics for demonstration
  const mockExtractedTopics = [
    {
      id: '1',
      name: 'Introduction to Machine Learning',
      level: 1,
      subtopics: [
        'What is Machine Learning?',
        'Types of Machine Learning',
        'Applications and Use Cases',
        'ML Workflow Overview'
      ]
    },
    {
      id: '2',
      name: 'Mathematical Foundations',
      level: 1,
      subtopics: [
        'Linear Algebra Basics',
        'Statistics and Probability',
        'Calculus for ML',
        'Optimization Techniques'
      ]
    },
    {
      id: '3',
      name: 'Python Programming for ML',
      level: 1,
      subtopics: [
        'Python Basics Review',
        'NumPy and Pandas',
        'Matplotlib and Seaborn',
        'Scikit-learn Introduction'
      ]
    },
    {
      id: '4',
      name: 'Supervised Learning',
      level: 1,
      subtopics: [
        'Linear Regression',
        'Logistic Regression',
        'Decision Trees',
        'Random Forest',
        'Support Vector Machines'
      ]
    },
    {
      id: '5',
      name: 'Model Evaluation',
      level: 2,
      subtopics: [
        'Cross-validation',
        'Performance Metrics',
        'Overfitting and Underfitting',
        'Hyperparameter Tuning'
      ]
    },
    {
      id: '6',
      name: 'Unsupervised Learning',
      level: 1,
      subtopics: [
        'K-Means Clustering',
        'Hierarchical Clustering',
        'Principal Component Analysis',
        'Association Rules'
      ]
    }
  ];

  // Handle authentication actions
  const handleAuthAction = async (action) => {
    if (action === 'login') {
      navigate('/authentication-screen');
    } else if (action === 'register') {
      navigate('/authentication-screen');
    } else if (action === 'logout') {
      logout();
    }
  };

  // Simulate file processing
  const simulateProcessing = async (file) => {
    const stages = ['parsing', 'analyzing', 'structuring', 'finalizing'];
    
    for (let i = 0; i < stages?.length; i++) {
      setProcessingStage(stages?.[i]);
      
      // Simulate processing time for each stage
      for (let progress = 0; progress <= 100; progress += 10) {
        setProcessingProgress((i * 100 + progress) / stages?.length);
        await new Promise(resolve => setTimeout(resolve, 150));
      }
    }
    
    // Simulate successful extraction
    setExtractedTopics(mockExtractedTopics);
    setCurrentStep(2);
    setIsProcessing(false);
  };

  // Handle file upload
  const handleFileUpload = async (file) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setProcessingError(null);
    setProcessingProgress(0);
    
    try {
      await simulateProcessing(file);
    } catch (error) {
      setProcessingError('Failed to process the uploaded file. Please try again.');
      setIsProcessing(false);
    }
  };

  // Handle text input
  const handleTextInput = async (textContent) => {
    setIsProcessing(true);
    setProcessingError(null);
    setProcessingProgress(0);
    
    try {
      // Simulate text processing
      await simulateProcessing({ name: 'Text Input', type: 'text' });
    } catch (error) {
      setProcessingError('Failed to process the text content. Please try again.');
      setIsProcessing(false);
    }
  };

  // Handle topics update
  const handleTopicsUpdate = (updatedTopics) => {
    setExtractedTopics(updatedTopics);
  };

  // Handle roadmap generation
  const handleGenerateRoadmap = async (topics) => {
    setIsGeneratingRoadmap(true);
    
    try {
      // Simulate roadmap generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save roadmap data to localStorage for anonymous users
      const roadmapData = {
        id: Date.now()?.toString(),
        title: 'My Learning Roadmap',
        topics: topics,
        createdAt: new Date()?.toISOString(),
        progress: {
          totalTopics: topics?.reduce((acc, topic) => acc + 1 + (topic?.subtopics?.length || 0), 0),
          completedTopics: 0
        }
      };
      
      if (user) {
        // For authenticated users, this would save to backend
        console.log('Saving roadmap for authenticated user:', roadmapData);
      } else {
        // For anonymous users, save to localStorage
        const existingRoadmaps = JSON.parse(localStorage.getItem('anonymous_roadmaps') || '[]');
        existingRoadmaps?.push(roadmapData);
        localStorage.setItem('anonymous_roadmaps', JSON.stringify(existingRoadmaps));
      }
      
      // Navigate to interactive roadmap view
      navigate('/interactive-roadmap-view', { 
        state: { roadmapData } 
      });
      
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
      alert('Failed to generate roadmap. Please try again.');
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  // Reset to step 1
  const handleReset = () => {
    setCurrentStep(1);
    setUploadMode('pdf');
    setIsProcessing(false);
    setProcessingStage('parsing');
    setProcessingProgress(0);
    setProcessingError(null);
    setUploadedFile(null);
    setExtractedTopics([]);
    setIsGeneratingRoadmap(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <AppHeader 
        user={user} 
        onAuthAction={handleAuthAction}
      />
      
      <main className="content-max-width content-spacing py-12">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gradient mb-6">
            Create Your Learning Roadmap
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your syllabus into an interactive, structured learning path with AI-powered topic extraction and curated resources.
          </p>
        </div>

        {/* Creation Wizard */}
        <div className="animate-slide-up">
          <CreationWizard currentStep={currentStep} totalSteps={3} />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          {currentStep === 1 && !isProcessing && (
            <div className="space-y-6">
              <UploadSection
                onFileUpload={handleFileUpload}
                onTextInput={handleTextInput}
                uploadMode={uploadMode}
                setUploadMode={setUploadMode}
                isProcessing={isProcessing}
              />
              
              {/* Anonymous User Notice */}
              {!user && (
                <div className="card-glass bg-accent/5 border border-accent/20 rounded-xl p-6 animate-slide-up">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={24} className="text-accent mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Creating as Guest
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        Your roadmap will be saved locally. Sign up to sync across devices and access advanced features.
                      </p>
                      <Button
                        variant="gradient"
                        size="sm"
                        onClick={() => navigate('/authentication-screen')}
                        iconName="UserPlus"
                        iconPosition="left"
                        className="shadow-md hover:shadow-lg"
                      >
                        Create Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {isProcessing && (
            <ProcessingStatus
              stage={processingStage}
              progress={processingProgress}
              fileName={uploadedFile?.name}
              error={processingError}
            />
          )}

          {currentStep === 2 && !isProcessing && (
            <div className="space-y-6">
              <TopicPreview
                extractedTopics={extractedTopics}
                onTopicsUpdate={handleTopicsUpdate}
                onGenerateRoadmap={handleGenerateRoadmap}
                isGenerating={isGeneratingRoadmap}
              />
              
              {/* Back Button */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="max-w-4xl mx-auto mt-16 card-glass rounded-xl p-8 animate-fade-in">
          <h3 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center">
            <Icon name="HelpCircle" size={24} className="mr-3 text-primary" />
            Need Help?
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Best Practices</h4>
              <ul className="text-muted-foreground space-y-2 leading-relaxed">
                <li>• Upload clear, text-based PDF files</li>
                <li>• Include course objectives and learning outcomes</li>
                <li>• Use structured content with clear headings</li>
                <li>• Remove unnecessary pages before upload</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Supported Formats</h4>
              <ul className="text-muted-foreground space-y-2 leading-relaxed">
                <li>• PDF files (up to 10MB)</li>
                <li>• Plain text input</li>
                <li>• Course syllabi and curricula</li>
                <li>• Learning objectives and modules</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoadmapCreation;