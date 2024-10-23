import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("status") !== null) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/user", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200) {
          navigate("/login");
        } else {
          setErrors("Unexpected error, please try again.");
        }
      })
      .catch(function (error) {
        try {
          setErrors(error.response.data);
        } catch (err) {
          setErrors("An error has occured.");
        }
      });
  };

  return (
    <>
      <h1>Signup</h1>
      <div id="errors">
        <ul>{errors !== null ? <li>{errors}</li> : null}</ul>
      </div>
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <button className="btn btn-secondary" type="submit">
          Signup
        </button>
      </form>
    </>
  );
};

export default Signup;
