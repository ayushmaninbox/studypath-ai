import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onFilterChange }) => {
  const filterOptions = [
    { id: 'all', label: 'All Roadmaps', icon: 'Grid3X3' },
    { id: 'in-progress', label: 'In Progress', icon: 'Play' },
    { id: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { id: 'not-started', label: 'Not Started', icon: 'Circle' },
    { id: 'recent', label: 'Recently Updated', icon: 'Clock' }
  ];

  const subjectFilters = [
    { id: 'programming', label: 'Programming', icon: 'Code' },
    { id: 'mathematics', label: 'Mathematics', icon: 'Calculator' },
    { id: 'science', label: 'Science', icon: 'Atom' },
    { id: 'language', label: 'Languages', icon: 'Languages' },
    { id: 'business', label: 'Business', icon: 'Briefcase' }
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {filterOptions?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => onFilterChange('status', filter?.id)}
            className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilters?.status === filter?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            <Icon name={filter?.icon} size={16} className="mr-2" />
            {filter?.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {subjectFilters?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => onFilterChange('subject', filter?.id)}
            className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilters?.subject === filter?.id
                ? 'bg-secondary text-secondary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            <Icon name={filter?.icon} size={16} className="mr-2" />
            {filter?.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;