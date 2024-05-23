import { useState, useRef } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    //タスクを追加
    const name = todoNameRef.current.value
    if(name === ""){
      return
    }
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }]
    })
    todoNameRef.current.value = null
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  const todoNameRef = useRef()

  const hundleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type='text' ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={hundleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length} </div>
    </div>
  );
}

export default App;
