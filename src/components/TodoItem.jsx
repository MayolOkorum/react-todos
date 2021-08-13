import React from 'react'

export function TodoItem({todo, toggleTodo}) {
    const { id, task, completed} = todo;
    
    const handleToDoClick = () => {
        toggleTodo(id)
    };
    

    return (
        <li>
            <input type="checkbox"  checked= {completed} onChange = {handleToDoClick}/>
            {task}
        </li>
    )
}
