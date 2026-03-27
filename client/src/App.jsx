import React from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import SEOProvider from '@/components/seo/SEOProvider'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import PortalLayout from './layouts/PortalLayout'
import AuthGuard from './layouts/AuthGuard'

// Landing Pages
import Home from './pages/Home'
import AI from './pages/AI'
import Analytics from './pages/Analytics'
import Enterprise from './pages/Enterprise'
import Integrations from './pages/Integrations'
import Products from './pages/Products'
import Global from './pages/Global'
import NotFound from './pages/NotFound'

// Portal Pages
import Login from './pages/portal/Login'
import Register from './pages/portal/Register'
import ForgotPassword from './pages/portal/ForgotPassword'
import Dashboard from './pages/portal/Dashboard'
import Projects from './pages/portal/Projects'
import Reports from './pages/portal/Reports'
import Invoices from './pages/portal/Invoices'
import Settings from './pages/portal/Settings'
import PortalAI from './pages/portal/AI'
import PortalAnalytics from './pages/portal/Analytics'
import PortalSecurity from './pages/portal/Security'
import PortalWorkflow from './pages/portal/Workflow'
import PortalOrganization from './pages/portal/Organization'

const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Landing Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/products" element={<Products />} />
          <Route path="/global" element={<Global />} />
        </Route>

        {/* Auth Routes Group */}
        <Route path="/portal">
          {/* Index Route Redirect - If someone visits /portal, take them to login */}
          <Route index element={<Navigate to="/portal/login" replace />} />
          
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Protected Portal Routes */}
          <Route 
            element={
              <AuthGuard>
                <PortalLayout />
              </AuthGuard>
            }
          >
            {/* Redirect /portal (if authed) to dashboard is handled by AuthGuard logic usually, 
                but we can also add an explicit route here if needed. */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="reports" element={<Reports />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="ai" element={<PortalAI />} />
            <Route path="analytics" element={<PortalAnalytics />} />
            <Route path="security" element={<PortalSecurity />} />
            <Route path="workflow" element={<PortalWorkflow />} />
            <Route path="organization" element={<PortalOrganization />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SEOProvider>
          <AnimatedRoutes />
        </SEOProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
