import moment from "moment";

export default function HabitChart({ dates }) {
  let days = [];
  for (let i = 0; i < 365; i++) {
    if (
      moment().subtract(i, "days").format("YYYY/MM/D") ===
      dates[dates.length - 1]
    ) {
      days.unshift(<div key={i} className="day-complete"></div>);
      dates.splice(dates.length - 1, 1);
    } else {
      days.unshift(<div key={i} className="day-incomplete"></div>);
    }
  }

  return (
    <div className="habit-chart-div">
      <h4>Habit Completion (Past 365 days)</h4>
      <div className="habit-chart">{days}</div>
    </div>
  );
}
