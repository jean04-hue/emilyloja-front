document.addEventListener("DOMContentLoaded", function () {
  const modalcadastro = document.getElementById("userModal");
  const openUserModal = document.querySelector(".fa-user").parentElement;
  const closeUserModal = document.getElementById("closeUserModal");

  const btnCadastro = document.getElementById("btnCadastro");
  const btnLogin = document.getElementById("btnLogin");
  const modalTitle = document.getElementById("modalTitle");

  const formCadastro = document.getElementById("formCadastro");
  const formLogin = document.getElementById("formLogin");

  openUserModal.onclick = () => {
    modalcadastro.classList.remove("hidden");
  };

  closeUserModal.onclick = () => {
    modalcadastro.classList.add("hidden");
  };

  // Alternar abas
  btnCadastro.onclick = () => {
    formCadastro.classList.remove("hidden");
    formLogin.classList.add("hidden");
    btnCadastro.classList.add("active");
    btnLogin.classList.remove("active");
    modalTitle.textContent = "Cadastro";
  };

  btnLogin.onclick = () => {
    formLogin.classList.remove("hidden");
    formCadastro.classList.add("hidden");
    btnLogin.classList.add("active");
    btnCadastro.classList.remove("active");
    modalTitle.textContent = "Login";
  };

  // Enviar cadastro
  formCadastro.onsubmit = function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    alert(`Bem-vindo(a), ${nome}! Redirecionando para a loja...`);
    setTimeout(() => {
      window.location.href = "loja.html";
    }, 1000);
  };

  // Enviar login
  formLogin.onsubmit = function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    alert(`Login realizado com sucesso: ${email}`);
    setTimeout(() => {
      window.location.href = "loja.html";
    }, 1000);
  };
});



// ===================== SLIDESHOW =====================
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlideIndex);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlideIndex);
    });
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

function currentSlide(index) {
    showSlide(index);
}

// ===================== NAVBAR =====================
function removeNavbarBackground() {
    document.querySelector(".navbar").classList.add("transparent");
}

function restoreNavbarBackground() {
    document.querySelector(".navbar").classList.remove("transparent");
}

// ===================== PESQUISA E SUGESTÕES =====================
const suggestions = [
  "calça jeans", "saia", "bermuda", "vestido", "blusa", "blusa infantil", "a", "b", "c", "d", 
  "saia longa", "saia longa tule", "saia cetim", "saia kamile", "vestido dominique", "vestido mídi",
  "vestido longo+cinto", "vestido tule florido", "vestido júlia", "vestido mídi", "blusa lase",
  "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1",
];

document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('openSearch');
  const searchNavbar = document.getElementById('searchNavbar');
  const backButton = document.getElementById('backButton');
  const expandedSearch = document.getElementById('expandedSearch');
  const suggestionList = document.getElementById('suggestions');
  const body = document.body;

  // Abrir barra de pesquisa expandida ao clicar no ícone
  searchButton.addEventListener('click', function(e) {
      e.preventDefault();
      searchNavbar.classList.add('active');
      body.classList.add('search-active');
      expandedSearch.focus();
  });

  // Fechar barra de pesquisa expandida
  backButton.addEventListener('click', function() {
      closeSearch();
  });

  // Mostrar sugestões ao digitar
  expandedSearch.addEventListener('input', function() {
      showSuggestions(this.value, suggestionList);
  });

  // Fechar com ESC
  expandedSearch.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
          closeSearch();
      }
  });

  // Executar busca ao pressionar Enter
  expandedSearch.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          performSearch(expandedSearch.value);
          suggestionList.style.display = 'none';
      }
  });

  // Adiciona um listener de evento ao documento para fechar a busca ao clicar fora dela
  document.addEventListener("click", (e) => {
      if (!e.target.closest("#searchNavbar") && !e.target.closest("#openSearch")) {
          closeSearch();
      }
  });
});

// Função para fechar a barra de pesquisa
function closeSearch() {
  const searchNavbar = document.getElementById('searchNavbar');
  const body = document.body;
  const suggestionList = document.getElementById('suggestions');
  
  searchNavbar.classList.remove('active');
  body.classList.remove('search-active');
  suggestionList.style.display = 'none';
}

