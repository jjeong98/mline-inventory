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
        {/* 기본 정보 */}
        <div className="project-detail-section">
          <h3 className="project-detail-section-title">기본 정보</h3>
          <div className="project-detail-info">
            <div className="project-detail-item">
              <span className="project-detail-label">시작일</span>
              <span className="project-detail-value">
                {project.startDate ? new Date(project.startDate).toLocaleDateString() : '-'}
              </span>
            </div>
            <div className="project-detail-item">
              <span className="project-detail-label">종료일</span>
              <span className="project-detail-value">
                {project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* 설명 */}
        <div className="project-detail-section">
          <h3 className="project-detail-section-title">설명</h3>
          <div className="project-detail-description">
            {project.description || '설명 없음'}
          </div>
        </div>

        {/* 하드웨어 목록 */}
        <div className="project-detail-section">
          <h3 className="project-detail-section-title">하드웨어 목록</h3>
          {project.hardware && project.hardware.length > 0 ? (
            <ul className="project-detail-list">
              {project.hardware.map((item, idx) => (
                <li key={idx} className="project-detail-list-item">
                  <span className="project-detail-label">{item.name}</span>
                  <span className="project-detail-value">
                    (수량: {item.quantity}, 사양: {item.specifications || '-'})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="project-detail-empty-list">등록된 하드웨어가 없습니다.</div>
          )}
        </div>

        {/* 콘텐츠 목록 */}
        <div className="project-detail-section">
          <h3 className="project-detail-section-title">콘텐츠 목록</h3>
          {project.contents && project.contents.length > 0 ? (
            <ul className="project-detail-list">
              {project.contents.map((item, idx) => (
                <li key={idx} className="project-detail-list-item">
                  <span className="project-detail-label">{item.name}</span>
                  <span className="project-detail-value">
                    {item.description || '-'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="project-detail-empty-list">등록된 콘텐츠가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;