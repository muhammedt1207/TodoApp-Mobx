import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { todoStore } from '../store/TodoStore';

const TodoApp: React.FC = observer(() => {
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = () => {
    if (task.trim()) {
      todoStore.addTodo(task.trim());
      setTask('');
    }
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (editingId !== null && editText.trim()) {
      todoStore.editTodo(editingId, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>MobX To-Do App</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.addButton}>
          Add Task
        </button>
      </div>
      <ul style={styles.todoList}>
        {todoStore.todos.map((todo) => (
          <li key={todo.id} style={styles.todoItem}>
            {editingId === todo.id ? (
              <div style={styles.editContainer}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={styles.editInput}
                />
                <button onClick={handleSaveEdit} style={styles.saveButton}>
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div style={styles.todoContent}>
                <span
                  onClick={() => todoStore.toggleTodo(todo.id)}
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.text}
                </span>
                <div>
                  <button
                    onClick={() => handleEditTodo(todo.id, todo.text)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => todoStore.removeTodo(todo.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TodoApp;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '300px',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  todoList: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '500px',
  },
  todoItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '10px',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  todoContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  todoText: {
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  editContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  editInput: {
    flexGrow: 1,
    padding: '8px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
  },
  saveButton: {
    padding: '5px 10px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginRight: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginRight: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
