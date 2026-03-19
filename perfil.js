import { API_URL } from "./config.js";

// Função para editar qualquer campo
async function editarCampo(campo) {
  try {
    const response = await fetch(`${API_URL}/api/verificar-usuario`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const usuario = await response.json();
      const valorAtual = usuario[campo] || "";
      const novoValor = prompt(`Digite o novo ${campo}:`, valorAtual);

      if (novoValor !== null && novoValor.trim() !== "") {
        usuario[campo] = novoValor;

        const updateResponse = await fetch(`${API_URL}/api/atualizar-usuario`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
          credentials: "include",
        });

        if (updateResponse.ok) {
          alert(`${campo} atualizado com sucesso.`);
          location.reload();
        } else {
          alert("❌ Erro ao atualizar o usuário.");
        }
      }
    } else {
      alert("❌ Erro ao verificar usuário.");
    }
  } catch (error) {
    console.error("Erro ao editar campo:", error);
    alert("❌ Falha na conexão com o servidor. Tente novamente.");
  }
}

// Sair da conta
async function sair() {
  try {
    const response = await fetch(`${API_URL}/api/logout`, {
      method: "POST",
      credentials: "include", // Para enviar cookies de sessão, se necessário
    });

    if (response.ok) {
      alert("Você saiu da conta.");
      window.location.href = "index.html";
    } else {
      alert("❌ Erro ao sair. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao tentar sair:", error);
    alert("❌ Falha na conexão com o servidor. Tente novamente.");
  }
}

// Cancelar conta
async function cancelarConta() {
  const confirmacao = confirm("Tem certeza que deseja cancelar sua conta? Essa ação é irreversível.");
  if (confirmacao) {
    try {
      const response = await fetch(`${API_URL}/api/cancelar-conta`, {
        method: "DELETE",
        credentials: "include", // Para enviar cookies de sessão, se necessário
      });

      if (response.ok) {
        alert("Conta cancelada com sucesso.");
        window.location.href = "index.html";
      } else {
        alert("❌ Erro ao cancelar conta.");
      }
    } catch (error) {
      console.error("Erro ao cancelar conta:", error);
      alert("❌ Falha na conexão com o servidor. Tente novamente.");
    }
  }
}

// Abas expansíveis com + e -
document.querySelectorAll('.menu-box h3').forEach(titulo => {
  titulo.addEventListener('click', () => {
    const box = titulo.parentElement;
    box.classList.toggle('ativo');
  });
});

// Funções para o Modal Pix
function abrirPix() {
  document.getElementById('modal-pix').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal-pix').style.display = 'none';
}

function copiarPix() {
  const pixKey = document.getElementById('pix-key').textContent;
  navigator.clipboard.writeText(pixKey).then(() => {
    alert('Chave Pix copiada para a área de transferência!');
  }, () => {
    alert('Falha ao copiar a chave Pix.');
  });
}