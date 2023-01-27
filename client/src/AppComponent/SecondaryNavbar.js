import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function SecondaryNavbar() {

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
            Insta App
            </Link>
            <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav d-flex flex-row ms-auto me-3">
              <li className="nav-item me-3 me-lg-0 dropdown" data-toggle="tooltip" data-placement="bottom" title="Login Here">
                  <Link className="nav-link" to="/" id="navbarDropdown"
                    aria-expanded="false">
                    <i className="fas fa-user"></i> Login
                  </Link>
                </li>
                <li className="nav-item me-3 me-lg-0 dropdown" data-toggle="tooltip" data-placement="bottom" title="SignUp Here">
                  <Link className="nav-link " to="/BUjxjw224/api/sign/up/iopwqbndinHUYRhs238490VGTuheokwjbUiG" id="navbarDropdown"
                    aria-expanded="false">
                   SignUp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </>
  )
}

export default SecondaryNavbar;
