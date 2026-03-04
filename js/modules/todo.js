// [EN] To-do List Module
// [VN] Module Danh sách công việc

import { getStorageData, setStorageData } from '../utils/storage.js';

const TODOS_STORAGE_KEY = 'studyhub_todos';

// [EN] Exported to be called when view changes
// [VN] Được export để gọi khi chuyển đổi giao diện
export function fetchTodos() {
    const todos = getStorageData(TODOS_STORAGE_KEY, []);
    renderTodos(todos);
}

function renderTodos(todos) {
    const todoListEl = document.getElementById('todo-list');
    if (!todoListEl) return;
    todoListEl.innerHTML = '';
    
    if (todos.length === 0) {
         todoListEl.innerHTML = '<p class="todo-login-prompt">No tasks yet. Add one!</p>';
    }

    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', todo.id);
        
        li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-item-controls">
                <button class="complete-btn" title="Complete"><i class="ph-fill ${todo.completed ? 'ph-check-circle' : 'ph-circle'}"></i></button>
                <button class="delete-btn" title="Delete"><i class="ph-fill ph-trash"></i></button>
            </div>
        `;
        todoListEl.appendChild(li);

        li.querySelector('.complete-btn').addEventListener('click', () => {
            toggleTodoStatus(todo.id, !todo.completed);
        });
        li.querySelector('.delete-btn').addEventListener('click', () => {
            deleteTodo(todo.id);
        });
    });
}

function toggleTodoStatus(id, isCompleted) {
    const todos = getStorageData(TODOS_STORAGE_KEY, []);
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
        todoToUpdate.completed = isCompleted;
        setStorageData(TODOS_STORAGE_KEY, todos);
        renderTodos(todos);
    }
}

function deleteTodo(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        let todos = getStorageData(TODOS_STORAGE_KEY, []);
        todos = todos.filter(todo => todo.id !== id);
        setStorageData(TODOS_STORAGE_KEY, todos);
        renderTodos(todos);
    }
}

export function initTodo() {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');

    if(addTodoBtn) {
        addTodoBtn.addEventListener('click', () => {
            const text = todoInput.value.trim();
            if (text) {
                const newTodo = { id: Date.now(), text: text, completed: false };
                const todos = getStorageData(TODOS_STORAGE_KEY, []);
                todos.push(newTodo);
                setStorageData(TODOS_STORAGE_KEY, todos);
                todoInput.value = '';
                renderTodos(todos);
            }
        });
    }

    if(todoInput) {
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodoBtn.click();
        });
    }
}