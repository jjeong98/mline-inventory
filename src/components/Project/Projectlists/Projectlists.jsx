import { useState, useEffect } from 'react';
import ProjectForm from '../ProjectForm/ProjectForm';
import './ProjectLists.css';

const ProjectList = ({ projects, selectedProject, onSelectProject, onAddProject, onUpdateProject, onDeleteProject, isAdmin }) => {
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [activeTab, setActiveTab] = useState('active');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 10;
  
    useEffect(() => {
      if (editingProject) {
        setActiveTab(editingProject.status);
      }
    }, [editingProject]);
  
    useEffect(() => {
      const listContainer = document.querySelector('.project-list');
      if (listContainer) {
        listContainer.scrollTop = 0;
      }
    }, [currentPage]);
  
    const handleEditClick = (e, project) => {
      e.stopPropagation();
      setEditingProject(project);
      setShowEditForm(true);
    };
  
    const handleEditSubmit = (updatedProject) => {
      onUpdateProject(updatedProject);
      setShowEditForm(false);
      setEditingProject(null);
      setActiveTab(updatedProject.status);
    };
  
    const handleDeleteClick = (e, project) => {
      e.stopPropagation();
      setProjectToDelete(project);
      setShowDeleteConfirm(true);
    };
  
    const handleDeleteConfirm = () => {
      if (projectToDelete) {
        onDeleteProject(projectToDelete.id);
        setShowDeleteConfirm(false);
        setProjectToDelete(null);
      }
    };
  
    const handleDeleteCancel = () => {
      setShowDeleteConfirm(false);
      setProjectToDelete(null);
    };
  
    // 프로젝트 필터링
    const filteredProjects = projects.filter(project => {
      switch (activeTab) {
        case 'active':
          return project.status === 'active';
        case 'completed':
          return project.status === 'completed';
        case 'pending':
          return project.status === 'pending';
        default:
          return true;
      }
    });
  
    // 현재 페이지의 프로젝트 계산
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
    return (
      <div className="project-list-container">
        <div className="project-list-header">
          <div className="tab-container">
            <button
              className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              진행중
            </button>
            <button
              className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              완료
            </button>
            <button
              className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              보류
            </button>
          </div>
          {isAdmin && (
            <button 
              className="add-project-button" 
              onClick={() => setShowForm(true)}
              aria-label="새 프로젝트 추가"
            >
              + 새 프로젝트
            </button>
          )}
        </div>
        <div className="project-list">
          {currentProjects.map(project => (
            <div
              key={project.id}
              className={`project-card ${selectedProject?.id === project.id ? 'selected' : ''}`}
              onClick={() => onSelectProject(project)}
            >
              <div className="project-card-header">
                <h3 className="project-card-title">{project.siteName}</h3>
                <div className="project-card-actions">
                  <button
                    className="edit-button"
                    onClick={(e) => handleEditClick(e, project)}
                    aria-label={`${project.siteName} 프로젝트 수정`}
                  >
                    수정
                  </button>
                  {isAdmin && (
                    <button
                      className="delete-button"
                      onClick={(e) => handleDeleteClick(e, project)}
                      aria-label={`${project.siteName} 프로젝트 삭제`}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
              <div className="project-card-content">
                <p>{project.description}</p>
              </div>
              <div className="project-card-footer">
                <span className="project-card-date">
                  {new Date(project.startDate).toLocaleDateString()}
                </span>
                <span className={`project-card-status status-${project.status}`}>
                  {project.status === 'active' ? '진행중' : 
                   project.status === 'completed' ? '완료' : '보류'}
                </span>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <nav className="pagination" aria-label="페이지 네비게이션">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-button ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`${page} 페이지로 이동`}
              >
                {page}
              </button>
            ))}
          </nav>
        )}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>새 프로젝트</h2>
                <button
                  className="close-button"
                  onClick={() => setShowForm(false)}
                  aria-label="닫기"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <ProjectForm
                  onSubmit={onAddProject}
                  onClose={() => setShowForm(false)}
                  hideButtons={true}
                />
              </div>
              <div className="modal-footer">
                <button className="project-form-cancel" onClick={() => setShowForm(false)}>
                  취소
                </button>
                <button 
                  className="project-form-submit" 
                  onClick={() => document.querySelector('.project-form').requestSubmit()}
                >
                  생성
                </button>
              </div>
            </div>
          </div>
        )}
        {showEditForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingProject ? "프로젝트 수정" : "프로젝트 생성"}</h2>
                <button className="close-button" onClick={() => {
                  setShowEditForm(false);
                  setEditingProject(null);
                }} aria-label="닫기">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <ProjectForm
                  initialData={editingProject}
                  onSubmit={handleEditSubmit}
                  onCancel={() => {
                    setShowEditForm(false);
                    setEditingProject(null);
                  }}
                  hideButtons={true}
                />
              </div>
              <div className="modal-footer">
                <button className="project-form-cancel" onClick={() => {
                  setShowEditForm(false);
                  setEditingProject(null);
                }}>
                  취소
                </button>
                <button 
                  className="project-form-submit" 
                  onClick={() => document.querySelector('.project-form').requestSubmit()}
                >
                  {editingProject ? "수정" : "생성"}
                </button>
              </div>
            </div>
          </div>
        )}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content delete-confirm-modal">
              <h2>프로젝트 삭제</h2>
              <p>
                <span className="warning-text">경고:</span> 이 프로젝트를 삭제하시겠습니까?
                이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="form-actions">
                <button
                  className="delete-confirm-button"
                  onClick={handleDeleteConfirm}
                >
                  삭제
                </button>
                <button
                  className="cancel-button"
                  onClick={handleDeleteCancel}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default ProjectList;