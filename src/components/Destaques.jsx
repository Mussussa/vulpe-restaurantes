import React from 'react';
import farinha_d from '../assets/farinha_d.jpeg'

const Destaques = ({ onSelecionar }) => {
  return (
    <div className="container my-5">
      <div className="row g-4 text-center">
        {/* Opção 1: Cardápio Real */}
        <div className="col-md-6" onClick={() => onSelecionar('Real')} style={{ cursor: 'pointer' }}>
          <div className="card bg-dark text-white border-0 shadow-lg overflow-hidden">
            <img src={farinha_d}
                 className="card-img opacity-50" alt="Cardápio Real" 
                 style={{ height: '250px', objectFit: 'cover' }} />
            <div className="card-img-overlay d-flex flex-column justify-content-center">
                <small className="text-white">clique para ver mais sobre</small>
              <h2 className="card-title fw-bold">FARINHA GOODTISSA</h2>
              <p className="card-text">marca 100% moçambicana</p>
            </div>
          </div>
        </div>

        {/* Opção 2: Prato do Dia */}
        <div className="col-md-6" onClick={() => onSelecionar('Dia')} style={{ cursor: 'pointer' }}>
          <div className="card bg-warning text-dark border-0 shadow-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800" 
                 className="card-img opacity-25" alt="Prato do Dia" 
                 style={{ height: '250px', objectFit: 'cover' }} />
            <div className="card-img-overlay d-flex flex-column justify-content-center">
                <small className="text-dark">clique para ver as sugestões do dia</small>
              <h2 className="card-title fw-bold text-uppercase">O Prato do Dia</h2>
              <p className="card-text fw-bold text-danger">Fresco e pronto agora!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destaques;