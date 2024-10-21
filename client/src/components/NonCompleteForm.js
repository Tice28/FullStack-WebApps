import axios from "axios";

export default function NonCompleteForm({ _id, handler }) {
  const submitFormIncomplete = (event, _id) => {
    axios
      .post("http://localhost:8000/api/habit/update", {
        habit_id: _id,
        habit_status: "incomplete",
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("An unexpected error has occured");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    handler();
  };
  return (
    <form onSubmit={(event) => submitFormIncomplete(event, _id)}>
      <button type="submit">Undo Completion</button>
    </form>
  );
}
