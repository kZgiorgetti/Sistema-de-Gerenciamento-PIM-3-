var AppServices = AppServices || {};

AppServices.tarefaService = {
  async listar() {
    try {
      var data = await AppServices.apiService.get("/tarefas");
      return AppDTOs.TarefaDTO.fromResponse(data);
    } catch (error) {
      console.error("[tarefaService.listar]", error.message);
      throw error;
    }
  },

  async obterPorId(id) {
    try {
      var data = await AppServices.apiService.get("/tarefas/" + id);
      return AppDTOs.TarefaDTO.fromResponse(data);
    } catch (error) {
      console.error("[tarefaService.obterPorId]", error.message);
      throw error;
    }
  },

  async criar(dados) {
    try {
      var dto = new AppDTOs.TarefaDTO(dados);
      var data = await AppServices.apiService.post("/tarefas", dto.toPayload());
      return AppDTOs.TarefaDTO.fromResponse(data);
    } catch (error) {
      console.error("[tarefaService.criar]", error.message);
      throw error;
    }
  },

  async atualizar(id, dados) {
    try {
      var dto = new AppDTOs.TarefaDTO(dados);
      var data = await AppServices.apiService.put(
        "/tarefas/" + id,
        dto.toPayload(),
      );
      return AppDTOs.TarefaDTO.fromResponse(data);
    } catch (error) {
      console.error("[tarefaService.atualizar]", error.message);
      throw error;
    }
  },

  async deletar(id) {
    try {
      await AppServices.apiService.del("/tarefas/" + id);
    } catch (error) {
      console.error("[tarefaService.deletar]", error.message);
      throw error;
    }
  },
};
