import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [errors, setErrors] = useState(null);
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user")
      .then((response) => {
        sessionStorage.setItem("status", "loggedIn");
        setHabits(response.data);
      })
      .catch((error) => {
        if (error.status === 403) {
          navigate("/login");
        } else {
          setErrors(error.response.data);
        }
      });
  }, [navigate]);

  return (
    <>
      <h1>Home</h1>
      <div id="errors">
        <ul>{errors !== null ? <li>{errors}</li> : null}</ul>
      </div>
      <ul id="habits">
        {habits.length !== 0 ? (
          habits.map((habit) => <li key={habit.title}>{habit.title}</li>)
        ) : (
          <li>Habits list empty!</li>
        )}
      </ul>
    </>
  );
};

export default Home;
