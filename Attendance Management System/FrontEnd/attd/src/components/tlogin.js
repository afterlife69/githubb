import { useState } from "react"
import axios from "axios"
import Menu from "./menu"
import { useNavigate } from "react-router-dom"
import LoginMenu from "./loginmenu"
const TLogin=()=>{
    const hist = useNavigate();
    const [userData,setUserData]=useState({
        'username':'',
        'password':''
    })
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:6969/teachlogin',{userData}).then(async (res)=>{
                if(res.data == 'inv')alert('invalid password for '+userData.username)
                else if(res.data == 'not')alert('user named '+userData.username+' not found in database');
                else{
                    try {
                        let un = userData.username
                        await axios.put(`http://localhost:6969/teacherid/${un}`).then((res)=>{
                            if(res.data !== 'err')
                            hist('/teachermenu/'+res.data.tid)
                            else
                            alert('err')
                        })
                        } catch (error) {
                        alert('error')
                        }
                }
            });
        }
        catch(error){
            console.log(error)
        }
    }
    return(
      <div>
        <LoginMenu />
        <br />
        <h1>Teacher Login</h1>
        <br />
        <form onSubmit={handleSubmit}>
            <table align="center">
                <tr>
                    <td><label>Username&nbsp;&nbsp;</label></td>
                    <td><input required type="text" name="name" placeholder="Username" style={{width:'250px',height:'40px',fontSize:'17px'}} onChange={(e)=>setUserData({...userData,username:e.target.value})}/></td>
                </tr>
                <tr>
                    <td><label>Password&nbsp;&nbsp;</label></td>
                    <td><input required type="password" name="pass" placeholder="Password" style={{width:'250px',height:'40px',fontSize:'17px'}}  onChange={(e)=>setUserData({...userData,password:e.target.value})}/></td>
                </tr>
                            </table>
                            <br></br>
            <center>
                <input
            type="submit"
            value="Login"
            style={{
                width: "150px",
                height: "40px",
                fontSize: "17px",
                background: "skyblue",
                color: "white",
                cursor: "pointer",
          }}
        /></center>
        </form>
       </div>
    )
    
}
export default TLogin;