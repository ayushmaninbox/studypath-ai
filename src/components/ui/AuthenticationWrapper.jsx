import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationWrapper');
  }
  return context;
};

const AuthenticationWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Protected routes that require authentication
  const protectedRoutes = [
    '/dashboard-home',
    '/profile-settings'
  ];

  // Routes that allow anonymous access but enhance with auth
  const enhancedRoutes = [
    '/roadmap-creation',
    '/interactive-roadmap-view',
    '/topic-detail-panel'
  ];

  // Public routes that don't require auth
  const publicRoutes = [
    '/authentication-screen'
  ];

  useEffect(() => {
    // Check for existing authentication on app load
    checkAuthStatus();
  }, []);

  useEffect(() => {
    // Handle route protection
    handleRouteProtection();
  }, [location.pathname, isAuthenticated, isLoading]);

  const checkAuthStatus = async () => {
    try {
      // Check localStorage for auth token
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      
      if (token && userData) {
        // Validate token with backend (simulate API call)
        const isValidToken = await validateToken(token);
        
        if (isValidToken) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        } else {
          // Clear invalid auth data
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear potentially corrupted auth data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    } finally {
      setIsLoading(false);
    }
  };

  const validateToken = async (token) => {
    // Simulate token validation
    // In real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation - check if token exists and isn't expired
        try {
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          const isExpired = tokenData.exp * 1000 < Date.now();
          resolve(!isExpired);
        } catch {
          resolve(false);
        }
      }, 500);
    });
  };

  const handleRouteProtection = () => {
    if (isLoading) return;

    const currentPath = location.pathname;
    
    // Redirect to dashboard if authenticated user visits auth screen
    if (isAuthenticated && currentPath === '/authentication-screen') {
      navigate('/dashboard-home', { replace: true });
      return;
    }

    // Redirect to auth screen if unauthenticated user visits protected route
    if (!isAuthenticated && protectedRoutes?.includes(currentPath)) {
      navigate('/authentication-screen', { 
        replace: true,
        state: { returnTo: currentPath }
      });
      return;
    }

    // Allow enhanced routes for both auth states
    // Anonymous users can create roadmaps with localStorage
    // Authenticated users get full features
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Simulate login API call
      const response = await simulateLogin(credentials);
      
      if (response?.success) {
        const { user: userData, token } = response?.data;
        
        // Store auth data
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Redirect to intended destination or dashboard
        const returnTo = location.state?.returnTo || '/dashboard-home';
        navigate(returnTo, { replace: true });
        
        return { success: true };
      } else {
        return { success: false, error: response?.error };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate registration API call
      const response = await simulateRegister(userData);
      
      if (response?.success) {
        const { user: newUser, token } = response?.data;
        
        // Store auth data
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(newUser));
        
        setUser(newUser);
        setIsAuthenticated(true);
        
        // Redirect to dashboard after successful registration
        navigate('/dashboard-home', { replace: true });
        
        return { success: true };
      } else {
        return { success: false, error: response?.error };
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    setUser(null);
    setIsAuthenticated(false);
    
    // Redirect to auth screen
    navigate('/authentication-screen', { replace: true });
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    localStorage.setItem('user_data', JSON.stringify(newUserData));
    setUser(newUserData);
  };

  // Simulate API calls
  const simulateLogin = (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.email === 'demo@studypath.ai' && credentials.password === 'demo123') {
          const token = generateMockToken();
          const user = {
            id: '1',
            name: 'Demo User',
            email: credentials.email,
            avatar: null,
            preferences: {
              theme: 'light',
              notifications: true
            }
          };
          resolve({ success: true, data: { user, token } });
        } else {
          resolve({ success: false, error: 'Invalid credentials' });
        }
      }, 1000);
    });
  };

  const simulateRegister = (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = generateMockToken();
        const user = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          avatar: null,
          preferences: {
            theme: 'light',
            notifications: true
          }
        };
        resolve({ success: true, data: { user, token } });
      }, 1000);
    });
  };

  const generateMockToken = () => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      iat: Math.floor(Date.now() / 1000)
    }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
  };

  const contextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    // Helper methods for route access
    canAccessRoute: (route) => {
      if (publicRoutes?.includes(route)) return true;
      if (enhancedRoutes?.includes(route)) return true;
      if (protectedRoutes?.includes(route)) return isAuthenticated;
      return false;
    },
    isProtectedRoute: (route) => protectedRoutes?.includes(route),
    isEnhancedRoute: (route) => enhancedRoutes?.includes(route)
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationWrapper;