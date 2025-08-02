import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Geometric Patterns */}
      <div className="absolute inset-0">
        {/* Top Left Pattern */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
          <div className="absolute top-8 left-8 w-16 h-16 border-2 border-primary rounded-lg rotate-12" />
          <div className="absolute top-16 left-24 w-8 h-8 bg-secondary rounded-full" />
          <div className="absolute top-32 left-12 w-12 h-12 border border-accent rounded-md rotate-45" />
        </div>
        
        {/* Bottom Right Pattern */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
          <div className="absolute bottom-8 right-8 w-20 h-20 border-2 border-secondary rounded-full" />
          <div className="absolute bottom-24 right-16 w-6 h-6 bg-primary rounded-sm rotate-45" />
          <div className="absolute bottom-16 right-32 w-10 h-10 border border-accent rounded-lg" />
        </div>
        
        {/* Center Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-3/4 left-1/4 w-6 h-6 border border-secondary/30 rounded-md rotate-12" />
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-accent/30 rounded-full" />
      </div>
      
      {/* Educational Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 opacity-5">
          <Icon name="GraduationCap" size={48} />
        </div>
        <div className="absolute bottom-32 left-16 opacity-5">
          <Icon name="BookOpen" size={40} />
        </div>
        <div className="absolute top-1/3 left-8 opacity-5">
          <Icon name="Target" size={32} />
        </div>
        <div className="absolute bottom-20 right-32 opacity-5">
          <Icon name="TrendingUp" size={36} />
        </div>
      </div>
    </div>
  );
};

export default AuthBackground;