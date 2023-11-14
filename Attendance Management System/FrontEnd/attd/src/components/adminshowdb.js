import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from "./menu"
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
const AdminShowdb = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:6969/getdata')
      .then((response) => {
        setData(response.data.data);
      })
  }, []);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:6969/delete/${id}`)
      .then(() => {
        axios.get('http://localhost:6969/getdata')
          .then((response) => {
            setData(response.data.data);
          });
      })
      .catch((error) => {
        alert(error.response.data.err)
      });
  };
  const handleUpdate = (e) => {
    let rollno = e
    axios.put(`http://localhost:6969/toggle/${rollno}`)
      .then(() => {
        axios.get('http://localhost:6969/getdata')
          .then((response) => {
            setData(response.data.data);
          });
      })
      .catch((error) => {
        alert(error.response.data.err)
      });
  };
  const Present = ()=>{
    axios.get('http://localhost:6969/getdata')
          .then((response) => {
            setData(response.data.data.filter((e)=>e.isPresent));
      });
  }
  const Absent = ()=>{
    axios.get('http://localhost:6969/getdata')
          .then((response) => {
            setData(response.data.data.filter((e)=> !e.isPresent));
      });
  }
  const showAll = () =>{
    axios.get('http://localhost:6969/getdata')
          .then((response) => {
            setData(response.data.data);
          });
  }

  return (
    <div align='center'>
        <Menu />
        <br />
        <h1>All students</h1>
        <br />
      <button onClick={() => Present()} style={{width:'150px',height:'30px',fontSize:'18px'}}>Show Presentees</button> &nbsp; &nbsp;
      <button onClick={() => Absent()} style={{width:'150px',height:'30px',fontSize:'18px'}}>Show Absentees</button> &nbsp; &nbsp;
      <button onClick={() => showAll()} style={{width:'150px',height:'30px',fontSize:'18px'}}>Show All</button> &nbsp; &nbsp;
      <br /><br></br>
      <table border={5} cellPadding={10} style={{textAlign:'center'}}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Roll</th>
            <th>Student Branch</th>
            <th>Student Class</th>
            <th>Status</th>
            <th>Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.rollno}</td>
              <td>{item.branch}</td>
              <td>{item.classs}</td>
              <td>{item.isPresent?(<h5 style={{backgroundColor:'green',borderRadius:'8px',padding:'5px',textAlign:'center'}}>Present</h5>):(<h5 style={{backgroundColor:'red',borderRadius:'8px',padding:'5px',textAlign:'center'}}>Absent</h5>)}</td>
              <td>{today}</td>
              <td>
              <button onClick={() => handleUpdate(item.rollno)}>Toggle Present</button> &nbsp;&nbsp;
                <button onClick={() => handleDelete(item._id)}>Delete User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminShowdb;