import React, { useState } from 'react';

const TaskForm = ({ users=[] , onSave }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [assigneeId, setAssigneeId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title|| !assigneeId){ 
      alert('Title and Assignee are required');
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description:desc,
      assigneeId: Number(assigneeId),
      status: "Pending"
      
    };
    onSave(newTask);
    setTitle("");
    setDesc("");
    setAssigneeId("");
  };

  return (
    <form onSubmit={handleSubmit}  className="task-form">
      <h3>Create Task</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <select value={assigneeId|| ""} onChange={e => setAssigneeId(e.target.value) || null} >
        <option value="">Assign to User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
