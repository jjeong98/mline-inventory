import React, { useState } from 'react';
import './Projectpage.css';

// 예시 데이터
const sampleProjects = [
  {
    id: '1',
    siteName: '서울시립미술관 디지털 아트 전시',
    status: 'active',
    startDate: '2024-03-01',
    contents: [
      {
        id: '1',
        name: '인터랙티브 미디어월',
        description: '관람객과 상호작용하는 대형 미디어월 설치',
        status: 'completed'
      },
      {
        id: '2',
        name: 'AR 전시 가이드',
        description: '스마트폰을 통한 증강현실 전시 해설',
        status: 'in_progress'
      }
    ],
    hardware: [
      {
        id: '1',
        name: '프로젝터',
        quantity: 4,
        specifications: '4K 해상도, 5000 ANSI 루멘',
        status: 'installed'
      },
      {
        id: '2',
        name: '터치스크린',
        quantity: 2,
        specifications: '55인치, 멀티터치 지원',
        status: 'pending'
      }
    ]
  },
  {
    id: '2',
    siteName: '국립중앙박물관 특별전',
    status: 'completed',
    startDate: '2024-01-15',
    endDate: '2024-02-28',
    contents: [
      {
        id: '1',
        name: '디지털 복원 영상',
        description: '고대 유물 3D 복원 영상',
        status: 'completed'
      }
    ],
    hardware: [
      {
        id: '1',
        name: 'VR 기기',
        quantity: 6,
        specifications: 'Oculus Quest 2',
        status: 'installed'
      }
    ]
  }
];

