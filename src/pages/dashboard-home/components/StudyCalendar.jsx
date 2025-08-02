import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const StudyCalendar = ({ studySchedule }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(day);
    }
    
    return days;
  };

  const hasStudySession = (day) => {
    if (!day) return false;
    const dateStr = `${currentDate?.getFullYear()}-${String(currentDate?.getMonth() + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    return studySchedule?.some(session => session?.date === dateStr);
  };

  const getStudySession = (day) => {
    if (!day) return null;
    const dateStr = `${currentDate?.getFullYear()}-${String(currentDate?.getMonth() + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    return studySchedule?.find(session => session?.date === dateStr);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(currentDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">Study Calendar</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 hover:bg-muted rounded transition-colors duration-200"
          >
            <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
          </button>
          <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
            {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
          </span>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1 hover:bg-muted rounded transition-colors duration-200"
          >
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames?.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(currentDate)?.map((day, index) => {
          const session = getStudySession(day);
          const isToday = day && 
            day === new Date()?.getDate() && 
            currentDate?.getMonth() === new Date()?.getMonth() && 
            currentDate?.getFullYear() === new Date()?.getFullYear();

          return (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center text-sm relative rounded transition-colors duration-200 ${
                !day 
                  ? '' 
                  : isToday
                    ? 'bg-primary text-primary-foreground font-medium'
                    : hasStudySession(day)
                      ? 'bg-accent/20 text-accent hover:bg-accent/30' :'hover:bg-muted text-foreground'
              }`}
            >
              {day && (
                <>
                  <span>{day}</span>
                  {session && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent rounded-full" />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Upcoming sessions */}
      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-medium text-foreground mb-2">Upcoming Sessions</h4>
        <div className="space-y-2">
          {studySchedule?.slice(0, 3)?.map((session) => (
            <div key={session?.id} className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-muted-foreground">{session?.date}</span>
              <span className="text-foreground">{session?.topic}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyCalendar;