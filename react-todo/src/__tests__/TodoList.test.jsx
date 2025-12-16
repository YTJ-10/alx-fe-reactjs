import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render Test
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the component renders
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if form elements are present
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  // Test 2: Adding Todos
  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Type a new todo
    fireEvent.change(input, { target: { value: 'Test new todo' } });
    
    // Submit the form
    fireEvent.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('Test new todo')).toBeInTheDocument();
    
    // Check if input is cleared after adding
    expect(input.value).toBe('');
  });

  // Test 3: Toggling Todos
  test('toggles todo completion status', () => {
    render(<TodoList />);
    
    // Get the first todo
    const firstTodo = screen.getByText('Learn React');
    
    // Initially should not be completed
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle completion
    fireEvent.click(firstTodo);
    
    // Now should be completed (have line-through)
    expect(firstTodo).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(firstTodo);
    
    // Should not be completed again
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting Todos
  test('deletes a todo', () => {
    render(<TodoList />);
    
    // Check initial todos
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    
    // Get all delete buttons and click the first one
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Check if the todo was deleted
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check if other todos still exist
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Additional test: Empty todo should not be added
  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const initialTodoCount = screen.getAllByText(/Delete/).length;
    const addButton = screen.getByText('Add Todo');
    
    // Try to add empty todo
    fireEvent.click(addButton);
    
    // Todo count should remain the same
    expect(screen.getAllByText(/Delete/)).toHaveLength(initialTodoCount);
  });
});