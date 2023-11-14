import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from "./menu"

const AdminShowteach = () => {{
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:6969/getTdata')
      .then((response) => {
        setData(response.data);
      })
      
  }, []);
  const [classData,setClassData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:6969/getCdata')
          .then((response) => {
            setClassData(response.data.filter((ele)=>{
                return ele.avail;
            }).map((ele)=>{
                return ele.name;
            }) );
          })
      }, []);
  const handleDelete = (id,tid) => {
    axios.delete(`http://localhost:6969/deleteT/${id}`)
      .then(() => {
        axios.get('http://localhost:6969/getTdata')
          .then((response) => {
            setData(response.data);
          });
          try{
            axios.put(`http://localhost:6969/clearteacher/${tid}`);
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
  const handleChange = async (tid,cls,name,formdata) => {
    if(cls){
      try {
        axios.put(`http://localhost:6969/clearteacher/${tid}`);
        formdata.classs = name;
        axios.post('http://localhost:6969/addTtoC',{formdata});
        let data = {'tid':tid,'classs':cls}
        axios.post('http://localhost:6969/addCtoT',{data});
  
      }
      catch(err){
        alert('err')
      }
    }
    
  }
  return (
    <div align='center'>
        <Menu />
      <br />
      <br />
        <h1>All teachers</h1>
        <br />
      <br></br>
      <table border={5} cellPadding={10} style={{textAlign:'center'}}>
        <thead>
          <tr>
            <th>Teacher Name</th>
            <th>Teacher Username</th>
            <th>TID</th>
            <th>Assinged Class</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.tid}</td>
              <td>
                <select onChange={(e)=>handleChange(item.tid,e.target.value,item.classs,item)}>
                <option value={item.classs}>{item.classs}</option>
                <option value={'None'}>None</option>
                  {
                    classData.filter((ele)=>ele!==item.classs).map((ele, index) => (
                      <option key={index} value={ele}>
                        {ele}
                      </option>
                    ))
                  }
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(item._id,item.tid)}>Delete User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
}

export default AdminShowteach;