// Sua função original adaptada para receber parâmetros
function showSuggestions(query, suggestionList) {
  suggestionList.innerHTML = '';

  if (query) {
      const filteredSuggestions = suggestions.filter(item =>
          item.toLowerCase().includes(query.toLowerCase())
      );

      filteredSuggestions.forEach(item => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          listItem.onclick = () => {
              selectSuggestion(item, suggestionList);
          };
          suggestionList.appendChild(listItem);
      });

      suggestionList.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
  } else {
      suggestionList.style.display = 'none';
  }
}

// Função adaptada para receber o elemento de sugestões
function selectSuggestion(suggestion, suggestionList) {
  const expandedSearch = document.getElementById('expandedSearch');
  expandedSearch.value = suggestion;
  suggestionList.style.display = 'none';
  expandedSearch.focus();
}

function performSearch(query) {
  if (query.trim() !== '') {
      console.log('Buscando por:', query);
      // Implemente sua lógica de busca aqui
      function performSearch(query) {
  if (query.trim() !== '') {
      console.log('Buscando por:', query);
      // Redireciona para a página de busca com o termo de pesquisa
      window.location.href = '/busca?q=' + encodeURIComponent(query);
  }
}
  }
}

// ===================== MODAL DE CARRINHO =====================
document.addEventListener("DOMContentLoaded", function () {
    const modalcarrinho = document.getElementById("cartModal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");

    openModalBtn.addEventListener("click", function () {
        modalcarrinho.classList.remove("hidden");
        modalcarrinho.classList.add("show");
    });

    closeModalBtn.addEventListener("click", function () {
        modalcarrinho.classList.remove("show");
        modalcarrinho.classList.add("hidden");
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
            modal.classList.add("hidden");
        }
    });
});

// ===================== CARROSSEL COM PROGRESSO =====================
document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.getElementById("scrollContainer");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
    const progressBar = document.getElementById("progress");
    const scrollAmount = 250;

    function updateProgress() {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const currentScroll = scrollContainer.scrollLeft;
        const progress = (currentScroll / maxScroll) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function updateArrows() {
        leftArrow.classList.toggle("hidden", scrollContainer.scrollLeft <= 0);
        rightArrow.classList.toggle("hidden", scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth);
    }

    leftArrow.addEventListener("click", () => {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    scrollContainer.addEventListener("scroll", () => {
        updateArrows();
        updateProgress();
    });

    updateArrows();
    updateProgress();
});

// ===================== CATEGORIAS MASC/FEM =====================
function toggleSection(section) {
    const masculino = document.getElementById('masculino');
    const feminino = document.getElementById('feminino');
    const btnMasculino = document.getElementById('btn-masculino');
    const btnFeminino = document.getElementById('btn-feminino');

    if (section === 'masculino') {
        masculino.classList.remove('hidden');
        feminino.classList.add('hidden');
        btnMasculino.classList.add('active');
        btnFeminino.classList.remove('active');
    } else {
        feminino.classList.remove('hidden');
        masculino.classList.add('hidden');
        btnFeminino.classList.add('active');
        btnMasculino.classList.remove('active');
    }
}

function showMasculino() {
    document.getElementById('carousel-masculino').classList.remove('hidden');
    document.getElementById('carousel-feminino').classList.add('hidden');

    // Atualiza estilos dos botões
    document.getElementById('btn-masculino').classList.add('active');
    document.getElementById('btn-feminino').classList.remove('active');
}

function showFeminino() {
    document.getElementById('carousel-masculino').classList.add('hidden');
    document.getElementById('carousel-feminino').classList.remove('hidden');

    // Atualiza estilos dos botões
    document.getElementById('btn-feminino').classList.add('active');
    document.getElementById('btn-masculino').classList.remove('active');
}



// ===================== CARROSSEL MASCULINO =====================
let currentIndex = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector('#carousel-masculino .carousel');
    const card = document.querySelector('#carousel-masculino .card');
    const cardWidth = card.offsetWidth + 16; // 16px é o gap
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    currentIndex += direction;

    let newScroll = currentIndex * cardWidth;
    if (newScroll < 0) {
        newScroll = 0;
        currentIndex = 0;
    } else if (newScroll > maxScroll) {
        newScroll = maxScroll;
        currentIndex--;
    }

    carousel.scrollTo({
        left: newScroll,
        behavior: 'smooth'
    });

    toggleButtons();
}

