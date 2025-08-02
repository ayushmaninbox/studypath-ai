import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const RoadmapSearch = ({ 
  isOpen, 
  onClose, 
  onSearch, 
  searchResults = [],
  onResultClick,
  className = "" 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery?.trim()) {
      setIsSearching(true);
      const debounceTimer = setTimeout(() => {
        onSearch(searchQuery?.trim());
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      onSearch('');
    }
  }, [searchQuery, onSearch]);

  const handleResultClick = (result) => {
    onResultClick(result);
    setSearchQuery('');
    onClose();
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Search Overlay */}
      <div className="md:hidden fixed inset-0 z-40 bg-background">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="ArrowLeft"
            iconSize={18}
            className="mr-3"
          />
          
          <div className="flex-1">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search topics, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="border-none bg-muted/50"
            />
          </div>
          
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              iconName="X"
              iconSize={18}
              className="ml-2"
            />
          )}
        </div>
        
        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Searching...</span>
              </div>
            </div>
          ) : searchResults?.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground mb-3">
                {searchResults?.length} result{searchResults?.length !== 1 ? 's' : ''} found
              </div>
              {searchResults?.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 bg-card border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                      result?.isCompleted 
                        ? 'bg-success/10 text-success' 
                        : result?.isCurrent 
                        ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                    }`}>
                      <Icon 
                        name={result?.isCompleted ? 'Check' : result?.isCurrent ? 'Play' : 'Circle'} 
                        size={14} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {result?.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {result?.description}
                      </div>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {result?.difficulty}
                        </span>
                        {result?.resourceCount > 0 && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Icon name="BookOpen" size={10} className="mr-1" />
                              {result?.resourceCount} resources
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-8">
              <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
              <p className="text-xs text-muted-foreground mt-1">Try different keywords or check spelling</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Start typing to search topics</p>
            </div>
          )}
        </div>
      </div>
      {/* Desktop Search Dropdown */}
      <div className="hidden md:block fixed top-20 left-1/2 transform -translate-x-1/2 w-96 z-40">
        <div className="bg-card/95 backdrop-blur-sm border shadow-floating rounded-lg overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search topics, resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    iconName="X"
                    iconSize={14}
                  />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  iconName="Escape"
                  iconSize={14}
                />
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {isSearching ? (
              <div className="flex items-center justify-center py-6">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Searching...</span>
                </div>
              </div>
            ) : searchResults?.length > 0 ? (
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-2">
                  {searchResults?.length} result{searchResults?.length !== 1 ? 's' : ''} found
                </div>
                {searchResults?.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                        result?.isCompleted 
                          ? 'bg-success/10 text-success' 
                          : result?.isCurrent 
                          ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                      }`}>
                        <Icon 
                          name={result?.isCompleted ? 'Check' : result?.isCurrent ? 'Play' : 'Circle'} 
                          size={12} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {result?.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {result?.description}
                        </div>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {result?.difficulty}
                          </span>
                          {result?.resourceCount > 0 && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Icon name="BookOpen" size={10} className="mr-1" />
                                {result?.resourceCount}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-6">
                <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No results found</p>
              </div>
            ) : (
              <div className="text-center py-6">
                <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Start typing to search</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Desktop Backdrop */}
      <div 
        className="hidden md:block fixed inset-0 z-30 bg-black/10 backdrop-blur-sm"
        onClick={onClose}
      />
    </>
  );
};

export default RoadmapSearch;