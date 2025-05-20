import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

// 상수 정의
const ERROR_MESSAGES = {
  LOGIN_FAILED: "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.",
  EMPTY_FIELDS: "아이디와 비밀번호를 모두 입력해주세요."
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    if (!username.trim() || !password.trim()) {
      setError(ERROR_MESSAGES.EMPTY_FIELDS);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(username, password);
      navigate("/projects");
    } catch (err) {
      setError(ERROR_MESSAGES.LOGIN_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>사내 대여 품목 자동화 시스템</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={error ? "error" : ""}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <div className="password-input">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error ? "error" : ""}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;