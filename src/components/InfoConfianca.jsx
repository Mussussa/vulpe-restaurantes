import React, { useState } from 'react';

const InfoConfianca = () => {
  const fotos = [
    { id: 1, url: 'https://scontent.fmpm2-1.fna.fbcdn.net/v/t39.30808-6/476967318_931906759157932_4377661584806241143_n.jpg?stp=c0.66.600.600a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=5df8b4&_nc_eui2=AeFFU8tMxim2zJURuv0ISwtAj70CC9a72vKPvQIL1rva8gPyTGDTMqA6w7tOdoz0M3HQwOIieEj1tQfu3282H8os&_nc_ohc=1I_0W9nXfn8Q7kNvwHR0nQy&_nc_oc=AdpuFIIzJ37UzxslAD7E8SDDEt8H9ZYwnb3m0zLgGFWty03OFe09GwPLMlxf0NiaHLU&_nc_zt=23&_nc_ht=scontent.fmpm2-1.fna&_nc_gid=7djhumRvc94x3TgI0eVYlA&_nc_ss=7a2a8&oh=00_Af5J6a9QeINOEzzkMd5zl-XpR1j9Siuy6rEDZvk-X4Zflg&oe=6A04D8C8', alt: 'Produção Artesanal' },
    { id: 2, url: 'https://scontent.fmpm2-1.fna.fbcdn.net/v/t39.30808-6/476648483_931887289159879_5192856917245655567_n.jpg?stp=c284.0.729.729a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=5df8b4&_nc_eui2=AeHmP01TzPMlCjWPdJJPeSN9Lfofm508jF0t-h-bnTyMXbwWQspOi-y-E6n1H5thRVcTHtOJuiqtZuic0aR5YTRE&_nc_ohc=GECoSBaBLf8Q7kNvwHtiqwN&_nc_oc=AdothJs5rgWCH4Tf_q43qkmAVDpTvx7sD2zASquv0lB90HTEEEMfLSmhMqnKiETrjD4&_nc_zt=23&_nc_ht=scontent.fmpm2-1.fna&_nc_gid=T5HC81h1dn4rcA1BYnhEIw&_nc_ss=7a2a8&oh=00_Af5RVxQvnMs47xTe1_8xiaud-8-e7GAE1UAJxef1v59cDA&oe=6A04C6E1', alt: 'Matéria Prima Natural' },
    { id: 3, url: 'https://scontent.fmpm2-1.fna.fbcdn.net/v/t39.30808-6/479184972_931455135869761_3026648648504914976_n.jpg?stp=c0.79.960.960a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=177950&_nc_eui2=AeGZ17BXZ2u2JN3GhG3KE4zlrhfE85Ce_8muF8TzkJ7_yUWFjQMv38p2IjYcg-KbJhrgq3DehD3oEvYPDq7vohVO&_nc_ohc=aotlUIHd_vMQ7kNvwG3hZnI&_nc_oc=Adr_i_SrkuyyDlLrdDj87DhvGnQf-S3SemBzc6H4MpC8COaqGvg_iONGkm7MgAKenvE&_nc_zt=23&_nc_ht=scontent.fmpm2-1.fna&_nc_gid=t2xoGFQ-fS-AR5A9Qz5diQ&_nc_ss=7a2a8&oh=00_Af6fG8by5aRSt2W_Kj7cZOgi73OAlYGm2NUXF_lSmoBmtA&oe=6A04CFBD', alt: 'Matéria Prima Natural' },
    { id: 4, url: 'https://scontent.fmpm2-2.fna.fbcdn.net/v/t39.30808-6/477779245_931455142536427_3740901821196228302_n.jpg?stp=c0.79.960.960a_dst-jpg_s206x206_tt6&_nc_cat=110&ccb=1-7&_nc_sid=177950&_nc_eui2=AeFrzUiIj79APtCf3cYjDdX1vELGaog-m0-8QsZqiD6bT-sx-52FOA8u2ZfZj-5Dyvbyg5qXviVKVYs6y9uOxyFf&_nc_ohc=9w7UcprkoMIQ7kNvwGUaz0o&_nc_oc=AdocQVP6m_hR5N3JbNY5eyWmHlDnVrnYw_a7bymOffuOpYd5pnJ_kopghWhlqmyaNPY&_nc_zt=23&_nc_ht=scontent.fmpm2-2.fna&_nc_gid=t2xoGFQ-fS-AR5A9Qz5diQ&_nc_ss=7a2a8&oh=00_Af4-kedIfLufgMwt0PJ78-S5oDgzbTxtRdXbnbW0CZIjKQ&oe=6A04CD1C', alt: 'Matéria Prima Natural' },
    { id: 5, url: 'https://scontent.fmpm2-1.fna.fbcdn.net/v/t39.30808-6/473611498_911138761234732_2646569183188127810_n.jpg?stp=c0.53.480.480a_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=5df8b4&_nc_eui2=AeH_scRJuRy12YfJHDMq1CuXBHsrkZJBOQYEeyuRkkE5BhmBmGL3qWbQFF17KmHNAgE7ZAZ2QHiC1k-_nRS4BtAz&_nc_ohc=vrIdmxSxp0kQ7kNvwFfFArO&_nc_oc=Adq3PLJzZ_cY1HOcxE9gv-TSCg4QlM39PapWn3fDtcC29TUa5wpiPqIRdqjpd5tZmPw&_nc_zt=23&_nc_ht=scontent.fmpm2-1.fna&_nc_gid=YFAemGe9LUBLEW2W5saFfw&_nc_ss=7a2a8&oh=00_Af7IGG7ItfAJbSPasUgy0GtdY4xNmtZzSe6iTzXBpzwtfw&oe=6A04C614', alt: 'Matéria Prima Natural' },
    { id: 10, url: 'https://scontent.fmpm2-2.fna.fbcdn.net/v/t39.30808-6/470006533_889143806767561_5343654312692198229_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=110&ccb=1-7&_nc_sid=5df8b4&_nc_eui2=AeFU0F6WvtG3JPtXy6zaJqzG5-00AkC_hFfn7TQCQL-EVx4D_4KYlMxL0Rbl24ZnCqkvxV9QTqaH_raPaWzQE1RK&_nc_ohc=t1Kx_VKatSUQ7kNvwGtmagm&_nc_oc=AdpIExUZrMz9-LAg8rbNi26h2qAvF64fmAa6F_Swvtk6nfnruaOrbFcv8XwcUDEofu8&_nc_zt=23&_nc_ht=scontent.fmpm2-2.fna&_nc_gid=mgnj_X-0V1sPCMH3zOrtLA&_nc_ss=7b2a8&oh=00_Af6xYXGtYkSn1HN_x_bk4SJPYM6XAmDcrdqAYtQJrtTceQ&oe=6A04C339', alt: 'Matéria Prima Natural' },
  ];

  const [fotoDestaque, setFotoDestaque] = useState(fotos[0].url);

  return (
    <section id="confianca" className="py-5 bg-white">
      <div className="container">
        
        {/* 1. Galeria Superior com Visualizador */}
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#75462d" }}>Nossa Galeria</h2>
          <p className="text-muted small">Processos transparentes com ingredientes 100% naturais de Moçambique.</p>
        </div>

        <div className="row mb-5 justify-content-center">
          <div className="col-lg-8">
             {/* Foto Grande em Destaque */}
             <div className="card border-0 shadow-lg overflow-hidden mb-3">
               <img 
                 src={fotoDestaque} 
                 className="img-fluid" 
                 style={{ height: '450px', width: '100%', objectFit: 'cover', transition: '0.5s' }} 
                 alt="Destaque Goodtissa"
               />
             </div>
             {/* Miniaturas por baixo */}
             <div className="d-flex overflow-auto pb-2" style={{ gap: "10px" }}>
               {fotos.map(foto => (
                 <img 
                   key={foto.id}
                   src={foto.url} 
                   onClick={() => setFotoDestaque(foto.url)}
                   className={`rounded shadow-sm cursor-pointer ${fotoDestaque === foto.url ? 'border border-primary border-3' : ''}`}
                   style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer', flexShrink: 0 }}
                   alt="Miniatura"
                 />
               ))}
             </div>
          </div>
        </div>

        <hr className="mb-5" />

        {/* 2. Informações por baixo */}
        <div className="row g-4 text-center text-lg-start">
          <div className="col-md-4">
            <h5 className="fw-bold" style={{ color: "#75462d" }}>
               <i className="bi bi-geo-alt-fill text-success me-2"></i>Localização
            </h5>
            <p className="text-muted">Chimoio, Moçambique. Enviamos para todo o país com rastreio.</p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold" style={{ color: "#75462d" }}>
               <i className="bi bi-share-fill text-primary me-2"></i>Fale Connosco
            </h5>
            <div className="mt-2">
              <a href="https://wa.me/258875140288" target="_blank" className="btn btn-sm btn-outline-success me-2 rounded-pill">
                <i className="bi bi-whatsapp"></i> Whatsapp
              </a>
              <a href="https://web.facebook.com/profile.php?id=100080513837898" target="_blank" className="btn btn-sm btn-outline-primary rounded-pill">
                <i className="bi bi-facebook"></i> Facebook
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold" style={{ color: "#75462d" }}>
               <i className="bi bi-shield-check text-warning me-2"></i>Garantia
            </h5>
            <p className="text-muted small">Produtos testados artesanalmente. Garantimos satisfação total ou a devolução.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoConfianca;