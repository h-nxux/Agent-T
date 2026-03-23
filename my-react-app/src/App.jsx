import { useState } from 'react';
import TextInput from './components/TextInput';
import TaskList from './components/TaskList';
import UserProfile from './components/UserProfile';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    
    setTodos([
      ...todos,
      { id: Date.now(), text: input, done: false }
    ]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>📝 TodoList</h1>
      <UserProfile />
      <TextInput value={input} onChange={setInput} onAdd={addTodo} />
      <TaskList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      
    </div>
  );
}
