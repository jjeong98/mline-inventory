// src/components/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [accountType, setAccountType] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleAccountSelect = (type) => {
    setAccountType(type);
    if (type === 'general') {
      localStorage.setItem('isAdmin', 'false');
      navigate('/main');
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === 'mline0908') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/main');
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>사내 대여 품목 자동화 시스템</h2>
        
        <div className="account-selection">
          <button 
            className={`account-btn ${accountType === 'general' ? 'selected' : ''}`}
            onClick={() => handleAccountSelect('general')}
          >
            일반 계정
          </button>
          
          <button 
            className={`account-btn ${accountType === 'admin' ? 'selected' : ''}`}
            onClick={() => handleAccountSelect('admin')}
          >
            관리자 계정
          </button>
        </div>

        {accountType === 'admin' && (
          <form onSubmit={handleAdminLogin} className="admin-login">
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError('')
                }}
                placeholder="비밀번호를 입력하세요."
                className={passwordError ? 'error' : ''}
              />
              {passwordError && <p className="error-message">{passwordError}</p>}
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '숨기기' : '보기'}
              </button>
            </div>
            <button type="submit" className="login-btn">
              로그인
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;