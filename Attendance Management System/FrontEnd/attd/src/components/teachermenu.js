import { Link, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Appp from "./appp";
import Showdb from "./showdb";
function Teachermenu(){
    const id = useParams().id
    const [data,setData] = useState({})

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(`http://localhost:6969/getTdata/${id}`);
        setData(response.data);
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
    
    return (
        <div>
            
            <h1>Hello, {data.name} ur class is {data.classs} welcome to your account</h1>
            <h3>
                <br />
                <Link to={`/appp/${data.tid}`} style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Take Attendance</Link> &nbsp;&nbsp;
                <Link to={`/showdb/${data.tid}`} style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Manage Class</Link> &nbsp;&nbsp;
                <Link to="/" style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Logout</Link> &nbsp;&nbsp;
            </h3>
        </div>
    )
}
export default Teachermenu;