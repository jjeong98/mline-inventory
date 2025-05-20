import { useState } from 'react';
import './ProjectForm.css';

const ProjectForm = ({ initialData, onSubmit, onClose, hideButtons = false }) => {
    const [formData, setFormData] = useState(initialData || {
      siteName: '',
      startDate: '',
      status: 'active',
      contents: [],
      hardware: []
    });
  
    const [activeInput, setActiveInput] = useState(null);
  
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
  
    // 폼 유효성 검사
    const isValid = formData.siteName.trim() !== '' && formData.startDate !== '';
  
    // 모달 외부 클릭 처리
    // const handleOverlayClick = (e) => {
      // if (e.target === e.currentTarget && !activeInput) {
        // onClose();
      // }
    // }; **//
  
    const handleInputFocus = (fieldName) => {
      setActiveInput(fieldName);
    };
  
    const handleInputBlur = () => {
      setActiveInput(null);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        id: initialData ? initialData.id : Date.now().toString(),
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
      <div className="project-form-container">
        <form className="project-form" onSubmit={handleSubmit}>
          <div className="project-form-section">
            <h3 className="project-form-section-title">기본 정보</h3>
            <div className="project-form-grid">
              <div className="project-form-group">
                <label className="project-form-label">
                  현장명 <span className="project-form-required">*</span>
                </label>
                <input
                  type="text"
                  name="siteName"
                  className="project-form-input"
                  value={formData.siteName}
                  onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
                  onFocus={() => handleInputFocus('siteName')}
                  onBlur={handleInputBlur}
                  required
                />
              </div>
              <div className="project-form-group">
                <label className="project-form-label">
                  상태 <span className="project-form-required">*</span>
                </label>
                <select
                  name="status"
                  className="project-form-select"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  onFocus={() => handleInputFocus('status')}
                  onBlur={handleInputBlur}
                  required
                >
                  <option value="active">진행중</option>
                  <option value="completed">완료</option>
                  <option value="pending">보류</option>
                </select>
              </div>
            </div>
          </div>
  
          <div className="project-form-section">
            <h3 className="project-form-section-title">일정</h3>
            <div className="project-form-grid">
              <div className="project-form-group">
                <label className="project-form-label">
                  프로젝트 기간 <span className="project-form-required">*</span>
                </label>
                <input
                  type="date"
                  name="projectDate"
                  className="project-form-input"
                  value={formData.startDate}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      startDate: selectedDate,
                      endDate: selectedDate // 시작일과 종료일을 동일하게 설정
                    }));
                  }}
                  onFocus={() => handleInputFocus('projectDate')}
                  onBlur={handleInputBlur}
                  required
                />
                <span className="project-form-hint">프로젝트 시작일을 선택해주세요</span>
              </div>
            </div>
          </div>
  
          <div className="project-form-section">
            <h3 className="project-form-section-title">설명</h3>
            <div className="project-form-group">
              <label className="project-form-label">설명</label>
              <textarea
                name="description"
                className="project-form-textarea"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                onFocus={() => handleInputFocus('description')}
                onBlur={handleInputBlur}
                rows={4}
              />
            </div>
          </div>
  
          <div className="project-form-section">
            <h3 className="project-form-section-title">콘텐츠 추가</h3>
            <div className="project-form-grid">
              <div className="project-form-group">
                <label className="project-form-label">콘텐츠명</label>
                <input
                  type="text"
                  name="contentName"
                  className="project-form-input"
                  value={newContent.name}
                  onChange={(e) => setNewContent(prev => ({ ...prev, name: e.target.value }))}
                  onFocus={() => handleInputFocus('contentName')}
                  onBlur={handleInputBlur}
                />
              </div>
              <div className="project-form-group">
                <label className="project-form-label">설명</label>
                <input
                  type="text"
                  name="contentDescription"
                  className="project-form-input"
                  value={newContent.description}
                  onChange={(e) => setNewContent(prev => ({ ...prev, description: e.target.value }))}
                  onFocus={() => handleInputFocus('contentDescription')}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <button type="button" className="add-button" onClick={addContent}>
              콘텐츠 추가
            </button>
            
            {formData.contents.length > 0 && (
              <div className="added-items-list">
                <h4>추가된 콘텐츠</h4>
                {formData.contents.map((content) => (
                  <div key={content.id} className="added-item">
                    <div className="item-info">
                      <strong>{content.name}</strong>
                      <p>{content.description}</p>
                    </div>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          contents: prev.contents.filter(c => c.id !== content.id)
                        }));
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
  
          <div className="project-form-section">
            <h3 className="project-form-section-title">하드웨어 추가</h3>
            <div className="project-form-grid">
              <div className="project-form-group">
                <label className="project-form-label">기기명</label>
                <input
                  type="text"
                  name="hardwareName"
                  className="project-form-input"
                  value={newHardware.name}
                  onChange={(e) => setNewHardware(prev => ({ ...prev, name: e.target.value }))}
                  onFocus={() => handleInputFocus('hardwareName')}
                  onBlur={handleInputBlur}
                />
              </div>
              <div className="project-form-group">
                <label className="project-form-label">수량</label>
                <input
                  type="number"
                  name="hardwareQuantity"
                  className="project-form-input"
                  value={newHardware.quantity}
                  onChange={(e) => setNewHardware(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                  onFocus={() => handleInputFocus('hardwareQuantity')}
                  onBlur={handleInputBlur}
                  min="1"
                />
              </div>
              <div className="project-form-group">
                <label className="project-form-label">사양</label>
                <input
                  type="text"
                  name="hardwareSpecifications"
                  className="project-form-input"
                  value={newHardware.specifications}
                  onChange={(e) => setNewHardware(prev => ({ ...prev, specifications: e.target.value }))}
                  onFocus={() => handleInputFocus('hardwareSpecifications')}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <button type="button" className="add-button" onClick={addHardware}>
              하드웨어 추가
            </button>
  
            {formData.hardware.length > 0 && (
              <div className="added-items-list">
                <h4>추가된 하드웨어</h4>
                {formData.hardware.map((item) => (
                  <div key={item.id} className="added-item">
                    <div className="item-info">
                      <strong>{item.name}</strong>
                      <p>수량: {item.quantity}</p>
                      <p>사양: {item.specifications}</p>
                    </div>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          hardware: prev.hardware.filter(h => h.id !== item.id)
                        }));
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
  
          {!hideButtons && (
            <div className="project-form-actions">
              <button type="button" className="project-form-cancel" onClick={onClose}>
                취소
              </button>
              <button type="submit" className="project-form-submit" disabled={!isValid}>
                {initialData ? "수정" : "생성"}
              </button>
            </div>
          )}
        </form>
      </div>
    );
};

export default ProjectForm;