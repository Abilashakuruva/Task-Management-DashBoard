import React, { useContext, useEffect, useState  } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { getTasks, saveTasks } from "../utils/storage";


const UserDashBoard = () => {
      const { logout, currentUser } = useContext(AuthContext);
      const[tasks,setTasks]=useState([]);

       useEffect(() => {
    if (!currentUser) return;

    const allTasks = getTasks();
    const userTasks = allTasks.filter(
      task => task.assigneeId === currentUser.id
    );

    setTasks(userTasks);
  }, [currentUser]);

  const toggleComplete = (taskId) => {
    const allTasks = getTasks();

    const updatedTasks = allTasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" }
        : task
    );

    saveTasks(updatedTasks);

    setTasks(updatedTasks.filter(task => task.assigneeId === currentUser.id));
  };
    
  return (
    
      <div className='board'>

      <div className='app'>
          <h1 className='header'>Welcome {currentUser?.username}</h1>
          <button className='logoutbtn' onClick={logout}>Logout</button>          
        </div>

        <div className="task-list">
        {tasks.length === 0 && <p>No tasks assigned</p>}

        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            

            <p>
              Status:{" "}
              <strong
                style={{
                  color: task.status === "Completed" ? "green" : "orange"
                }}
              >
                {task.status}
              </strong>
            </p>
            <label>
              <input
                type="checkbox"
                checked={task.status === "Completed"}
                onChange={() => toggleComplete(task.id)}
              />
              Completed
            </label>
          </div>
        ))}
      </div>

    </div>
  )
}

export default UserDashBoard
