import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: true },
    { id: 3, text: 'Write Tests', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container" data-testid="todo-container">
      <h1>Todo List</h1>
      
      <form onSubmit={addTodo} className="todo-form" data-testid="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
          data-testid="todo-input"
        />
        <button type="submit" className="add-btn" data-testid="add-button">
          Add Todo
        </button>
      </form>

      <div className="todo-stats">
        <p data-testid="todo-count">
          Total: {todos.length} | Completed: {todos.filter(t => t.completed).length} | Pending: {todos.filter(t => !t.completed).length}
        </p>
      </div>

      <ul className="todo-list" data-testid="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message" data-testid="empty-message">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              data-testid={`todo-item-${todo.id}`}
            >
              <span
                className="todo-text"
                onClick={() => toggleTodo(todo.id)}
                data-testid={`todo-text-${todo.id}`}
              >
                {todo.text}
              </span>
              <div className="todo-actions">
                <button
                  className={`toggle-btn ${todo.completed ? 'undo' : 'complete'}`}
                  onClick={() => toggleTodo(todo.id)}
                  data-testid={`toggle-button-${todo.id}`}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  data-testid={`delete-button-${todo.id}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;