import { useState } from "react";
import {Link} from "react-router-dom";
function logMenu(){
    const [log,setlog] = useState(false)
    return (
        <div>
              <h3>
                    <Link to="login" style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Login</Link> &nbsp;&nbsp;
                    <Link to="regform" style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Register</Link> &nbsp;&nbsp;
                </h3>)
                    
            
            
        </div>
    )
}
export default logMenu