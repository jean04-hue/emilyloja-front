import { API_URL } from "./config.js";

const suggestions = [
  "calça jeans",
  "saia",
  "bermuda",
  "vestido",
  "blusa",
  "blusa infantil",
  "saia longa",
  "saia longa tule",
  "saia cetim",
  "saia kamile",
  "vestido dominique",
  "vestido mídi",
  "vestido longo+cinto",
  "vestido tule florido",
  "vestido júlia",
  "blusa lase",
  "6 a 12 meses",
  "coleção de animais",
  "conjuntos",
  "camisetas de regata",
  "blusas de algodão",
  "calças de sarja",
  "skinny",
  "cargo",
  "larga",
  "bolsa de mão",
  "cintos de couro",
  "joias",
];

let currentSlideIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (!slides.length) return;

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

function removeNavbarBackground() {
  const navbar = document.querySelector(".navbar");
  if (navbar) navbar.classList.add("transparent");
}

function restoreNavbarBackground() {
  const navbar = document.querySelector(".navbar");
  if (navbar) navbar.classList.remove("transparent");
}

function closeSearch() {
  const searchNavbar = document.getElementById("searchNavbar");
  const suggestionList = document.getElementById("suggestions");

  if (searchNavbar) {
    searchNavbar.classList.remove("active");
  }

  document.body.classList.remove("search-active");

  if (suggestionList) {
    suggestionList.style.display = "none";
  }
}

function showSuggestions(query, suggestionList) {
  if (!suggestionList) return;

  suggestionList.innerHTML = "";

  if (!query) {
    suggestionList.style.display = "none";
    return;
  }

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  filteredSuggestions.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    listItem.onclick = () => {
      selectSuggestion(item, suggestionList);
    };
    suggestionList.appendChild(listItem);
  });

  suggestionList.style.display = filteredSuggestions.length > 0 ? "block" : "none";
}

function selectSuggestion(suggestion, suggestionList) {
  const expandedSearch = document.getElementById("expandedSearch");
  if (!expandedSearch || !suggestionList) return;

  expandedSearch.value = suggestion;
  suggestionList.style.display = "none";
  expandedSearch.focus();
}

function buscarProdutoOuCategoria(termo) {
  const termoLimpo = termo.trim().toLowerCase();
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  const resultados = produtos.filter((p) => {
    const nome = (p.nome || "").toLowerCase();
    const categoria = (p.categoria || "").toLowerCase();
    return nome.includes(termoLimpo) || categoria.includes(termoLimpo);
  });

  localStorage.setItem("produtosFiltrados", JSON.stringify(resultados));
  localStorage.setItem("tituloCategoria", `Resultados para: ${termo}`);
  localStorage.setItem("filtroPorBusca", "true");
  window.location.href = "categoria.html";
}

function performSearch(query) {
  const termo = query.trim();
  if (!termo) return;
  buscarProdutoOuCategoria(termo);
}

function toggleSection(section) {
  const masculino = document.getElementById("masculino");
  const feminino = document.getElementById("feminino");
  const btnMasculino = document.getElementById("btn-masculino");
  const btnFeminino = document.getElementById("btn-feminino");

  if (!masculino || !feminino || !btnMasculino || !btnFeminino) return;

  if (section === "masculino") {
    masculino.classList.remove("hidden");
    feminino.classList.add("hidden");
    btnMasculino.classList.add("active");
    btnFeminino.classList.remove("active");
  } else {
    feminino.classList.remove("hidden");
    masculino.classList.add("hidden");
    btnFeminino.classList.add("active");
    btnMasculino.classList.remove("active");
  }
}

function showMasculino() {
  const masc = document.getElementById("carousel-masculino");
  const fem = document.getElementById("carousel-feminino");
  const btnMasculino = document.getElementById("btn-masculino");
  const btnFeminino = document.getElementById("btn-feminino");

  if (masc) masc.classList.remove("hidden");
  if (fem) fem.classList.add("hidden");
  if (btnMasculino) btnMasculino.classList.add("active");
  if (btnFeminino) btnFeminino.classList.remove("active");
}

function showFeminino() {
  const masc = document.getElementById("carousel-masculino");
  const fem = document.getElementById("carousel-feminino");
  const btnMasculino = document.getElementById("btn-masculino");
  const btnFeminino = document.getElementById("btn-feminino");

  if (masc) masc.classList.add("hidden");
  if (fem) fem.classList.remove("hidden");
  if (btnFeminino) btnFeminino.classList.add("active");
  if (btnMasculino) btnMasculino.classList.remove("active");
}

