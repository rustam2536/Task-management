import React from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
    const handleStatusChange = (e) => {
        const updatedTask = { ...task, status: e.target.value };
        updateTask(task._id, { status: updatedTask.status });
    };

    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className='d-flex justify-content-between'>
                <select value={task.status} onChange={handleStatusChange}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <button className='btn btn-danger btn-xs' onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;