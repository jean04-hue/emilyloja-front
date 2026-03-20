import { API_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("produtos-container");
  if (!container) return;

  container.innerHTML = "<p>Carregando produtos...</p>";

  try {
    const response = await fetch(`${API_URL}/api/produtos`);
    const produtos = await response.json();

    if (!response.ok) {
      container.innerHTML = "<p>Erro ao carregar produtos.</p>";
      return;
    }

    if (!produtos.length) {
      container.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:20px; margin:30px 0;">
        ${produtos
          .map(
            (produto) => `
              <div style="border:1px solid #ddd; border-radius:12px; padding:16px; background:#fff;">
                <img 
                  src="${produto.imagem_url || "https://placehold.co/250x350?text=Produto"}" 
                  alt="${produto.nome}" 
                  style="width:100%; max-width:250px; height:auto; display:block; margin:0 auto 12px;"
                >
                <h3 style="margin-bottom:8px;">${produto.nome}</h3>
                <p style="margin-bottom:8px;">${produto.descricao || ""}</p>
                <p style="font-weight:bold; margin-bottom:8px;">R$ ${Number(produto.preco).toFixed(2)}</p>
                <p style="margin-bottom:8px;">Estoque: ${produto.estoque}</p>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  } catch (error) {
    console.error("Erro ao carregar produtos da loja:", error);
    container.innerHTML = "<p>Erro de conexão com o servidor.</p>";
  }
});