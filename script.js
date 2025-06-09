// Função principal que inicia todo o simulador
function iniciarSimulador() {
    // Cria um array vazio para armazenar os produtos
    const produtos = [];
  
    // Pede ao usuário quantos produtos ele deseja cadastrar
    const quantidade = parseInt(prompt("Quantos produtos deseja cadastrar?"));
  
    // Verifica se a entrada é válida (um número maior que zero)
    if (isNaN(quantidade) || quantidade <= 0) {
      alert("Quantidade inválida."); // Alerta o usuário se for inválido
      return; // Encerra a execução da função
    }
  
    // Laço for que repete conforme a quantidade de produtos informada
    for (let i = 0; i < quantidade; i++) {
      // Pede o nome do produto
      const nome = prompt(`Informe o nome do produto ${i + 1}:`);
  
      // Pede o preço do produto e converte para número
      const preco = parseFloat(prompt(`Informe o preço do produto ${i + 1}:`));
  
      // Verifica se os dados inseridos são válidos
      if (!nome || isNaN(preco)) {
        alert("Entrada inválida. Produto ignorado.");
        continue; // Pula para a próxima repetição do laço
      }
  
      // Adiciona um objeto com nome e preço ao array de produtos
      produtos.push({ nome, preco });
    }
  
    // Exibe a lista de produtos no console, em forma de tabela
    console.table(produtos);
  
    // Pergunta ao usuário se ele deseja ver o total gasto
    const desejaTotal = confirm("Deseja ver o total gasto?");
  
    if (desejaTotal) {
      // Se sim, calcula a soma dos preços com uma função separada
      const total = calcularTotal(produtos);
  
      // Mostra o total em um alerta
      alert(`Total gasto: R$ ${total.toFixed(2)}`);
    } else {
      // Se não, encontra o produto mais caro com outra função
      const maisCaro = encontrarMaisCaro(produtos);
  
      // Exibe o produto mais caro ao usuário
      alert(`Produto mais caro: ${maisCaro.nome} - R$ ${maisCaro.preco.toFixed(2)}`);
    }
  }
  
  // Função que calcula o total de preços no array de produtos
  function calcularTotal(lista) {
    let soma = 0;
  
    // Itera sobre cada item e soma os preços
    for (let item of lista) {
      soma += item.preco;
    }
  
    return soma; // Retorna o valor total
  }
  
  // Função que encontra o produto com o maior preço
  function encontrarMaisCaro(lista) {
    // Inicializa com o primeiro produto como o mais caro
    let maisCaro = lista[0];
  
    // Percorre todos os produtos para achar o de maior preço
    for (let item of lista) {
      if (item.preco > maisCaro.preco) {
        maisCaro = item; // Atualiza o mais caro se encontrar um maior
      }
    }
  
    return maisCaro; // Retorna o produto mais caro encontrado
  }
  