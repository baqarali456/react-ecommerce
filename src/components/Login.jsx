import { Link } from "react-router-dom"
import { isLogin,changeloginPassword, changeloginUsername, changeloginErrorMessage, changeloginError } from "../store/signSlice"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios";


const Login = () => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.loginUsername)
  const password = useSelector(state => state.loginPassword)
  const errorMessage = useSelector(state=>state.loginErrorMessage);
  const error = useSelector(state=>state.loginError)
  const loggedin = useSelector(state=>state.loggedin)


  const handleLogin = async () => {
    try {
      dispatch(changeloginError(false))
      const response = await axios.post('http://localhost:4000/api/v1/users/login', {
        username,
        password,
      })
      console.log(response.data.data)
      const { user } = response.data.data
      console.log(user)
      const {username: name, role: userRole} = user;

      dispatch(isLogin({ name, userRole }));
      console.log(loggedin)
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
    <div className="container d-flex flex-column my-5 " style={{ width: "25rem", height: "30rem" }}>
      <h3 className=" text-pretty text-center text-blue-400">Sign in</h3>
      <input
        onChange={(e) => dispatch(changeloginUsername(e.target.value))}
        placeholder="Enter your Username"
        type="text"
        className=" my-2"
        value={username}
      />
      {error && !username.length ?<p className=" mt-0 text-danger">{errorMessage}</p>:null}
      <input
        onChange={(e) => dispatch(changeloginPassword(e.target.value))}
        placeholder="Enter your Password"
        type="password"
        className=" my-2"
        name=""
        value={password}
      />
      {error && !password.length ?<p className=" mt-0 text-danger">{errorMessage}</p>:null}

      <div className="d-flex flex-row align-items-center justify-content-center">
        <button onClick={handleLogin} className="mt-2 btn btn-success">Signin</button>
        <span className=" d-flex align-items-center justify-content-center">Create an Account</span>
        <Link className=" btn btn-link" to="/signup">SignUp</Link>
      </div>


    </div>
  )
}

export default Login
