// Dados simulados (poderiam vir de uma API)
const produtosJSON = [
  { id: 1, nome: "Notebook", preco: 3500 },
  { id: 2, nome: "Smartphone", preco: 2500 },
  { id: 3, nome: "Fone Bluetooth", preco: 300 },
  { id: 4, nome: "Monitor", preco: 1200 }
];

// Carrinho com controle de quantidade
let carrinho = [];

/**
 * renderizarProdutos()
 * Exibe os produtos dinamicamente na página com botões de compra.
 */
function renderizarProdutos() {
  const container = document.getElementById('produtos-container');
  produtosJSON.forEach(produto => {
    const div = document.createElement('div');
    div.className = 'produto';

    div.innerHTML = `
      <strong>${produto.nome}</strong><br>
      Preço: R$ ${produto.preco.toFixed(2)}<br>
      <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao carrinho</button>
    `;

    container.appendChild(div);
  });
}

/**
 * adicionarAoCarrinho(idProduto)
 * Adiciona ou incrementa um item no carrinho.
 */
function adicionarAoCarrinho(idProduto) {
  const produto = produtosJSON.find(p => p.id === idProduto);
  if (!produto) return;

  const itemExistente = carrinho.find(p => p.id === idProduto);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  alert(`"${produto.nome}" adicionado ao carrinho.`);
  atualizarCarrinho();
}

/**
 * atualizarCarrinho()
 * Renderiza a lista do carrinho e o total da compra.
 */
function atualizarCarrinho() {
  const lista = document.getElementById('carrinho-lista');
  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade} = R$ ${subtotal.toFixed(2)}`;
    lista.appendChild(li);
    total += subtotal;
  });

  document.getElementById('total').textContent = total.toFixed(2);
  salvarCarrinhoNoLocalStorage();
}

/**
 * finalizarCompra()
 * Pergunta se o usuário deseja finalizar e limpa o carrinho.
 */
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const confirmar = confirm("Deseja finalizar a compra?");
  if (confirmar) {
    const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}.`);
    carrinho = [];
    atualizarCarrinho();
  }
}

/**
 * esvaziarCarrinho()
 * Esvazia completamente o carrinho com confirmação.
 */
function esvaziarCarrinho() {
  if (carrinho.length === 0) {
    alert("O carrinho já está vazio.");
    return;
  }

  const confirmar = confirm("Deseja esvaziar o carrinho?");
  if (confirmar) {
    carrinho = [];
    atualizarCarrinho();
    alert("Carrinho esvaziado com sucesso.");
  }
}

/**
 * salvarCarrinhoNoLocalStorage()
 * Salva o estado atual do carrinho no navegador.
 */
function salvarCarrinhoNoLocalStorage() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

/**
 * carregarCarrinhoDoLocalStorage()
 * Restaura o carrinho salvo (caso exista).
 */
function carregarCarrinhoDoLocalStorage() {
  const salvo = localStorage.getItem('carrinho');
  if (salvo) {
    try {
      carrinho = JSON.parse(salvo);
      atualizarCarrinho();
    } catch (erro) {
      console.warn("Erro ao restaurar carrinho:", erro);
    }
  }
}

// Executa ao carregar
renderizarProdutos();
carregarCarrinhoDoLocalStorage();
