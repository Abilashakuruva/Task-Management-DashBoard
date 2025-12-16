import React, { useContext, useEffect, useState } from 'react';
import Column from './Column';
import TaskForm from './TaskForm';
import { DragDropContext} from '@hello-pangea/dnd';
import { getTasks, saveTasks } from "../utils/storage";
import { AuthContext } from '../contexts/AuthContext';



const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const { logout, currentUser } = useContext(AuthContext);


  useEffect(() => {
       setTasks(getTasks());
  }, []);

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    if (!destination.droppableId.startsWith("user-")) return;

  const userIdStr = destination.droppableId.split("-")[1];
  const userId = userIdStr === "null" ? null : Number(userIdStr);

    const updatedTasks = tasks.map(task =>
      String(task.id) === draggableId ? { ...task, assigneeId: userId } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const assignTask = (taskId, userId) => {
    const updated = tasks.map(t =>
      t.id === taskId ? { ...t, assigneeId: userId } : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const addTask = (task) => {
    const newTask = { ...task,id: Date.now(), assigneeId:task.assigneeId || null };
    const updatedTasks = [...tasks, newTask];
  setTasks(updatedTasks);
  saveTasks(updatedTasks);
    setShowForm(false);
  };


  return (
    <div className='board'>
      <div className='app'>
          <h1 className='header'>Task Management Dashboard</h1>
          <button className='logoutbtn' onClick={logout}>Logout</button>
          
        </div>

      <button className='add-button'  onClick={() => setShowForm(true)}>+ Add New Task</button>

      {showForm && (<TaskForm users={users.filter(u => u.role === "user")}  onSave={addTask} /> )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div  className='board-columns'>
          

           <Column
      key="unassigned"
      title="Unassigned"
      droppableId="user-null"
      tasks={tasks.filter(t => !t.assigneeId)}
      users={users}
    />

    {users.filter(u => u.role === "user").map(user => (
      <Column
        key={user.id}
        title={user.username}
        droppableId={`user-${user.id}`}
        tasks={tasks.filter(t => t.assigneeId === user.id)}
        users={users}
      />
    ))}

          
        </div>
      </DragDropContext>    
      
    </div>
  );
};

export default Board;