function toggleButtons() {
    const carousel = document.querySelector('#carousel-masculino .carousel');
    const prevBtn = document.querySelector('#carousel-masculino .prev-btn');
    const nextBtn = document.querySelector('#carousel-masculino .next-btn');

    prevBtn.disabled = carousel.scrollLeft <= 0;
    nextBtn.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
}

// ===================== CARROSSEL FEMININO =====================
let currentIndexFeminino = 0;

function moveCarouselFeminino(direction) {
    const carousel = document.querySelector('#carousel-feminino .carousel');
    const cards = document.querySelectorAll('#carousel-feminino .card');
    const maxIndex = cards.length - 1;
    const cardWidth = cards[0].offsetWidth + 16;

    currentIndexFeminino += direction;

    if (currentIndexFeminino < 0) currentIndexFeminino = 0;
    if (currentIndexFeminino > maxIndex) currentIndexFeminino = maxIndex;

    const newScroll = currentIndexFeminino * cardWidth;

    carousel.scrollTo({
        left: newScroll,
        behavior: 'smooth'
    });

    toggleButtonsFeminino();
}

function toggleButtonsFeminino() {
    const prevBtn = document.querySelector('#carousel-feminino .prev-btn');
    const nextBtn = document.querySelector('#carousel-feminino .next-btn');
    const carousel = document.querySelector('#carousel-feminino .carousel');

    prevBtn.disabled = currentIndexFeminino === 0;
    nextBtn.disabled = currentIndexFeminino === carousel.children.length - 1;
}

