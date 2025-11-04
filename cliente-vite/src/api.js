const proxy = "https://api.allorigins.win/raw?url=";
const PONYAPI_BASE = "http://ponyapi.net/v1";

export class PonyApi {
  async fetchJson(path) {
    const url = `${proxy}${encodeURIComponent(PONYAPI_BASE + path)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro ao buscar dados: " + res.status);
    return res.json();
  }

  async getAllCharacters() {
    try {
      // Buscar todos os personagens da PonyAPI
      const data = await this.fetchJson("/character/all");
      
      let allPonies = [];
      
      // A PonyAPI retorna os dados em data.data
      if (data.data && Array.isArray(data.data)) {
        allPonies = data.data;
      } else if (Array.isArray(data)) {
        allPonies = data;
      } else {
        throw new Error("Formato inesperado da resposta da API");
      }

      // Processar os personagens
      const processedPonies = allPonies.map((pony, index) => {
        return {
          id: pony.id || index + 1,
          name: pony.name || "Nome desconhecido",
          gender: this.formatGender(pony.gender),
          kind: pony.kind || "Não informado",
          residence: pony.residence || "Não informado",
          image: pony.image?.[0] || this.getDefaultImage(pony.name || "Pony")
        };
      });

      return processedPonies.filter(p => p && p.name);
      
    } catch (error) {
      console.error('Erro na API:', error);
      // Fallback para dados de teste se a API falhar
      return this.getFallbackData();
    }
  }

  formatGender(gender) {
    if (!gender) return "Não informado";
    const genderMap = {
      'M': 'Male',
      'F': 'Female',
      'Male': 'Male',
      'Female': 'Female'
    };
    return genderMap[gender] || gender;
  }

  getDefaultImage(name) {
    const colors = ['6f42c1', 'dc3545', 'e83e8c', 'fd7e14', '20c997', 'ffc107'];
    const colorIndex = name.length % colors.length;
    return `https://via.placeholder.com/300x200/${colors[colorIndex]}/FFFFFF?text=${encodeURIComponent(name)}`;
  }

  getFallbackData() {
    // Dados de fallback caso a API esteja offline
    return [
      {
        id: 1,
        name: "Twilight Sparkle",
        gender: "Female",
        kind: "Alicorn",
        residence: "Castle of Friendship",
        image: "https://via.placeholder.com/300x200/6f42c1/FFFFFF?text=Twilight+Sparkle"
      },
      {
        id: 2,
        name: "Rainbow Dash",
        gender: "Female",
        kind: "Pegasus",
        residence: "Cloudsdale",
        image: "https://via.placeholder.com/300x200/DC3545/FFFFFF?text=Rainbow+Dash"
      },
      {
        id: 3,
        name: "Pinkie Pie",
        gender: "Female",
        kind: "Earth Pony",
        residence: "Sugarcube Corner",
        image: "https://via.placeholder.com/300x200/E83E8C/FFFFFF?text=Pinkie+Pie"
      },
      {
        id: 4,
        name: "Applejack",
        gender: "Female",
        kind: "Earth Pony",
        residence: "Sweet Apple Acres",
        image: "https://via.placeholder.com/300x200/FD7E14/FFFFFF?text=Applejack"
      }
    ];
  }

  extractKinds(ponies) {
    return new Set(ponies.map(p => String(p.kind || "Não informado").trim()));
  }
}