import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [errors, setErrors] = useState(null);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
      })
      .then((response) => {
        //TODO: Change to take habit array and map
        setHabits([response.data.authorizedData.email]);
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div id="errors">
        <ul>{errors !== null ? <li>{errors}</li> : null}</ul>
      </div>
      <ul id="habits">
        {habits.length !== 0 ? (
          habits.map((habit) => <li>{habit}</li>)
        ) : (
          <li>Habits list empty!</li>
        )}
      </ul>
    </>
  );
};

export default Home;
