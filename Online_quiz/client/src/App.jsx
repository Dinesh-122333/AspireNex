import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/login';
import StudentPage from './component/Studentpage';
import StaffPage from './component/Staffpage';
import StaffDashboard from './component/Staffdashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/student' element={<StudentPage/>}/>
        <Route path='/staff' element={<StaffPage/>}/> 
        <Route path='/sdash' element={<StaffDashboard/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
