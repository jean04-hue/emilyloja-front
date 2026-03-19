function compraRapida(produtoNome) {
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  const produto = produtos.find(p => p.nome === produtoNome);

  if (!produto) {
    alert("Produto não encontrado.");
    return;
  }

  if (produto.estoque <= 0) {
    alert("Produto esgotado.");
    return;
  }

  // Reduz o estoque
  produto.estoque -= 1;

  // Atualiza lista de produtos no localStorage
  localStorage.setItem('produtos', JSON.stringify(produtos));

  // Salva o produto atual para pagamento
  localStorage.setItem('compraPix', JSON.stringify(produto));

  // Redireciona para a página final de pagamento
  window.location.href = "pagamento-pix.html";
}
