import React, { useState } from 'react';

const ReservaModal = ({ show, onClose }) => {
  const [dados, setDados] = useState({
    nome: '',
    pessoas: '2',
    data: '',
    hora: ''
  });

  const enviarReserva = (e) => {
    e.preventDefault();
    const numero = "258876108960";
    const mensagem = encodeURIComponent(
      `*SOLICITAÇÃO DE RESERVA - Sabores de Chimoio*\n\n` +
      `👤 *Nome:* ${dados.nome}\n` +
      `👥 *Pessoas:* ${dados.pessoas}\n` +
      `📅 *Data:* ${dados.data}\n` +
      `⏰ *Hora:* ${dados.hora}\n\n` +
      `Por favor, confirmem a disponibilidade.`
    );
    window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Reservar uma Mesa</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={enviarReserva} className="modal-body">
            <div className="mb-3">
              <label className="form-label small fw-bold">Teu Nome</label>
              <input type="text" className="form-control" required 
                onChange={(e) => setDados({...dados, nome: e.target.value})} />
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label small fw-bold">Pessoas</label>
                <input type="number" className="form-control" min="1" defaultValue="2" 
                  onChange={(e) => setDados({...dados, pessoas: e.target.value})} />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label small fw-bold">Hora</label>
                <input type="time" className="form-control" required 
                  onChange={(e) => setDados({...dados, hora: e.target.value})} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Data</label>
              <input type="date" className="form-control" required 
                onChange={(e) => setDados({...dados, data: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
              Solicitar Reserva via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservaModal;