import React, { useState, useEffect } from 'react';
import './assets/styles/main.css';
import Filter from './components/task/Filter';
import TaskForm from './components/task/TaskForm';
import TaskList from './components/task/TaskList';
import apiService from './services/apiService';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const data = await apiService.request('GET', '/tasks/get_tasks');
    if (data.success) {
      setTasks(data.message);
    } else {
      alert(data.message);
    }
  };

  const addTask = async (task) => {
    const data = await apiService.request('POST', '/tasks/create_task', task);
    if (data.success) {
      setTasks([...tasks, data.message])
    } else {
      alert(data.message);
    }
  };

  const updateTask = async (id, updatedTask) => {
    const data = await apiService.request('PUT', `/tasks/update_task/${id}`, updatedTask);
    if (data.success) {
      let index = tasks.findIndex(item => item._id === id);
      let updatedData = [...tasks];
      updatedData[index] = data.message;
      setTasks(updatedData);
    } else {
      alert(data.message);
    }
  };

  const deleteTask = async (id) => {
    const data = await apiService.request('DELETE', `/tasks/delete_task`, {id: id});
    if (data.success) {
      setTasks(tasks.filter(task => task._id !== id))
    } else {
      alert(data.message);
    }
  };

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className="App">
      <h1 className='jumbotron'>Task Management</h1>
      <TaskForm addTask={addTask} />
      <Filter filter={filter} setFilter={setFilter} />
      <TaskList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
