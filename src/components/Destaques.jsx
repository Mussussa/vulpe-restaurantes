import React from 'react';

const Destaques = ({ onSelecionar }) => {
  return (
    <div className="container my-5">
      <div className="row g-4 text-center">
        {/* Opção 1: Cardápio Real */}
        <div className="col-md-6" onClick={() => onSelecionar('Real')} style={{ cursor: 'pointer' }}>
          <div className="card bg-dark text-white border-0 shadow-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800" 
                 className="card-img opacity-50" alt="Cardápio Real" 
                 style={{ height: '250px', objectFit: 'cover' }} />
            <div className="card-img-overlay d-flex flex-column justify-content-center">
                <small className="text-white">clique para ver o cardápio</small>
              <h2 className="card-title fw-bold">CARDÁPIO REGAL</h2>
              <p className="card-text">A tradição de Chimoio à sua mesa.</p>
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