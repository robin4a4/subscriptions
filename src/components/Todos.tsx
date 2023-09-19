export function Todos({ data }: { data: any[] }) {
  return (
    <div>
      sdfsdfsdf
      {data
        ? data.map((todo) => <div key={todo.id}>{todo.title}</div>)
        : "Loading..."}
    </div>
  );
}
