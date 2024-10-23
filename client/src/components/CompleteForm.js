import axios from "axios";

export default function CompleteForm({ _id, handler }) {
  const submitFormComplete = (event, _id) => {
    axios
      .post("http://localhost:8000/api/habit/update", {
        habit_id: _id,
        habit_status: "complete",
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("An unexpected error has occured");
        }
        handler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={(event) => submitFormComplete(event, _id)}>
      <button type="submit" className="btn btn-primary">
        Complete
      </button>
    </form>
  );
}
