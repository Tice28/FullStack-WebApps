import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HabitForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const submitForm = (e) => {
    console.log(title);
    navigate("/");
  };
  return (
    <>
      <h1>HabitForm</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Habit Title</label>
        <input
          id="title"
          type="text"
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default HabitForm;
