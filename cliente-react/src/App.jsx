import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import ponies from "./assets/ponies.json";

export default function App() {
  const [allPonies, setAllPonies] = useState([]);
  const [kindOptions, setKindOptions] = useState(["all"]);
  const [filterKind, setFilterKind] = useState("all");

  useEffect(() => {
    setAllPonies(ponies);
    const kinds = Array.from(new Set(ponies.map((p) => p.kind)));
    setKindOptions(["all", ...kinds]);
  }, []);

  const filtered =
    filterKind === "all"
      ? allPonies
      : allPonies.filter((p) => p.kind === filterKind);

  return (
    <div>
      {/* CABEÇALHO (MANTIDO) */}
      <header>
        <nav
          className="navbar navbar-dark mb-4"
          style={{ backgroundColor: "#6f42c1", padding: "10px" }}
        >
          <div className="container d-flex align-items-center">
            <img src={logo} alt="Logo" className="logo" />
            <span className="navbar-title ms-2">My Little Pony</span>
          </div>
        </nav>
      </header>

      {/* CONTEÚDO */}
      <main className="container">
        <h1 className="text-center mb-4">
          Personagens de My Little Pony
        </h1>

        {/* FILTRO */}
        <div className="row mb-4">
          <div className="col-12 col-md-6 offset-md-3">
            <select
              className="form-select"
              value={filterKind}
              onChange={(e) => setFilterKind(e.target.value)}
            >
              {kindOptions.map((k) => (
                <option key={k} value={k}>
                  {k === "all" ? "Todos os tipos" : k}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* GRID DE CARDS */}
        <div className="row g-4">
          {filtered.map((p) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={p.name}
            >
              <div className="card shadow-sm h-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="mb-1">
                    <strong>Gênero:</strong> {p.gender}
                  </p>
                  <p className="mb-1">
                    <strong>Tipo:</strong> {p.kind}
                  </p>
                  <p className="mb-1">
                    <strong>Residência:</strong> {p.residence}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
