var AppDTOs = AppDTOs || {};

AppDTOs.ColaboradorDTO = class ColaboradorDTO {
  constructor(data) {
    this.id = data.id || null;
    this.nome = data.nome || "";
  }

  static fromResponse(data) {
    if (!data) return null;
    if (Array.isArray(data)) {
      return data.map(function (item) {
        return new AppDTOs.ColaboradorDTO(item);
      });
    }
    return new AppDTOs.ColaboradorDTO(data);
  }

  toPayload() {
    return { nome: this.nome };
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
    };
  }
};
