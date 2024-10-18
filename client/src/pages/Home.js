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

  const submitFormComplete = (event, id) => {
    console.log(id);
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/habit/update", { _id: id })
      .then((response) => {
        if (response.status === 200) {
          console.log(event);
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitFormDelete = (event, id) => {
    event.preventDefault();
    console.log(id);
  };

  return (
    <>
      <h1>Home</h1>
      <div id="errors">
        <ul>{errors !== null ? <li>{errors}</li> : null}</ul>
      </div>
      <ul id="habits">
        {habits.length !== 0 ? (
          habits.map((habit) => (
            <li key={habit._id}>
              {habit.title}
              <form onSubmit={(event) => submitFormComplete(event, habit._id)}>
                <button type="submit" value={habit._id}>
                  Complete
                </button>
              </form>
              <form onSubmit={(event) => submitFormDelete(event, habit._id)}>
                <button type="submit">Delete</button>
              </form>
            </li>
          ))
        ) : (
          <li>Habits list empty!</li>
        )}
      </ul>
    </>
  );
};

export default Home;
