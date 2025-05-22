import { useState, useEffect, useRef } from 'react';
import ProjectForm from '../ProjectForm/ProjectForm';
import './ProjectLists.css';

const ProjectList = ({ projects, onAddProject, onUpdateProject, onDeleteProject, isAdmin }) => {
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [activeTab, setActiveTab] = useState('active');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProject, setSelectedProject] = useState(null);
    const projectsPerPage = 10;
    const [listWidth, setListWidth] = useState(350); // 초기값(px)
    const isResizing = useRef(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showDetailModal, setShowDetailModal] = useState(false);
  
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
  
    const handleProjectClick = (project) => {
      setSelectedProject(project);
      if (isMobile) setShowDetailModal(true);
    };
  
    // 목록에서 선택된 프로젝트의 최신 데이터를 항상 반영
    const selectedProjectData = projects.find(p => p.id === selectedProject?.id);
  
    const handleMouseDown = () => {
      isResizing.current = true;
      document.body.style.cursor = 'col-resize';
    };
  
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const min = 200, max = 600;
      const containerLeft = document.querySelector('.project-list-container').getBoundingClientRect().left;
      const newWidth = Math.min(Math.max(e.clientX - containerLeft, min), max);
      setListWidth(newWidth);
    };
  
    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
    };
  
    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, []);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return (
      <div className="project-list-container">
        <div className="project-list-section" style={{ width: listWidth }}>
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
              <button 
                className="add-project-button" 
                onClick={() => setShowForm(true)}
                aria-label="새 프로젝트 추가"
              >
                + 새 프로젝트
              </button>
          </div>
          <div className="project-list">
            {currentProjects.map(project => (
              <div
                key={project.id}
                className={`project-card ${selectedProject?.id === project.id ? 'selected' : ''}`}
                onClick={() => handleProjectClick(project)}
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
        </div>
        <div
          className="project-list-resizer"
          onMouseDown={handleMouseDown}
        />
        {!isMobile && (
          <div className="project-detail-section" style={{ width: `calc(100% - ${listWidth}px)` }}>
            {selectedProjectData ? (
              <div className="project-detail-content">
                <div className="project-form-section">
                  <h3 className="project-form-section-title">기본 정보</h3>
                  <div className="project-form-grid">
                    <div className="project-form-group">
                      <label className="project-form-label" style={{fontWeight: 600}}>프로젝트명</label>
                      <div className="project-form-input" style={{fontWeight: 600}}>{selectedProjectData.siteName}</div>
                    </div>
                    <div className="project-form-group">
                      <label className="project-form-label" style={{fontWeight: 600}}>상태</label>
                      <div className="project-form-input" style={{fontWeight: 600}}>
                        {selectedProjectData.status === 'active'
                          ? '진행중'
                          : selectedProjectData.status === 'completed'
                          ? '완료'
                          : '보류'}
                      </div>
                    </div>
                    <div className="project-form-group">
                      <label className="project-form-label" style={{fontWeight: 600}}>시작일</label>
                      <div className="project-form-input" style={{fontWeight: 600}}>{selectedProjectData.startDate}</div>
                    </div>
                    <div className="project-form-group">
                      <label className="project-form-label" style={{fontWeight: 600}}>설명</label>
                      <div className="project-form-textarea" style={{fontWeight: 600}}>{selectedProjectData.description}</div>
                    </div>
                  </div>
                </div>

                <div className="project-form-section">
                  <h3 className="project-form-section-title">하드웨어 목록</h3>
                  <div className="project-form-grid">
                    <div className="project-form-group">
                      <div className="project-form-input" style={{whiteSpace: 'pre-line', fontWeight: 600}}>
                        {(selectedProjectData.hardware || []).length > 0
                          ? selectedProjectData.hardware.map(item =>
                              `${item.name} (수량: ${item.quantity}, 사양: ${item.specifications})`
                            ).join('\n')
                          : '등록된 하드웨어가 없습니다.'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="project-form-section">
                  <h3 className="project-form-section-title">콘텐츠 목록</h3>
                  <div className="project-form-grid">
                    <div className="project-form-group">
                      <div className="project-form-input" style={{whiteSpace: 'pre-line', fontWeight: 600}}>
                        {(selectedProjectData.contents || []).length > 0
                          ? selectedProjectData.contents.map(item =>
                              `${item.name} - ${item.description}`
                            ).join('\n')
                          : '등록된 콘텐츠가 없습니다.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="project-detail-empty">
                <div className="project-detail-empty-icon">📋</div>
                <div className="project-detail-empty-text">프로젝트를 선택해주세요</div>
              </div>
            )}
          </div>
        )}
        {isMobile && showDetailModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: 480 }}>
              <div className="modal-header">
                <h2>프로젝트 상세</h2>
                <button className="close-button" onClick={() => setShowDetailModal(false)}>×</button>
              </div>
              <div className="modal-body">
                {selectedProjectData ? (
                  <div className="project-detail-content">
                    <div className="project-form-section">
                      <h3 className="project-form-section-title">기본 정보</h3>
                      <div className="project-form-grid">
                        <div className="project-form-group">
                          <label className="project-form-label" style={{fontWeight: 600}}>프로젝트명</label>
                          <div className="project-form-input" style={{fontWeight: 600}}>{selectedProjectData.siteName}</div>
                        </div>
                        <div className="project-form-group">
                          <label className="project-form-label" style={{fontWeight: 600}}>상태</label>
                          <div className="project-form-input" style={{fontWeight: 600}}>
                            {selectedProjectData.status === 'active'
                              ? '진행중'
                              : selectedProjectData.status === 'completed'
                              ? '완료'
                              : '보류'}
                          </div>
                        </div>
                        <div className="project-form-group">
                          <label className="project-form-label" style={{fontWeight: 600}}>시작일</label>
                          <div className="project-form-input" style={{fontWeight: 600}}>{selectedProjectData.startDate}</div>
                        </div>
                        <div className="project-form-group">
                          <label className="project-form-label" style={{fontWeight: 600}}>설명</label>
                          <div className="project-form-textarea" style={{fontWeight: 600}}>{selectedProjectData.description}</div>
                        </div>
                      </div>
                    </div>

                    <div className="project-form-section">
                      <h3 className="project-form-section-title">하드웨어 목록</h3>
                      <div className="project-form-grid">
                        <div className="project-form-group">
                          <div className="project-form-input" style={{whiteSpace: 'pre-line', fontWeight: 600}}>
                            {(selectedProjectData.hardware || []).length > 0
                              ? selectedProjectData.hardware.map(item =>
                                  `${item.name} (수량: ${item.quantity}, 사양: ${item.specifications})`
                                ).join('\n')
                              : '등록된 하드웨어가 없습니다.'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="project-form-section">
                      <h3 className="project-form-section-title">콘텐츠 목록</h3>
                      <div className="project-form-grid">
                        <div className="project-form-group">
                          <div className="project-form-input" style={{whiteSpace: 'pre-line', fontWeight: 600}}>
                            {(selectedProjectData.contents || []).length > 0
                              ? selectedProjectData.contents.map(item =>
                                  `${item.name} - ${item.description}`
                                ).join('\n')
                              : '등록된 콘텐츠가 없습니다.'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="project-detail-empty">
                    <div className="project-detail-empty-icon">📋</div>
                    <div className="project-detail-empty-text">프로젝트를 선택해주세요</div>
                  </div>
                )}
              </div>
            </div>
          </div>
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
                  onClose={() => {
                    setShowEditForm(false);
                    setEditingProject(null);
                  }}
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