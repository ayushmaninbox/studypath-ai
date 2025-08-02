import React from 'react';

const AuthToggle = ({ mode, onModeChange }) => {
  return (
    <div className="flex bg-muted/50 rounded-xl p-1.5 mb-8 border border-border/50">
      <button
        onClick={() => onModeChange('login')}
        className={`flex-1 py-3 px-6 text-sm font-semibold rounded-lg transition-all duration-300 ${
          mode === 'login' ?'bg-card text-foreground shadow-md border border-border/50' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => onModeChange('register')}
        className={`flex-1 py-3 px-6 text-sm font-semibold rounded-lg transition-all duration-300 ${
          mode === 'register' ?'bg-card text-foreground shadow-md border border-border/50' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
        }`}
      >
        Create Account
      </button>
    </div>
  );
};

export default AuthToggle;