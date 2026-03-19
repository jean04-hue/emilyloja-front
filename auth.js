// auth.js — integração do front com a API Render

const API_URL = "https://emilyloja-backend.onrender.com";

// --- Função de Cadastro ---
async function cadastrarUsuario(nome, email, senha) {
  try {
    const resposta = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert("✅ Cadastro realizado com sucesso!");
    } else {
      alert("❌ Erro: " + (dados.erro || "Falha no cadastro"));
    }
  } catch (error) {
    alert("❌ Erro de conexão com o servidor.");
    console.error(error);
  }
}

// --- Função de Login ---
async function loginUsuario(email, senha) {
  try {
    const resposta = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem("usuario", JSON.stringify(dados.usuario));
      localStorage.setItem("token", dados.token);
      alert("✅ Login realizado com sucesso!");
      window.location.href = "index.html"; // redireciona pra home
    } else {
      alert("❌ Erro: " + (dados.erro || "Falha no login"));
    }
  } catch (error) {
    alert("❌ Erro de conexão com o servidor.");
    console.error(error);
  }
}
