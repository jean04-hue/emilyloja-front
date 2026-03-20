import { API_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro");
  const tabelaBody = document.querySelector("#tabelaProdutos tbody");

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

      if (!produtos.length) {
        tabelaBody.innerHTML = `
          <tr>
            <td colspan="7">Nenhum produto cadastrado.</td>
          </tr>
        `;
        return;
      }

      tabelaBody.innerHTML = produtos
        .map(
          (produto) => `
            <tr>
              <td>${produto.nome}</td>
              <td>${produto.descricao || ""}</td>
              <td>R$ ${Number(produto.preco).toFixed(2)}</td>
              <td>${produto.estoque}</td>
              <td>${produto.categoria}</td>
              <td>
                ${
                  produto.imagem_url
                    ? `<a href="${produto.imagem_url}" target="_blank">Ver imagem</a>`
                    : "Sem imagem"
                }
              </td>
              <td>
                <button type="button" onclick="deletarProduto('${produto.id}')">Excluir</button>
              </td>
            </tr>
          `
        )
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

      const nome = document.getElementById("nome")?.value?.trim() || "";
      const descricao = document.getElementById("descricao")?.value?.trim() || "";
      const preco = document.getElementById("preco")?.value ?? "";
      const estoque = document.getElementById("estoque")?.value ?? "";
      const categoria = document.getElementById("categoria")?.value?.trim() || "";
      const imagem = document.getElementById("imagem")?.value?.trim() || "";

      if (!nome) {
        alert("❌ Preencha o nome do produto.");
        return;
      }

      if (!descricao) {
        alert("❌ Preencha a descrição.");
        return;
      }

      if (preco === "") {
        alert("❌ Preencha o preço.");
        return;
      }

      if (estoque === "") {
        alert("❌ Preencha o estoque.");
        return;
      }

      if (!categoria) {
        alert("❌ Selecione uma categoria.");
        return;
      }

      if (!imagem) {
        alert("❌ Preencha a URL da imagem.");
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

        const data = await response.json();

        if (response.ok) {
          alert("✅ Produto cadastrado com sucesso!");
          formCadastro.reset();
          carregarProdutos();
          selecionarAba("ver");
        } else {
          alert("❌ Erro: " + (data.erro || "Não foi possível cadastrar."));
        }
      } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        alert("❌ Erro de conexão com o servidor.");
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

      const data = await response.json();

      if (response.ok) {
        alert("✅ Produto excluído com sucesso!");
        carregarProdutos();
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