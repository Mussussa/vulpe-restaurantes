import React from 'react';

const Galeria = () => {
  // Podes substituir estes links pelas fotos reais do teu restaurante e das cadeiras
  const fotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500', alt: 'Salão Principal' },
    { id: 2, url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500', alt: 'Cadeiras Confortáveis' },
    { id: 3, url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500', alt: 'Área Exterior' },
    { id: 4, url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500', alt: 'Mesa Decorada' },
  ];

  return (
    <section id="galeria" className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Nosso Espaço</h2>
        <p className="text-muted">Conheça o conforto das nossas mesas e o ambiente acolhedor</p>
      </div>
      
      <div className="row g-3">
        {fotos.map(foto => (
          <div key={foto.id} className="col-6 col-md-3">
            <div className="card border-0 shadow-sm overflow-hidden">
              <img 
                src={foto.url} 
                alt={foto.alt} 
                className="img-fluid"
                style={{ height: '200px', objectFit: 'cover', transition: 'transform .3s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Galeria;