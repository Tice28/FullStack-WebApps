import { dateNow } from "../Date";
import { useState } from "react";
import CompleteForm from "./CompleteForm";
import NonCompleteForm from "./NonCompleteForm";
import DeleteForm from "./DeleteForm";

export default function Habit({ habit }) {
  const [habitStatus, setHabitStatus] = useState(
    habit.datesCompleted.includes(dateNow())
  );

  function completeHanlder() {
    if (habitStatus) {
      setHabitStatus(false);
    } else {
      setHabitStatus(true);
    }
  }

  console.log(habit);
  return (
    <li key={habit._id}>
      {habit.title}
      {habitStatus === true ? (
        <NonCompleteForm
          _id={habit._id}
          handler={completeHanlder}
        ></NonCompleteForm>
      ) : (
        <CompleteForm _id={habit._id} handler={completeHanlder}></CompleteForm>
      )}
      <DeleteForm _id={habit._id}></DeleteForm>
    </li>
  );
}
