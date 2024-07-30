import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"


const Navbar = () => {
  const user = useSelector(state=>state.RegisterReducer.loggedin)
  const {role} = user
  
  
  return (
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Ecommerce</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {role === "admin" && <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
        </li>}
        {user.success && <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Profile
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>}
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
        {user.success && <Link to="/cart" className=" mx-2 btn btn-primary">Cart</Link>}
        {user.success && <Link to="/wishlist" className=" mx-2 btn btn-danger">Wishlist</Link>}
        {!user.success && <Link to="/login" className=" mx-2 btn btn-success">Login</Link>}
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar
