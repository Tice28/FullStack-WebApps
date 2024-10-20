import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dateNow } from "../Date";
import CompleteForm from "../components/CompleteForm";

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

  const submitFormComplete = (event, index) => {
    axios
      .post("http://localhost:8000/api/habit/update", {
        habit_index: index,
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("An unexpected error has occured");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitFormDelete = (event, _id) => {
    axios
      .post("http://localhost:8000/api/habit/delete", {
        habit_id: _id,
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("An unexpected error has occured");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    //TODO: Fix index passing
    <>
      <h1>Home</h1>
      <div id="errors">
        <ul>{errors !== null ? <li>{errors}</li> : null}</ul>
      </div>
      <ul id="habits">
        {habits.length !== 0 ? (
          habits.map((habit, index) => (
            <li key={habit._id}>
              {habit.title}
              {habit.datesCompleted !== undefined ? (
                habit.datesCompleted.includes(dateNow()) === true ? null : (
                  <CompleteForm
                    func={submitFormComplete}
                    index={index}
                  ></CompleteForm>
                )
              ) : null}
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
