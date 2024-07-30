import { Link } from "react-router-dom"
import { isLogin,changeloginPassword, changeloginUsername, changeloginErrorMessage, changeloginError } from "../store/signSlice"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios";
import { useState } from "react";


const Login = () => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.RegisterReducer.loginUsername);
  const password = useSelector(state => state.RegisterReducer.loginPassword);
  const errorMessage = useSelector(state=>state.RegisterReducer.loginErrorMessage);
  const error = useSelector(state=>state.RegisterReducer.loginError);
  const loggedin = useSelector(state=>state.RegisterReducer.loggedin);
  const [showloginPassword,setShowLoginPassword] = useState(false)


  const handleLogin = async () => {
    try {
      dispatch(changeloginError(false))
      const response = await axios.post('http://localhost:4000/api/v1/users/login', {
        username,
        password,
      })
      console.log(response.data.data)
      const { user,accessToken,refreshToken
      } = response.data.data
      console.log(user)
      const {username: name, role: userRole} = user;

      dispatch(isLogin({ name, userRole }));
      console.log(loggedin)
      localStorage.setItem("accessToken",JSON.stringify(accessToken))
      localStorage.setItem("refreshToken",JSON.stringify(refreshToken))
      dispatch(changeloginUsername(""))
      dispatch(changeloginPassword(""))
      dispatch(changeloginErrorMessage(""))


    } catch (error) {
      console.log(error)
      dispatch(changeloginError(true))
      console.log(error.response.data)
      let startIndex = error.response.data.indexOf(":")
      let lastIndex = error.response.data.indexOf("&")
      let errormessage = error.response.data.slice(startIndex + 2, lastIndex - 5)
      dispatch(changeloginErrorMessage(errormessage))
    }
  }




  return (
    <div className="  container d-flex flex-column my-5 " style={{ width: "25rem", height: "30rem" }}>
      <h3 className=" text-pretty text-center text-blue-400">Sign in</h3>
      <input
        onChange={(e) => dispatch(changeloginUsername(e.target.value))}
        placeholder="Enter your Username"
        type="text"
        className=" my-2"
        value={username}
      />
      {error && !username.length && <p className=" mt-0 text-danger">{errorMessage}</p>}
      <div className=" position-relative d-flex flex-column">
      <input
        onChange={(e) => dispatch(changeloginPassword(e.target.value))}
        placeholder="Enter your Password"
        type={showloginPassword?"text":"password"}
        className=" my-2"
        name=""
        value={password}
      />
      
      <i 
      onClick={()=>setShowLoginPassword(prev=>!prev)} 
      className={` position-absolute end-0 mt-3 mx-2  fa-regular ${showloginPassword?'fa-eye-slash':'fa-eye'}`}></i>
      
      {error && !password.length && <p className=" mt-0 text-danger">{errorMessage}</p>}
      </div>

      <div className="  d-flex flex-row align-items-center justify-content-center">
        <button onClick={handleLogin} className="mt-2 btn btn-success">Signin</button>
        <span className=" d-flex align-items-center justify-content-center">Create an Account</span>
        <Link className=" btn btn-link" to="/signup">SignUp</Link>
      </div>


    </div>
  )
}

export default Login
