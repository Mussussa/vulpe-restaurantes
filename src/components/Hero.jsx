import React from "react";
import farinha_d from '../assets/farinha_d.jpeg'
import acafrao from '../assets/acafrao.jpeg'
import "../styler/hero.css"

// 1. Adiciona a prop onAbrirReserva aqui
const Hero = ({ onAbrirReserva }) => {
  const verificarAberto = () => {
    const agora = new Date();
    const hora = agora.getHours();
    return hora >= 8 && hora < 20;
  };

  return (
    <div
      className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-dark text-white rounded shadow-lg"
      style={{
        backgroundImage: `
    linear-gradient(rgba(24, 14, 1, 0.9), rgb(204, 174, 128),  rgba(58, 29, 1, 0.85)), 
    url("${farinha_d}"), 
    url("${acafrao}")
  `,
        backgroundSize: "100%, 50% 100%, 50% 100%" , // Cada valor corresponde a uma imagem na ordem
        backgroundPosition: "center, left, right",
        backgroundRepeat: "no-repeat, no-repeat", // A textura repete, a foto não
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="col-md-8 p-lg-5 mx-auto my-5">
        <h1  className="display-3 fw-bold " >GOODTISSA</h1>
        <p className="lead fw-normal mb-4">
          Alimente-se com a melhor farinha e cuide-se com os nossos Óleos
          naturais. A solução completa para uma vida saudável e feliz.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a
            className="btn btn-light btn-lg px-4 me-sm-3 fw-bold rounded-pill"
            href="#menu"
          >
            Ver produtos
          </a>

          {/* 2. Mudamos de <a> para <button> e adicionamos o onClick */}
          <button
            className="btn btn-outline-light btn-lg px-4 rounded-pill"
            onClick={onAbrirReserva}
          >
            Encomendar
          </button>
        </div>
      </div>

      {/* Badge de Horário (mantém igual) */}
      <div
        className="position-absolute top-0 end-0 m-3 d-none d-md-block"
        style={{ zIndex: 10 }}
      >
        <span
          className={`badge rounded-pill p-2 ${verificarAberto() ? "aberto" : "bg-danger"}`}
        >
          <i
            className={`bi ${verificarAberto() ? "bi-patch-check-fill" : "bi-clock-fill"} me-1`}
          ></i>
          {verificarAberto() ? (
            <>
              Aberto Agora
              <br />
              <small>Encerra às 20:00</small>
            </>
          ) : (
            <>
              Fechado
              <br />
              <small>Abre às 08:00</small>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Hero;
