import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navigation.css";

function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navigation">
      <div className="nav-links">
        <Link to="/" className="nav-link">
          프로젝트 목록
        </Link>
        <Link to="/projects/new" className="nav-link">
          새 프로젝트
        </Link>
        <button onClick={handleLogout} className="nav-link logout-button">
          로그아웃
        </button>
      </div>
    </nav>
  );
}

export default Navigation; 