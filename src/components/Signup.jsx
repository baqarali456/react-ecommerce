import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { changeEmail,changePhoneNumber,changeregisterError,changeregisterErrorMessage,changeregisterPassword,changeregisterUsername,changeRole } from "../store/signSlice"



const Signup = () => {
   const dispatch = useDispatch();
   const username = useSelector(state=>state.RegisterReducer.registerUsername)
   const password = useSelector(state=>state.RegisterReducer.registerPassword)
   const email = useSelector(state=>state.RegisterReducer.email)
   const phoneNumber = useSelector(state=>state.RegisterReducer.phoneNumber )
   const role = useSelector(state=>state.RegisterReducer.role );
   const errorMessage = useSelector(state=>state.RegisterReducer.registerErrorMessage);
   const error = useSelector(state=>state.RegisterReducer.registerError)
   const [showregisterPassword,setShowRegisterPassword] = useState(false)
   
   

   const handleRegister = async () =>{
    dispatch(changeregisterError(false))
    try {
      const response = await axios.post('http://localhost:4000/api/v1/users/register',{
         username,
         email,
         role,
         phoneNumber,
         password,
      })
      console.log(response.data)
      
      
      dispatch(changeEmail(""))
      dispatch(changeregisterPassword(""))
      dispatch(changeregisterUsername(""))
      dispatch(changeregisterErrorMessage(""))
      dispatch(changePhoneNumber(""))
      dispatch(changeRole("user"))
    } catch (error) {
      dispatch(changeregisterError(true))
      console.log(error.response.data)
      let startIndex = error.response.data.indexOf(":")
      let lastIndex = error.response.data.indexOf("&")
      let errormessage = error.response.data.slice(startIndex + 2,lastIndex - 5);
      dispatch(changeregisterErrorMessage(errormessage)) ;
    }
  }

  return (
    <div className="container d-flex flex-column my-5 " style={{width:"25rem",height:"30rem"}}>
        <h3 className=" text-pretty text-center text-blue-400">Register</h3>
        
        <input
        onChange={(e)=>dispatch(changeregisterUsername(e.target.value))}
        value={username}
         placeholder="Enter your Username" 
        type="text" className=" my-2" 
        name="" 
        id="username" />
        {error && !username.length ?<p className=" mt-0 text-danger">{errorMessage}</p>:null}
        
        <div className="position-relative d-flex flex-column">
        <input 
        onChange={(e)=>dispatch(changeEmail(e.target.value))}
        value={email}
        placeholder="Enter your Email"
        type="text" className=" my-2" 
        name="" 
        id="email" />
        
        </div>
        {error && !email.length ?<p className=" mt-0 text-danger">{errorMessage}</p>:null}

        <div className=" position-relative d-flex flex-column">
        <input
         onChange={(e)=>dispatch(changeregisterPassword(e.target.value))}
         value={password}
         placeholder="Enter your Password" 
         type={showregisterPassword?"text":"password"} 
         className=" 
         my-2" name="" 
         id="password" />
         <i
         onClick={()=>setShowRegisterPassword(prev=>!prev)} 
        className={` position-absolute end-0 mt-3 mx-2  fa-regular ${showregisterPassword?'fa-eye-slash':'fa-eye'}`}></i>
        
         {error && !password.length ?<p className=" mt-0 text-danger">{errorMessage}</p>:null}
        </div>


        <input 
         onChange={(e)=>dispatch(changePhoneNumber(e.target.value))}
         value={phoneNumber}
         type="text" name="" 
         id="phone" 
         className=" my-2"
         placeholder="Enter your Phone Number"  />
         {error && !phoneNumber.length ?<p className=" mt-0 text-danger">{errorMessage}</p>:null}
        <div className="d-flex flex-row">
        <label  htmlFor="role">Role:</label>
        <select
          onChange={(e)=>dispatch(changeRole(e.target.value))}
        value={role} className=" mx-2" name="role"
         id="role"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
         </select>
        </div>
        <div className="d-flex flex-row">
        <button 
        onClick={handleRegister}
         className="mt-2 btn btn-success">Signup</button>
        <span 
        className=" d-flex align-items-center justify-content-center">Already Registered</span>
        <Link className=" btn btn-link" to="/login">SignIn</Link>
        </div>
    </div>
  )
}

export default Signup
