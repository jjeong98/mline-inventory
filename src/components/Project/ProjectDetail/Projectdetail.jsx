import './ProjectDetail.css';

const ProjectDetail = ({ project }) => {
  if (!project) {
    return (
      <div className="project-detail-container">
        <div className="project-detail-content">
          <p>프로젝트를 선택해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <div className="project-detail-header">
        <h2 className="project-detail-title">{project.siteName}</h2>
        <span className={`project-detail-status status-${project.status}`}>
          {project.status === 'active' ? '진행중' : 
           project.status === 'completed' ? '완료' : '보류'}
        </span>
      </div>
      <div className="project-detail-content">
        <div className="project-detail-section">
          <h3 className="project-detail-section-title">기본 정보</h3>
          <div className="project-detail-info">
            <div className="project-detail-item">
              <span className="project-detail-label">시작일</span>
              <span className="project-detail-value">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="project-detail-item">
              <span className="project-detail-label">종료일</span>
              <span className="project-detail-value">
                {project.endDate ? new Date(project.endDate).toLocaleDateString() : '미정'}
              </span>
            </div>
          </div>
        </div>
        <div className="project-detail-section">
          <h3 className="project-detail-section-title">설명</h3>
          <p className="project-detail-description">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;