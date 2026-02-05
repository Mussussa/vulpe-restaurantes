import React from 'react';
import logo1 from "../assets/logo1.jpeg"; 

// Adicionamos 'onAbrirReserva' aqui nas props
const Navbar = ({ totalItens, onAbrirReserva }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        <a className="navbar-brand fw-bold text-warning" href="#">
          <img src={logo1} alt="Logo" className="img-fluid me-2" width="40" height="40" />
          CHIMOIO EATS
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#menu">Cardápio</a>
            </li>
            <li className="nav-item">
              {/* Alterado para 'button' ou mantido 'a' mas com o onClick */}
              <button 
                className="nav-link btn btn-link text-start" 
                onClick={(e) => {
                  e.preventDefault();
                  onAbrirReserva(); // Esta é a função que vem do App.jsx
                }}
                style={{ textDecoration: 'none' }}
              >
                Reservar Mesa
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