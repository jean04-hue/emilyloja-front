import { API_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("produtos-container");
  if (!container) return;

  container.innerHTML = "<p style='text-align:center; margin: 30px 0;'>Carregando produtos...</p>";

  function imagemValida(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }

  function escaparAspas(texto = "") {
    return String(texto)
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/"/g, "&quot;");
  }

  function gerarCard(produto) {
    const nome = produto.nome || "Produto sem nome";
    const descricao = produto.descricao || "Sem descrição.";
    const preco = Number(produto.preco || 0);
    const precoFormatado = preco.toFixed(2);
    const precoAntigo = (preco * 1.25).toFixed(2);
    const estoque = Number(produto.estoque || 0);

    const imagem = imagemValida(produto.imagem_url)
      ? produto.imagem_url
      : "https://placehold.co/250x350?text=Produto";

    const nomeEscapado = escaparAspas(nome);
    const descricaoEscapada = escaparAspas(descricao);
    const imagemEscapada = escaparAspas(imagem);
    const categoriaEscapada = escaparAspas(produto.categoria || "");

    return `
      <div class="card">
        <div class="imagem-container">
          <img 
            src="${imagemEscapada}" 
            alt="${nomeEscapado}"
            onclick="abrirdetalheproduto({
              id: '${produto.id}',
              nome: '${nomeEscapado}',
              preco: ${preco},
              imagem: '${imagemEscapada}',
              descricao: '${descricaoEscapada}',
              categoria: '${categoriaEscapada}',
              estoque: ${estoque},
              cores: ['#2f2a2b','#bfc0c1','#1d1f22']
            })"
            style="cursor: pointer;"
          >

          <div 
            class="overlay-compra"
            onclick="comprarapida({
              id: '${produto.id}',
              nome: '${nomeEscapado}',
              preco: ${preco},
              imagem: '${imagemEscapada}',
              descricao: '${descricaoEscapada}',
              categoria: '${categoriaEscapada}',
              estoque: ${estoque},
              cores: ['#2f2a2b','#bfc0c1','#1d1f22']
            })"
          >
            Compra rápida
          </div>
        </div>

        <div class="info-produto">
          <h3 
            class="nome-produto"
            onclick="abrirdetalheproduto({
              id: '${produto.id}',
              nome: '${nomeEscapado}',
              preco: ${preco},
              imagem: '${imagemEscapada}',
              descricao: '${descricaoEscapada}',
              categoria: '${categoriaEscapada}',
              estoque: ${estoque},
              cores: ['#2f2a2b','#bfc0c1','#1d1f22']
            })"
            style="cursor: pointer;"
          >
            ${nome}
          </h3>

          <div class="precos">
            <span class="preco-antigo">R$ ${precoAntigo}</span>
            <span class="preco-atual">R$ ${precoFormatado}</span>
          </div>

          <p class="categoria">${produto.categoria || "Categoria não informada"}</p>

          <div class="cores">
            <span class="cor" style="background:#2f2a2b;"></span>
            <span class="cor" style="background:#bfc0c1;"></span>
            <span class="cor" style="background:#1d1f22;"></span>
          </div>

          <p style="margin-top:8px; font-size:14px;">
            Estoque: ${estoque}
          </p>
        </div>
      </div>
    `;
  }

  try {
    const response = await fetch(`${API_URL}/api/produtos`);
    const produtos = await response.json();

    if (!response.ok) {
      container.innerHTML = "<p style='text-align:center; margin: 30px 0;'>Erro ao carregar produtos.</p>";
      return;
    }

    if (!Array.isArray(produtos) || produtos.length === 0) {
      container.innerHTML = "<p style='text-align:center; margin: 30px 0;'>Nenhum produto encontrado.</p>";
      return;
    }

    const produtosFemininos = produtos.filter(
      (produto) => String(produto.publico || "").toLowerCase() === "feminino"
    );

    const produtosMasculinos = produtos.filter(
      (produto) => String(produto.publico || "").toLowerCase() === "masculino"
    );

    container.innerHTML = `
      <section id="produtos-femininos" style="margin-top: 30px;">
        <h2 style="margin-bottom: 20px;">Feminino</h2>
        <div class="carousel-container" style="display:block;">
          <div class="carousel" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px;">
            ${
              produtosFemininos.length
                ? produtosFemininos.map(gerarCard).join("")
                : "<p>Nenhum produto feminino cadastrado.</p>"
            }
          </div>
        </div>
      </section>

      <section id="produtos-masculinos" style="margin-top: 50px;">
        <h2 style="margin-bottom: 20px;">Masculino</h2>
        <div class="carousel-container" style="display:block;">
          <div class="carousel" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px;">
            ${
              produtosMasculinos.length
                ? produtosMasculinos.map(gerarCard).join("")
                : "<p>Nenhum produto masculino cadastrado.</p>"
            }
          </div>
        </div>
      </section>
    `;
  } catch (error) {
    console.error("Erro ao carregar produtos da loja:", error);
    container.innerHTML = "<p style='text-align:center; margin: 30px 0;'>Erro de conexão com o servidor.</p>";
  }
});