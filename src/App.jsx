import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import Login from "./components/Login/Login";
import ProjectList from "./components/Project/ProjectLists/ProjectLists";
import ProjectDetail from "./components/Project/ProjectDetail/ProjectDetail";
import ProjectForm from "./components/Project/ProjectForm/ProjectForm";
import PrivateRoute from "./Routers/Privateroute.jsx";
import { sampleProjects } from './data/sampleProjects';  // 데이터 import
import "./App.css";

function AppContent() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(sampleProjects);  // 초기 데이터 설정
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const handleAddProject = (newProject) => {
    setProjects(prev => [...prev, newProject]);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(prev => prev.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    ));
    if (selectedProject?.id === updatedProject.id) {
      setSelectedProject(updatedProject);
    }
  };

  const handleDeleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              user ? <Navigate to="/projects" /> : <Login />
            } />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <ProjectList
                    projects={projects}
                    selectedProject={selectedProject}
                    onSelectProject={setSelectedProject}
                    onAddProject={handleAddProject}
                    onUpdateProject={handleUpdateProject}
                    onDeleteProject={handleDeleteProject}
                    isAdmin={isAdmin}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/new"
              element={
                <PrivateRoute>
                  <ProjectForm onSubmit={handleAddProject} />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <PrivateRoute>
                  <ProjectDetail project={selectedProject} />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id/edit"
              element={
                <PrivateRoute>
                  <ProjectForm 
                    onSubmit={handleUpdateProject}
                    initialData={selectedProject}
                  />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;