import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

export const Navigation = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/main">홈</Link>
        </li>
        <li className="nav-item">
          <Link to="/project">프로젝트 정보</Link>
        </li>
        {isAdmin && (
          <>
            <li className="nav-item">
              <Link to="/admin/users">사용자 관리</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/settings">시스템 설정</Link>
            </li>
          </>
        )}
        <span className="user-info">
          {isAdmin ? '관리자' : '일반 사용자'}
        </span>
        <li className="nav-item">
          <button className="logout-button" onClick={handleLogout}>
            로그아웃
          </button>
        </li>
      </ul>
    </nav>
  );
}; 