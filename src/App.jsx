import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Destaques from './components/Destaques'
import ReservaModal from './components/ReservaModal'
import Galeria from './components/Galeria'

function App() {
  const [produtos, setProdutos] = useState([])
  const [carrinho, setCarrinho] = useState([])
  const [filtro, setFiltro] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showReserva, setShowReserva] = useState(false);

  // 1. Buscar dados do Google Sheets
  useEffect(() => {
    const sheetId = '18ICkqEmRJzEhuEN9715kcuedKrpIy08q64OOb5tolzY';
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    fetch(url)
      .then(res => res.text())
      .then(csvText => {
        const linhas = csvText.split('\n').slice(1);
        const dados = linhas.map(linha => {
          const colunas = linha.split(',');
          return {
            id: colunas[0]?.trim(),
            nome: colunas[1]?.trim(),
            descricao: colunas[2]?.trim(),
            preco: colunas[3]?.trim(),
            categoria: colunas[4]?.trim(),
            imagem: colunas[5]?.trim()
          };
        });
        
        setProdutos(dados.filter(p => p.nome));
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao ler dados:", err);
        setLoading(false);
      });
  }, []);

  // 2. Lógica do Carrinho e WhatsApp
  const totalGeral = carrinho.reduce((acc, item) => acc + Number(item.preco), 0);

const enviarWhatsApp = () => {
  const numero = "258876108960";
  
  // 1. Criar a lista de itens
  const itensPedido = carrinho.map(item => `- ${item.nome} (${item.preco} MT)`).join('\n');
  const totalGeral = carrinho.reduce((acc, item) => acc + Number(item.preco), 0);

  // 2. Pedir a localização ao utilizador
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const linkMapa = `https://www.google.com/maps?q=${lat},${lon}`;

      // 3. Montar mensagem COM localização
      const mensagem = encodeURIComponent(
        `*NOVO PEDIDO - Sabores de Chimoio*\n\n${itensPedido}\n\n*Total: ${totalGeral} MT*\n\n📍 *Minha Localização:* ${linkMapa}`
      );
      window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
    }, function(error) {
      // Se o utilizador negar a localização, envia sem o link
      const mensagemSemLocalizacao = encodeURIComponent(
        `*NOVO PEDIDO - Sabores de Chimoio*\n\n${itensPedido}\n\n*Total: ${totalGeral} MT*\n\n(Localização não partilhada)`
      );
      window.open(`https://wa.me/${numero}?text=${mensagemSemLocalizacao}`, '_blank');
    });
  }
};

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const removerDoCarrinho = (indexParaRemover) => {
  // Filtramos o carrinho removendo apenas o item que corresponde ao índice clicado
  const novoCarrinho = carrinho.filter((_, index) => index !== indexParaRemover);
  setCarrinho(novoCarrinho);
};

  const produtosExibidos = filtro 
    ? produtos.filter(p => p.categoria === filtro) 
    : [];

  return (
    <div className="bg-light pb-5" style={{ minHeight: '100vh' }}>
      <Navbar totalItens={carrinho.length} 
            onAbrirReserva={() => setShowReserva(true)} />

      <Hero />
      <Galeria /> {/* Adicionada aqui */}
      <div id='menu'>
      <Destaques onSelecionar={(tipo) => setFiltro(tipo)} />
      </div>

      

<ReservaModal show={showReserva} onClose={() => setShowReserva(false)} />
  
      {/* Secção de Detalhes Dinâmicos */}
      <div className="container py-4">
        {filtro && (
          <div className="fade-in animate__animated animate__fadeInUp">
            
            <h3 className="text-center mb-4 border-bottom pb-2 fw-bold text-primary">
              
              {filtro === 'Real' ? '📜 Cardápio Regal' : '⭐️ Sugestões do Dia'}
            </h3>
            
            <div className="row">
              {produtosExibidos.length > 0 ? (
                produtosExibidos.map(item => (
                  <div className="col-md-4 mb-3" key={item.id}>
                    <div className="card border-0 shadow-sm p-3 h-100">
                      <h5 className="fw-bold">{item.nome}</h5>
                      <p className="text-muted small flex-grow-1">{item.descricao}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-success">{item.preco} MT</span>
                        <button onClick={() => adicionarAoCarrinho(item)} className="btn btn-sm btn-outline-primary rounded-pill">
                          + Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">A carregar pratos desta categoria...</p>
              )}
            </div>
          </div>
        )}
      </div>

      <hr className="container" />

      {/* Listagem Geral de Produtos */}
      <div className="container py-5">
        <header className="text-center mb-5">
          <h2 className="fw-bold">Nossa Seleção Completa</h2>
          <p className="text-muted">Tudo o que Chimoio tem de melhor</p>
        </header>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {produtos.map((item) => (
              <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                <div className="card h-100 shadow-sm border-0">
                  <img 
                    src={item.imagem || 'https://via.placeholder.com/300x200'} 
                    className="card-img-top" 
                    alt={item.nome}
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{item.nome}</h5>
                    <p className="card-text text-muted small">{item.descricao}</p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="h5 mb-0 text-success fw-bold">{item.preco} MT</span>
                      <button onClick={() => adicionarAoCarrinho(item)} className="btn btn-primary rounded-pill px-4">
                        Pedir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BARRA DE FINALIZAÇÃO (Apenas aparece se tiver itens no carrinho) */}
{carrinho.length > 0 && (
  <div className="fixed-bottom bg-white border-top shadow-lg p-3 animate__animated animate__slideInUp" style={{ zIndex: 1050 }}>
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-bold mb-0">O teu Pedido:</h6>
        <span className="badge bg-primary rounded-pill">{carrinho.length} itens</span>
      </div>
      
      {/* Mini lista de itens para conferir e remover */}
      <div className="d-flex flex-nowrap overflow-auto pb-2 mb-2" style={{ gap: '10px' }}>
        {carrinho.map((item, index) => (
          <div key={index} className="bg-light border rounded px-2 py-1 d-flex align-items-center" style={{ whiteSpace: 'nowrap' }}>
            <small className="me-2">{item.nome}</small>
            <i 
              className="bi bi-x-circle-fill text-danger" 
              style={{ cursor: 'pointer' }} 
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
        <button onClick={enviarWhatsApp} className="btn btn-success btn-lg rounded-pill px-4">
          <i className="bi bi-whatsapp me-2"></i> Finalizar Pedido
        </button>
      </div>
    </div>
  </div>
)}

      {/* Botão de WhatsApp Flutuante (Apenas suporte rápido) */}
      <a 
        href="https://wa.me/258876108960?text=Olá! Preciso de ajuda com o cardápio." 
        className="btn btn-dark rounded-circle shadow-lg position-fixed m-4 d-flex align-items-center justify-content-center"
        style={{ width: '50px', height: '50px', zIndex: 1000, bottom: carrinho.length > 0 ? '80px' : '0', right: '0' }}
      >
        <i className="bi bi-chat-dots fs-4"></i>
      </a>
    </div>
  );
}

export default App
