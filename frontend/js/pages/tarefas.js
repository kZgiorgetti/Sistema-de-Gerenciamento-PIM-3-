document.addEventListener("DOMContentLoaded", function () {
  var tarefasList = document.getElementById("tarefasList");
  var tarefaForm = document.getElementById("tarefaForm");
  var tarefaId = document.getElementById("tarefaId");
  var tarefaTitulo = document.getElementById("tarefaTitulo");
  var tarefaDescricao = document.getElementById("tarefaDescricao");
  var tarefaStatus = document.getElementById("tarefaStatus");
  var tarefaColaborador = document.getElementById("tarefaColaborador");
  var tarefaFeedback = document.getElementById("tarefaFeedback");
  var tarefaModal = document.getElementById("tarefaModal");
  var tarefaModalTitulo = document.getElementById("tarefaModalTitulo");
  var abrirModalTarefa = document.getElementById("abrirModalTarefa");
  var tarefaAcoes = document.getElementById("tarefaAcoes");
  var editarTarefa = document.getElementById("editarTarefa");
  var excluirTarefa = document.getElementById("excluirTarefa");

  var tarefasCache = [];
  var tarefaSelecionada = null;

  var statusLabels = {
    pendente: "Pendente",
    completed: "Concluida",
  };

  function normalizarStatus(status) {
    return status === "completed" ? "completed" : "pendente";
  }

  function abrirModal(modo, tarefa) {
    modo = modo || "novo";
    tarefa = tarefa || null;
    tarefaFeedback.textContent = "";
    tarefaModalTitulo.textContent =
      modo === "editar" ? "Editar tarefa" : "Nova tarefa";
    tarefaId.value = tarefa ? tarefa.id : "";
    tarefaTitulo.value = tarefa ? tarefa.titulo : "";
    tarefaDescricao.value = tarefa ? tarefa.descricao : "";
    tarefaStatus.value = tarefa ? normalizarStatus(tarefa.status) : "pendente";
    tarefaColaborador.value = tarefa ? tarefa.colaborador_id : "";
    tarefaModal.classList.remove("hidden");
    tarefaModal.setAttribute("aria-hidden", "false");
    tarefaTitulo.focus();
  }

  function fecharModal() {
    tarefaModal.classList.add("hidden");
    tarefaModal.setAttribute("aria-hidden", "true");
    tarefaForm.reset();
    tarefaId.value = "";
    tarefaStatus.value = "pendente";
  }

  function abrirAcoes(tarefa) {
    tarefaSelecionada = tarefa;
    tarefaAcoes.classList.remove("hidden");
    tarefaAcoes.setAttribute("aria-hidden", "false");
  }

  function fecharAcoes() {
    tarefaAcoes.classList.add("hidden");
    tarefaAcoes.setAttribute("aria-hidden", "true");
  }

  async function carregarColaboradoresParaSelect() {
    try {
      var colaboradores = await AppServices.colaboradorService.listar();
      var options = '<option value="">Sem responsavel</option>';
      colaboradores.forEach(function (colaborador) {
        options +=
          '<option value="' +
          colaborador.id +
          '">' +
          colaborador.nome +
          "</option>";
      });
      tarefaColaborador.innerHTML = options;
    } catch (error) {
      console.error("Erro ao carregar colaboradores:", error.message);
    }
  }

  async function carregarTarefas() {
    try {
      tarefasCache = await AppServices.tarefaService.listar();
      if (tarefasCache.length) {
        tarefasList.innerHTML = tarefasCache
          .map(function (tarefa) {
            var descricao =
              tarefa.descricao && tarefa.descricao.trim()
                ? tarefa.descricao.trim()
                : "Nao informado";
            var status = normalizarStatus(tarefa.status);
            var botaoConcluir =
              status === "pendente"
                ? '<button class="complete-task-button" type="button" data-complete-id="' +
                  tarefa.id +
                  '">Concluir</button>'
                : "";

            return (
              '<div class="task-card" role="button" tabindex="0" data-id="' +
              tarefa.id +
              '">' +
              '<div class="task-card-header">' +
              "<div>" +
              '<h3 class="task-title">' +
              tarefa.titulo +
              "</h3>" +
              '<p class="task-description">' +
              descricao +
              "</p>" +
              "</div>" +
              '<span class="status-badge ' +
              status +
              '">' +
              statusLabels[status] +
              "</span>" +
              "</div>" +
              '<div class="task-divider"></div>' +
              '<div class="task-footer">' +
              "<p>Responsavel: " +
              '<span class="task-responsible">' +
              (tarefa.colaborador_nome || "Sem responsavel") +
              "</span></p>" +
              botaoConcluir +
              "</div>" +
              "</div>"
            );
          })
          .join("");
      } else {
        tarefasList.innerHTML =
          '<div class="empty-state">Nenhuma tarefa cadastrada ainda.</div>';
      }
    } catch (error) {
      tarefaFeedback.textContent = error.message;
    }
  }

  async function salvarTarefa(event) {
    event.preventDefault();
    tarefaFeedback.textContent = "";

    var payload = {
      titulo: tarefaTitulo.value,
      descricao: tarefaDescricao.value,
      status: tarefaStatus.value,
      colaborador_id: tarefaColaborador.value || null,
    };

    try {
      if (tarefaId.value) {
        await AppServices.tarefaService.atualizar(tarefaId.value, payload);
      } else {
        await AppServices.tarefaService.criar(payload);
      }
      fecharModal();
      await carregarTarefas();
    } catch (error) {
      tarefaFeedback.textContent = error.message;
    }
  }

  async function removerTarefa() {
    if (!tarefaSelecionada) return;

    try {
      await AppServices.tarefaService.deletar(tarefaSelecionada.id);
      fecharAcoes();
      await carregarTarefas();
    } catch (error) {
      fecharAcoes();
      tarefaFeedback.textContent = error.message;
    }
  }

  async function concluirTarefa(id) {
    tarefaFeedback.textContent = "";

    try {
      await AppServices.tarefaService.atualizar(id, { status: "completed" });
      await carregarTarefas();
    } catch (error) {
      tarefaFeedback.textContent = error.message;
    }
  }

  // Event listeners
  tarefasList.addEventListener("click", function (event) {
    var concluirButton = event.target.closest("[data-complete-id]");
    if (concluirButton) {
      event.stopPropagation();
      concluirTarefa(concluirButton.dataset.completeId);
      return;
    }

    var card = event.target.closest(".task-card");
    if (!card) return;

    var tarefa = tarefasCache.find(function (item) {
      return item.id === Number(card.dataset.id);
    });
    if (tarefa) abrirAcoes(tarefa);
  });

  tarefasList.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;

    var card = event.target.closest(".task-card");
    if (!card || event.target.closest("[data-complete-id]")) return;

    event.preventDefault();
    var tarefa = tarefasCache.find(function (item) {
      return item.id === Number(card.dataset.id);
    });
    if (tarefa) abrirAcoes(tarefa);
  });

  abrirModalTarefa.addEventListener("click", function () {
    abrirModal();
  });

  tarefaForm.addEventListener("submit", salvarTarefa);

  editarTarefa.addEventListener("click", function () {
    if (!tarefaSelecionada) return;
    fecharAcoes();
    abrirModal("editar", tarefaSelecionada);
  });

  excluirTarefa.addEventListener("click", removerTarefa);

  tarefaModal.addEventListener("click", function (event) {
    if (
      event.target === tarefaModal ||
      event.target.dataset.closeModal !== undefined
    ) {
      fecharModal();
    }
  });

  tarefaAcoes.addEventListener("click", function (event) {
    if (
      event.target === tarefaAcoes ||
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
  carregarColaboradoresParaSelect();
  carregarTarefas();
});
