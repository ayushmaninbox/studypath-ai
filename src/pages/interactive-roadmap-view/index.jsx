import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import AppHeader from '../../components/ui/AppHeader';
import RoadmapNavigationOverlay from '../../components/ui/RoadmapNavigationOverlay';
import { useAuth } from '../../components/ui/AuthenticationWrapper';

import RoadmapNode from './components/RoadmapNode';
import RoadmapControls from './components/RoadmapControls';
import TopicDetailPanel from './components/TopicDetailPanel';
import RoadmapSearch from './components/RoadmapSearch';
import ProgressBar from './components/ProgressBar';
import RoadmapSettings from './components/RoadmapSettings';

const nodeTypes = {
  roadmapNode: RoadmapNode,
};

const InteractiveRoadmapView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // State management
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentLayout, setCurrentLayout] = useState('tree');
  const [roadmapData, setRoadmapData] = useState(null);
  const [settings, setSettings] = useState({
    showCompleted: true,
    showDescriptions: true,
    showResourceCounts: true,
    nodeSize: 'medium',
    animationSpeed: 'normal',
    autoFocus: true,
    showMinimap: false
  });

  // Mock roadmap data
  const mockRoadmapData = useMemo(() => ({
    id: 'react-fundamentals',
    title: 'React Fundamentals Mastery',
    description: 'Complete guide to mastering React from basics to advanced concepts',
    totalTopics: 12,
    completedTopics: 4,
    topics: [
      {
        id: '1',
        label: 'Introduction to React',
        description: `React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and is now maintained by Facebook and the community.\n\nReact allows developers to create reusable UI components and manage the state of their applications efficiently.`,
        isCompleted: true,
        isCurrent: false,
        difficulty: 'easy',
        resourceCount: 5,
        position: { x: 250, y: 50 },
        prerequisites: [],
        resources: [
          {
            type: 'video',
            title: 'React in 100 Seconds',
            url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
            source: 'Fireship',
            duration: '2:30',
            description: 'Quick overview of React fundamentals'
          },
          {
            type: 'article',
            title: 'Getting Started with React',
            url: 'https://reactjs.org/docs/getting-started.html',
            source: 'React Docs',
            duration: '10 min read',
            description: 'Official React documentation for beginners'
          },
          {
            type: 'video',
            title: 'React Tutorial for Beginners',
            url: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
            source: 'Programming with Mosh',
            duration: '1:48:00',
            description: 'Comprehensive React tutorial covering all basics'
          }
        ]
      },
      {
        id: '2',
        label: 'JSX Syntax',
        description: `JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.\n\nIt makes React components more readable and allows you to use the full power of JavaScript within your markup.`,
        isCompleted: true,
        isCurrent: false,
        difficulty: 'easy',
        resourceCount: 4,
        position: { x: 250, y: 180 },
        prerequisites: ['Introduction to React'],
        resources: [
          {
            type: 'article',
            title: 'Introducing JSX',
            url: 'https://reactjs.org/docs/introducing-jsx.html',
            source: 'React Docs',
            duration: '8 min read'
          },
          {
            type: 'video',
            title: 'JSX Crash Course',
            url: 'https://www.youtube.com/watch?v=7fPXI_MnBOY',
            source: 'Dev Ed',
            duration: '15:30'
          }
        ]
      },
      {
        id: '3',
        label: 'Components & Props',
        description: `Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.\n\nProps are how you pass data from parent components to child components, making your components flexible and reusable.`,
        isCompleted: true,
        isCurrent: false,
        difficulty: 'medium',
        resourceCount: 6,
        position: { x: 250, y: 310 },
        prerequisites: ['JSX Syntax'],
        resources: [
          {
            type: 'video',
            title: 'React Components and Props',
            url: 'https://www.youtube.com/watch?v=9D1x7-2FmTA',
            source: 'Codevolution',
            duration: '12:45'
          },
          {
            type: 'article',
            title: 'Components and Props',
            url: 'https://reactjs.org/docs/components-and-props.html',
            source: 'React Docs',
            duration: '12 min read'
          }
        ]
      },
      {
        id: '4',
        label: 'State Management',
        description: `State allows React components to create and manage their own data. When state changes, the component re-renders to reflect the new data.\n\nUnderstanding state is crucial for building interactive React applications.`,
        isCompleted: true,
        isCurrent: false,
        difficulty: 'medium',
        resourceCount: 7,
        position: { x: 250, y: 440 },
        prerequisites: ['Components & Props'],
        resources: [
          {
            type: 'video',
            title: 'React State Tutorial',
            url: 'https://www.youtube.com/watch?v=4pO-HcG2igk',
            source: 'The Net Ninja',
            duration: '18:20'
          },
          {
            type: 'article',
            title: 'State and Lifecycle',
            url: 'https://reactjs.org/docs/state-and-lifecycle.html',
            source: 'React Docs',
            duration: '15 min read'
          }
        ]
      },
      {
        id: '5',
        label: 'Event Handling',
        description: `React events are SyntheticEvents that wrap native events to provide consistent behavior across browsers.\n\nLearn how to handle user interactions like clicks, form submissions, and keyboard events in React applications.`,
        isCompleted: false,
        isCurrent: true,
        difficulty: 'medium',
        resourceCount: 5,
        position: { x: 250, y: 570 },
        prerequisites: ['State Management'],
        resources: [
          {
            type: 'video',
            title: 'React Event Handling',
            url: 'https://www.youtube.com/watch?v=Znqv84xi8Vs',
            source: 'Academind',
            duration: '14:30'
          },
          {
            type: 'article',
            title: 'Handling Events',
            url: 'https://reactjs.org/docs/handling-events.html',
            source: 'React Docs',
            duration: '10 min read'
          }
        ]
      },
      {
        id: '6',
        label: 'Conditional Rendering',
        description: `Learn how to conditionally render components and elements based on application state or props.\n\nMaster techniques like ternary operators, logical AND, and if-else statements in JSX.`,
        isCompleted: false,
        isCurrent: false,
        difficulty: 'easy',
        resourceCount: 4,
        position: { x: 450, y: 570 },
        prerequisites: ['Event Handling'],
        resources: [
          {
            type: 'video',
            title: 'Conditional Rendering in React',
            url: 'https://www.youtube.com/watch?v=7o5FPaVA9m0',
            source: 'Codevolution',
            duration: '11:15'
          }
        ]
      },
      {
        id: '7',
        label: 'Lists & Keys',
        description: `Learn how to render lists of data in React and understand the importance of keys for efficient updates.\n\nMaster the map() function and key prop for dynamic list rendering.`,
        isCompleted: false,
        isCurrent: false,
        difficulty: 'medium',
        resourceCount: 4,
        position: { x: 50, y: 570 },
        prerequisites: ['Event Handling'],
        resources: [
          {
            type: 'video',
            title: 'Lists and Keys in React',
            url: 'https://www.youtube.com/watch?v=0sasRxl35_8',
            source: 'Codevolution',
            duration: '13:45'
          }
        ]
      },
      {
        id: '8',
        label: 'Forms & Controlled Components',
        description: `Master form handling in React using controlled components where form data is handled by React state.\n\nLearn validation, submission handling, and form best practices.`,
        isCompleted: false,
        isCurrent: false,
        difficulty: 'medium',
        resourceCount: 6,
        position: { x: 250, y: 700 },
        prerequisites: ['Conditional Rendering', 'Lists & Keys'],
        resources: [
          {
            type: 'video',
            title: 'React Forms Tutorial',
            url: 'https://www.youtube.com/watch?v=7Vo_VCcWupQ',
            source: 'The Net Ninja',
            duration: '20:30'
          }
        ]
      },
      {
        id: '9',
        label: 'useEffect Hook',
        description: `The useEffect hook lets you perform side effects in functional components like data fetching, subscriptions, or DOM manipulation.\n\nUnderstand dependency arrays, cleanup functions, and common patterns.`,
        isCompleted: false,
        isCurrent: false,
        difficulty: 'hard',
        resourceCount: 8,
        position: { x: 250, y: 830 },
        prerequisites: ['Forms & Controlled Components'],
        resources: [
          {
            type: 'video',
            title: 'useEffect Hook Explained',
            url: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U',
            source: 'Web Dev Simplified',
            duration: '25:15'
          }
        ]
      },
      {
        id: '10',
        label: 'Custom Hooks',
        description: `Learn to create custom hooks to extract component logic into reusable functions.\n\nCustom hooks allow you to share stateful logic between components without changing their hierarchy.`,
        isCompleted: false,
        isCurrent: false,
        difficulty: 'hard',
        resourceCount: 5,
        position: { x: 450, y: 830 },
        prerequisites: ['useEffect Hook'],
        resources: [
          {
            type: 'video',
            title: 'Custom React Hooks',
            url: 'https://www.youtube.com/watch?v=6ThXsUwLWvc',
            source: 'Fireship',
            duration: '8:45'
          }
        ]
      },
      {
        id: '11',
        label: 'Context API',
        description: `The Context API provides a way to pass data through the component tree without having to pass props down manually at every level.\n\nLearn when and how to use Context for global state management.`,
        isCompleted: false,
        isCurrent: false,
        difficulty: 'hard',
        resourceCount: 6,
        position: { x: 50, y: 830 },
        prerequisites: ['useEffect Hook'],
        resources: [
          {
            type: 'video',
            title: 'React Context API Tutorial',
            url: 'https://www.youtube.com/watch?v=35lXWvCuM8o',
            source: 'The Net Ninja',
            duration: '22:10'
          }
        ]
      },
      {
        id: '12',
        label: 'Performance Optimization',
        description: `Learn advanced techniques to optimize React application performance including React.memo, useMemo, useCallback, and code splitting.\n\nUnderstand when and how to apply these optimizations effectively.`,
        isCompleted: false,
        isCurrent: false,
        difficulty: 'hard',
        resourceCount: 7,
        position: { x: 250, y: 960 },
        prerequisites: ['Custom Hooks', 'Context API'],
        resources: [
          {
            type: 'video',
            title: 'React Performance Optimization',
            url: 'https://www.youtube.com/watch?v=uojLJFt9SzY',
            source: 'Academind',
            duration: '35:20'
          }
        ]
      }
    ]
  }), []);

  // Initialize roadmap data
  useEffect(() => {
    // In a real app, this would fetch from API or get from location state
    const roadmapFromState = location.state?.roadmap;
    const roadmapFromStorage = localStorage.getItem('current_roadmap');
    
    let currentRoadmap = mockRoadmapData;
    
    if (roadmapFromState) {
      currentRoadmap = roadmapFromState;
    } else if (roadmapFromStorage) {
      try {
        currentRoadmap = JSON.parse(roadmapFromStorage);
      } catch (error) {
        console.error('Failed to parse roadmap from storage:', error);
      }
    }
    
    setRoadmapData(currentRoadmap);
  }, [location.state, mockRoadmapData]);

  // Convert roadmap data to React Flow nodes and edges
  useEffect(() => {
    if (!roadmapData) return;

    const flowNodes = roadmapData?.topics?.map((topic) => ({
      id: topic?.id,
      type: 'roadmapNode',
      position: topic?.position,
      data: {
        ...topic,
        onNodeClick: handleNodeClick
      }
    }));

    const flowEdges = [];
    roadmapData?.topics?.forEach((topic) => {
      if (topic?.prerequisites && topic?.prerequisites?.length > 0) {
        topic?.prerequisites?.forEach((prereq) => {
          const prereqTopic = roadmapData?.topics?.find(t => t?.label === prereq);
          if (prereqTopic) {
            flowEdges?.push({
              id: `${prereqTopic?.id}-${topic?.id}`,
              source: prereqTopic?.id,
              target: topic?.id,
              type: 'smoothstep',
              style: { 
                stroke: topic?.isCompleted ? '#059669' : '#6B7280',
                strokeWidth: 2
              },
              animated: !topic?.isCompleted
            });
          }
        });
      }
    });

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [roadmapData, setNodes, setEdges]);

  // Event handlers
  const handleNodeClick = useCallback((nodeData) => {
    setSelectedTopic(nodeData);
    setIsDetailPanelOpen(true);
  }, []);

  const handleToggleComplete = useCallback(async (topicId) => {
    if (!roadmapData) return;

    const updatedTopics = roadmapData?.topics?.map(topic => {
      if (topic?.id === topicId) {
        return { ...topic, isCompleted: !topic?.isCompleted };
      }
      return topic;
    });

    const updatedRoadmap = {
      ...roadmapData,
      topics: updatedTopics,
      completedTopics: updatedTopics?.filter(t => t?.isCompleted)?.length
    };

    setRoadmapData(updatedRoadmap);
    
    // Update selected topic if it's the one being toggled
    if (selectedTopic && selectedTopic?.id === topicId) {
      const updatedTopic = updatedTopics?.find(t => t?.id === topicId);
      setSelectedTopic(updatedTopic);
    }

    // Save to localStorage
    localStorage.setItem('current_roadmap', JSON.stringify(updatedRoadmap));
  }, [roadmapData, selectedTopic]);

  const handleSearch = useCallback((query) => {
    if (!roadmapData || !query) {
      setSearchResults([]);
      return;
    }

    const results = roadmapData?.topics?.filter(topic =>
      topic?.label?.toLowerCase()?.includes(query?.toLowerCase()) ||
      topic?.description?.toLowerCase()?.includes(query?.toLowerCase())
    );

    setSearchResults(results);
  }, [roadmapData]);

  const handleSearchResultClick = useCallback((result) => {
    setSelectedTopic(result);
    setIsDetailPanelOpen(true);
  }, []);

  const handleLayoutChange = useCallback((layout) => {
    setCurrentLayout(layout);
    // In a real app, you would implement different layout algorithms here
  }, []);

  const handleAuthAction = useCallback((action) => {
    if (action === 'logout') {
      logout();
    } else {
      navigate('/authentication-screen');
    }
  }, [logout, navigate]);

  const handleSettingsChange = useCallback((newSettings) => {
    setSettings(newSettings);
    // Apply settings to the roadmap view
    localStorage.setItem('roadmap_settings', JSON.stringify(newSettings));
  }, []);

  if (!roadmapData) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader user={user} onAuthAction={handleAuthAction} />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading roadmap...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} onAuthAction={handleAuthAction} />
      <RoadmapNavigationOverlay
        roadmapTitle={roadmapData?.title}
        progress={roadmapData?.completedTopics / roadmapData?.totalTopics}
        totalTopics={roadmapData?.totalTopics}
        completedTopics={roadmapData?.completedTopics}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onProgressClick={() => {
          // Could open a detailed progress modal
        }}
      />
      <ProgressBar
        progress={roadmapData?.completedTopics / roadmapData?.totalTopics}
        totalTopics={roadmapData?.totalTopics}
        completedTopics={roadmapData?.completedTopics}
        roadmapTitle={roadmapData?.title}
        className="fixed top-16 left-0 right-0 z-20"
      />
      <div className="pt-32 h-screen">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.1 }}
            minZoom={0.1}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            className="bg-background"
          >
            <Background 
              color="#E5E7EB" 
              gap={20} 
              size={1}
              variant="dots"
            />
            
            {settings?.showMinimap && (
              <MiniMap
                nodeColor={(node) => {
                  if (node?.data?.isCompleted) return '#059669';
                  if (node?.data?.isCurrent) return '#3B82F6';
                  return '#9CA3AF';
                }}
                nodeStrokeWidth={2}
                pannable
                zoomable
                className="bg-card border border-border rounded-lg"
              />
            )}
            
            <Controls 
              className="bg-card border border-border rounded-lg shadow-default"
              showInteractive={false}
            />
          </ReactFlow>

          <RoadmapControls
            onLayoutChange={handleLayoutChange}
            currentLayout={currentLayout}
            onSearchToggle={() => setIsSearchOpen(!isSearchOpen)}
            isSearchOpen={isSearchOpen}
            onSettingsOpen={() => setIsSettingsOpen(true)}
          />
        </ReactFlowProvider>
      </div>
      <TopicDetailPanel
        topic={selectedTopic}
        isOpen={isDetailPanelOpen}
        onClose={() => setIsDetailPanelOpen(false)}
        onToggleComplete={handleToggleComplete}
      />
      <RoadmapSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        searchResults={searchResults}
        onResultClick={handleSearchResultClick}
      />
      <RoadmapSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
};

export default InteractiveRoadmapView;