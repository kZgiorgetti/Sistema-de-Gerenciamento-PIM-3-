var AppServices = AppServices || {};

AppServices.colaboradorService = {
  async listar() {
    try {
      var data = await AppServices.apiService.get("/colaboradores");
      return AppDTOs.ColaboradorDTO.fromResponse(data);
    } catch (error) {
      console.error("[colaboradorService.listar]", error.message);
      throw error;
    }
  },

  async obterPorId(id) {
    try {
      var data = await AppServices.apiService.get("/colaboradores/" + id);
      return AppDTOs.ColaboradorDTO.fromResponse(data);
    } catch (error) {
      console.error("[colaboradorService.obterPorId]", error.message);
      throw error;
    }
  },

  async criar(nome) {
    try {
      var dto = new AppDTOs.ColaboradorDTO({ nome: nome });
      var data = await AppServices.apiService.post(
        "/colaboradores",
        dto.toPayload(),
      );
      return AppDTOs.ColaboradorDTO.fromResponse(data);
    } catch (error) {
      console.error("[colaboradorService.criar]", error.message);
      throw error;
    }
  },

  async atualizar(id, nome) {
    try {
      var dto = new AppDTOs.ColaboradorDTO({ nome: nome });
      var data = await AppServices.apiService.put(
        "/colaboradores/" + id,
        dto.toPayload(),
      );
      return AppDTOs.ColaboradorDTO.fromResponse(data);
    } catch (error) {
      console.error("[colaboradorService.atualizar]", error.message);
      throw error;
    }
  },

  async deletar(id) {
    try {
      await AppServices.apiService.del("/colaboradores/" + id);
    } catch (error) {
      console.error("[colaboradorService.deletar]", error.message);
      throw error;
    }
  },
};
