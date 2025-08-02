import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationWrapper';
import AuthToggle from './components/AuthToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import AuthBackground from './components/AuthBackground';
import Icon from '../../components/AppIcon';

const AuthenticationScreen = () => {
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear error when mode changes
  useEffect(() => {
    setError('');
  }, [mode]);

  const handleLogin = async (formData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const result = await login({
        email: formData?.email,
        password: formData?.password
      });
      
      if (!result?.success) {
        setError(result?.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const result = await register({
        name: formData?.name,
        email: formData?.email,
        password: formData?.password
      });
      
      if (!result?.success) {
        setError(result?.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = () => {
    // Simulate Google OAuth
    setError('Google authentication is not available in demo mode.');
  };

  const handleForgotPassword = (email) => {
    // Simulate password reset
    setTimeout(() => {
      setShowForgotPassword(false);
    }, 2000);
  };

  const Logo = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mr-3">
          <Icon name="GraduationCap" size={28} color="white" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-heading font-bold text-foreground">
            StudyPath
          </span>
          <span className="text-sm font-caption text-primary font-medium -mt-1">
            AI
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative flex items-center justify-center p-4">
      <AuthBackground />
      
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Logo */}
        <Logo />
        
        {/* Welcome Message */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-3 text-gradient">
            {mode === 'login' ? 'Welcome back!' : 'Get started today'}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {mode === 'login' ?'Sign in to access your personalized learning roadmaps' :'Create your account and start building custom study paths'
            }
          </p>
        </div>
        
        {/* Authentication Card */}
        <div className="card-glass shadow-xl rounded-xl p-6 sm:p-8 animate-scale-in border border-border/50">
          <AuthToggle mode={mode} onModeChange={setMode} />
          
          <div className="transition-all duration-500">
            {mode === 'login' ? (
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isSubmitting}
                error={error}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                isLoading={isSubmitting}
                error={error}
              />
            )}
          </div>
          
          <div className="mt-6">
            <SocialAuth
              onGoogleAuth={handleGoogleAuth}
              isLoading={isSubmitting}
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <button className="text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-2">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-2">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
      
      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSubmit={handleForgotPassword}
        isLoading={false}
      />
    </div>
  );
};

export default AuthenticationScreen;