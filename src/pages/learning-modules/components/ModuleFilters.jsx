import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ModuleFilters = ({ onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const disasterTypes = [
    { value: 'all', label: 'All Disasters' },
    { value: 'earthquake', label: 'Earthquake' },
    { value: 'flood', label: 'Flood' },
    { value: 'fire', label: 'Fire Safety' },
    { value: 'cyclone', label: 'Cyclone' },
    { value: 'landslide', label: 'Landslide' },
    { value: 'tsunami', label: 'Tsunami' }
  ];

  const difficultyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const durations = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Under 30 min' },
    { value: 'medium', label: '30-60 min' },
    { value: 'long', label: 'Over 60 min' }
  ];

  const progressOptions = [
    { value: 'all', label: 'All Modules' },
    { value: 'not-started', label: 'Not Started' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onFilterChange({ ...activeFilters, search: value });
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ ...activeFilters, [filterType]: value });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    onFilterChange({
      search: '',
      type: 'all',
      difficulty: 'all',
      duration: 'all',
      progress: 'all'
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters?.search) count++;
    if (activeFilters?.type !== 'all') count++;
    if (activeFilters?.difficulty !== 'all') count++;
    if (activeFilters?.duration !== 'all') count++;
    if (activeFilters?.progress !== 'all') count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search and Toggle */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search modules by title, topic, or keyword..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "Filter"}
          iconPosition="left"
        >
          Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
        </Button>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Disaster Type"
              options={disasterTypes}
              value={activeFilters?.type || 'all'}
              onChange={(value) => handleFilterChange('type', value)}
            />
            
            <Select
              label="Difficulty Level"
              options={difficultyLevels}
              value={activeFilters?.difficulty || 'all'}
              onChange={(value) => handleFilterChange('difficulty', value)}
            />
            
            <Select
              label="Duration"
              options={durations}
              value={activeFilters?.duration || 'all'}
              onChange={(value) => handleFilterChange('duration', value)}
            />
            
            <Select
              label="Progress Status"
              options={progressOptions}
              value={activeFilters?.progress || 'all'}
              onChange={(value) => handleFilterChange('progress', value)}
            />
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Quick filters:</span>
            
            <button
              onClick={() => handleFilterChange('type', 'earthquake')}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs hover:bg-primary/20 transition-colors"
            >
              Earthquake Prep
            </button>
            
            <button
              onClick={() => handleFilterChange('type', 'fire')}
              className="px-3 py-1 bg-error/10 text-error rounded-full text-xs hover:bg-error/20 transition-colors"
            >
              Fire Safety
            </button>
            
            <button
              onClick={() => handleFilterChange('difficulty', 'beginner')}
              className="px-3 py-1 bg-success/10 text-success rounded-full text-xs hover:bg-success/20 transition-colors"
            >
              Beginner Friendly
            </button>
            
            <button
              onClick={() => handleFilterChange('progress', 'not-started')}
              className="px-3 py-1 bg-warning/10 text-warning rounded-full text-xs hover:bg-warning/20 transition-colors"
            >
              New to Me
            </button>
          </div>

          {/* Clear Filters */}
          {getActiveFilterCount() > 0 && (
            <div className="flex justify-end pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleFilters;