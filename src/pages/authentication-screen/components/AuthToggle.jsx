import React from 'react';

const AuthToggle = ({ mode, onModeChange }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      <button
        onClick={() => onModeChange('login')}
        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
          mode === 'login' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => onModeChange('register')}
        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
          mode === 'register' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
        }`}
      >
        Create Account
      </button>
    </div>
  );
};

export default AuthToggle;