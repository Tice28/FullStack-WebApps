import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1>Login</h1>
      <form>
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
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
