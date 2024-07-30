
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { isLogin } from './store/signSlice'
import { addCategories } from './store/categorySlice'

function App() {
  const dispatch = useDispatch();
  const loggedin = useSelector(state=>state.RegisterReducer.loggedin);
  const allCategories = useSelector(state=>state.CategoryReducer.categories)
  

  useEffect(()=>{
   if(JSON.parse(localStorage.getItem("accessToken"))){
    axios.get('http://localhost:4000/api/v1/users/user-Profile',{
      headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
      }
     })
     .then(response=>{
      const {role,username:name} = response.data.data
      
      dispatch(isLogin({role,name}))
     })
   }
  },[])

  useEffect(()=>{
    axios.get('http://localhost:4000/api/v1/category/allcategories',{
      headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
      }
    })
    .then(response=>{
      console.log(response.data.data)
      dispatch(addCategories(response.data.data))
    })
  },[])
  

  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default App
