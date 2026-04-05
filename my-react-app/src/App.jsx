import { useReducer, useState, useEffect } from 'react';
import TextInput from './components/TextInput';
import TaskList from './components/TaskList';
import ApiTodos from './components/ApiTodos';
import useLocalStorage from './hooks/useLocalStorage';

function todosReducer(todos, action) {
  if (action.type === 'ADD') {
    return [...todos, { id: Date.now(), text: action.text, done: false }]
  }
  if (action.type === 'TOGGLE') {
    return todos.map(todo =>
      todo.id === action.id ? { ...todo, done: !todo.done } : todo
    )
  }
  if (action.type === 'DELETE') {
    return todos.filter(todo => todo.id !== action.id)
  }
  if (action.type === 'UPDATE') {
    return todos.map(todo =>
      todo.id === action.id ? { ...todo, text: action.text } : todo
    )
  }
  return todos
}

export default function App() {
  const [savedTodos, setSavedTodos] = useLocalStorage('todos', [])
  const [todos, dispatch] = useReducer(todosReducer, savedTodos)
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    setSavedTodos(todos)
  }, [todos])

  const addTodo = () => {
    if (input.trim() === '') return;
    dispatch({ type: 'ADD', text: input })
    setInput('');
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE', id })
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE', id })
  };

  const updateTodo = (id, text) => {
    dispatch({ type: 'UPDATE', id, text })
  }

  const filteredTodos = todos.filter(todo => {
    if (activeTab === 'all') return true
    if (activeTab === 'done') return todo.done
    if (activeTab === 'notDone') return !todo.done
  })

  return (
    <div>
      <h1>📝 TodoList</h1>

      <div>
        <button
          onClick={() => setActiveTab('all')}
          style={{ fontWeight: activeTab === 'all' ? 'bold' : 'normal' }}
        >
          전체
        </button>
        <button
          onClick={() => setActiveTab('done')}
          style={{ fontWeight: activeTab === 'done' ? 'bold' : 'normal' }}
        >
          완료
        </button>
        <button
          onClick={() => setActiveTab('notDone')}
          style={{ fontWeight: activeTab === 'notDone' ? 'bold' : 'normal' }}
        >
          미완료
        </button>
      </div>

      <TextInput value={input} onChange={setInput} onAdd={addTodo} />
      <TaskList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />

      <ApiTodos />
    </div>
  );
}