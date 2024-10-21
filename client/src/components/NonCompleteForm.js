export default function NonCompleteForm({ func, _id, status }) {
  return (
    <form onSubmit={(event) => func(event, _id, status)}>
      <button type="submit">Undo Completion</button>
    </form>
  );
}
