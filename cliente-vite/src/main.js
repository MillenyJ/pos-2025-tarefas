import { PonyApi } from './api.js';
import { PonyRenderer } from './dom.js';

class PonyApp {
  constructor() {
    this.api = new PonyApi();
    this.renderer = new PonyRenderer();
    this.allPonies = [];
  }

  async init() {
    try {
      this.renderer.showLoading();
      
      this.allPonies = await this.api.getAllCharacters();
      
      const kinds = this.api.extractKinds(this.allPonies);
      this.renderer.populateKindFilter(kinds);
      
      this.renderer.renderPonies(this.allPonies);
      
      this.renderer.setupFilter((e) => this.handleFilterChange(e));
      
    } catch (error) {
      this.renderer.showError(error.message);
    }
  }

  handleFilterChange(e) {
    const value = String(e.target.value).trim().toLowerCase();
    const filtered = value === "all"
      ? this.allPonies
      : this.allPonies.filter(p => 
          (String(p.kind || "Não informado").trim().toLowerCase()) === value
        );
    
    this.renderer.renderPonies(filtered);
  }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const app = new PonyApp();
  app.init();
});