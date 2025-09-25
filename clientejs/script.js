const proxy = "https://api.allorigins.win/raw?url=";
const apiBase = "http://ponyapi.net/v1";

let allPonies = [];

async function fetchJson(path) {
  const res = await fetch(`${proxy}${apiBase}${path}`);
  if (!res.ok) throw new Error("Erro ao buscar dados: " + res.status);
  return res.json();
}

function renderPonies(ponies) {
  const container = document.getElementById("pony-container");
  container.innerHTML = "";

  if (!ponies || ponies.length === 0) {
    container.innerHTML = `<div class="alert alert-warning text-center">⚠️ Nenhum personagem encontrado.</div>`;
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
    container.appendChild(card);
  });
}

async function loadPonies() {
  const container = document.getElementById("pony-container");
  container.innerHTML = `<div class="text-center">🔄 Carregando personagens...</div>`;

  try {
    let data = await fetchJson("/character/all");

    if (Array.isArray(data)) {
      allPonies = data;
    } else if (data.characters) {
      allPonies = data.characters;
    } else if (data.data) {
      allPonies = data.data;
    } else {
      throw new Error("Formato inesperado da resposta da API");
    }

    allPonies = allPonies.filter(p => p && (p.name || p.title));

   
    const kindSet = new Set(allPonies.map(p => String(p.kind || "Não informado").trim()));
    const filterSelect = document.getElementById("kind-filter");
    filterSelect.innerHTML = `<option value="all">Todos os tipos</option>`;
    kindSet.forEach(kind => {
      const opt = document.createElement("option");
      opt.value = kind;
      opt.textContent = kind;
      filterSelect.appendChild(opt);
    });


    renderPonies(allPonies);

   
    filterSelect.addEventListener("change", e => {
      const value = String(e.target.value).trim().toLowerCase();
      const filtered = value === "all"
        ? allPonies
        : allPonies.filter(p => (String(p.kind || "Não informado").trim().toLowerCase()) === value);
      renderPonies(filtered);
    });

  } catch (err) {
    container.innerHTML = `<div class="alert alert-danger">❌ Erro ao carregar personagens: ${err.message}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", loadPonies);