let currentIndex = 0;

function moveCarousel(direction) {
  const carousel = document.querySelector("#carousel-masculino .carousel");
  const card = document.querySelector("#carousel-masculino .card");

  if (!carousel || !card) return;

  const cardWidth = card.offsetWidth + 16;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  currentIndex += direction;

  let newScroll = currentIndex * cardWidth;

  if (newScroll < 0) {
    newScroll = 0;
    currentIndex = 0;
  } else if (newScroll > maxScroll) {
    newScroll = maxScroll;
    currentIndex = Math.max(0, currentIndex - 1);
  }

  carousel.scrollTo({
    left: newScroll,
    behavior: "smooth",
  });

  toggleButtons();
}

function toggleButtons() {
  const carousel = document.querySelector("#carousel-masculino .carousel");
  const prevBtn = document.querySelector("#carousel-masculino .prev-btn");
  const nextBtn = document.querySelector("#carousel-masculino .next-btn");

  if (!carousel || !prevBtn || !nextBtn) return;

  prevBtn.disabled = carousel.scrollLeft <= 0;
  nextBtn.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
}

let currentIndexFeminino = 0;

function moveCarouselFeminino(direction) {
  const carousel = document.querySelector("#carousel-feminino .carousel");
  const cards = document.querySelectorAll("#carousel-feminino .card");

  if (!carousel || !cards.length) return;

  const maxIndex = cards.length - 1;
  const cardWidth = cards[0].offsetWidth + 16;

  currentIndexFeminino += direction;

  if (currentIndexFeminino < 0) currentIndexFeminino = 0;
  if (currentIndexFeminino > maxIndex) currentIndexFeminino = maxIndex;

  const newScroll = currentIndexFeminino * cardWidth;

  carousel.scrollTo({
    left: newScroll,
    behavior: "smooth",
  });

  toggleButtonsFeminino();
}

function toggleButtonsFeminino() {
  const prevBtn = document.querySelector("#carousel-feminino .prev-btn");
  const nextBtn = document.querySelector("#carousel-feminino .next-btn");
  const carousel = document.querySelector("#carousel-feminino .carousel");

  if (!prevBtn || !nextBtn || !carousel) return;

  prevBtn.disabled = currentIndexFeminino === 0;
  nextBtn.disabled = currentIndexFeminino >= carousel.children.length - 1;
}

function getUsuarioLogado() {
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  if (!usuarioLogado) return null;

  try {
    return JSON.parse(usuarioLogado);
  } catch {
    return null;
  }
}

function gerarIniciais(nome = "") {
  const partes = nome.trim().split(" ").filter(Boolean);
  const primeira = partes[0]?.[0]?.toUpperCase() || "";
  const segunda = partes[1]?.[0]?.toUpperCase() || "";
  return primeira + segunda;
}

function atualizarMenuComUsuario(usuario) {
  const avatarId = document.getElementById("userAvatar");
  const nomeId = document.getElementById("userName");

  const avatarClass = document.querySelector(".user-avatar");
  const nomeClass = document.querySelector(".user-name");

  const avatar = avatarId || avatarClass;
  const nomeElemento = nomeId || nomeClass;

  if (avatar) {
    avatar.textContent = usuario?.nome ? gerarIniciais(usuario.nome) : "?";
  }

  if (nomeElemento) {
    nomeElemento.textContent = usuario?.nome || "Convidado";
  }
}

async function verificarUsuarioLogado() {
  try {
    const response = await fetch(`${API_URL}/api/verificar-usuario`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const usuario = await response.json();
      atualizarMenuComUsuario(usuario);
    } else {
      atualizarMenuComUsuario(getUsuarioLogado());
    }
  } catch (error) {
    console.error("Erro ao verificar usuário logado:", error);
    atualizarMenuComUsuario(getUsuarioLogado());
  }
}

function abrirdetalheproduto(produto) {
  localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
  window.location.href = "detalheproduto.html";
}

function comprarapida(produto) {
  if (!produto?.estoque || produto.estoque <= 0) {
    alert("Produto fora de estoque. 😕");
    return;
  }

  localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
  window.location.href = "pagamento-pix.html";
}

