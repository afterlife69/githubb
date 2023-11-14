import React, { useState } from 'react';
import axios from 'axios';
import Menu from "./menu"
function AdminApp() {
  const [rollno, setRollno] = useState('');

  const handleSubmit = async (e) => {
    if(rollno.length!=10){
      alert('Enter Valid Roll No');
      return;
    }
    e.preventDefault();
    try {
      await axios.put(`http://localhost:6969/present/${rollno}`);
      alert('Student marked as present.');
    } catch (error) {
      alert(error.response.data.err)
    }
  };

  return (
    <div>
        <Menu />
        <br />
      <h1>Give Your Attendance Here</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter roll number"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          maxLength={10}
          size={10}
          style={{width:"250px",height:"40px",fontSize:'19px'}}
        />
        <button type="submit"
        style={{height:"30px",marginLeft:'10px'}}
        >Mark as Present</button>
      </form>
    </div>
  );
}

export default AdminApp;