import { useState } from 'react';
import TextInput from './components/TextInput';
import TaskList from './components/TaskList';
import UserProfile from './components/UserProfile';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('all') // 필터 탭 상태

  const addTodo = () => { // 함수형 State로 업데이트
    if (input.trim() === '') return;
    setTodos(curr => [
      ...curr,        
    { id: Date.now(), text: input, done: false }
  ]);
  setInput('');
  };

  const toggleTodo = (id) => { // -> 함수형  state로 업데이트
    setTodos(curr => curr.map(todo =>   
      todo.id === id ? { ...todo, done: !todo.done } : todo
  ));
  };

  const deleteTodo = (id) => { // -> 함수형  state로 업데이트
    setTodos(curr => curr.filter(todo => todo.id !== id));  
  };

  const updateTodo = (id, newText) => {
    setTodos(curr => curr.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const filteredTodos = todos.filter(todo => { // 필터링 기능 
    if (activeTab === 'all') return true
    if (activeTab === 'done') return todo.done
  if (activeTab === 'notDone') return !todo.done
  })

  return (
    <div>
      <h1>📝 TodoList</h1>
      <UserProfile />
      <div>
  <button
    onClick={() => setActiveTab('all')} // 필터링 탭 ui
    style={{
      fontWeight: activeTab === 'all' ? 'bold' : 'normal'
    }}
  >
    전체
  </button>

  <button
    onClick={() => setActiveTab('done')}
    style={{
      fontWeight: activeTab === 'done' ? 'bold' : 'normal'
    }}
  >
    완료
  </button>

  <button
    onClick={() => setActiveTab('notDone')}
    style={{
      fontWeight: activeTab === 'notDone' ? 'bold' : 'normal'
    }}
  >
    미완료
  </button>
</div>
      <TextInput value={input} onChange={setInput} onAdd={addTodo} />
      <TaskList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
      
    </div>
  );
}
