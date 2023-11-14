import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './menu';
import { Link } from 'react-router-dom';
import Teachermenu from './teachermenu';
import { useParams } from 'react-router';
const Showdb = () => {
  const tid = useParams().id;
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
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    axios.put(`http://localhost:6969/getstudents/${tid}`)
      .then((res) => {
        const studd = res.data;

        if (studd !== 'err') {
          // Use Promise.all to wait for all axios requests to complete
          Promise.all(studd.map((rollno) => axios.put(`http://localhost:6969/getdata1/${rollno}`)))
            .then((responses) => {
              // responses is an array of resolved data
              const newData = responses.map(res2 => res2.data);
              setData(newData);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);
  console.log(data)
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
  return (
    <div align='center'>
      {/* <Teachermenu  /> */}
    
      <h1>Hello, {daata.name} ur class is {daata.classs} welcome to your account</h1>
      <h3>
                <br />
                <Link to={`/appp/${tid}`} style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Take Attendance</Link> &nbsp;&nbsp;
                <Link to={`/showdb/${tid}`} style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Manage Class</Link> &nbsp;&nbsp;
                <Link to="/" style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Logout</Link> &nbsp;&nbsp;
            </h3>
      <br />
      <table border={5} cellPadding={10} style={{textAlign:'center'}}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Roll</th>
            <th>Student Branch</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.rollno}</td>
              <td>{item.branch}</td>
              <td>{item.isPresent?(<h5 style={{backgroundColor:'green',borderRadius:'8px',padding:'5px',textAlign:'center'}}>Present</h5>):(<h5 style={{backgroundColor:'red',borderRadius:'8px',padding:'5px',textAlign:'center'}}>Absent</h5>)}</td>
              <td>
              <button onClick={() => handleUpdate(item.rollno)}>Toggle Present</button> &nbsp;&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Showdb;