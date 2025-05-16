// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import { ProjectPage } from './pages/Projectpage';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={
          <>
            <Navigation />
            <div>메인 페이지</div>
          </>
        } />
        <Route path="/project" element={
          <>
            <Navigation />
            <ProjectPage />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
