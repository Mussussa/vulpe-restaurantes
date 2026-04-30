import React from "react";
import farinha_d from "../assets/farinha_d.jpeg";
import coco_d from "../assets/coco_d.jpeg";

const Destaques = ({ onSelecionar }) => {
  return (
    <div className="container my-5">
      <div className="row g-4 text-center">
        {/* Opção 1: Cardápio Real */}
        <div
          className="col-md-6"
          onClick={() => onSelecionar("FARINHA")}
          style={{ cursor: "pointer" }}
        >
          <a href="#Destaques">
          <div className="card bg-dark text-white border-0 shadow-lg overflow-hidden">
            <img
              src={farinha_d}
              className="card-img opacity-50"
              alt="Cardápio Real"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-img-overlay d-flex flex-column justify-content-center">
              <small className="text-white">clique para ver mais sobre</small>
              <h2 className="card-title fw-bold">FARINHA GOODTISSA</h2>
              <p className="card-text">marca 100% moçambicana</p>
            </div>
          </div>
          </a>
        </div>

        {/* Opção 2: Prato do Dia */}
        <div
          className="col-md-6"
          onClick={() => onSelecionar("ÓLEO")}
          style={{ cursor: "pointer" }}
        >
          <a href="#Destaques">
          <div className="card bg-dark text-white border-0 shadow-lg overflow-hidden">
            {/* Trocamos a div com background por uma tag img real, como no seu modelo */}


            <img
              src={coco_d}
              className="card-img opacity-10"
              alt="Prato do Dia"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                backgroundImage: `
        linear-gradient(rgba(24, 14, 1, 0.9),  rgba(58, 29, 1, 0.85))
      `,
                zIndex: 1, // Garante que fique acima da imagem
              }}
            />

            <div className="card-img-overlay d-flex flex-column justify-content-center" style={{ zIndex: 2 }}>
              <small className="text-white-50">clique para ver os</small>
              <h2 className="card-title fw-bold text-uppercase">
                Óleos naturais
              </h2>
              {/* <p className="card-text fw-bold" style={{ color: "#8B573C" }}>
                Fresco e pronto agora!
              </p> */}
            </div>
          </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Destaques;
