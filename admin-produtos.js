import { API_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro");
  const tabelaBody = document.querySelector("#tabelaProdutos tbody");

  let enviandoFormulario = false;

  function urlValida(texto) {
    try {
      new URL(texto);
      return true;
    } catch {
      return false;
    }
  }

  function imagemSegura(url) {
    if (!url || !urlValida(url)) {
      return `<span>Sem imagem</span>`;
    }

    return `
      <img 
        src="${url}" 
        alt="Produto" 
        style="width:60px; height:60px; object-fit:cover; border-radius:6px;"
        onerror="this.outerHTML='<span>Imagem inválida</span>'"
      >
    `;
  }

  async function carregarProdutos() {
    if (!tabelaBody) return;

    tabelaBody.innerHTML = `
      <tr>
        <td colspan="7">Carregando produtos...</td>
      </tr>
    `;

    try {
      const response = await fetch(`${API_URL}/api/produtos`);
      const produtos = await response.json();

      if (!response.ok) {
        tabelaBody.innerHTML = `
          <tr>
            <td colspan="7">Erro ao carregar produtos.</td>
          </tr>
        `;
        return;
      }

      if (!Array.isArray(produtos) || produtos.length === 0) {
        tabelaBody.innerHTML = `
          <tr>
            <td colspan="7">Nenhum produto cadastrado.</td>
          </tr>
        `;
        return;
      }

      tabelaBody.innerHTML = produtos
        .map((produto) => {
          const precoFormatado = Number(produto.preco || 0).toFixed(2);

          return `
            <tr>
              <td>${produto.nome || ""}</td>
              <td>${produto.descricao || ""}</td>
              <td>R$ ${precoFormatado}</td>
              <td>${produto.estoque ?? 0}</td>
              <td>${produto.categoria || ""}</td>
              <td>${imagemSegura(produto.imagem_url)}</td>
              <td>
                <button type="button" onclick="deletarProduto('${produto.id}')">Excluir</button>
              </td>
            </tr>
          `;
        })
        .join("");
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      tabelaBody.innerHTML = `
        <tr>
          <td colspan="7">Erro de conexão ao carregar produtos.</td>
        </tr>
      `;
    }
  }

  if (formCadastro) {
    formCadastro.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (enviandoFormulario) return;
      enviandoFormulario = true;

      const nome = document.getElementById("nome")?.value?.trim() || "";
      const descricao = document.getElementById("descricao")?.value?.trim() || "";
      const preco = document.getElementById("preco")?.value ?? "";
      const estoque = document.getElementById("estoque")?.value ?? "";
      const categoria = document.getElementById("categoria")?.value?.trim() || "";
      const imagem = document.getElementById("imagem")?.value?.trim() || "";

      if (!nome) {
        alert("❌ Preencha o nome do produto.");
        enviandoFormulario = false;
        return;
      }

      if (!descricao) {
        alert("❌ Preencha a descrição.");
        enviandoFormulario = false;
        return;
      }

      if (preco === "") {
        alert("❌ Preencha o preço.");
        enviandoFormulario = false;
        return;
      }

      if (estoque === "") {
        alert("❌ Preencha o estoque.");
        enviandoFormulario = false;
        return;
      }

      if (!categoria) {
        alert("❌ Selecione uma categoria.");
        enviandoFormulario = false;
        return;
      }

      if (!imagem) {
        alert("❌ Preencha a URL da imagem.");
        enviandoFormulario = false;
        return;
      }

      if (!urlValida(imagem)) {
        alert("❌ A URL da imagem é inválida.");
        enviandoFormulario = false;
        return;
      }

      const payload = {
        nome,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque),
        categoria,
        imagem_url: imagem,
        ativo: true,
      };

      console.log("Payload enviado:", payload);

      try {
        const response = await fetch(`${API_URL}/api/produtos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        let data = {};
        try {
          data = await response.json();
        } catch {
          data = {};
        }

        if (response.ok) {
          alert("✅ Produto cadastrado com sucesso!");
          formCadastro.reset();
          await carregarProdutos();

          if (typeof selecionarAba === "function") {
            selecionarAba("ver");
          }
        } else {
          alert("❌ Erro: " + (data.erro || "Não foi possível cadastrar."));
        }
      } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        alert("❌ Erro de conexão com o servidor.");
      } finally {
        enviandoFormulario = false;
      }
    });
  }

  window.deletarProduto = async function (id) {
    const confirmar = confirm("Deseja realmente excluir este produto?");
    if (!confirmar) return;

    try {
      const response = await fetch(`${API_URL}/api/produtos/${id}`, {
        method: "DELETE",
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        alert("✅ Produto excluído com sucesso!");
        await carregarProdutos();
      } else {
        alert("❌ Erro: " + (data.erro || "Não foi possível excluir."));
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("❌ Erro de conexão ao excluir produto.");
    }
  };

  carregarProdutos();
});