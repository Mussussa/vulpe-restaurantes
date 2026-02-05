import React from "react";

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
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="col-md-8 p-lg-5 mx-auto my-5">
        <h1 className="display-3 fw-bold text-warning">Sabores de Chimoio</h1>
        <p className="lead fw-normal mb-4">
          A melhor gastronomia da cidade de Chimoio, à distância de um clique.
          Frescura, tradição e entrega rápida.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a className="btn btn-warning btn-lg px-4 me-sm-3 fw-bold rounded-pill" href="#menu">
            Ver Cardápio
          </a>
          
          {/* 2. Mudamos de <a> para <button> e adicionamos o onClick */}
          <button
            className="btn btn-outline-light btn-lg px-4 rounded-pill"
            onClick={onAbrirReserva}
          >
            Reservar Mesa
          </button>
        </div>
      </div>

      {/* Badge de Horário (mantém igual) */}
      <div className="position-absolute top-0 end-0 m-3 d-none d-md-block" style={{ zIndex: 10 }}>
        <span className={`badge rounded-pill p-2 ${verificarAberto() ? "bg-success" : "bg-danger"}`}>
          <i className={`bi ${verificarAberto() ? "bi-patch-check-fill" : "bi-clock-fill"} me-1`}></i>
          {verificarAberto() ? (
            <>Aberto Agora<br/><small>Encerra às 20:00</small></>
          ) : (
            <>Fechado<br/><small>Abre às 08:00</small></>
          )}
        </span>
      </div>
    </div>
  );
};

export default Hero;