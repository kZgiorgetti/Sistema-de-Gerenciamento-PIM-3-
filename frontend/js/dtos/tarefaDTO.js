var AppDTOs = AppDTOs || {};

AppDTOs.TarefaDTO = class TarefaDTO {
  constructor(data) {
    this.id = data.id || null;
    this.titulo = data.titulo || "";
    this.descricao = data.descricao || "";
    this.status = data.status || "pendente";
    this.colaborador_id = data.colaborador_id || null;
    this.colaborador_nome = data.colaborador_nome || "";
  }

  static fromResponse(data) {
    if (!data) return null;
    if (Array.isArray(data)) {
      return data.map(function (item) {
        return new AppDTOs.TarefaDTO(item);
      });
    }
    return new AppDTOs.TarefaDTO(data);
  }

  toPayload() {
    return {
      titulo: this.titulo,
      descricao: this.descricao,
      status: this.status,
      colaborador_id: this.colaborador_id,
    };
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao,
      status: this.status,
      colaborador_id: this.colaborador_id,
      colaborador_nome: this.colaborador_nome,
    };
  }
};