// Inicializa os botões após o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
  toggleButtons();
  toggleButtonsFeminino();
});


  // ===================== UTILITÁRIOS =====================
  function getUsuarioLogado() {
    const email = localStorage.getItem("usuarioLogado");
    if (!email) return null;
    const usuario = JSON.parse(localStorage.getItem(email));
    return usuario;
  }

  function gerarIniciais(nome) {
    const partes = nome.trim().split(" ");
    const primeira = partes[0]?.[0]?.toUpperCase() || "";
    const segunda = partes[1]?.[0]?.toUpperCase() || "";
    return primeira + segunda;
  }

  function atualizarMenuComUsuario(usuario) {
    const avatar = document.querySelector(".user-avatar");
    const nomeElemento = document.querySelector(".user-name");

    if (avatar) avatar.textContent = usuario.iniciais || gerarIniciais(usuario.nome);
    if (nomeElemento) nomeElemento.textContent = usuario.nome;
  }

  // ===================== REDIRECIONAMENTO PARA PERFIL =====================
  const meuPerfilLink = document.querySelector("a[href='perfil.html']");
  if (meuPerfilLink) {
    meuPerfilLink.addEventListener("click", function (e) {
      const usuario = getUsuarioLogado();
      if (!usuario) {
        e.preventDefault();
        alert("Você precisa estar logado para acessar o perfil.");
      }
    });
  }

  // ===================== MODAL DE CADASTRO =====================
  const modalcadastro = document.getElementById("userModal");
  const openUserModal = document.querySelector(".fa-user")?.parentElement;
  const closeUserModal = document.getElementById("closeUserModal");

  const btnCadastro = document.getElementById("btnCadastro");
  const btnLogin = document.getElementById("btnLogin");
  const modalTitle = document.getElementById("modalTitle");

  const formCadastro = document.getElementById("formCadastro");
  const formLogin = document.getElementById("formLogin");

  if (openUserModal) {
    openUserModal.onclick = () => {
      modalcadastro.classList.remove("hidden");
      document.body.classList.add("modal-open");
    };
  }

  if (closeUserModal) {
    closeUserModal.onclick = () => {
      modalcadastro.classList.add("hidden");
      document.body.classList.remove("modal-open");
    };
  }

  if (btnCadastro && btnLogin) {
    btnCadastro.onclick = () => {
      formCadastro.classList.remove("hidden");
      formLogin.classList.add("hidden");
      btnCadastro.classList.add("active");
      btnLogin.classList.remove("active");
      modalTitle.textContent = "Cadastro";
    };

    btnLogin.onclick = () => {
      formLogin.classList.remove("hidden");
      formCadastro.classList.add("hidden");
      btnLogin.classList.add("active");
      btnCadastro.classList.remove("active");
      modalTitle.textContent = "Login";
    };
  }

  if (formCadastro) {
    formCadastro.onsubmit = function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value;

      if (localStorage.getItem(email)) {
        alert("Este e-mail já está cadastrado. Tente outro.");
        return;
      }

      for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        const usuario = JSON.parse(localStorage.getItem(chave));
        if (usuario?.nome?.toLowerCase() === nome.toLowerCase()) {
          alert("Este nome já foi utilizado. Tente outro.");
          return;
        }
      }

      const iniciais = gerarIniciais(nome);
      const usuario = { nome, email, senha, iniciais };
      localStorage.setItem(email, JSON.stringify(usuario));
      localStorage.setItem("usuarioLogado", email);

      alert(`Bem-vindo(a), ${nome}! Cadastro realizado com sucesso.`);

      modalcadastro.classList.add("hidden");
      document.body.classList.remove("modal-open");

      setTimeout(() => {
        window.location.href = "loja.html";
      }, 1000);
    };
  }

  if (formLogin) {
    formLogin.onsubmit = function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const senha = document.getElementById("loginSenha").value;

      const usuario = JSON.parse(localStorage.getItem(email));

      if (!usuario) {
        alert("Nenhum usuário cadastrado com esse e-mail.");
        return;
      }

      if (usuario.email === email && usuario.senha === senha) {
        localStorage.setItem("usuarioLogado", email);
        alert(`Bem-vindo de volta, ${usuario.nome}!`);

        modalcadastro.classList.add("hidden");

        setTimeout(() => {
          window.location.href = "loja.html";
        }, 1000);
      } else {
        alert("E-mail ou senha inválidos.");
      }
    };
  }

  // ===================== MENU LATERAL =====================
  const openBtn = document.getElementById("openSideMenu");
  const menu = document.getElementById("sideMenu");

  if (openBtn && menu) {
    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest("#sideMenu") && !e.target.closest("#openSideMenu")) {
        menu.classList.remove("show");
      }
    });

    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // ===================== ATUALIZA MENU COM USUÁRIO =====================
  const usuario = getUsuarioLogado();
  if (usuario) {
    atualizarMenuComUsuario(usuario);
  }
;

  document.getElementById("btn-sair").addEventListener("click", function () {
  // Removendo os dados do usuário (ajuste conforme sua chave)
  localStorage.removeItem("usuarioLogado"); 
  localStorage.removeItem("dadosUsuario");  // caso use outro nome

  // Redirecionando para a página de login
  window.location.href = "index.html";
});


  // Função para abrir detalhes do produto
function abrirdetalheproduto(produto) {
  localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
  window.location.href = "detalheproduto.html";
}

function comprarapida(produto) {
  if (!produto.estoque || produto.estoque <= 0) {
    alert("Produto fora de estoque. 😕");
    return;
  }

  // Armazena no localStorage
  localStorage.setItem("produtoSelecionado", JSON.stringify(produto));

  // Redireciona para página de pagamento
  window.location.href = "pagamento-pix.html";
}

 
function filtrarCategoria(categoria) {
  localStorage.setItem("categoriaSelecionada", categoria);
  window.location.href = "categoria.html"; // ou produtos.html
}


function buscarProdutoOuCategoria(termo) {
  const termoLimpo = termo.trim().toLowerCase();
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  const resultados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termoLimpo) ||
    p.categoria.toLowerCase().includes(termoLimpo)
  );

  localStorage.setItem("produtosFiltrados", JSON.stringify(resultados));
  localStorage.setItem("tituloCategoria", `Resultados para: ${termo}`);
  localStorage.setItem("filtroPorBusca", "true");
  window.location.href = "categoria.html";
}

