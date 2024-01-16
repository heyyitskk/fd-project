import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { AccountCircleSharp } from '@material-ui/icons';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
function getUserName()
{
  return localStorage.getItem("name");
}

export default function Navbar(props) {
  const [cartView, SetCartView] = useState(false)
  const [showProfile,setShowProfile] = useState(false);
  const [userName ,setUserName] = useState(getUserName());
  localStorage.setItem('temp', "first")

  useEffect(()=>{
    setUserName(getUserName());
    },[userName])
  // let data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  const loadCart = () => {
    SetCartView(true)
  }

  const items = useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5 navB" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5 navB" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                : ""
              }

            </ul>

            {(!localStorage.getItem("authToken")) ?
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>
              </div>
              :
              <div className=''>
                <button className="btn bg-white text-success mx-2 " onClick={loadCart}>
                  <Badge color="secondary" badgeContent={items.length} >
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </button>
                {cartView ? <Modal onClose={() => SetCartView(false)}><Cart></Cart></Modal> : null}
                  <div className="btn btn-lg profile-container" >
                    <AccountCircleSharp fontSize="large" color="active" onClick={()=>setShowProfile(!showProfile)} />
                    <div className={`drop-down-profile ${showProfile?'':'hide'}`}>
                      <div className='userName'>{userName}</div>
                      <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>   
                    </div>
                  </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
