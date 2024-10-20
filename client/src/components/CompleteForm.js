export default function CompleteForm({ func, index }) {
  return (
    <form onSubmit={(event) => func(event, index)}>
      <button type="submit">Complete</button>
    </form>
  );
}
