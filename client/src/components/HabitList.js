import Habit from "./Habit";

export default function HabitList({ habits }) {
  return (
    <ul id="habits" className="list-group habit-list">
      {habits.length !== 0 ? (
        habits.map((habit, index) => {
          return <Habit habit={habit} key={index}></Habit>;
        })
      ) : (
        <li>Habits list empty!</li>
      )}
    </ul>
  );
}
