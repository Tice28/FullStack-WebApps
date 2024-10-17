import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (sessionStorage.getItem("status") == null) {
      axios
        .get("http://localhost:8000/api/user")
        .then((response) => {
          sessionStorage.setItem("status", "loggedIn");
          navigate("/");
        })
        .catch((error) => {
          if (error.status === 403) {
            navigate("/login");
          } else {
            setErrors(error.response.data);
          }
        });
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("status", "loggedIn");
        navigate("/");
      })
      .catch((error) => {
        try {
          setErrors(error.response.data);
        } catch (err) {
          console.log(err);
          setErrors("An error has occured.");
        }
      });
  };

  return (
    <>
      <h1>Login</h1>
      <div id="errors">
        <ul>{errors !== null ? <li>{errors}</li> : null}</ul>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
