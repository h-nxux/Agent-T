import { useState } from 'react';

export default function TaskList({ todos, onToggle, onDelete, onUpdate }) {
  if (todos.length === 0) {
    return <p>할 일을 추가해주세요</p>;
  }

  return (
    <div>
      <h2>목록 ({todos.length})</h2>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim() === '') return
    onUpdate(todo.id, editText)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    <li>
      {isEditing? <input value={editText}
            onChange={e => setEditText(e.target.value)}
          />
        : <span
            style={{
              textDecoration: todo.done ? 'line-through' : 'none'
            }}
          >
            {todo.text}
          </span>
      }

      {isEditing
        ? <>
            <button onClick={handleSave}>저장</button>
            <button onClick={handleCancel}>취소</button>
          </>
        : <>
            <button onClick={() => onToggle(todo.id)}>
              {todo.done ? '취소' : '완료'}
            </button>
            <button onClick={() => onDelete(todo.id)}>삭제</button>
            <button onClick={() => setIsEditing(true)}>
              수정
            </button>
          </>
      }
    </li>
  )
}