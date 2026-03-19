// Simula compras automáticas se ainda não houver dados
if (!localStorage.getItem("compras")) {
  const comprasSimuladas = [
    { produto: "Camisa Estampada", data: "12/06/2025", preco: "R$ 59,90" },
    { produto: "Tênis Casual", data: "10/06/2025", preco: "R$ 199,90" },
    { produto: "Relógio Moderno", data: "05/06/2025", preco: "R$ 249,90" }
  ];
  localStorage.setItem("compras", JSON.stringify(comprasSimuladas));
}

// Exibe as compras na lista
const listaCompras = document.getElementById("lista-compras");
const compras = JSON.parse(localStorage.getItem("compras")) || [];

if (compras.length === 0) {
  listaCompras.innerHTML = "<li>Nenhuma compra encontrada.</li>";
} else {
  compras.forEach(compra => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${compra.produto}</strong>
      <span>Data: ${compra.data}</span><br>
      <span>Preço: ${compra.preco}</span>
    `;
    listaCompras.appendChild(item);
  });
}
