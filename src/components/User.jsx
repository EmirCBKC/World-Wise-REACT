import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(function () {
    if (!isAuthenticated) navigate("/app");
  }, [isAuthenticated]);

  function handleSubmit(e) {
    e.preventDefault();
    if (user) logout();
  }

  if (!user) return;

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleSubmit}>Logout</button>
    </div>
  );
}

export default User;
