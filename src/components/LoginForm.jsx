
import { useContext,useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';



const LoginForm = ({}) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      alert("Invalid username or password");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: user.id,
        username: user.username,
        role: user.role
      })
    );

    login(user);


    
  };

  return (
    <form className='authform' onSubmit={handleSubmit}>
      <h1>Login</h1>

      <label> Name </label>
      <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter your name'  required/>
      <label> Password </label>
      <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password' required />
      <button type="submit">Sign in</button>

    </form>
  );
};

export default LoginForm;