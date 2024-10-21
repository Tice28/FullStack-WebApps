import Habit from "./Habit";

export default function HabitList({ habits }) {
  return (
    <ul id="habits">
      {habits.length !== 0 ? (
        habits.map((habit) => {
          return <Habit habit={habit}></Habit>;
        })
      ) : (
        <li>Habits list empty!</li>
      )}
    </ul>
  );
}
