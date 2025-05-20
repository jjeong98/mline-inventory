import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sampleProjects } from '../data/sampleProjects';
import ProjectList from '../components/Project/ProjectLists/ProjectLists';
import ProjectDetail from '../components/Project/ProjectDetail/ProjectDetail';
import './ProjectPage.css';

const ProjectPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleAddProject = (newProject) => {
    // 프로젝트 추가 로직
    console.log('새 프로젝트 추가:', newProject);
  };

  const handleUpdateProject = (updatedProject) => {
    // 프로젝트 수정 로직
    console.log('프로젝트 수정:', updatedProject);
  };

  const handleDeleteProject = (projectId) => {
    // 프로젝트 삭제 로직
    console.log('프로젝트 삭제:', projectId);
  };

  return (
    <div className="project-page">
      <div className="project-page-container">
        <div className="project-list-section">
          <ProjectList
            projects={[]} // 실제 프로젝트 데이터로 교체 필요
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
            isAdmin={isAdmin}
          />
        </div>
        <div className="project-detail-section">
          <ProjectDetail project={selectedProject} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

