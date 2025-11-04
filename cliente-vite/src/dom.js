export class PonyRenderer {
  constructor() {
    this.container = document.getElementById("pony-container");
    this.filterSelect = document.getElementById("kind-filter");
  }

  showLoading() {
    this.container.innerHTML = `<div class="text-center">🔄 Carregando personagens...</div>`;
  }

  showError(message) {
    this.container.innerHTML = `<div class="alert alert-danger">❌ Erro ao carregar personagens: ${message}</div>`;
  }

  showNoResults() {
    this.container.innerHTML = `<div class="alert alert-warning text-center">⚠️ Nenhum personagem encontrado.</div>`;
  }

  renderPonies(ponies) {
    this.container.innerHTML = "";

    if (!ponies || ponies.length === 0) {
      this.showNoResults();
      return;
    }

    ponies.forEach(p => {
      const name = p.name || p.title || "Nome desconhecido";
      const gender = p.gender || p.sex || "Não informado";
      const kind = (p.kind ? String(p.kind) : "Não informado");
      const residence = (p.residence ? String(p.residence) : "Não informado");
      const imageUrl = p.image || p.imageUrl || "https://via.placeholder.com/300x200?text=Pony";

      const card = document.createElement("div");
      card.className = "col-md-4 col-lg-3";

      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${imageUrl}" class="card-img-top" alt="${name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${name}</h5>
            <p class="card-text"><strong>Gênero:</strong> ${gender}</p>
            <p class="card-text"><strong>Tipo (Kind):</strong> ${kind}</p>
            <p class="card-text"><strong>Residência:</strong> ${residence}</p>
          </div>
        </div>
      `;
      this.container.appendChild(card);
    });
  }

  populateKindFilter(kinds) {
    this.filterSelect.innerHTML = `<option value="all">Todos os tipos</option>`;
    kinds.forEach(kind => {
      const opt = document.createElement("option");
      opt.value = kind;
      opt.textContent = kind;
      this.filterSelect.appendChild(opt);
    });
  }

  setupFilter(callback) {
    this.filterSelect.addEventListener("change", callback);
  }
}