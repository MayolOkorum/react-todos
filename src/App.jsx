import React, { useState, useRef, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { v4 as uuid } from 'uuid';

const KEY = 'todoApp.todos';
export function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            task: 'Tarea 1',
            completed: false
        },
    ]);

    const todoTaskRef = useRef();


    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY))

        if (storedTodos) {
            setTodos(storedTodos);
        }

    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos])


    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') {
            return
        };

        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuid(), task, completed: false }];
        });

        todoTaskRef.current.value = ''
    };

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed
        setTodos(newTodos);
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed)
        setTodos(newTodos);

    }

    const handleReset = () => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY))

        if (storedTodos) {
            setTodos(storedTodos);
        }
    }

    return (
        <>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoTaskRef} type='text' placeholder='Nueva Tarea' />
            <button onClick={handleTodoAdd}> + </button>
            <button onClick={handleClearAll}> delete </button>
            <button onClick={handleReset}>Reset All</button>
            <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
        </>
    );
}