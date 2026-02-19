import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProjects from './pages/admin/Projects'
import AdminClients from './pages/admin/Clients'
import AdminInvoices from './pages/admin/Invoices'
import PortalDashboard from './pages/portal/Dashboard'
import PortalProjects from './pages/portal/Projects'
import PortalInvoices from './pages/portal/Invoices'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Background layers (visible on landing page) */}
        <div className="fixed inset-0 z-0 grid-bg pointer-events-none" />
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black pointer-events-none" />

        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Admin dashboard */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="invoices" element={<AdminInvoices />} />
          </Route>

          {/* Client portal */}
          <Route path="/portal" element={
            <ProtectedRoute requiredRole="client">
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<PortalDashboard />} />
            <Route path="projects" element={<PortalProjects />} />
            <Route path="invoices" element={<PortalInvoices />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
