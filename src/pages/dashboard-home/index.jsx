import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationWrapper';
import AppHeader from '../../components/ui/AppHeader';
import WelcomeSection from './components/WelcomeSection';
import ProgressSummaryCards from './components/ProgressSummaryCards';
import FilterChips from './components/FilterChips';
import RoadmapGrid from './components/RoadmapGrid';
import RecentActivityFeed from './components/RecentActivityFeed';
import StudyCalendar from './components/StudyCalendar';
import QuickStatsWidget from './components/QuickStatsWidget';
import CreateRoadmapFAB from './components/CreateRoadmapFAB';

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    subject: null
  });

  // Mock data
  const [dashboardStats] = useState({
    totalRoadmaps: 8,
    avgCompletion: 67,
    studyStreak: 12,
    weeklyTime: 18
  });

  const [roadmaps, setRoadmaps] = useState([
    {
      id: '1',
      title: 'Complete JavaScript Fundamentals',
      subject: 'programming',
      status: 'in-progress',
      progress: 75,
      totalTopics: 24,
      completedTopics: 18,
      lastUpdated: '2 hours ago',
      estimatedTime: '40h',
      createdAt: '2025-07-15'
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms',
      subject: 'programming',
      status: 'in-progress',
      progress: 45,
      totalTopics: 32,
      completedTopics: 14,
      lastUpdated: '1 day ago',
      estimatedTime: '60h',
      createdAt: '2025-07-10'
    },
    {
      id: '3',
      title: 'Linear Algebra Mastery',
      subject: 'mathematics',
      status: 'completed',
      progress: 100,
      totalTopics: 18,
      completedTopics: 18,
      lastUpdated: '3 days ago',
      estimatedTime: '35h',
      createdAt: '2025-06-20'
    },
    {
      id: '4',
      title: 'React Advanced Patterns',
      subject: 'programming',
      status: 'not-started',
      progress: 0,
      totalTopics: 16,
      completedTopics: 0,
      lastUpdated: '1 week ago',
      estimatedTime: '25h',
      createdAt: '2025-07-25'
    },
    {
      id: '5',
      title: 'Organic Chemistry Basics',
      subject: 'science',
      status: 'in-progress',
      progress: 30,
      totalTopics: 28,
      completedTopics: 8,
      lastUpdated: '4 hours ago',
      estimatedTime: '50h',
      createdAt: '2025-07-01'
    },
    {
      id: '6',
      title: 'Business Strategy Fundamentals',
      subject: 'business',
      status: 'in-progress',
      progress: 60,
      totalTopics: 20,
      completedTopics: 12,
      lastUpdated: '6 hours ago',
      estimatedTime: '30h',
      createdAt: '2025-07-08'
    }
  ]);

  const [recentActivities] = useState([
    {
      id: '1',
      type: 'topic_completed',
      description: 'Completed "Arrow Functions & Scope" topic',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      roadmapTitle: 'Complete JavaScript Fundamentals'
    },
    {
      id: '2',
      type: 'milestone_achieved',
      description: 'Reached 75% completion milestone',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      roadmapTitle: 'Complete JavaScript Fundamentals'
    },
    {
      id: '3',
      type: 'streak_milestone',
      description: 'Achieved 12-day study streak! 🔥',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      roadmapTitle: null
    },
    {
      id: '4',
      type: 'topic_completed',
      description: 'Completed "Market Analysis Methods" topic',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      roadmapTitle: 'Business Strategy Fundamentals'
    },
    {
      id: '5',
      type: 'resource_bookmarked',
      description: 'Bookmarked "Advanced React Patterns" video',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      roadmapTitle: 'React Advanced Patterns'
    }
  ]);

  const [studySchedule] = useState([
    {
      id: '1',
      date: '2025-08-02',
      topic: 'JavaScript Closures',
      roadmapId: '1'
    },
    {
      id: '2',
      date: '2025-08-03',
      topic: 'Binary Search Trees',
      roadmapId: '2'
    },
    {
      id: '3',
      date: '2025-08-04',
      topic: 'Molecular Bonding',
      roadmapId: '5'
    },
    {
      id: '4',
      date: '2025-08-05',
      topic: 'Competitive Analysis',
      roadmapId: '6'
    }
  ]);

  const [weeklyStats] = useState({
    studyTime: 18,
    weeklyGoal: 25,
    topicsCompleted: 12,
    sessions: 8
  });

  const [upcomingReminders] = useState([
    {
      id: '1',
      title: 'Review JavaScript Closures',
      time: 'Today, 3:00 PM',
      roadmapTitle: 'Complete JavaScript Fundamentals'
    },
    {
      id: '2',
      title: 'Practice Binary Search Problems',
      time: 'Tomorrow, 10:00 AM',
      roadmapTitle: 'Data Structures & Algorithms'
    }
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev?.[filterType] === value ? null : value
    }));
  };

  const getFilteredRoadmaps = () => {
    let filtered = [...roadmaps];

    // Filter by status
    if (activeFilters?.status && activeFilters?.status !== 'all') {
      if (activeFilters?.status === 'recent') {
        // Sort by last updated and take recent ones
        filtered = filtered?.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      } else {
        filtered = filtered?.filter(roadmap => roadmap?.status === activeFilters?.status);
      }
    }

    // Filter by subject
    if (activeFilters?.subject) {
      filtered = filtered?.filter(roadmap => roadmap?.subject === activeFilters?.subject);
    }

    return filtered;
  };

  const handleAuthAction = (action) => {
    if (action === 'logout') {
      logout();
    } else if (action === 'login' || action === 'register') {
      navigate('/authentication-screen');
    }
  };

  const handleEditRoadmap = (roadmapId) => {
    navigate('/roadmap-creation', { state: { editMode: true, roadmapId } });
  };

  const handleShareRoadmap = (roadmapId) => {
    // Mock share functionality
    const roadmap = roadmaps?.find(r => r?.id === roadmapId);
    if (roadmap) {
      navigator.clipboard?.writeText(`Check out my "${roadmap?.title}" learning roadmap on StudyPath AI!`);
      // In a real app, you'd show a toast notification here
      console.log('Roadmap shared!');
    }
  };

  const handleDeleteRoadmap = (roadmapId) => {
    setRoadmaps(prev => prev?.filter(r => r?.id !== roadmapId));
  };

  const filteredRoadmaps = getFilteredRoadmaps();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <AppHeader user={user} onAuthAction={handleAuthAction} />
      
      <main className="content-max-width content-spacing py-8">
        {/* Welcome Section */}
        <WelcomeSection user={user} currentTime={currentTime} />

        {/* Progress Summary Cards */}
        <ProgressSummaryCards stats={dashboardStats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Chips */}
            <FilterChips 
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />

            {/* Roadmap Grid */}
            <RoadmapGrid
              roadmaps={filteredRoadmaps}
              isLoading={isLoading}
              onEdit={handleEditRoadmap}
              onShare={handleShareRoadmap}
              onDelete={handleDeleteRoadmap}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Activity Feed */}
            <RecentActivityFeed activities={recentActivities} />

            {/* Study Calendar - Desktop Only */}
            <div className="hidden lg:block">
              <StudyCalendar studySchedule={studySchedule} />
            </div>

            {/* Quick Stats Widget */}
            <QuickStatsWidget 
              weeklyStats={weeklyStats}
              upcomingReminders={upcomingReminders}
            />
          </div>
        </div>

        {/* Mobile Study Calendar */}
        <div className="lg:hidden mt-6">
          <StudyCalendar studySchedule={studySchedule} />
        </div>
      </main>

      {/* Create Roadmap FAB */}
      <CreateRoadmapFAB />
    </div>
  );
};

export default DashboardHome;