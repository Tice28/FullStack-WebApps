export default function CompleteForm({ func, _id, status }) {
  return (
    <form onSubmit={(event) => func(event, _id, status)}>
      <button type="submit">Complete</button>
    </form>
  );
}
