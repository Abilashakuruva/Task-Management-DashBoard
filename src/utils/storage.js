
export const initUsers = () => {
  const users = localStorage.getItem("users");
  if (!users) {    
    const defaultUsers = [
      {
        id: 1,
        username: "admin",
        password: "admin123",
        role: "admin"
      },
      {
        id: 2,
        username: "user1",
        password: "user123",
        role: "user"
      },
      {
        id: 3,
        username: "user2",
        password: "user1234",
        role: "user"
      },
      {
        id: 4,
        username: "user3",
        password: "user12345",
        role: "user"
      }
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }
};


export const initTasks = () => {
  const tasks = localStorage.getItem("tasks");

  if (!tasks) {
    const defaultTasks = [
      {
        id: 101,
        title: "Design UI",
        description: "Create dashboard UI",
        assigneeId: 2,
        status: "Pending"
      },
       {
    id: 102,
    title: "Implement Login Flow",
    description: "Add role-based login using localStorage",
    assigneeId: 3,   
    status: "Pending"
  },
  {
    id: 103,
    title: "Fix Logout Issue",
    description: "Ensure logout clears context and redirects",
    assigneeId: 4,   
    status: "Completed"
  }
    ];

    localStorage.setItem("tasks", JSON.stringify(defaultTasks));
  }
};


export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};


export const getTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

