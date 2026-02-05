import React from "react";

const Hero = () => {
  const verificarAberto = () => {
    const agora = new Date();
    const hora = agora.getHours();
    const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

    // Definir o horário: 8h às 20h
    const horarioAberto = hora >= 8 && hora < 20;

    // Se o restaurante fecha em algum dia (ex: Domingo), podes ajustar aqui.
    // Se abre todos os dias, usamos apenas a condição da hora.
    const diaUtil = diaSemana >= 1 && diaSemana <= 6; // Exemplo: Segunda a Sábado

    return horarioAberto; // Retorna true se estiver entre 08:00 e 19:59
  };
  return (
    <div
      className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-dark text-white rounded shadow-lg"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80")',
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
          <a
            className="btn btn-warning btn-lg px-4 me-sm-3 fw-bold rounded-pill"
            href="#menu"
          >
            Ver Cardápio
          </a>
          <a
            className="btn btn-outline-light btn-lg px-4 rounded-pill"
            href="#reservas"
          >
            Reservar Mesa
          </a>
        </div>
      </div>

      {/* Badge decorativo para dar credibilidade */}
      <div className="position-absolute top-0 end-0 m-3 d-none d-md-block" style={{ zIndex: 10 }}>
  <span className={`badge rounded-pill p-2 ${verificarAberto() ? "bg-success" : "bg-danger"}`}>
    <i className={`bi ${verificarAberto() ? "bi-patch-check-fill" : "bi-clock-fill"} me-1"}`}></i>
    
    {verificarAberto() ? (
      <>
        Aberto Agora
        <br />
        <small style={{ fontSize: '0.75rem', fontWeight: 'normal' }}>
          Encerra às 20:00
        </small>
      </>
    ) : (
      <>
        Fechado
        <br />
        <small style={{ fontSize: '0.75rem', fontWeight: 'normal' }}>
          Abre às 08:00
        </small>
      </>
    )}
  </span>
</div>
    </div>
  );
};

export default Hero;
