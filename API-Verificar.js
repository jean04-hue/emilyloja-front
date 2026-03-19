// ===================== IMPORTA A URL DA API =====================
import { API_URL } from "./config.js";

// ===================== VERIFICA USUÁRIO LOGADO =====================
export async function verificarUsuarioLogado() {
  try {
    const response = await fetch(`${API_URL}/api/verificar-usuario`, {
      method: "GET",
      credentials: "include", // envia cookies de sessão, se existirem
    });

    if (response.ok) {
      const usuario = await response.json();
      atualizarMenuComUsuario(usuario);
    } else {
      console.warn("Usuário não está logado (resposta da API).");
      atualizarMenuComUsuario(null); // mostra como convidado
    }
  } catch (error) {
    console.error("Erro ao verificar usuário logado:", error);
    atualizarMenuComUsuario(null); // fallback para visitante
  }
}

// ===================== ATUALIZA MENU LATERAL =====================
function atualizarMenuComUsuario(usuario) {
  const avatar = document.getElementById("userAvatar");
  const nomeElemento = document.getElementById("userName");

  if (!avatar || !nomeElemento) {
    console.warn("⚠️ Elementos de usuário não encontrados no DOM.");
    return;
  }

  if (usuario && usuario.nome) {
    // Divide o nome em partes (nome + sobrenome)
    const partes = usuario.nome.trim().split(" ");
    const iniciais = partes.slice(0, 2).map(p => p[0].toUpperCase()).join("");

    avatar.textContent = iniciais || "?";
    nomeElemento.textContent = usuario.nome;
  } else {
    avatar.textContent = "?";
    nomeElemento.textContent = "Convidado";
  }
}

// ===================== EXECUTA AO CARREGAR A PÁGINA =====================
document.addEventListener("DOMContentLoaded", verificarUsuarioLogado);
