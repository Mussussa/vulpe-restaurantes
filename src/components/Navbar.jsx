import React from 'react';
import goodtissa from "../assets/goodtissa.jpeg"; 
import '../styler/navbar.css'

// Adicionamos 'onAbrirReserva' aqui nas props
const Navbar = ({ totalItens, onAbrirReserva }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light sticky-top shadow  " id='navbar'>
      <div className="container" >
        <a className="navbar-brand fw-bold " href="#"  style={{color: "brown"}}>
          <img src={goodtissa} alt="Logo" className="img-fluid me-2 logo" width="80" height="60"  />
          GOODTISSA
        </a>

        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"  style={{backgroundColor: "brown"}}>
          <span className="navbar-toggler-icon align-items-center"></span>
        </button>

        <div className="collapse navbar-collapse align-items-center" id="navbarNav  mx-auto p-2"  >
          <ul className="navbar-nav me-auto mx-auto p-2" >
            <li className="nav-item" >
              <a className="nav-link active" href="#menu"  style={{color: "brown"}}>Produtos</a>
            </li>
            <li className="nav-item">
              {/* Alterado para 'button' ou mantido 'a' mas com o onClick */}
              <button 
                className="nav-link btn btn-link text-start"  style={{color: "brown"}} 
                onClick={(e) => {
                  e.preventDefault();
                  onAbrirReserva(); // Esta é a função que vem do App.jsx
                }}
                style={{ textDecoration: 'none' , color: 'brown'}}
              >
               Encomendar
              </button>
            </li>
          </ul>

          <div className="d-flex align-items-center">
             <button className="btn btn-outline-warning position-relative ms-lg-3">
              <i className="bi bi-cart3"></i>
              {totalItens > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItens}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;