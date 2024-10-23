import { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("status") == null) {
      navigate("/login");
    }
  }, [navigate]);

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/logout")
      .then((response) => {
        sessionStorage.removeItem("status");
        navigate("/login");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <>
      <nav>
        <ul>
          {sessionStorage.getItem("status") == null ? (
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          ) : null}

          {sessionStorage.getItem("status") == null ? (
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          ) : null}
          {sessionStorage.getItem("status") !== null ? (
            <li>
              <Link to="/">Home</Link>
            </li>
          ) : null}
          {sessionStorage.getItem("status") !== null ? (
            <li>
              <Link to="/habit">Create Habit</Link>
            </li>
          ) : null}
        </ul>
        {sessionStorage.getItem("status") !== null ? (
          <form onSubmit={onSubmit}>
            <button type="submit">Logout</button>
          </form>
        ) : null}
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
