import axios from "axios";

export default function DeleteForm({ _id }) {
  const submitFormDelete = (event, _id) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/habit/delete", {
        habit_id: _id,
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("An unexpected error has occured");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={(event) => submitFormDelete(event, _id)}>
      <button type="submit" className="btn btn-danger">
        Delete Habit
      </button>
    </form>
  );
}
