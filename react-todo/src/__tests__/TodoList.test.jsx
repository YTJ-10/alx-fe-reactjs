import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the component renders
    expect(screen.getByTestId('todo-container')).toBeInTheDocument();
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if todo count is displayed
    expect(screen.getByTestId('todo-count')).toHaveTextContent('Total: 3');
  });

  test('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find input and button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Type new todo
    await user.type(input, 'New Test Todo');
    
    // Click add button
    await user.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    expect(screen.getByTestId('todo-count')).toHaveTextContent('Total: 4');
    
    // Check if input is cleared after adding
    expect(input).toHaveValue('');
  });

  test('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const initialTodoCount = screen.getByTestId('todo-count').textContent;
    const addButton = screen.getByTestId('add-button');
    
    // Click add button without typing anything
    await user.click(addButton);
    
    // Todo count should remain the same
    expect(screen.getByTestId('todo-count')).toHaveTextContent(initialTodoCount);
  });

  test('toggles todo completion status when todo text is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find a todo item
    const todoText = screen.getByTestId('todo-text-1'); // "Learn React"
    
    // Click to toggle completion
    await user.click(todoText);
    
    // Check if todo is marked as completed (should have 'completed' class)
    const todoItem = screen.getByTestId('todo-item-1');
    expect(todoItem).toHaveClass('completed');
    
    // Click again to toggle back
    await user.click(todoText);
    expect(todoItem).not.toHaveClass('completed');
  });

  test('toggles todo completion using toggle button', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find toggle button for first todo
    const toggleButton = screen.getByTestId('toggle-button-1');
    
    // Initial button should say "Complete"
    expect(toggleButton).toHaveTextContent('Complete');
    
    // Click to complete
    await user.click(toggleButton);
    
    // Button should now say "Undo"
    expect(toggleButton).toHaveTextContent('Undo');
    expect(screen.getByTestId('todo-item-1')).toHaveClass('completed');
    
    // Click to undo
    await user.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Complete');
    expect(screen.getByTestId('todo-item-1')).not.toHaveClass('completed');
  });

  test('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const initialTodoCount = screen.getByTestId('todo-count');
    const initialCount = parseInt(initialTodoCount.textContent.match(/Total: (\d+)/)[1]);
    
    // Find and click delete button for first todo
    const deleteButton = screen.getByTestId('delete-button-1');
    await user.click(deleteButton);
    
    // Check if todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.getByTestId('todo-count')).toHaveTextContent(`Total: ${initialCount - 1}`);
  });

  test('displays empty message when no todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByText('Delete');
    
    for (const button of deleteButtons) {
      await user.click(button);
    }
    
    // Wait for all deletions to complete
    await waitFor(() => {
      expect(screen.getByTestId('empty-message')).toBeInTheDocument();
      expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });
    
    // Add a new todo to clear empty message
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    await user.type(input, 'New Todo');
    await user.click(addButton);
    
    expect(screen.queryByTestId('empty-message')).not.toBeInTheDocument();
  });

  test('updates todo statistics correctly', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Check initial stats
    const stats = screen.getByTestId('todo-count');
    expect(stats).toHaveTextContent('Total: 3 | Completed: 1 | Pending: 2');
    
    // Toggle a todo to complete
    await user.click(screen.getByTestId('toggle-button-1'));
    expect(stats).toHaveTextContent('Total: 3 | Completed: 2 | Pending: 1');
    
    // Delete a todo
    await user.click(screen.getByTestId('delete-button-1'));
    expect(stats).toHaveTextContent('Total: 2 | Completed: 1 | Pending: 1');
  });
});