import React from "react";
import Layout from "./layout/Layout";
import PortfolioDashboard from "./layout/Layout";
import { LoginPage } from "./pages/LoginPage";
import { OtpVerification } from "./pages/OtpVerification";
import { StatsCard } from "./components/StatsCard";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import { ProtectedRoute } from "./authenticate/PrivateRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProjectPage from "./pages/ProjectPage";
import { TrafficOverview } from "./components/TrafficOverview";
import { ToastContainer } from "react-toastify";

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  // Wait for loading to complete before rendering the router
  if (loading) {
    return (
      <div className="text-center mt-8 text-blue-600 text-lg">Loading...</div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <LoginPage />
      )
    },
    {
      path: "/verify-otp",
      element: <OtpVerification />
    },
    {
      path: "/projects",
      element: (
        <ProtectedRoute>
          <ProjectPage />
        </ProtectedRoute>
      )
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <PortfolioDashboard />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <TrafficOverview /> }, // default view
        { path: "projects", element: <ProjectPage /> },
        { path: "blog", element: <div>Blog Content</div> },
        { path: "messages", element: <div>Messages Content</div> }
      ]
    }
    // {
    //     path: "/projects",
    //     element: (
    //         <ProtectedRoute>
    //             <ProjectPage></ProjectPage>
    //         </ProtectedRoute>
    //     ),
    // },
  ]);

  return <RouterProvider router={router} />;
};

export const App = () => {
  return (
    <AuthProvider>
      <AppContent />
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </AuthProvider>
  );
};

export default App;
