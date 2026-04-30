// import React, { useState } from "react";

// const ReservaModal = ({ show, onClose }) => {
//   // Adicionei o estado 'telefone' e 'loading' para o pagamento
//   const [dados, setDados] = useState({
//     nome: "",
//     telefone: "", // OBRIGATÓRIO para o e-Mola
//     pessoas: "2",
//     data: "",
//     hora: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [statusPagamento, setStatusPagamento] = useState("");

//   // 1. Função Original (WhatsApp)
//   const enviarReserva = (e) => {
//     e.preventDefault();
//     const numeroRestaurante = "258876108960";
//     const mensagem = encodeURIComponent(
//       `*SOLICITAÇÃO DE RESERVA - GOODTISSA*\n\n` +
//         `👤 *Nome:* ${dados.nome}\n` +
//         `📱 *Tel:* ${dados.telefone}\n` +
//         `👥 *Pessoas:* ${dados.pessoas}\n` +
//         `📅 *Data:* ${dados.data}\n` +
//         `⏰ *Hora:* ${dados.hora}\n\n` +
//         `Por favor, confirmem a disponibilidade.`,
//     );
//     window.open(
//       `https://wa.me/${numeroRestaurante}?text=${mensagem}`,
//       "_blank",
//     );
//     onClose();
//   };

//   // 2. NOVA Função para Pagar com e-Mola (Chama o teu Backend)
//   const pagarComEmola = async () => {
//     if (!dados.telefone || dados.telefone.length < 9) {
//       alert("Preencha o telefone corretamente (ex: 87...)");
//       return;
//     }

//     setLoading(true);
//     setStatusPagamento("A gerar link de pagamento...");

//     try {
//       const resposta = await fetch("http://localhost:3013/api/pagar-emola", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           valor: 500,
//           telefone: dados.telefone,
//           pedidoId: `Reserva-${dados.nome}-${Date.now()}`,
//         }),
//       });

//       const resultado = await resposta.json();

//       if (resposta.ok) {
//         // --- AQUI ESTÁ O SEGREDO ---
//         // Se a API devolveu aquele link de checkout, abrimos ele agora:
//         const linkPagamento =
//           resultado.link || resultado.checkout_url || resultado.url;

//         if (linkPagamento) {
//           setStatusPagamento("✅ Redirecionando para o Paysgator...");
//           window.location.href = linkPagamento; // LEVA O CLIENTE PARA O LINK
//         } else {
//           setStatusPagamento("✅ Verifique o PIN no seu telemóvel!");
//         }
//       } else {
//         setStatusPagamento("❌ Erro: " + JSON.stringify(resultado));
//       }
//     } catch (erro) {
//       console.error(erro);
//       setStatusPagamento("❌ Erro de conexão com o servidor.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!show) return null;

//   return (
//     <div
//       className="modal d-block"
//       style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//     >
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content border-0 shadow">
//           <div className="modal-header bg-dark text-white">
//             <h5 className="modal-title">Reservar uma Mesa</h5>
//             <button
//               type="button"
//               className="btn-close btn-close-white"
//               onClick={onClose}
//             ></button>
//           </div>

//           <div className="modal-body">
//             {/* O formulário agora não tem onSubmit direto no form para não misturar os botões */}
//             <form onSubmit={enviarReserva}>
//               <div className="mb-3">
//                 <label className="form-label small fw-bold">Teu Nome</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   required
//                   onChange={(e) => setDados({ ...dados, nome: e.target.value })}
//                 />
//               </div>

//               {/* --- NOVO CAMPO: TELEFONE (Necessário para e-Mola) --- */}
//               <div className="mb-3">
//                 <label className="form-label small fw-bold">
//                   Telefone (e-Mola)
//                 </label>
//                 <input
//                   type="tel"
//                   className="form-control"
//                   placeholder="87xxxxxxx"
//                   required
//                   onChange={(e) =>
//                     setDados({ ...dados, telefone: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="row">
//                 <div className="col-6 mb-3">
//                   <label className="form-label small fw-bold">Pessoas</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     min="1"
//                     defaultValue="2"
//                     onChange={(e) =>
//                       setDados({ ...dados, pessoas: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="col-6 mb-3">
//                   <label className="form-label small fw-bold">Hora</label>
//                   <input
//                     type="time"
//                     className="form-control"
//                     required
//                     onChange={(e) =>
//                       setDados({ ...dados, hora: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label small fw-bold">Data</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   required
//                   onChange={(e) => setDados({ ...dados, data: e.target.value })}
//                 />
//               </div>

//               {/* Botão WhatsApp Original */}
//               <button
//                 type="submit"
//                 className="btn btn-primary w-100 py-2 fw-bold mb-2"
//               >
//                 Solicitar Reserva via WhatsApp
//               </button>
//             </form>

//             {/* --- AQUI ESTÁ O QUE PEDISTE: PAGAMENTO EM BAIXO --- */}
//             <hr className="my-3" />

//             <div className="d-grid gap-2">
//               <button
//                 type="button"
//                 className="btn btn-warning fw-bold text-dark"
//                 onClick={pagarComEmola}
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Processando..."
//                   : "💳 Pagar Reserva (e-Mola) - 500MT"}
//               </button>

//               {/* Mensagem de Status do Pagamento */}
//               {statusPagamento && (
//                 <div
//                   className={`alert mt-2 py-1 text-center small ${statusPagamento.includes("Erro") ? "alert-danger" : "alert-success"}`}
//                 >
//                   {statusPagamento}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReservaModal;
