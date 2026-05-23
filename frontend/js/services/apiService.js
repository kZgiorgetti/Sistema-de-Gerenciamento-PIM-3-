var AppServices = AppServices || {};

const API_ROOT = "/api";

AppServices.apiService = {
  async handleResponse(response) {
    try {
      const data = await response.json().catch(function () {
        return null;
      });
      if (!response.ok) {
        var message =
          (data && (data.error || data.message)) ||
          "Erro na comunicação com o servidor.";
        throw new Error(message);
      }
      return data;
    } catch (error) {
      if (error.message) throw error;
      throw new Error("Erro ao processar resposta do servidor.");
    }
  },

  async get(endpoint) {
    try {
      var response = await fetch(API_ROOT + endpoint);
      return await this.handleResponse(response);
    } catch (error) {
      console.error("[apiService.get]", error.message);
      throw error;
    }
  },

  async post(endpoint, body) {
    try {
      var response = await fetch(API_ROOT + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("[apiService.post]", error.message);
      throw error;
    }
  },

  async put(endpoint, body) {
    try {
      var response = await fetch(API_ROOT + endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("[apiService.put]", error.message);
      throw error;
    }
  },

  async del(endpoint) {
    try {
      var response = await fetch(API_ROOT + endpoint, {
        method: "DELETE",
      });
      if (!response.ok) {
        var data = await response.json().catch(function () {
          return null;
        });
        throw new Error((data && data.error) || "Erro ao excluir recurso.");
      }
      return null;
    } catch (error) {
      console.error("[apiService.del]", error.message);
      throw error;
    }
  },
};