function filtrarCategoria(categoria) {
  localStorage.setItem("categoriaSelecionada", categoria);
  window.location.href = "categoria.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const modalcadastro = document.getElementById("userModal");
  const openUserModal = document.querySelector(".fa-user")?.parentElement;
  const closeUserModal = document.getElementById("closeUserModal");

  const btnCadastro = document.getElementById("btnCadastro");
  const btnLogin = document.getElementById("btnLogin");
  const modalTitle = document.getElementById("modalTitle");

  const formCadastro = document.getElementById("formCadastro");
  const formLogin = document.getElementById("formLogin");

  if (openUserModal && modalcadastro) {
    openUserModal.onclick = () => {
      modalcadastro.classList.remove("hidden");
      document.body.classList.add("modal-open");
    };
  }

  if (closeUserModal && modalcadastro) {
    closeUserModal.onclick = () => {
      modalcadastro.classList.add("hidden");
      document.body.classList.remove("modal-open");
    };
  }

  if (btnCadastro && btnLogin && formCadastro && formLogin && modalTitle) {
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

  const searchButton = document.getElementById("openSearch");
  const searchNavbar = document.getElementById("searchNavbar");
  const backButton = document.getElementById("backButton");
  const expandedSearch = document.getElementById("expandedSearch");
  const suggestionList = document.getElementById("suggestions");

  if (searchButton && searchNavbar && backButton && expandedSearch && suggestionList) {
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      searchNavbar.classList.add("active");
      document.body.classList.add("search-active");
      expandedSearch.focus();
    });

    backButton.addEventListener("click", function () {
      closeSearch();
    });

    expandedSearch.addEventListener("input", function () {
      showSuggestions(this.value, suggestionList);
    });

    expandedSearch.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeSearch();
      }
    });

    expandedSearch.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(expandedSearch.value);
        suggestionList.style.display = "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest("#searchNavbar") && !e.target.closest("#openSearch")) {
        closeSearch();
      }
    });
  }

  const modalcarrinho = document.getElementById("cartModal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");

  if (modalcarrinho && openModalBtn && closeModalBtn) {
    openModalBtn.addEventListener("click", function () {
      modalcarrinho.classList.remove("hidden");
      modalcarrinho.classList.add("show");
    });

    closeModalBtn.addEventListener("click", function () {
      modalcarrinho.classList.remove("show");
      modalcarrinho.classList.add("hidden");
    });

    window.addEventListener("click", function (event) {
      if (event.target === modalcarrinho) {
        modalcarrinho.classList.remove("show");
        modalcarrinho.classList.add("hidden");
      }
    });
  }

  const scrollContainer = document.getElementById("scrollContainer");
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");
  const progressBar = document.getElementById("progress");
  const scrollAmount = 250;

  if (scrollContainer && leftArrow && rightArrow && progressBar) {
    function updateProgress() {
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const currentScroll = scrollContainer.scrollLeft;
      const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }

    function updateArrows() {
      leftArrow.classList.toggle("hidden", scrollContainer.scrollLeft <= 0);
      rightArrow.classList.toggle(
        "hidden",
        scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth
      );
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
  }

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

  toggleButtons();
  toggleButtonsFeminino();
  verificarUsuarioLogado();

  const btnSair = document.getElementById("btn-sair");
  if (btnSair) {
    btnSair.addEventListener("click", async function () {
      try {
        const response = await fetch(`${API_URL}/api/logout`, {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          localStorage.removeItem("usuarioLogado");
          window.location.href = "index.html";
        } else {
          alert("❌ Erro ao sair. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao tentar sair:", error);
        alert("❌ Falha na conexão com o servidor. Tente novamente.");
      }
    });
  }

  showSlide(0);
});

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.currentSlide = currentSlide;
window.showMasculino = showMasculino;
window.showFeminino = showFeminino;
window.moveCarousel = moveCarousel;
window.moveCarouselFeminino = moveCarouselFeminino;
window.filtrarCategoria = filtrarCategoria;
window.abrirdetalheproduto = abrirdetalheproduto;
window.comprarapida = comprarapida;
window.buscarProdutoOuCategoria = buscarProdutoOuCategoria;
window.toggleSection = toggleSection;
window.removeNavbarBackground = removeNavbarBackground;
window.restoreNavbarBackground = restoreNavbarBackground;