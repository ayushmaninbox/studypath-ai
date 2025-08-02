import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CreateRoadmapFAB = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide FAB when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleCreateRoadmap = () => {
    navigate('/roadmap-creation');
  };

  return (
    <>
      {/* Desktop FAB */}
      <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 hidden sm:block ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}>
        <Button
          variant="default"
          size="lg"
          onClick={handleCreateRoadmap}
          iconName="Plus"
          iconPosition="left"
          className="shadow-floating hover:shadow-xl btn-hover-lift"
        >
          Create Roadmap
        </Button>
      </div>

      {/* Mobile FAB */}
      <div className={`fixed bottom-4 right-4 z-40 transition-all duration-300 sm:hidden ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}>
        <button
          onClick={handleCreateRoadmap}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-floating hover:shadow-xl flex items-center justify-center transition-all duration-200 btn-hover-lift"
          aria-label="Create new roadmap"
        >
          <Icon name="Plus" size={24} />
        </button>
      </div>
    </>
  );
};

export default CreateRoadmapFAB;