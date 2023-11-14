import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from "./menu"

const Showclass = () => {{
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [Tdata, setTData] = useState([]);
  useEffect(() => {
        axios.get('http://localhost:6969/getCdata')
        .then((response) => {
            setData(response.data);
        })
        axios.get('http://localhost:6969/getTdata')
        .then((response) => {
            setTData(response.data.filter((ele)=>{
                return ele.avail;
            }).map((ele)=>{
                return ele.name;
            }) )
        })
  }, []);
  const getName = async (id)=>{
        try {
          await axios.put(`http://localhost:6969/getTdata/${id}`)
          .then((res)=>{
            if(res !== 'err')
            return res.data.name;
            else return '';
          });
        } catch (error) {
          return '';
        }
  }
  const handleDelete = (id,name) => {
    axios.delete(`http://localhost:6969/deleteC/${id}`)
      .then(() => {
        axios.get('http://localhost:6969/getCdata')
          .then((response) => {
            setData(response.data);
          });
          try{
            axios.put(`http://localhost:6969/clearclass/${name}`);
            alert('deleted successfully');
          }
            catch (error) {
          console.error('Error fetching data:', error);
        }
      })
      .catch((error) => {
        alert(error.response.data.err)
      });
  };

  return (
    <div align='center'>
        <Menu />
      <br /><br></br>
      <table border={5} cellPadding={10} style={{textAlign:'center'}}>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Assigned Teacher</th>
            <th>CID</th>
            <th>No of Students</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{getName(item.teachers)}</td>
              <td>{item.cid}</td>
              <td>{item.students.length}</td>
              <td>
                     
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
}

export default Showclass;