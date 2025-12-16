
import React,{useContext ,useEffect,useState} from 'react';
import Board from './components/Board';
import './App.css'
import {initUsers,initTasks} from './utils/storage';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { AuthContext } from "./contexts/AuthContext";
import UserDashBoard from './components/UserDashBoard';

const App = () => {
    const { currentUser } = useContext(AuthContext);


  useEffect(() => {
  initUsers();
  initTasks();
}, []);


  return(
    
        <div>
      <Routes>
        
        <Route path='/' element={ currentUser?(currentUser.role==="admin"?(<Navigate to ="/admin"/>):(<Navigate to="/user"/>)):( <LoginForm /> )}/>
        <Route path='/admin' element={currentUser?.role === "admin" ? <Board /> : <Navigate to="/" />}/>
        <Route path="/user" element={currentUser?.role === "user" ? <UserDashBoard/> : (<Navigate to="/" />)}/>
        
        
      </Routes>
      </div> 


  
  
   
  )
  
};

export default App;



