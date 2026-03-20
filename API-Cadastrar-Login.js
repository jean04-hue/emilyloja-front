import { API_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const userModal = document.getElementById("userModal");

  const formCadastro = document.getElementById("formCadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nome = document.getElementById("cadNome")?.value?.trim();
      const email = document.getElementById("cadEmail")?.value?.trim();
      const senha = document.getElementById("cadSenha")?.value;

      try {
        const response = await fetch(`${API_URL}/api/cadastrar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ nome, email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Cadastro realizado com sucesso!");

          if (data.usuario) {
            localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));
          }

          if (userModal) {
            userModal.classList.add("hidden");
          }

          document.body.classList.remove("modal-open");

          setTimeout(() => {
            window.location.href = "loja.html";
          }, 800);
        } else {
          alert("❌ Erro no cadastro: " + (data.erro || "Tente novamente"));
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("❌ Falha de conexão com o servidor. Detalhes: " + error.message);
      }
    });
  }

  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail")?.value?.trim();
      const senha = document.getElementById("loginSenha")?.value;

      try {
        const response = await fetch(`${API_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Login realizado com sucesso!");

          if (data.usuario) {
            localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));
          }

          if (userModal) {
            userModal.classList.add("hidden");
          }

          document.body.classList.remove("modal-open");

          setTimeout(() => {
            window.location.href = "loja.html";
          }, 800);
        } else {
          alert("❌ Erro no login: " + (data.erro || "Usuário ou senha inválidos"));
        }
      } catch (error) {
        console.error("❌ Erro no login:", error);
        alert("❌ Falha de conexão com o servidor. Detalhes: " + error.message);
      }
    });
  }
});