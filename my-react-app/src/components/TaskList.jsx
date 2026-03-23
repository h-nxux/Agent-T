export default function TaskList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p>할 일을 추가해주세요</p>;
  }

  return (
    <div>
      <h2>목록 ({todos.length})</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.done ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => onToggle(todo.id)}>
              {todo.done ? '취소' : '완료'}
            </button>

            <button onClick={() => onDelete(todo.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

