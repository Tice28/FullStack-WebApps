import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HabitForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (sessionStorage.getItem("status") == null) {
      axios
        .get("http://localhost:8000/api/user")
        .then((response) => {
          sessionStorage.setItem("status", "loggedIn");
        })
        .catch((error) => {
          if (error.status === 403) {
            navigate("/login");
          } else {
            alert("An error has occured. Please login and try again.");
          }
        });
    }
  }, [navigate]);

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/habit/create", { title: title })
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h1>HabitForm</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="title" className="form-label">
          Habit Title
        </label>
        <input
          id="title"
          type="text"
          className="form-control"
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </>
  );
};

export default HabitForm;