const ProjectDetail = ({ project }) => {
  if (!project) return <div className="project-detail-empty">프로젝트를 선택해주세요</div>;

  return (
    <div className="project-detail">
      <h1>프로젝트 정보</h1>
      <div className="project-info">
        <section className="project-section">
          <h2>프로젝트 현장명</h2>
          <div className="info-card">
            {project.siteName}
            <span className={`status-badge ${project.status}`}>
              {project.status === 'active' ? '진행중' : 
               project.status === 'completed' ? '완료' : '보류'}
            </span>
          </div>
        </section>

        <section className="project-section">
          <h2>투입된 콘텐츠 목록</h2>
          <div className="content-list">
            {project.contents.map(content => (
              <div key={content.id} className="info-card">
                <div>
                  <strong>{content.name}</strong>
                  <span className={`status-badge ${content.status}`}>
                    {content.status === 'completed' ? '완료' :
                     content.status === 'in_progress' ? '진행중' : '대기중'}
                  </span>
                </div>
                <p>{content.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="project-section">
          <h2>납품된 하드웨어 기기 목록</h2>
          <div className="hardware-list">
            {project.hardware.map(hardware => (
              <div key={hardware.id} className="info-card">
                <div>
                  <strong>{hardware.name}</strong>
                  <span className={`status-badge ${hardware.status}`}>
                    {hardware.status === 'installed' ? '설치완료' :
                     hardware.status === 'pending' ? '대기중' : '유지보수중'}
                  </span>
                </div>
                <p>수량: {hardware.quantity}</p>
                <p>사양: {hardware.specifications}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="project-section">
          <h2>프로젝트 투입 날짜</h2>
          <div className="info-card">
            <p>시작일: {new Date(project.startDate).toLocaleDateString()}</p>
            {project.endDate && (
              <p>종료일: {new Date(project.endDate).toLocaleDateString()}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const ProjectForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    siteName: '',
    startDate: '',
    status: 'active',
    contents: [],
    hardware: []
  });

  const [newContent, setNewContent] = useState({
    name: '',
    description: '',
    status: 'pending'
  });

  const [newHardware, setNewHardware] = useState({
    name: '',
    quantity: 1,
    specifications: '',
    status: 'pending'
  });

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  // 모달 외부 클릭 처리
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !activeInput) {
      onClose();
    }
  };

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
    setIsInputFocused(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
    });
    onClose();
  };

  const addContent = () => {
    if (newContent.name && newContent.description) {
      setFormData(prev => ({
        ...prev,
        contents: [...prev.contents, { ...newContent, id: Date.now().toString() }]
      }));
      setNewContent({ name: '', description: '', status: 'pending' });
    }
  };

  const addHardware = () => {
    if (newHardware.name && newHardware.specifications) {
      setFormData(prev => ({
        ...prev,
        hardware: [...prev.hardware, { ...newHardware, id: Date.now().toString() }]
      }));
      setNewHardware({ name: '', quantity: 1, specifications: '', status: 'pending' });
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>새 프로젝트 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>현장명</label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
              onFocus={() => handleInputFocus('siteName')}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <div className="form-group">
            <label>시작일</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              onFocus={() => handleInputFocus('startDate')}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <div className="form-group">
            <label>상태</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              onFocus={() => handleInputFocus('status')}
              onBlur={handleInputBlur}
            >
              <option value="active">진행중</option>
              <option value="completed">완료</option>
              <option value="pending">보류</option>
            </select>
          </div>

          <div className="form-section">
            <h3>콘텐츠 추가</h3>
            <div className="form-group">
              <label>콘텐츠명</label>
              <input
                type="text"
                value={newContent.name}
                onChange={(e) => setNewContent(prev => ({ ...prev, name: e.target.value }))}
                onFocus={() => handleInputFocus('contentName')}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="form-group">
              <label>설명</label>
              <input
                type="text"
                value={newContent.description}
                onChange={(e) => setNewContent(prev => ({ ...prev, description: e.target.value }))}
                onFocus={() => handleInputFocus('contentDescription')}
                onBlur={handleInputBlur}
              />
            </div>
            <button type="button" onClick={addContent}>콘텐츠 추가</button>
          </div>

          <div className="form-section">
            <h3>하드웨어 추가</h3>
            <div className="form-group">
              <label>기기명</label>
              <input
                type="text"
                value={newHardware.name}
                onChange={(e) => setNewHardware(prev => ({ ...prev, name: e.target.value }))}
                onFocus={() => handleInputFocus('hardwareName')}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="form-group">
              <label>수량</label>
              <input
                type="number"
                value={newHardware.quantity}
                onChange={(e) => setNewHardware(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                onFocus={() => handleInputFocus('hardwareQuantity')}
                onBlur={handleInputBlur}
                min="1"
              />
            </div>
            <div className="form-group">
              <label>사양</label>
              <input
                type="text"
                value={newHardware.specifications}
                onChange={(e) => setNewHardware(prev => ({ ...prev, specifications: e.target.value }))}
                onFocus={() => handleInputFocus('hardwareSpecifications')}
                onBlur={handleInputBlur}
              />
            </div>
            <button type="button" onClick={addHardware}>하드웨어 추가</button>
          </div>

          <div className="form-actions">
            <button type="submit">등록</button>
            <button type="button" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProjectList = ({ projects, selectedProject, onSelectProject, onAddProject }) => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('active'); // 'active' 또는 'completed'

  const filteredProjects = projects.filter(project => 
    activeTab === 'active' ? project.status === 'active' : project.status === 'completed'
  );

  return (
    <div className="project-list">
      <div className="list-header">
        <div className="tab-container">
          <button 
            className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            진행중인 프로젝트
          </button>
          <button 
            className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            완료된 프로젝트
          </button>
        </div>
        {activeTab === 'active' && (
          <button className="add-button" onClick={() => setShowForm(true)}>
            + 새 프로젝트
          </button>
        )}
      </div>
      <div className="list-container">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className={`project-item ${selectedProject?.id === project.id ? 'selected' : ''}`}
            onClick={() => onSelectProject(project)}
          >
            <h3>{project.siteName}</h3>
            <div className="project-item-info">
              <span className={`status-badge ${project.status}`}>
                {project.status === 'active' ? '진행중' : 
                 project.status === 'completed' ? '완료' : '보류'}
              </span>
              <span className="date">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <ProjectForm
          onSubmit={onAddProject}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export const ProjectPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(sampleProjects);

  const handleAddProject = (newProject) => {
    setProjects(prev => [...prev, newProject]);
  };

  return (
    <div className="project-page">
      <div className="project-layout">
        <ProjectList
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
          onAddProject={handleAddProject}
        />
        <ProjectDetail project={selectedProject} />
      </div>
    </div>
  );
};

