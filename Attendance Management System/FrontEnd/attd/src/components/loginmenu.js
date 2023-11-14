import {Link} from "react-router-dom";
function LoginMenu(){
    return (
        <div>
            <h3>
                <br />
                <Link to="/login" style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Admin Login</Link> &nbsp;&nbsp;
                <Link to="/tlogin" style={{textDecoration:'none',color:'white',backgroundColor:'blue',padding:'7px',border:'1px solid blue',borderRadius:'7px'}}>Teacher Login</Link> &nbsp;&nbsp;
            </h3>
        </div>
    )
}
export default LoginMenu;