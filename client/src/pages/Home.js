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
        //TODO: Change to take habit array and map
        setHabits([response.data]);
      })
      .catch((error) => {
        if (error.status === 403) {
          navigate("/login");
        } else {
          setErrors(error.response.data);
        }
      });
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div id="errors">
        <ul>{errors !== null ? <li>{errors}</li> : null}</ul>
      </div>
      <ul id="habits">
        {habits.length === 0 ? (
          habits.map((habit) => <li>{habit}</li>)
        ) : (
          <li>Habits list empty!</li>
        )}
      </ul>
    </>
  );
};

export default Home;
