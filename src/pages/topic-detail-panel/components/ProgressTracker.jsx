import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = ({ 
  topic,
  isCompleted,
  className = ""
}) => {
  const [studyTime, setStudyTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [sessionStart, setSessionStart] = useState(null);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [studySessions, setStudySessions] = useState([]);

  // Load saved progress data
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${topic?.id}`);
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      setTotalStudyTime(progressData?.totalStudyTime || 0);
      setStudySessions(progressData?.sessions || []);
    }
  }, [topic?.id]);

  // Save progress data
  const saveProgress = (data) => {
    localStorage.setItem(`progress_${topic?.id}`, JSON.stringify(data));
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTracking && sessionStart) {
      interval = setInterval(() => {
        setStudyTime(Math.floor((Date.now() - sessionStart) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, sessionStart]);

  const startTracking = () => {
    setIsTracking(true);
    setSessionStart(Date.now());
    setStudyTime(0);
  };

  const stopTracking = () => {
    if (sessionStart && studyTime > 0) {
      const newSession = {
        id: Date.now(),
        startTime: sessionStart,
        duration: studyTime,
        date: new Date()?.toISOString()?.split('T')?.[0]
      };

      const updatedSessions = [newSession, ...studySessions];
      const updatedTotalTime = totalStudyTime + studyTime;

      setStudySessions(updatedSessions);
      setTotalStudyTime(updatedTotalTime);
      
      saveProgress({
        totalStudyTime: updatedTotalTime,
        sessions: updatedSessions
      });
    }

    setIsTracking(false);
    setSessionStart(null);
    setStudyTime(0);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const getProgressPercentage = () => {
    const estimatedMinutes = parseInt(topic?.estimatedTime) || 120; // Default 2 hours
    const studiedMinutes = totalStudyTime / 60;
    return Math.min(Math.round((studiedMinutes / estimatedMinutes) * 100), 100);
  };

  const getRecentSessions = () => {
    return studySessions?.slice(0, 5);
  };

  return (
    <div className={`bg-card p-4 lg:p-6 ${className}`}>
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Clock" size={20} className="mr-2 text-primary" />
        Study Progress
      </h3>
      {/* Current Session Timer */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Icon 
              name={isTracking ? "Pause" : "Play"} 
              size={20} 
              className={`mr-2 ${isTracking ? 'text-warning' : 'text-success'}`} 
            />
            <span className="font-medium text-foreground">
              {isTracking ? 'Study Session Active' : 'Ready to Study'}
            </span>
          </div>
          
          {isTracking && (
            <div className="flex items-center text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2" />
              <span className="text-sm font-mono">LIVE</span>
            </div>
          )}
        </div>

        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-foreground font-mono">
            {formatTime(studyTime)}
          </div>
          <div className="text-sm text-muted-foreground">
            {isTracking ? 'Current session' : 'Click start to begin'}
          </div>
        </div>

        <div className="flex justify-center">
          {!isTracking ? (
            <Button
              variant="default"
              onClick={startTracking}
              iconName="Play"
              iconSize={18}
              className="px-6"
            >
              Start Studying
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={stopTracking}
              iconName="Square"
              iconSize={18}
              className="px-6"
            >
              Stop Session
            </Button>
          )}
        </div>
      </div>
      {/* Progress Overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm text-primary font-medium">
            {getProgressPercentage()}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary rounded-full h-2 transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-primary">
              {formatDuration(totalStudyTime)}
            </div>
            <div className="text-xs text-muted-foreground">Total Time</div>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-secondary">
              {studySessions?.length}
            </div>
            <div className="text-xs text-muted-foreground">Sessions</div>
          </div>
        </div>
      </div>
      {/* Completion Status */}
      {isCompleted && (
        <div className="mb-6 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center text-success">
            <Icon name="CheckCircle2" size={18} className="mr-2" />
            <div>
              <div className="font-medium text-sm">Topic Completed!</div>
              <div className="text-xs opacity-80">
                Finished on {new Date()?.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Recent Sessions */}
      {studySessions?.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="History" size={16} className="mr-2" />
            Recent Sessions
          </h4>
          
          <div className="space-y-2">
            {getRecentSessions()?.map((session) => (
              <div
                key={session?.id}
                className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm"
              >
                <div className="flex items-center">
                  <Icon name="Clock" size={14} className="mr-2 text-muted-foreground" />
                  <span className="text-foreground">
                    {formatDuration(session?.duration)}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs">
                  {new Date(session.date)?.toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>

          {studySessions?.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3"
              iconName="MoreHorizontal"
              iconSize={16}
            >
              View All Sessions
            </Button>
          )}
        </div>
      )}
      {/* Study Tips */}
      <div className="mt-6 p-3 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start">
          <Icon name="Lightbulb" size={16} className="mr-2 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-accent text-sm mb-1">Study Tip</div>
            <div className="text-xs text-accent/80">
              Take a 5-minute break every 25 minutes to maintain focus and retention.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;