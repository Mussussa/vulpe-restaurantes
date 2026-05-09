import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Destaques from "./components/Destaques";
//import ReservaModal from "./components/ReservaModal";
import Galeria from "./components/Galeria";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import animationData from "../src/assets/caregando.lottie";
import InfoConfianca from "./components/InfoConfianca";
function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [filtro, setFiltro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReserva, setShowReserva] = useState(false);
  const [imagemModal, setImagemModal] = useState(null);

  // 1. Buscar dados do Google Sheets
  useEffect(() => {
    const sheetId = "1t6Lq1Co9ZQ_1kUWQJtmgimznDWUkmIfWrRLnEIDmzRY";
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    fetch(url)
      .then((res) => res.text())
      .then((csvText) => {
        const linhas = csvText.split("\n").slice(1);

        // Dentro do useEffect, mude isto:
        const dados = linhas.map((linha) => {
          const colunas = linha.split(",");

          return {
            id: colunas[0]?.trim(),
            nome: colunas[1]?.trim(),
            categoria: colunas[2]?.trim().toLowerCase(),
            descricao: colunas[3]?.trim(),
            preco: colunas[4]?.trim(),
            // ALTERAÇÃO AQUI: mude 'imagem' para 'imagemBase'
            imagemBase: colunas[5]?.trim(),
            imagemDetalhe: colunas[6]?.trim(),
          };
        });

        setProdutos(dados.filter((p) => p.nome));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao ler dados:", err);
        setLoading(false);
      });
  }, []);

  // 2. Lógica do Carrinho e WhatsApp
  const totalGeral = carrinho.reduce(
    (acc, item) => acc + Number(item.preco),
    0,
  );

  const enviarWhatsApp = () => {
    const numero = "258876108960";

    // 1. Criar a lista de itens
    const itensPedido = carrinho
      .map((item) => `- ${item.nome} (${item.preco} MT)`)
      .join("\n");

    // 2. Pedir a localização ao utilizador
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const linkMapa = `https://www.google.com/maps?q=${lat},${lon}`;

          // 3. Montar mensagem COM localização (Adaptado para Produtos)
          const mensagem = encodeURIComponent(
            `*NOVO PEDIDO - GOODTISSA*\n\n*Produtos Selecionados:*\n${itensPedido}\n\n*Total: ${totalGeral} MT*\n\n📍 *Minha Localização:* ${linkMapa}`,
          );
          window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
        },
        function (error) {
          // Mensagem SEM localização
          const mensagemSemLocalizacao = encodeURIComponent(
            `*NOVO PEDIDO - GOODTISSA*\n\n*Produtos Selecionados:*\n${itensPedido}\n\n*Total: ${totalGeral} MT*\n\n(Localização não partilhada)`,
          );
          window.open(
            `https://wa.me/${numero}?text=${mensagemSemLocalizacao}`,
            "_blank",
          );
        },
      );
    } else {
      // Fallback caso o navegador não suporte geolocalização
      const mensagemSemLocalizacao = encodeURIComponent(
        `*NOVO PEDIDO - GOODTISSA*\n\n*Produtos Selecionados:*\n${itensPedido}\n\n*Total: ${totalGeral} MT*`,
      );
      window.open(
        `https://wa.me/${numero}?text=${mensagemSemLocalizacao}`,
        "_blank",
      );
    }
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const removerDoCarrinho = (indexParaRemover) => {
    const novoCarrinho = carrinho.filter(
      (_, index) => index !== indexParaRemover,
    );
    setCarrinho(novoCarrinho);
  };

  const produtosExibidos = filtro
    ? produtos.filter((p) => p.categoria === filtro.toLowerCase())
    : [];

  return (
    <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
      <Navbar
        totalItens={carrinho.length}
        onAbrirReserva={() => setShowReserva(true)}
      />

      <Hero onAbrirReserva={() => setShowReserva(true)} />

      <div id="Destaques">
        {/* <Galeria /> */}
        <Destaques onSelecionar={(tipo) => setFiltro(tipo)} />
      </div>

      {/* <ReservaModal show={showReserva} onClose={() => setShowReserva(false)} /> */}

      {/* Secção de Detalhes Dinâmicos */}
      <div className="container py-4" id="menu">
        {filtro && (
          <div className="fade-in animate__animated animate__fadeInUp">
            <h3
              className="text-center mb-4 border-bottom pb-2 fw-bold"
              style={{ color: "#75462d" }}
            >
              {filtro === "Real" ? " FARINHA GOODTISSA" : "🌿 ÓLEOS NATURAIS"}
            </h3>

            <div className="row">
              {produtosExibidos.length > 0 ? (
                produtosExibidos.map((item) => (
                  <div className="col-md-4 mb-3" key={item.id}>
                    <div className="card border-0 shadow-sm p-3 h-100">
                      <h5 className="fw-bold">{item.nome}</h5>
                      <p className="text-muted small flex-grow-1">
                        {item.descricao}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-success">
                          {item.preco} MT
                        </span>
                        <button
                          onClick={() => adicionarAoCarrinho(item)}
                          className="btn btn-sm btn-outline-warning rounded-pill"
                          style={{ color: "#75462d", borderColor: "#75462d" }}
                        >
                          + Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">
                  A carregar produtos desta categoria...
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <hr className="container" />

      {/* Listagem Geral de Produtos */}
      {/* Listagem Geral de Produtos */}
      <div className="container py-5">
        <header className="text-center mb-5" id="Catalogo">
          <h2 className="fw-bold" style={{ color: "#75462d" }}>
            Nosso Catálogo Completo
          </h2>
          <p className="text-muted">
            A solução completa para uma vida saudável
          </p>
        </header>

        {loading ? (
          <div className="text-center py-5">
            <DotLottiePlayer
              src={animationData}
              autoplay
              loop
              style={{ width: "200px", height: "200px", margin: "0 auto" }}
            />
          </div>
        ) : (
          <div className="row g-4">
            {produtos.map((item) => (
              <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                <div className="card h-100 shadow-sm border-0 position-relative">
                  {/* ÍCONE DE VER MAIS INFORMAÇÕES (imagemDetalhe) */}
                  <button
                    onClick={() => setImagemModal(item.imagemDetalhe)}
                    className="btn btn-light rounded-circle position-absolute m-2 shadow-sm"
                    style={{
                      top: 0,
                      right: 0,
                      zIndex: 10,
                      width: "40px",
                      height: "40px",
                    }}
                    title="Ver detalhes do produto"
                  >
                    <i className="bi bi-info-circle-fill text-primary"></i>
                  </button>

                  <img
                    src={
                      item.imagemBase ||
                      "https://res.cloudinary.com/dweg8p9cy/image/upload/v1777555245/result_WhatsApp_Image_2026-04-30_at_02.32.31_npd7vz.jpg"
                    }
                    className="card-img-top"
                    alt={item.nome}
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{item.nome}</h5>
                    <p className="card-text text-muted small">
                      {item.descricao}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="h5 mb-0 text-success fw-bold">
                        {item.preco} MT
                      </span>
                      <button
                        onClick={() => adicionarAoCarrinho(item)}
                        className="btn text-white rounded-pill px-4"
                        style={{ backgroundColor: "#8B573C" }}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL PARA MOSTRAR A IMAGEM DE DETALHE NO MEIO DA TELA */}
      {imagemModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
          style={{ zIndex: 2000, backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={() => setImagemModal(null)}
        >
          <div
            className="position-relative animate__animated animate__zoomIn"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <button
              className="btn btn-light rounded-circle position-absolute"
              style={{ top: "-20px", right: "-20px", zIndex: 2001 }}
              onClick={() => setImagemModal(null)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <img
              src={imagemModal}
              className="img-fluid rounded shadow-lg"
              alt="Detalhes do Produto"
              style={{ maxHeight: "80vh", width: "100%", objectFit: "contain" }}
            />
            <p className="text-white text-center mt-3 small">
              Clique fora para fechar
            </p>
          </div>
        </div>
      )}

      

      {/* BARRA DE FINALIZAÇÃO */}
      {carrinho.length > 0 && (
        <div
          className="fixed-bottom bg-white border-top shadow-lg p-3 animate__animated animate__slideInUp"
          style={{ zIndex: 1050 }}
        >
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-bold mb-0">O teu Pedido:</h6>
              <span
                className="badge rounded-pill"
                style={{ backgroundColor: "#8B573C" }}
              >
                {carrinho.length} itens
              </span>
            </div>

            <div
              className="d-flex flex-nowrap overflow-auto pb-2 mb-2"
              style={{ gap: "10px" }}
            >
              {carrinho.map((item, index) => (
                <div
                  key={index}
                  className="bg-light border rounded px-2 py-1 d-flex align-items-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <small className="me-2">{item.nome}</small>
                  <i
                    className="bi bi-x-circle-fill text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => removerDoCarrinho(index)}
                  ></i>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small d-block">Total a pagar:</span>
                <h4 className="mb-0 text-success fw-bold">{totalGeral} MT</h4>
              </div>
              <button
                onClick={enviarWhatsApp}
                className="btn btn-success btn-lg rounded-pill px-4"
              >
                <i className="bi bi-whatsapp me-2"></i> Encomendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão de WhatsApp Flutuante */}
      <a
        href="https://wa.me/258876108960?text=Olá! Gostaria de saber mais sobre os produtos da GOODTISSA."
        className="btn btn-dark rounded-circle shadow-lg position-fixed m-4 d-flex align-items-center justify-content-center"
        style={{
          width: "50px",
          height: "50px",
          zIndex: 1000,
          bottom: carrinho.length > 0 ? "80px" : "0",
          right: "0",
          backgroundColor: "#25D366", // Cor do WhatsApp
          borderColor: "#25D366",
        }}
      >
        <i className="bi bi-whatsapp fs-4 text-white"></i>
      </a>

      <InfoConfianca />
      <hr className="container" />
    </div>
  );
}

export default App;
