import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

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
        <button type="submit">Signup</button>
      </form>
    </>
  );
};

export default Signup;
