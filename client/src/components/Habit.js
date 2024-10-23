import { dateNow } from "../Date";
import { useState } from "react";
import CompleteForm from "./CompleteForm";
import NonCompleteForm from "./NonCompleteForm";
import DeleteForm from "./DeleteForm";
import HabitChart from "./HabitChart";

export default function Habit({ habit }) {
  const [habitStatus, setHabitStatus] = useState(
    habit.datesCompleted.includes(dateNow())
  );

  function completeHandler() {
    if (habitStatus) {
      setHabitStatus(false);
    } else {
      setHabitStatus(true);
    }
  }

  return (
    <li className="list-group-item habit">
      <h3>{habit.title}</h3>
      <div className="habit-options">
        {habitStatus === true ? (
          <NonCompleteForm
            _id={habit._id}
            handler={completeHandler}
          ></NonCompleteForm>
        ) : (
          <CompleteForm
            _id={habit._id}
            handler={completeHandler}
          ></CompleteForm>
        )}
        <DeleteForm _id={habit._id}></DeleteForm>
      </div>

      <HabitChart
        dates={habit.datesCompleted}
        className="habit-chart-container"
      ></HabitChart>
    </li>
  );
}
