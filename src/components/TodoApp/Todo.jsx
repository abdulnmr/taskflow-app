import React, { useState, useEffect, useRef } from 'react';
import './Todo.css';

// Real SVG Icons
const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const UncheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
  </svg>
);

const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const CategoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/>
  </svg>
);

const PriorityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"/>
  </svg>
);

const ThemeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
  </svg>
);

// TaskFlow Logo (TF)
const TaskFlowLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
    <circle cx="16" cy="16" r="16" fill="#2E8B57"/>
    <text x="16" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TF</text>
  </svg>
);

// Main Component
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [categories, setCategories] = useState(['Work', 'Personal', 'Shopping', 'Health']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  
  const inputRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('taskflow-todos');
    const savedSettings = localStorage.getItem('taskflow-settings');
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setDarkMode(settings.darkMode);
      setCategories(settings.categories);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('taskflow-todos', JSON.stringify(todos));
    localStorage.setItem('taskflow-settings', JSON.stringify({
      darkMode,
      categories
    }));
  }, [todos, darkMode, categories]);

  // Add new task
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now() + Math.random(),
        text: inputValue,
        completed: false,
        createdAt: new Date(),
        dueDate: dueDate || null,
        priority: priority,
        category: selectedCategory !== 'All' ? selectedCategory : 'General',
        completedAt: null
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
      setDueDate('');
      setPriority('medium');
    }
  };

  // Delete task
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { 
        ...todo, 
        completed: !todo.completed,
        completedAt: !todo.completed ? new Date() : null
      } : todo
    ));
  };

  // Start editing
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setDueDate(todo.dueDate || '');
    setPriority(todo.priority);
    setSelectedCategory(todo.category);
  };

  // Save editing
  const saveEdit = () => {
    setTodos(todos.map(todo =>
      todo.id === editingId ? {
        ...todo,
        text: editText,
        dueDate: dueDate || null,
        priority: priority,
        category: selectedCategory
      } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // Clear all completed
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Add new category
  const addCategory = () => {
    const newCategory = prompt('Enter new category name:');
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        cancelEdit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Filter and sort todos
  const filteredAndSortedTodos = todos
    .filter(todo => {
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;
      
      if (searchTerm && !todo.text.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      if (selectedCategory !== 'All' && todo.category !== selectedCategory) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        default:
          return 0;
      }
    });

  // Statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const overdueTodos = todos.filter(todo => 
    !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
  ).length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44ff44';
      default: return '#666';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Work': '#667eea',
      'Personal': '#764ba2', 
      'Shopping': '#f093fb',
      'Health': '#4ecdc4',
      'General': '#95a5a6'
    };
    return colors[category] || '#95a5a6';
  };

  return (
    <div className={`todo-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header - Simple without name */}
      <div className="todo-header">
        <div className="header-top">
          <div className="logo-section">
            <div className="app-logo">
              <TaskFlowLogo />
            </div>
            <div className="brand-text">
              <h1>TaskFlow Pro</h1>
              <p>Professional Task Management</p>
            </div>
          </div>
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <ThemeIcon />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-number">{totalTodos}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{activeTodos}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedTodos}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{overdueTodos}</span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>

      {/* Main Input Section */}
      <div className="input-section">
        <div className="input-with-icon">
          <input 
            ref={inputRef}
            type="text"
            placeholder="What needs to be done? (Ctrl+K to focus)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="todo-input"
          />
        </div>
        
        <div className="input-options">
          <div className="option-with-icon">
            <CategoryIcon />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="option-with-icon">
            <PriorityIcon />
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          
          <div className="option-with-icon">
            <CalendarIcon />
            <input 
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="date-input"
              placeholder="Due date"
            />
          </div>
        </div>
        
        <button onClick={addTodo} className="add-btn">
          <AddIcon />
          Add Task
        </button>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="search-filter">
          <div className="search-with-icon">
            <SearchIcon />
            <input 
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
          </select>
        </div>

        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({totalTodos})
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeTodos})
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedTodos})
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="todo-list">
        {filteredAndSortedTodos.map(todo => (
          <div 
            key={todo.id} 
            className={`todo-item ${todo.completed ? 'completed' : ''} ${
              todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed ? 'overdue' : ''
            }`}
          >
            {editingId === todo.id ? (
              // Edit Mode
              <div className="edit-mode">
                <input 
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                  autoFocus
                />
                <div className="edit-actions">
                  <button onClick={saveEdit} className="save-btn">
                    <CheckIcon /> Save
                  </button>
                  <button onClick={cancelEdit} className="cancel-btn">
                    <DeleteIcon /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div className="todo-main">
                  <div className="todo-checkbox" onClick={() => toggleComplete(todo.id)}>
                    {todo.completed ? <CheckIcon /> : <UncheckIcon />}
                  </div>
                  
                  <div className="todo-content">
                    <div className="todo-text">{todo.text}</div>
                    <div className="todo-meta">
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(todo.priority) }}
                      >
                        {todo.priority}
                      </span>
                      <span 
                        className="category-badge"
                        style={{ backgroundColor: getCategoryColor(todo.category) }}
                      >
                        {todo.category}
                      </span>
                      {todo.dueDate && (
                        <span className={`due-date ${new Date(todo.dueDate) < new Date() && !todo.completed ? 'overdue' : ''}`}>
                          <CalendarIcon />
                          {new Date(todo.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="todo-actions">
                  <button 
                    onClick={() => startEditing(todo)}
                    className="edit-btn"
                    title="Edit task"
                  >
                    <EditIcon />
                  </button>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                    title="Delete task"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        
        {filteredAndSortedTodos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h3>No tasks found</h3>
            <p>
              {searchTerm ? 'Try changing your search terms' : 
               selectedCategory !== 'All' ? 'No tasks in this category' :
               'Add your first task to get started!'}
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="footer-actions">
        <div className="footer-stats">
          <span>
            {activeTodos} active • {completedTodos} completed • 
            {overdueTodos} overdue
          </span>
        </div>
        
        <div className="footer-buttons">
          {completedTodos > 0 && (
            <button onClick={clearCompleted} className="clear-btn">
              Clear Completed ({completedTodos})
            </button>
          )}
        </div>
      </div>

      {/* Personal Branding Footer - Only at the end */}
      <div className="personal-branding-footer">
        <div className="branding-content">
          <div className="developer-card">
            <div className="developer-avatar">
              <TaskFlowLogo />
            </div>
            <div className="developer-info">
              <h3>Malik Abdul</h3>
              <p className="developer-title">Mern Stack DEveloper</p>
              <p className="developer-desc">
                Creating beautiful, functional web applications with modern technologies.
                Specialized in React, JavaScript, and responsive design.
              </p>
              <div className="developer-skills">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">CSS3</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <p>© 2025 TaskFlow Pro. Designed & Developed by <strong>Malik Abdul</strong></p>
          <div className="contact-links">
            <a href="mailto:malikabdul8595@gmail.com" className="contact-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              malikabdul8595@gmail.com
            </a>
            
            <a href="https://www.instagram.com/abdulyarr?igsh=NW1hc3R3emd5Y3V4" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @abdulyarr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;