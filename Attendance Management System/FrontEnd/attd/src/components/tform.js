
import { useState,useEffect } from "react"
import axios from "axios"
import Menu from "./menu"
import LoginMenu from "./loginmenu"
const Tform=()=>{
    const [formdata,setFormData]=useState({
        'name':'',
        'username':'',
        'password':'',
        'tid':'',
        'classs':'',
        'avail':false
    })
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
    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(formdata)
        if(formdata.classs == 'Select'){
            alert('please select a class');
            return;
        }
        else if(formdata.classs == 'None')formdata.avail = true;
        try{
            await axios.post('http://localhost:6969/addTdata',{formdata}).then(async (res)=>{
                if(res.data == 'done'){
                    e.preventDefault();
                    try {
                        // let data = [formdata.tid,formdata.classs]
                        await axios.post('http://localhost:6969/addTtoC',{formdata});
                        alert('added to array')
                    } catch (error) {
                            alert('error')
                    }
                    alert('Data Added to DB');
                }
                else{
                    alert('error');
                }
            })
            
        }
        catch(error){
            alert('error')
        }
        window.location.reload()
    }
    return(
        <div>
        <Menu />
        <br />
        <h1>Teacher Form</h1>
        <br />
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <table style={{ margin: "auto" }}>
            <tbody>
              <tr>
                <td>
                  <label>Teacher Name:</label>
                </td>
                <td>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Teacher Name"
                    style={{ width: "250px", height: "40px", fontSize: "17px" }}
                    onChange={(e) =>
                      setFormData({ ...formdata, name: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Username:</label>
                </td>
                <td>
                  <input
                    required
                    type="text"
                    name="username"
                    placeholder="Username"
                    style={{ width: "250px", height: "40px", fontSize: "17px" }}
                    onChange={(e) =>
                      setFormData({ ...formdata, username: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Password:</label>
                </td>
                <td>
                  <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={{ width: "250px", height: "40px", fontSize: "17px" }}
                    onChange={(e) =>
                      setFormData({ ...formdata, password: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Teacher ID:</label>
                </td>
                <td>
                  <input
                    required
                    type="number"
                    name="tid"
                    placeholder="Teacher ID"
                    style={{ width: "250px", height: "40px", fontSize: "17px" }}
                    onChange={(e) =>
                      setFormData({ ...formdata, tid: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Select Class:</label>
                </td>
                <td>
                  <select
                    style={{ width: "260px", height: "40px", fontSize: "17px" }}
                    onChange={(e) =>
                      setFormData({ ...formdata, classs: e.target.value })
                    }
                  >
                    <option value="Select">Select</option>
                    {classData.map((ele, index) => (
                      <option key={index} value={ele}>
                        {ele}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <input
            type="submit"
            value="Add Data"
            style={{
              width: "150px",
              height: "40px",
              fontSize: "17px",
              background: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          />
        </form>
      </div>
    )
}
export default Tform;