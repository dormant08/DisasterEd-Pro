import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LandingPage from './pages/landing-page';
import VirtualDrillSimulator from './pages/virtual-drill-simulator';
import StudentDashboard from './pages/student-dashboard';
import EmergencyAlerts from './pages/emergency-alerts';
import LearningModules from './pages/learning-modules';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EmergencyAlerts />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/virtual-drill-simulator" element={<VirtualDrillSimulator />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/emergency-alerts" element={<EmergencyAlerts />} />
        <Route path="/learning-modules" element={<LearningModules />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
