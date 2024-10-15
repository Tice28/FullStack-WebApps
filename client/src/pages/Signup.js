import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postSignup = () => {
    axios
      .post("http://localhost:8000/api/user", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={postSignup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label htmlFor="password">Email</label>
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
