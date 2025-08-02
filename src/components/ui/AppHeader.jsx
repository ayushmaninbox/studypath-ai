import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AppHeader = ({ user = null, onAuthAction = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-home',
      icon: 'LayoutDashboard',
      tooltip: 'View your learning dashboard and progress'
    },
    {
      label: 'Create',
      path: '/roadmap-creation',
      icon: 'Plus',
      tooltip: 'Create a new learning roadmap'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard-home');
    } else {
      navigate('/authentication-screen');
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <div 
      className="flex items-center cursor-pointer group"
      onClick={handleLogoClick}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg mr-3 group-hover:shadow-floating transition-all duration-200">
        <Icon name="GraduationCap" size={24} color="white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-heading font-semibold text-foreground">
          StudyPath
        </span>
        <span className="text-xs font-caption text-primary font-medium -mt-1">
          AI
        </span>
      </div>
    </div>
  );

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled ? 'nav-backdrop shadow-md' : 'bg-background'
        }`}
      >
        <div className="content-max-width content-spacing">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {user && navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-muted group ${
                    isActivePath(item?.path)
                      ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                  title={item?.tooltip}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className="mr-2" 
                  />
                  {item?.label}
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/profile-settings')}
                    iconName="Settings"
                    iconSize={18}
                    className={isActivePath('/profile-settings') ? 'bg-muted' : ''}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAuthAction('logout')}
                    iconName="LogOut"
                    iconSize={18}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAuthAction('login')}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onAuthAction('register')}
                  >
                    Get Started
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden touch-target text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <Icon 
                  name={isMobileMenuOpen ? "X" : "Menu"} 
                  size={24} 
                />
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-card border-b shadow-lg animate-slide-up">
            <div className="content-spacing py-4">
              <nav className="space-y-2">
                {user ? (
                  <>
                    {navigationItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className={`w-full flex items-center px-4 py-3 rounded-md text-left transition-all duration-200 hover:bg-muted ${
                          isActivePath(item?.path)
                            ? 'bg-primary/10 text-primary' :'text-foreground'
                        }`}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={20} 
                          className="mr-3" 
                        />
                        <div>
                          <div className="font-medium">{item?.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item?.tooltip}
                          </div>
                        </div>
                      </button>
                    ))}
                    
                    <hr className="my-4 border-border" />
                    
                    <button
                      onClick={() => handleNavigation('/profile-settings')}
                      className={`w-full flex items-center px-4 py-3 rounded-md text-left transition-all duration-200 hover:bg-muted ${
                        isActivePath('/profile-settings')
                          ? 'bg-primary/10 text-primary' :'text-foreground'
                      }`}
                    >
                      <Icon name="Settings" size={20} className="mr-3" />
                      <div>
                        <div className="font-medium">Profile Settings</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Manage your account and preferences
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => {
                        onAuthAction('logout');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 rounded-md text-left text-error hover:bg-error/10 transition-all duration-200"
                    >
                      <Icon name="LogOut" size={20} className="mr-3" />
                      <div>
                        <div className="font-medium">Sign Out</div>
                        <div className="text-xs text-error/70 mt-1">
                          End your current session
                        </div>
                      </div>
                    </button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      fullWidth
                      onClick={() => {
                        onAuthAction('login');
                        setIsMobileMenuOpen(false);
                      }}
                      iconName="LogIn"
                      iconPosition="left"
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="default"
                      fullWidth
                      onClick={() => {
                        onAuthAction('register');
                        setIsMobileMenuOpen(false);
                      }}
                      iconName="UserPlus"
                      iconPosition="left"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
      {/* Spacer to prevent content overlap */}
      <div className="h-16" />
    </>
  );
};

export default AppHeader;