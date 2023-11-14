import React, { useState } from 'react';
import axios from 'axios';
import Menu from './menu';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
function App() {
  const tid = useParams().id
  const [daata,setDaata] = useState({})

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(`http://localhost:6969/getTdata/${tid}`);
        setDaata(response.data);
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tid]);
  const [rollno, setRollno] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:6969/getstudents/${tid}`).then(async (res)=>{
          if(res.data.includes(rollno)){
            await axios.put(`http://localhost:6969/present/${rollno}`)
            alert('Student marked as present.');
          }
          else{
            alert('Student not assigned to this teacher');
          }
      })
    } catch (error) {
      alert('error')
    }
  };
  return (
    <div>
      <h1>Hello, {daata.name} ur class is {daata.classs} welcome to your account</h1>
      <h3>
        <br />
        <Link to={`/appp/${tid}`} style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Take Attendance</Link> &nbsp;&nbsp;
        <Link to={`/showdb/${tid}`} style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Manage Class</Link> &nbsp;&nbsp;
        <Link to="/" style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Logout</Link> &nbsp;&nbsp;
      </h3>
      <br />
      <h1>Give Your Attendance Here</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter roll number"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          style={{width:"250px",height:"40px",fontSize:'19px'}}
        />
        <button type="submit"
        style={{height:"30px",marginLeft:'10px'}}
        >Mark as Present</button>
      </form>
    </div>
  );
}

export default App;