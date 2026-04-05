import { useState, useEffect } from 'react'

export default function ApiTodos() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTodos = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await res.json()
      setTodos(data.slice(0, 10))
    } catch (err) {
      setError('불러오기 실패')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  if (isLoading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchTodos}>다시시도</button>
      </div>
    )
  }

  return (
    <div>
      <h2>API 목록</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}