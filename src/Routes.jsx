import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AuthenticationWrapper from "components/ui/AuthenticationWrapper";
import NotFound from "pages/NotFound";
import RoadmapCreation from './pages/roadmap-creation';
import InteractiveRoadmapView from './pages/interactive-roadmap-view';
import AuthenticationScreen from './pages/authentication-screen';
import TopicDetailPanel from './pages/topic-detail-panel';
import ProfileSettings from './pages/profile-settings';
import DashboardHome from './pages/dashboard-home';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AuthenticationWrapper>
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<AuthenticationScreen />} />
            <Route path="/roadmap-creation" element={<RoadmapCreation />} />
            <Route path="/interactive-roadmap-view" element={<InteractiveRoadmapView />} />
            <Route path="/authentication-screen" element={<AuthenticationScreen />} />
            <Route path="/topic-detail-panel" element={<TopicDetailPanel />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/dashboard-home" element={<DashboardHome />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AuthenticationWrapper>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;