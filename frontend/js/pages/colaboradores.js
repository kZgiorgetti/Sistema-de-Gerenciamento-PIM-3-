document.addEventListener("DOMContentLoaded", function () {
  var colaboradoresList = document.getElementById("colaboradoresList");
  var colaboradorForm = document.getElementById("colaboradorForm");
  var colaboradorId = document.getElementById("colaboradorId");
  var colaboradorNome = document.getElementById("colaboradorNome");
  var colaboradorFeedback = document.getElementById("colaboradorFeedback");
  var colaboradorModal = document.getElementById("colaboradorModal");
  var colaboradorModalTitulo = document.getElementById(
    "colaboradorModalTitulo",
  );
  var abrirModalColaborador = document.getElementById("abrirModalColaborador");
  var colaboradorAcoes = document.getElementById("colaboradorAcoes");
  var editarColaborador = document.getElementById("editarColaborador");
  var excluirColaborador = document.getElementById("excluirColaborador");

  var colaboradoresCache = [];
  var colaboradorSelecionado = null;

  function abrirModal(modo, colaborador) {
    modo = modo || "novo";
    colaborador = colaborador || null;
    colaboradorFeedback.textContent = "";
    colaboradorModalTitulo.textContent =
      modo === "editar" ? "Editar colaborador" : "Novo colaborador";
    colaboradorId.value = colaborador ? colaborador.id : "";
    colaboradorNome.value = colaborador ? colaborador.nome : "";
    colaboradorModal.classList.remove("hidden");
    colaboradorModal.setAttribute("aria-hidden", "false");
    colaboradorNome.focus();
  }

  function fecharModal() {
    colaboradorModal.classList.add("hidden");
    colaboradorModal.setAttribute("aria-hidden", "true");
    colaboradorForm.reset();
    colaboradorId.value = "";
  }

  function abrirAcoes(colaborador) {
    colaboradorSelecionado = colaborador;
    colaboradorAcoes.classList.remove("hidden");
    colaboradorAcoes.setAttribute("aria-hidden", "false");
  }

  function fecharAcoes() {
    colaboradorAcoes.classList.add("hidden");
    colaboradorAcoes.setAttribute("aria-hidden", "true");
  }

  async function carregarColaboradores() {
    try {
      colaboradoresCache = await AppServices.colaboradorService.listar();
      if (colaboradoresCache.length) {
        colaboradoresList.innerHTML = colaboradoresCache
          .map(function (colaborador) {
            return (
              '<button class="collaborator-card" type="button" data-id="' +
              colaborador.id +
              '">' +
              '<span class="collaborator-name">' +
              colaborador.nome +
              "</span>" +
              "</button>"
            );
          })
          .join("");
      } else {
        colaboradoresList.innerHTML =
          '<div class="empty-state">Nenhum colaborador cadastrado ainda.</div>';
      }
    } catch (error) {
      colaboradorFeedback.textContent = error.message;
    }
  }

  async function salvarColaborador(event) {
    event.preventDefault();
    colaboradorFeedback.textContent = "";

    try {
      if (colaboradorId.value) {
        await AppServices.colaboradorService.atualizar(
          colaboradorId.value,
          colaboradorNome.value,
        );
      } else {
        await AppServices.colaboradorService.criar(colaboradorNome.value);
      }
      fecharModal();
      await carregarColaboradores();
    } catch (error) {
      colaboradorFeedback.textContent = error.message;
    }
  }

  async function removerColaborador() {
    if (!colaboradorSelecionado) return;

    try {
      await AppServices.colaboradorService.deletar(colaboradorSelecionado.id);
      fecharAcoes();
      await carregarColaboradores();
    } catch (error) {
      fecharAcoes();
      colaboradorFeedback.textContent = error.message;
    }
  }

  // Event listeners
  colaboradoresList.addEventListener("click", function (event) {
    var card = event.target.closest(".collaborator-card");
    if (!card) return;

    var colaborador = colaboradoresCache.find(function (item) {
      return item.id === Number(card.dataset.id);
    });
    if (colaborador) abrirAcoes(colaborador);
  });

  abrirModalColaborador.addEventListener("click", function () {
    abrirModal();
  });

  colaboradorForm.addEventListener("submit", salvarColaborador);

  editarColaborador.addEventListener("click", function () {
    if (!colaboradorSelecionado) return;
    fecharAcoes();
    abrirModal("editar", colaboradorSelecionado);
  });

  excluirColaborador.addEventListener("click", removerColaborador);

  colaboradorModal.addEventListener("click", function (event) {
    if (
      event.target === colaboradorModal ||
      event.target.dataset.closeModal !== undefined
    ) {
      fecharModal();
    }
  });

  colaboradorAcoes.addEventListener("click", function (event) {
    if (
      event.target === colaboradorAcoes ||
      event.target.dataset.closeActions !== undefined
    ) {
      fecharAcoes();
    }
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      fecharModal();
      fecharAcoes();
    }
  });

  // Initial load
  carregarColaboradores();
});
